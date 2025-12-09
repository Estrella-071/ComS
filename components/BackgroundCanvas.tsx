
import React, { useEffect, useRef } from 'react';
import { useAppContext } from '../contexts/AppContext';

// --- Physics Configuration ---
const GRID_SPACING = 40; 
const MAX_RIPPLE_AGE = 4000; // Ripples last for 4 seconds
const WAVE_SPEED = 0.25; // Propagation speed
const BASE_FREQ = 0.08; // Base frequency of the wave

// --- Fluid Dynamics Parameters ---
// Trochoidal Sharpness (k): Higher = sharper peaks, flatter troughs
const PEAK_SHARPNESS = 2.0; 
// Approximate mean of exp(k*sin(x)) for k=2.0 is roughly 2.3. 
// Subtracting this centers the wave around 0 (displacement).
const WAVE_OFFSET = 2.3; 

// Energy Damping
const VISCOUS_DAMPING = 0.0015; // Energy loss over time
const GEOMETRIC_DAMPING = 0.002; // Energy loss over distance (radial)

// --- Visual Mapping Configuration ---
const BASE_OPACITY = 0.18; // The "Still Water" level. Visible but dim.
const AMPLITUDE_GAIN = 0.4; // How much wave height affects opacity. 

interface Ripple {
    id: number;
    x: number;
    y: number;
    startTime: number;
    initialAmp: number;
}

interface GridPoint {
    x: number;
    y: number;
    baseX: number; // For parallax restore
    baseY: number;
}

export const BackgroundCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ripples = useRef<Ripple[]>([]);
    const gridPoints = useRef<GridPoint[]>([]);
    const animationFrameId = useRef<number | null>(null);
    
    // Global State connection
    const { canvasState, theme } = useAppContext();
    const { isInteractive } = canvasState;

    // Mouse parallax state
    const mousePos = useRef({ x: 0, y: 0 });
    const targetOffset = useRef({ x: 0, y: 0 });
    const currentOffset = useRef({ x: 0, y: 0 });

    // --- Input Handling ---
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
            targetOffset.current = {
                x: (window.innerWidth / 2 - e.clientX) * 0.015,
                y: (window.innerHeight / 2 - e.clientY) * 0.015
            };
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isInteractive]);

    // --- Initialization & Resizing ---
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const initGrid = () => {
            const cols = Math.ceil(window.innerWidth / GRID_SPACING) + 2;
            const rows = Math.ceil(window.innerHeight / GRID_SPACING) + 2;
            gridPoints.current = [];
            
            const startX = -GRID_SPACING;
            const startY = -GRID_SPACING;

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const x = startX + i * GRID_SPACING;
                    const y = startY + j * GRID_SPACING;
                    gridPoints.current.push({
                        x, 
                        y,
                        baseX: x,
                        baseY: y,
                    });
                }
            }
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initGrid();
        };

        window.addEventListener('resize', handleResize);
        handleResize(); 

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // --- Physics & Render Loop ---
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d', { alpha: false });
        if (!canvas || !ctx) return;

        const isDark = theme === 'dark';
        
        // Theme colors
        const bgColorHex = isDark ? '#050505' : '#f4f1ea';
        const gridLineColor = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)';
        const dotColorRgb = isDark ? '255, 255, 255' : '28, 25, 23';
        
        const render = (time: number) => {
            // 1. Physics: Update Grid Parallax
            currentOffset.current.x += (targetOffset.current.x - currentOffset.current.x) * 0.05;
            currentOffset.current.y += (targetOffset.current.y - currentOffset.current.y) * 0.05;

            // 2. Draw Background
            ctx.fillStyle = bgColorHex;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 3. Grid Movement Logic (Slow drift)
            const driftX = (time * 0.01) % GRID_SPACING;
            const driftY = (time * 0.01) % GRID_SPACING;

            // Clean up dead ripples
            ripples.current = ripples.current.filter(r => (time - r.startTime) < MAX_RIPPLE_AGE);

            // --- Draw Grid Lines ---
            ctx.beginPath();
            ctx.strokeStyle = gridLineColor;
            ctx.lineWidth = 1;

            for (let x = -GRID_SPACING + driftX + currentOffset.current.x % GRID_SPACING; x < canvas.width; x += GRID_SPACING) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
            }
            for (let y = -GRID_SPACING + driftY + currentOffset.current.y % GRID_SPACING; y < canvas.height; y += GRID_SPACING) {
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
            }
            ctx.stroke();

            // 4. Process Wave Physics per Point
            for (const point of gridPoints.current) {
                const screenX = point.baseX + currentOffset.current.x + driftX;
                const screenY = point.baseY + currentOffset.current.y + driftY;

                // Culling
                if (screenX < -20 || screenX > canvas.width + 20 || 
                    screenY < -20 || screenY > canvas.height + 20) continue;

                let totalDisplacement = 0;

                // --- SUPERPOSITION PRINCIPLE ---
                // We sum the displacements (heights) of all active waves.
                for (const r of ripples.current) {
                    const age = time - r.startTime;
                    if (age <= 0) continue;

                    const dx = screenX - r.x;
                    const dy = screenY - r.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    // 1. Frequency Dispersion: Longer waves (lower freq) travel faster and are on the outside.
                    const localFreq = BASE_FREQ / (1 + dist * 0.002);

                    // 2. Traveling Wavefront
                    // Center of the wave packet moves at WAVE_SPEED
                    const packetCenter = age * WAVE_SPEED;
                    const distFromPacket = dist - packetCenter;
                    
                    // Wave packet width expands slightly over time (dispersion)
                    const packetWidth = 120 + age * 0.08;

                    // Only calculate if within the packet to save cycles and define the "ring"
                    if (Math.abs(distFromPacket) < packetWidth) {
                        
                        // 3. Gaussian Window (The Envelope)
                        const envelope = Math.exp(-Math.pow(distFromPacket / (packetWidth * 0.4), 2));

                        // 4. Trochoidal Wave Profile
                        const phase = dist * localFreq - (age * 0.015);
                        const rawWave = Math.exp(PEAK_SHARPNESS * Math.sin(phase)) - WAVE_OFFSET;

                        // 5. Capillary Waves (Surface Tension Noise)
                        const capillary = Math.sin(dist * 0.25 + age * 0.1) * 0.15;

                        // 6. Damping
                        const damping = (1 / (1 + dist * GEOMETRIC_DAMPING)) * 
                                        Math.exp(-age * VISCOUS_DAMPING) *
                                        r.initialAmp;

                        // Add to total displacement (Superposition)
                        totalDisplacement += (rawWave + capillary) * envelope * damping;
                    }
                }

                // --- Visual Mapping ---
                // Map displacement to opacity.
                // Displacement 0 -> BASE_OPACITY (Still water)
                let opacity = BASE_OPACITY + (totalDisplacement * AMPLITUDE_GAIN);

                // Hard clamp.
                opacity = Math.max(0, Math.min(1, opacity));

                // Draw dot if visible
                if (opacity > 0.01) {
                    ctx.beginPath();
                    ctx.arc(screenX, screenY, 1.2, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${dotColorRgb}, ${opacity})`;
                    ctx.fill();
                }
            }
            
            animationFrameId.current = requestAnimationFrame(render);
        };

        render(performance.now());

        return () => {
            if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
        };
    }, [theme]);

    return (
        <canvas
            id="background-canvas"
            ref={canvasRef}
            className="fixed inset-0 w-full h-full z-0 pointer-events-none"
        />
    );
};
