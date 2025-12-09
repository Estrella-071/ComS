
import React, { useRef, useState, useLayoutEffect } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';

interface SegmentedControlProps<T extends string> {
  options: Array<{ label: string; value: T }>;
  value: T;
  onChange: (value: T) => void;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: SegmentedControlProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const isDragging = useRef(false);
  
  // Local state to handle visual updates during drag without triggering parent re-renders
  const [activeValue, setActiveValue] = useState(value);
  
  // Motion Values for performant animations
  const x = useMotionValue(0);
  const scale = useMotionValue(1);

  // Calculate dimensions
  const padding = 4; // Corresponds to p-1 (4px)
  const availableWidth = Math.max(0, containerWidth - (padding * 2));
  const itemWidth = availableWidth / options.length;
  const maxPos = Math.max(0, availableWidth - itemWidth);
  
  // Active Index based on PROP (for auto-correction/snapping)
  const propIndex = options.findIndex(o => o.value === value);
  const safePropIndex = propIndex === -1 ? 0 : propIndex;

  // Sync activeValue with prop value when prop changes (external update)
  useLayoutEffect(() => {
    setActiveValue(value);
  }, [value]);

  // Auto-Correction / Snapping Logic
  // This runs when the PROP value changes (or on resize/mount)
  useLayoutEffect(() => {
    // Only snap if NOT dragging. This prevents fighting between the spring and the user's finger.
    if (!isDragging.current && containerWidth > 0) {
      const targetX = safePropIndex * itemWidth;
      animate(x, targetX, {
        type: "spring",
        stiffness: 600,
        damping: 35
      });
    }
  }, [safePropIndex, itemWidth, containerWidth]);

  // Resize Observer to handle responsive width
  useLayoutEffect(() => {
    if (!containerRef.current) return;
    
    const measure = () => {
        if (containerRef.current) {
            setContainerWidth(containerRef.current.getBoundingClientRect().width);
        }
    };

    measure();

    const observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
            if (entry.borderBoxSize) {
                 const borderBoxSize = Array.isArray(entry.borderBoxSize) 
                    ? entry.borderBoxSize[0] 
                    : entry.borderBoxSize;
                 setContainerWidth(borderBoxSize.inlineSize);
            } else {
                 setContainerWidth(entry.contentRect.width);
            }
        }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // -- Interaction Handlers --

  const handlePointerDown = (e: React.PointerEvent) => {
      e.stopPropagation();
      animate(scale, 1.05, { duration: 0.15 });
  };

  const handlePointerUp = () => {
      if (!isDragging.current) {
          animate(scale, 1, { duration: 0.15 });
      }
  };

  const handlePanStart = () => {
      isDragging.current = true;
      animate(scale, 1.05, { duration: 0.15 });
  };

  const handlePan = (_: any, info: { delta: { x: number } }) => {
    const currentX = x.get();
    const newX = currentX + info.delta.x;
    
    // Strict Clamp
    const clampedX = Math.max(0, Math.min(newX, maxPos));
    
    x.set(clampedX);

    // Update LOCAL state for visual feedback, but DO NOT trigger onChange yet
    if (itemWidth > 0) {
        const newIndex = Math.round(clampedX / itemWidth);
        if (newIndex >= 0 && newIndex < options.length) {
            const newValue = options[newIndex].value;
            if (newValue !== activeValue) {
                setActiveValue(newValue);
            }
        }
    }
  };

  const handlePanEnd = () => {
    isDragging.current = false;
    animate(scale, 1, { duration: 0.15 });

    const currentX = x.get();
    let finalIndex = 0;
    if (itemWidth > 0) {
        finalIndex = Math.round(currentX / itemWidth);
    }
    
    finalIndex = Math.max(0, Math.min(finalIndex, options.length - 1));

    // Commit the change
    if (options[finalIndex]) {
        const finalValue = options[finalIndex].value;
        if (finalValue !== value) {
            onChange(finalValue);
        } else {
            // If value didn't change, we still need to snap back visually
             const targetX = finalIndex * itemWidth;
             animate(x, targetX, {
                type: "spring",
                stiffness: 600,
                damping: 35
            });
        }
    }
  };

  const handleTrackClick = (e: React.MouseEvent) => {
    if (!containerRef.current || isDragging.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left - padding;
    
    if (itemWidth > 0) {
        const clickedIndex = Math.floor(clickX / itemWidth);
        if (clickedIndex >= 0 && clickedIndex < options.length) {
            onChange(options[clickedIndex].value);
        }
    }
  };

  return (
    <div 
        ref={containerRef}
        onClick={handleTrackClick}
        className="relative flex h-12 w-full select-none items-center rounded-full bg-[var(--ui-bg)] p-1 cursor-pointer"
        style={{ touchAction: 'none' }}
    >
        {/* The Sliding Knob - z-10 */}
        {containerWidth > 0 && (
            <motion.div
                className="absolute top-1 bottom-1 left-1 rounded-full bg-[var(--accent-solid)] shadow-sm z-10 cursor-grab active:cursor-grabbing"
                style={{ 
                    x, 
                    width: itemWidth,
                    scale, 
                }}
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
                onPanStart={handlePanStart}
                onPan={handlePan}
                onPanEnd={handlePanEnd}
            />
        )}

        {/* Text Labels - z-20 (On top of knob) */}
        <div className="relative z-20 flex w-full h-full pointer-events-none"> 
            {options.map((option) => (
                <div
                    key={option.value}
                    className={`flex-1 flex items-center justify-center text-sm font-semibold transition-colors duration-200 ${
                        activeValue === option.value 
                        ? 'text-[var(--accent-solid-text)]' 
                        : 'text-[var(--text-secondary)]'
                    }`}
                >
                    {option.label}
                </div>
            ))}
        </div>
    </div>
  );
}
