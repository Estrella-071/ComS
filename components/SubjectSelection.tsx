
import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useAnimation, Variants } from 'framer-motion';
import { useAppContext } from '../contexts/AppContext';
import { subjects } from '../data/subjects';
import { BookOpenIcon, CodeBracketIcon, ChevronRightIcon } from './icons';

// --- Visual Assets ---

const CornerData = () => {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="absolute top-6 left-6 z-20 font-mono text-xs text-[var(--text-secondary)] opacity-70 tracking-widest pointer-events-none">
        <div className="font-bold text-[var(--text-primary)] text-lg mb-1">QUESTION_BANK</div>
        <div className="hidden sm:block">SYS.VER.2.0.5</div>
      </div>

      <div className="absolute top-6 right-6 z-20 font-mono text-xs text-[var(--text-secondary)] opacity-70 gap-6 hidden sm:flex">
        <span className="border border-[var(--ui-border)] px-3 py-1 rounded-full hover:bg-[var(--text-primary)] hover:text-[var(--bg-color)] transition-colors cursor-pointer pointer-events-auto">About</span>
        <span className="border border-[var(--ui-border)] px-3 py-1 rounded-full hover:bg-[var(--text-primary)] hover:text-[var(--bg-color)] transition-colors cursor-pointer pointer-events-auto">Contact</span>
      </div>

      <div className="absolute bottom-6 left-6 z-20 font-mono text-[10px] text-[var(--text-subtle)] opacity-50 leading-tight hidden md:block pointer-events-none">
        <div className="flex gap-4 border-t border-[var(--ui-border)] pt-2 w-64 justify-between">
           <span>roughness</span>
           <div className="flex-1 mx-2 h-px bg-[var(--ui-border)] self-center"></div>
           <span>0.10</span>
        </div>
        <div className="flex gap-4 w-64 justify-between">
           <span>metalness</span>
           <div className="flex-1 mx-2 h-px bg-[var(--ui-border)] self-center"></div>
           <span>0.85</span>
        </div>
        <div className="flex gap-4 w-64 justify-between">
           <span>transmission</span>
           <div className="flex-1 mx-2 h-px bg-[var(--ui-border)] self-center"></div>
           <span>1.00</span>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 z-20 font-mono text-xs text-[var(--text-secondary)] opacity-70 text-right pointer-events-none">
         <div className="mb-1 hidden sm:block">Local Time</div>
         <div className="text-[var(--text-primary)]">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
         <div className="text-[10px] text-[var(--text-subtle)] opacity-40 mt-1">{time.toLocaleDateString()}</div>
      </div>
    </>
  );
};

interface PrismCardProps {
    subject: any;
    onClick: () => void;
    index: number;
    onHoverStart: () => void;
    onHoverEnd: () => void;
}

const PrismCard: React.FC<PrismCardProps> = ({ subject, onClick, index, onHoverStart, onHoverEnd }) => {
  const { language } = useAppContext();
  const Icon = subject.id === 'intro-to-cs' ? BookOpenIcon : CodeBracketIcon;
  
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => { setIsHovered(true); onHoverStart(); }}
      onMouseLeave={() => { setIsHovered(false); onHoverEnd(); }}
      onClick={onClick}
      className="relative group cursor-pointer w-full max-w-sm md:max-w-none md:w-[400px] h-auto md:h-[500px] perspective-1000 flex-shrink-0"
    >
      <div 
        className={`
          relative w-full h-full flex flex-col justify-between p-6 md:p-8 
          border transition-all duration-300 overflow-hidden rounded-2xl md:rounded-none
          ${isHovered ? 'border-[var(--text-primary)] bg-[var(--text-primary)]/10' : 'border-[var(--ui-border)] bg-[var(--ui-bg)]'}
        `}
        style={{
          backdropFilter: 'blur(12px)',
          boxShadow: isHovered 
            ? '0 0 30px rgba(0,0,0,0.05), inset 0 0 20px rgba(255,255,255,0.05)' 
            : '0 0 0 rgba(0,0,0,0)',
        }}
      >
        <div className={`absolute inset-0 transition-opacity duration-200 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
             <div className="absolute inset-0 border border-red-500/50 translate-x-[2px] translate-y-[2px]" />
             <div className="absolute inset-0 border border-blue-500/50 -translate-x-[2px] -translate-y-[2px]" />
        </div>

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
             <span className="font-mono text-[10px] text-[var(--text-secondary)] opacity-60 uppercase tracking-[0.2em] border border-[var(--ui-border)] px-2 py-1 rounded-full">
                {String(index + 1).padStart(2, '0')} / REF
             </span>
             <Icon className={`w-6 h-6 transition-colors duration-200 ${isHovered ? 'text-[var(--text-primary)]' : 'text-[var(--text-subtle)]'}`} />
          </div>
          
          <h2 className={`
            font-serif text-3xl md:text-5xl font-light leading-tight mb-2 transition-all duration-200
            ${isHovered ? 'text-[var(--text-primary)] scale-105 origin-left' : 'text-[var(--text-primary)] opacity-80'}
          `}>
             {subject.name[language]}
          </h2>
          <p className="font-mono text-xs text-[var(--text-secondary)] opacity-50 uppercase tracking-wider">
            {subject.name[language === 'en' ? 'zh' : 'en']}
          </p>
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 dark:opacity-20">
            <div className={`w-32 h-32 border border-[var(--text-primary)] rounded-full transition-transform duration-700 ${isHovered ? 'scale-150 rotate-45' : 'scale-100 rotate-0'}`} />
            <div className={`absolute w-48 h-px bg-[var(--text-primary)] transition-transform duration-500 ${isHovered ? 'rotate-90' : 'rotate-45'}`} />
            <div className={`absolute w-48 h-px bg-[var(--text-primary)] transition-transform duration-500 ${isHovered ? 'rotate-0' : '-rotate-45'}`} />
        </div>

        <div className="relative z-10 space-y-6 mt-8 md:mt-0">
           <p className={`font-mono text-sm leading-relaxed transition-colors duration-200 line-clamp-3 ${isHovered ? 'text-[var(--text-primary)] opacity-90' : 'text-[var(--text-secondary)] opacity-50'}`}>
              {subject.description[language]}
           </p>
           
           <div className="flex items-center justify-between border-t border-[var(--ui-border)] pt-4">
              <span className={`font-mono text-xs uppercase tracking-widest transition-colors ${isHovered ? 'text-[var(--text-primary)]' : 'text-[var(--text-subtle)]'}`}>
                 Initialize
              </span>
              <div className={`
                w-8 h-8 flex items-center justify-center rounded-full border transition-all duration-200
                ${isHovered ? 'border-[var(--text-primary)] bg-[var(--text-primary)] text-[var(--bg-color)] rotate-0' : 'border-[var(--ui-border)] text-[var(--text-subtle)] -rotate-45'}
              `}>
                 <ChevronRightIcon className="w-4 h-4" />
              </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Dynamic Background Text Component ---

const BackgroundText: React.FC<{ control: any }> = ({ control }) => {
    // Parallax logic
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);
    const smoothX = useSpring(mouseX, { damping: 40, stiffness: 300 });
    const smoothY = useSpring(mouseY, { damping: 40, stiffness: 300 });
    
    // Weakened parallax effect
    const textX = useTransform(smoothX, [0, 1], [-5, 5]);
    const textY = useTransform(smoothY, [0, 1], [-5, 5]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            mouseX.set(clientX / innerWidth);
            mouseY.set(clientY / innerHeight);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Animation Variants
    const variants: Variants = {
        idle: { 
            opacity: 1, 
            filter: "blur(1px) brightness(1)",
            scale: 1,
            transition: { duration: 0.5, ease: "easeInOut" }
        },
        glitch: {
            // Weakened glitch effect
            opacity: [1, 0.8, 1, 0.9, 1],
            filter: ["blur(0px)", "blur(1px)", "blur(0px)", "blur(0.5px)", "blur(0px)"],
            scale: 1,
            transition: { 
                duration: 0.2, 
                times: [0, 0.2, 0.4, 0.6, 1],
                ease: "linear"
            }
        },
        dimmed: {
            opacity: 0.1,
            filter: "blur(0px) brightness(0.8)",
            scale: 1,
            transition: { duration: 0.2 }
        }
    };

    return (
        <motion.div 
            style={{ x: textX, y: textY }}
            variants={variants}
            initial="idle"
            animate={control}
            className="absolute inset-0 flex items-start justify-end md:items-start md:justify-center lg:items-center lg:justify-center pt-16 pr-6 md:pt-24 md:pr-0 lg:pt-0 overflow-hidden select-none pointer-events-none z-0"
        >
            <h1 className="text-6xl sm:text-8xl md:text-[18vw] lg:text-[22vw] font-black text-[var(--text-primary)] opacity-10 dark:opacity-100 leading-none tracking-tight">
                SELECT
            </h1>
        </motion.div>
    );
};

// --- Main Component ---

export const SubjectSelection: React.FC = () => {
    const { setSubject } = useAppContext();
    const textControls = useAnimation();
    
    // Track if the background is in "active" (dimmed) state
    const isDimmedRef = useRef(false);
    const returnToIdleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    
    const handleCardHoverStart = () => {
        if (returnToIdleTimeoutRef.current) {
            clearTimeout(returnToIdleTimeoutRef.current);
            returnToIdleTimeoutRef.current = null;
        }

        if (isDimmedRef.current) {
            textControls.start("dimmed");
        } else {
            textControls.start("glitch").then(() => {
                textControls.start("dimmed");
                isDimmedRef.current = true;
            });
        }
    };

    const handleCardHoverEnd = () => {
        const delay = 0.3;
        const duration = 0.3;

        textControls.start({
            opacity: 1,
            filter: "blur(1px) brightness(1)",
            scale: 1,
            transition: { delay, duration, ease: "easeInOut" }
        });

        returnToIdleTimeoutRef.current = setTimeout(() => {
            isDimmedRef.current = false;
        }, (delay + duration) * 1000);
    };

    const handleSubjectClick = (subjectId: string) => {
        setSubject(subjectId);
    };

    return (
        <div className="relative w-full h-full overflow-hidden text-[var(--text-primary)] font-sans">
            <BackgroundText control={textControls} />
            <CornerData />
            
            {/* Scrollable Container */}
            <div className="absolute inset-0 z-10 overflow-y-auto md:overflow-hidden custom-scrollbar">
                <div className="min-h-full w-full flex flex-col md:flex-row items-center justify-center gap-8 p-6 pt-24 pb-24 md:p-8">
                    {subjects.map((subject, index) => (
                        <PrismCard 
                            key={subject.id}
                            index={index}
                            subject={subject}
                            onClick={() => subject.enabled && handleSubjectClick(subject.id)}
                            onHoverStart={handleCardHoverStart}
                            onHoverEnd={handleCardHoverEnd}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
