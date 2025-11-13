import React, { useEffect, useRef } from 'react';

// --- Constants ---
const GRID_SIZE = 32;
const FONT_SIZE = 14;
const SCROLL_SPEED = 0.05;

// Ripple Effect
const RIPPLE_DURATION = 4500;
const RIPPLE_MAX_RADIUS = 800;
const NUM_WAVES = 5;
const WAVE_SPACING = 90;

// Interactivity & Polish
const LERP_FACTOR = 0.1; 
const GLOW_DISTANCE = 60; 
const GLOW_INTENSITY = 2.0; 
const REFRACTION_INDEX = 1.08; // How much the wave "slows down" under UI
const DAMPENING_FACTOR = 0.5;  // How much dimmer the wave is under UI

// --- Helper Functions ---
const lerp = (start: number, end: number, amt: number): number => (1 - amt) * start + amt * end;

const isPointInRect = (px: number, py: number, rect: DOMRect): boolean => {
    return px >= rect.left && px <= rect.right && py >= rect.top && py <= rect.bottom;
};

const distanceToNearestEdge = (px: number, py: number, rect: DOMRect): number => {
    const dx = Math.max(rect.left - px, 0, px - rect.right);
    const dy = Math.max(rect.top - py, 0, py - rect.bottom);
    return Math.sqrt(dx * dx + dy * dy);
};

// --- Dot Class ---
class Dot {
    x: number;
    y: number;
    targetChar: string;
    currentChar: string;
    animationTimer: number;
    restTimer: number;
    displayInfluence: number = 0;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.targetChar = '';
        this.currentChar = '';
        this.animationTimer = 0;
        this.restTimer = 0;
        this.reset();
    }

    reset() {
        this.targetChar = Math.random() < 0.5 ? '0' : '1';
        this.currentChar = '';
        this.animationTimer = Math.random() * 60 + 20;
        this.restTimer = Math.random() * 2000 + 800;
    }

    update(rawInfluence: number) {
        if (rawInfluence > 0.1) {
            this.restTimer = Math.max(this.restTimer, 10);
            return;
        }

        if (this.animationTimer > 0) {
            if (Math.floor(this.animationTimer) % 6 === 0) {
                this.currentChar = String(Math.floor(Math.random() * 10));
            }
            this.animationTimer--;
            if (this.animationTimer <= 0) {
                this.currentChar = this.targetChar;
            }
        } else if (this.restTimer > 0) {
            this.restTimer--;
        } else {
            this.reset();
        }
    }

    draw(ctx: CanvasRenderingContext2D, dotColor: string, glowColor: string, smoothedInfluence: number, drawX: number, drawY: number) {
        const easedInfluence = Math.pow(smoothedInfluence, 1.5);
        const baseAlpha = 0.08;

        if (easedInfluence < 0.01) {
            ctx.globalAlpha = baseAlpha;
            ctx.fillStyle = dotColor;
            ctx.fillText(this.targetChar, drawX, drawY);
            return;
        }

        ctx.globalAlpha = baseAlpha + (1 - baseAlpha) * easedInfluence;
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = easedInfluence * 12;
        ctx.fillStyle = dotColor;
        ctx.fillText(this.currentChar || this.targetChar, drawX, drawY);
        ctx.shadowBlur = 0;
    }
}

// --- Ripple Interface ---
interface Ripple {
    x: number;
    y: number;
    createdAt: number;
}

// --- Main Component ---
export const BackgroundCanvas: React.FC = () => {
    const animationFrameId = useRef<number | null>(null);
    const dots = useRef<Dot[]>([]);
    const ripples = useRef<Ripple[]>([]);
    const uiRects = useRef<DOMRect[]>([]);
    const offsetX = useRef(0);
    const offsetY = useRef(0);

    useEffect(() => {
        const canvas = document.getElementById('background-canvas') as HTMLCanvasElement;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // --- Event Handlers & Observers ---
        const addRipple = (x: number, y: number) => {
            ripples.current.push({ x, y, createdAt: Date.now() });
        };

        const handlePointerDown = (event: MouseEvent | TouchEvent) => {
            let x, y;
            if ('touches' in event) {
                x = event.touches[0].clientX;
                y = event.touches[0].clientY;
            } else {
                x = event.clientX;
                y = event.clientY;
            }
            addRipple(x, y);
        };
        
        const updateUIRects = () => {
             const elements = document.querySelectorAll('aside, .relative.flex-1.flex.flex-col.overflow-hidden');
             uiRects.current = Array.from(elements).map(el => el.getBoundingClientRect());
        };
        const resizeObserver = new ResizeObserver(updateUIRects);

        const setup = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            dots.current = [];
            for (let x = -GRID_SIZE; x < canvas.width + GRID_SIZE; x += GRID_SIZE) {
                for (let y = -GRID_SIZE; y < canvas.height + GRID_SIZE; y += GRID_SIZE) {
                    dots.current.push(new Dot(x, y));
                }
            }
            updateUIRects();
        };

        // --- Animation Logic ---
        const calculateInfluenceForDot = (ripple: Ripple, drawX: number, drawY: number, rects: DOMRect[]): number => {
            const age = Date.now() - ripple.createdAt;
            const progress = age / RIPPLE_DURATION;
            if (progress < 0 || progress > 1) return 0;

            const dx = drawX - ripple.x;
            const dy = drawY - ripple.y;
            const distFromCenter = Math.sqrt(dx * dx + dy * dy);

            const easedProgress = 1 - Math.pow(1 - progress, 2);
            const leadingEdge = easedProgress * RIPPLE_MAX_RADIUS;
            
            let isInsideAnyRect = false;
            let minEdgeDist = Infinity;
            for (const rect of rects) {
                if (isPointInRect(drawX, drawY, rect)) {
                    isInsideAnyRect = true;
                    break;
                }
                minEdgeDist = Math.min(minEdgeDist, distanceToNearestEdge(drawX, drawY, rect));
            }
            
            let effectiveDist = distFromCenter;
            let dampening = 1.0;
            
            if (isInsideAnyRect) {
                effectiveDist *= REFRACTION_INDEX; 
                dampening = DAMPENING_FACTOR;
            }

            const packetLength = NUM_WAVES * WAVE_SPACING;
            if (effectiveDist > leadingEdge || effectiveDist < leadingEdge - packetLength) {
                return 0;
            }
            
            const posInPacket = leadingEdge - effectiveDist;
            const rawCosWave = Math.cos(posInPacket * (2 * Math.PI / WAVE_SPACING));
            const shapedWave = Math.pow((rawCosWave + 1) / 2, 3.5) * 2.0 - 1.0;
            const waveValue = shapedWave * Math.exp(-posInPacket * 0.01);
            const timeFade = Math.pow(1 - progress, 1.5);
            
            let influence = waveValue * timeFade * dampening;
            
            if (!isInsideAnyRect && minEdgeDist < GLOW_DISTANCE) {
                const glowFactor = 1 + GLOW_INTENSITY * Math.pow(1 - minEdgeDist / GLOW_DISTANCE, 2);
                influence *= glowFactor;
            }

            return Math.max(0, influence);
        };
        
        const animate = () => {
            const now = Date.now();
            ripples.current = ripples.current.filter(ripple => now - ripple.createdAt < RIPPLE_DURATION);

            const style = getComputedStyle(document.documentElement);
            const dotColor = style.getPropertyValue('--bg-dot-color').trim();
            const glowColor = style.getPropertyValue('--bg-glow-color').trim();

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = `${FONT_SIZE}px 'JetBrains Mono', monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            offsetX.current = (offsetX.current - SCROLL_SPEED) % GRID_SIZE;
            offsetY.current = (offsetY.current + SCROLL_SPEED) % GRID_SIZE;
            
            const currentRects = uiRects.current;

            dots.current.forEach(dot => {
                const drawX = dot.x + offsetX.current;
                const drawY = dot.y + offsetY.current;
                
                let totalInfluence = 0;
                ripples.current.forEach(ripple => {
                    totalInfluence += calculateInfluenceForDot(ripple, drawX, drawY, currentRects);
                });
                
                dot.displayInfluence = lerp(dot.displayInfluence, totalInfluence, LERP_FACTOR);

                dot.update(totalInfluence);
                
                dot.draw(ctx, dotColor, glowColor, dot.displayInfluence, drawX, drawY);
            });

            ctx.globalAlpha = 1;
            animationFrameId.current = requestAnimationFrame(animate);
        };

        // --- Initialization & Cleanup ---
        window.addEventListener('resize', setup);
        document.addEventListener('mousedown', handlePointerDown);
        document.addEventListener('touchstart', handlePointerDown, { passive: true });
        resizeObserver.observe(document.body);

        setup();
        animate();

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
            window.removeEventListener('resize', setup);
            document.removeEventListener('mousedown', handlePointerDown);
            document.removeEventListener('touchstart', handlePointerDown);
            resizeObserver.disconnect();
        };
    }, []);

    return null;
};
