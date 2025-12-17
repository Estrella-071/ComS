
import React, { useEffect, useRef } from 'react';
import { useAppContext } from '../contexts/AppContext';

const MAX_RIPPLE_AGE = 4000;
const WAVE_SPEED = 0.25;
const BASE_FREQ = 0.08;

const PEAK_SHARPNESS = 2.0; 
const WAVE_OFFSET = 2.3; 

const VISCOUS_DAMPING = 0.0015;
const GEOMETRIC_DAMPING = 0.002;

const BASE_OPACITY = 0.18;
const AMPLITUDE_GAIN = 0.4; 

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
    baseX: number;
    baseY: number;
}

interface CustomCanvas extends HTMLCanvasElement {
    gridSpacing?: number;
}

export const BackgroundCanvas: React.FC = () => {
    const canvasRef = useRef<CustomCanvas>(null);
    const ripples = useRef<Ripple[]>([]);
    const gridPoints = useRef<GridPoint[]>([]);
    const animationFrameId = useRef<number | null>(null);
    
    const { canvasState, theme } = useAppContext();
    const { isInteractive } = canvasState;

    const mousePos = useRef({ x: 0, y: 0 });
    const targetOffset = useRef({ x: 0, y: 0 });
    const currentOffset = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Only update physics targets, don't trigger React state updates
            mousePos.current.x = e.clientX;
            mousePos.current.y = e.clientY;
            
            targetOffset.current.x = (window.innerWidth / 2 - e.clientX) * 0.015;
            targetOffset.current.y = (window.innerHeight / 2 - e.clientY) * 0.015;
        };

        if (isInteractive) {
            window.addEventListener('mousemove', handleMouseMove);
        }
        
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isInteractive]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const initGrid = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            
            // Reduce grid density on smaller screens for performance
            const isMobile = width < 768;
            const spacing = isMobile ? 60 : 40; 
            
            canvas.width = width;
            canvas.height = height;

            const cols = Math.ceil(width / spacing) + 2;
            const rows = Math.ceil(height / spacing) + 2;
            gridPoints.current = [];
            
            const startX = -spacing;
            const startY = -spacing;

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const x = startX + i * spacing;
                    const y = startY + j * spacing;
                    gridPoints.current.push({
                        x, 
                        y,
                        baseX: x,
                        baseY: y,
                    });
                }
            }
            canvas.gridSpacing = spacing;
        };

        window.addEventListener('resize', initGrid);
        initGrid(); 

        return () => window.removeEventListener('resize', initGrid);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d', { alpha: false });
        if (!canvas || !ctx) return;

        const isDark = theme === 'dark';
        
        const bgColorHex = isDark ? '#050505' : '#f4f1ea';
        const gridLineColor = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)';
        const dotColorRgb = isDark ? '255, 255, 255' : '28, 25, 23';
        
        let lastTime = 0;

        const render = (time: number) => {
            // Stop animation if tab is hidden
            if (document.hidden) {
                animationFrameId.current = requestAnimationFrame(render);
                return;
            }

            lastTime = time;

            const spacing = canvas.gridSpacing || 40;

            currentOffset.current.x += (targetOffset.current.x - currentOffset.current.x) * 0.05;
            currentOffset.current.y += (targetOffset.current.y - currentOffset.current.y) * 0.05;

            ctx.fillStyle = bgColorHex;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const driftX = (time * 0.01) % spacing;
            const driftY = (time * 0.01) % spacing;

            if (ripples.current.length > 0) {
                 ripples.current = ripples.current.filter(r => (time - r.startTime) < MAX_RIPPLE_AGE);
            }

            // Only draw if opacity is high enough to be seen
            ctx.beginPath();
            ctx.strokeStyle = gridLineColor;
            ctx.lineWidth = 1;

            const offsetX = currentOffset.current.x % spacing;
            const offsetY = currentOffset.current.y % spacing;

            for (let x = -spacing + driftX + offsetX; x < canvas.width; x += spacing) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
            }
            for (let y = -spacing + driftY + offsetY; y < canvas.height; y += spacing) {
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
            }
            ctx.stroke();

            // Local variables for tighter loop
            const points = gridPoints.current;
            const activeRipples = ripples.current;
            const numPoints = points.length;
            const numRipples = activeRipples.length;
            const offX = currentOffset.current.x + driftX;
            const offY = currentOffset.current.y + driftY;
            const width = canvas.width;
            const height = canvas.height;

            for (let i = 0; i < numPoints; i++) {
                const point = points[i];
                const screenX = point.baseX + offX;
                const screenY = point.baseY + offY;

                // Culling: Skip points significantly off-screen
                if (screenX < -20 || screenX > width + 20 || 
                    screenY < -20 || screenY > height + 20) continue;

                let totalDisplacement = 0;

                if (numRipples > 0) {
                    for (let j = 0; j < numRipples; j++) {
                        const r = activeRipples[j];
                        const age = time - r.startTime;
                        if (age <= 0) continue;

                        const dx = screenX - r.x;
                        const dy = screenY - r.y;
                        
                        // Simple distance check before expensive math
                        // Wave packet moves at WAVE_SPEED. Packet width is approx 150-500px.
                        // If point is too far from wavefront, skip.
                        
                        const dist = Math.sqrt(dx * dx + dy * dy);

                        const packetCenter = age * WAVE_SPEED;
                        const distFromPacket = dist - packetCenter;
                        const packetWidth = 120 + age * 0.08;

                        if (Math.abs(distFromPacket) < packetWidth) {
                             const localFreq = BASE_FREQ / (1 + dist * 0.002);
                             const envelope = Math.exp(-Math.pow(distFromPacket / (packetWidth * 0.4), 2));
                             const phase = dist * localFreq - (age * 0.015);
                             
                             // Pre-calculate constants if possible, but params change.
                             const rawWave = Math.exp(PEAK_SHARPNESS * Math.sin(phase)) - WAVE_OFFSET;
                             const capillary = Math.sin(dist * 0.25 + age * 0.1) * 0.15;
                             const damping = (1 / (1 + dist * GEOMETRIC_DAMPING)) * 
                                            Math.exp(-age * VISCOUS_DAMPING) *
                                            r.initialAmp;

                             totalDisplacement += (rawWave + capillary) * envelope * damping;
                        }
                    }
                }

                let opacity = BASE_OPACITY + (totalDisplacement * AMPLITUDE_GAIN);
                
                if (opacity < 0) opacity = 0;
                else if (opacity > 1) opacity = 1;

                if (opacity > 0.01) {
                    ctx.beginPath();
                    ctx.arc(screenX, screenY, 1.2, 0, 6.28318);
                    ctx.fillStyle = `rgba(${dotColorRgb}, ${opacity})`;
                    ctx.fill();
                }
            }
            
            animationFrameId.current = requestAnimationFrame(render);
        };

        animationFrameId.current = requestAnimationFrame(render);

        return () => {
            if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
        };
    }, [theme]);

    return (
        <canvas
            id="background-canvas"
            ref={canvasRef}
            className="fixed inset-0 w-full h-full z-0 pointer-events-none"
            style={{ willChange: 'transform' }} // Optimization hint
        />
    );
};
