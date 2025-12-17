
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import { 
    XMarkIcon, 
    GlobeAltIcon, 
    PencilIcon, 
    SparklesIcon, 
    CodeBracketIcon, 
    Cog6ToothIcon,
    ArrowsPointingOutIcon,
    ArrowsPointingInIcon,
} from './icons';
import { SegmentedControl } from './common/SegmentedControl';
import { ToggleSwitch } from './common/ToggleSwitch';
import { View } from '../types';
import { useAppContext } from '../contexts/AppContext';

interface SettingsProps { 
    isOpen: boolean; 
    setIsOpen: (isOpen: boolean) => void; 
    view: View;
}

const MIN_FONT_SIZE = 12;
const MAX_FONT_SIZE = 24;

const SectionHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex items-center gap-3 mb-3">
        <h4 className="text-[10px] font-bold text-[var(--text-subtle)] uppercase tracking-widest">{children}</h4>
        <div className="h-px flex-1 bg-[var(--ui-border)] opacity-50"></div>
    </div>
);

const ControlLabel: React.FC<{ icon?: React.ReactNode, label: string }> = ({ icon, label }) => (
    <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-secondary)] mb-2 select-none">
        {icon && <span className="text-[var(--text-subtle)]">{icon}</span>}
        <span>{label}</span>
    </div>
);

export const Settings: React.FC<SettingsProps> = ({ isOpen, setIsOpen, view }) => {
  const { t } = useTranslation();
  const {
    readingSettings: settings,
    theme,
    setTheme,
    setFontSize,
    setLineHeight,
    setPageWidth,
    setReadTheme,
    setInitialMode,
    setDisplayMode
  } = useAppContext();

  const [isFullscreen, setIsFullscreen] = useState(!!document.fullscreenElement);

  useEffect(() => {
      const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
      document.addEventListener('fullscreenchange', handleFullscreenChange);
      return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
      if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
      } else {
          document.exitFullscreen();
      }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
        window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  const isTextbook = view.type === 'textbook';

  return (
    <div className="relative flex flex-col items-end z-[var(--z-fab)]">
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    variants={{
                        open: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 500, damping: 40 } },
                        closed: { opacity: 0, y: 15, scale: 0.95, transition: { duration: 0.15 } }
                    }}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    className="fixed bottom-4 left-4 right-4 lg:absolute lg:bottom-[calc(100%+1rem)] lg:right-0 lg:left-auto lg:w-[22rem] glass-pane rounded-2xl shadow-2xl text-[var(--text-primary)] overflow-hidden ring-1 ring-[var(--ui-border)] origin-bottom-right z-[var(--z-modal-content)]"
                >
                    <div className="flex justify-between items-center px-5 py-4 border-b border-[var(--ui-border)] bg-[var(--bg-translucent)]/50 backdrop-blur-md">
                        <div className="flex items-center gap-2">
                            <SparklesIcon className="w-4 h-4 text-[var(--accent-solid)]" />
                            <h3 className="font-bold text-xs uppercase tracking-widest text-[var(--text-primary)]">{t('sidebar_tab_settings')}</h3>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-[var(--text-subtle)] hover:text-[var(--text-primary)] transition-colors">
                            <XMarkIcon className="w-5 h-5" />
                        </button>
                    </div>
                    
                    <div className="p-5 max-h-[60vh] overflow-y-auto space-y-6 custom-scrollbar">
                        
                        <div>
                            <SectionHeader>{t('tools')}</SectionHeader>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-[var(--ui-bg)] rounded-xl p-3 flex flex-col items-center justify-center gap-2 hover:bg-[var(--ui-bg-hover)] transition-colors">
                                    <span className="text-[10px] font-bold text-[var(--text-subtle)] uppercase">{t('reading_settings_theme')}</span>
                                    <SegmentedControl
                                        options={[
                                            { label: '☀', value: 'light' },
                                            { label: '☾', value: 'dark' }
                                        ]}
                                        value={theme}
                                        onChange={(val) => {
                                            setTheme(val as 'light' | 'dark');
                                            if (val === 'dark') setReadTheme('default'); 
                                        }}
                                    />
                                </div>

                                <div className="bg-[var(--ui-bg)] rounded-xl p-3 flex flex-col items-center justify-center gap-2 hover:bg-[var(--ui-bg-hover)] transition-colors">
                                    <span className="text-[10px] font-bold text-[var(--text-subtle)] uppercase">Display</span>
                                    <button 
                                        onClick={toggleFullscreen}
                                        className="flex items-center gap-2 text-xs font-semibold bg-[var(--bg-color)] px-3 py-1.5 rounded-full border border-[var(--ui-border)] shadow-sm hover:border-[var(--accent-solid)] transition-colors w-full justify-center h-8"
                                    >
                                        {isFullscreen ? <ArrowsPointingInIcon className="w-4 h-4"/> : <ArrowsPointingOutIcon className="w-4 h-4"/>}
                                        <span>{isFullscreen ? 'Exit' : 'Full'}</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <AnimatePresence initial={false}>
                            {isTextbook && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-6 overflow-hidden"
                                >
                                    <div>
                                        <SectionHeader>{t('reading_settings_title')}</SectionHeader>
                                        
                                        <div className="mb-4">
                                            <ControlLabel icon={<GlobeAltIcon className="w-3.5 h-3.5" />} label={t('reading_settings_language')} />
                                            <SegmentedControl 
                                                options={[
                                                    { label: t('reading_settings_lang_zh'), value: 'zh' }, 
                                                    { label: t('reading_settings_lang_bilingual'), value: 'bilingual' },
                                                    { label: t('reading_settings_lang_en'), value: 'en' }, 
                                                ]} 
                                                value={settings.displayMode} 
                                                onChange={setDisplayMode} 
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <div className="flex justify-between items-center mb-2">
                                                <ControlLabel icon={<PencilIcon className="w-3.5 h-3.5" />} label={t('reading_settings_font_size')} />
                                                <span className="text-xs font-mono bg-[var(--ui-bg)] px-1.5 py-0.5 rounded text-[var(--text-secondary)]">{settings.fontSize}px</span>
                                            </div>
                                            <div className="bg-[var(--ui-bg)] rounded-full px-4 py-3 flex items-center gap-3">
                                                <span className="text-xs font-bold text-[var(--text-subtle)]">A</span>
                                                <input 
                                                    type="range" 
                                                    min={MIN_FONT_SIZE} 
                                                    max={MAX_FONT_SIZE} 
                                                    step={1}
                                                    value={settings.fontSize}
                                                    onChange={(e) => setFontSize(Number(e.target.value))}
                                                    className="w-full accent-[var(--accent-solid)] cursor-pointer"
                                                />
                                                <span className="text-lg font-bold text-[var(--text-subtle)]">A</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <ControlLabel label={t('reading_settings_line_height')} />
                                                <SegmentedControl 
                                                    options={[{ label: '1.5', value: '1.5' }, { label: '1.7', value: '1.7' }, { label: '2.0', value: '2.0' }]} 
                                                    value={settings.lineHeight.toFixed(1)} 
                                                    onChange={(v) => setLineHeight(parseFloat(v))} 
                                                />
                                            </div>
                                            <div>
                                                <ControlLabel label={t('reading_settings_page_width')} />
                                                <SegmentedControl 
                                                    options={[{ label: 'S', value: 'max-w-4xl' }, { label: 'M', value: 'max-w-5xl' }, { label: 'L', value: 'max-w-6xl' }]} 
                                                    value={settings.pageWidth} 
                                                    onChange={setPageWidth} 
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-3">
                                            {theme === 'light' && (
                                                <div className="flex items-center justify-between bg-[var(--ui-bg)] p-3 rounded-xl">
                                                    <span className="text-xs font-bold text-[var(--text-secondary)] uppercase">Paper Tone</span>
                                                    <div className="flex items-center gap-3">
                                                        <button onClick={() => setReadTheme('default')} className={`w-6 h-6 rounded-full border border-stone-200 bg-[#f4f1ea] transition-all relative ${settings.readTheme === 'default' ? 'ring-2 ring-[var(--accent-solid)] ring-offset-1 ring-offset-[var(--ui-bg)]' : 'hover:scale-110'}`} aria-label="Default Paper"></button>
                                                        <button onClick={() => setReadTheme('sepia')} className={`w-6 h-6 rounded-full bg-[#DBCDBA] border border-[#c4b5a3] transition-all relative ${settings.readTheme === 'sepia' ? 'ring-2 ring-[var(--accent-solid)] ring-offset-1 ring-offset-[var(--ui-bg)]' : 'hover:scale-110'}`} aria-label="Sepia Paper"></button>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="flex items-center justify-between bg-[var(--ui-bg)] p-3 rounded-xl">
                                                <div className="flex items-center gap-2">
                                                    <CodeBracketIcon className="w-4 h-4 text-[var(--text-subtle)]" />
                                                    <span className="text-xs font-bold text-[var(--text-secondary)] uppercase">{t('reading_settings_formatting')}</span>
                                                </div>
                                                <ToggleSwitch
                                                    id="initial-mode-toggle"
                                                    checked={settings.initialMode}
                                                    onChange={setInitialMode}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        <motion.button 
            onClick={() => setIsOpen(!isOpen)} 
            className={`hidden lg:flex w-14 h-14 rounded-full items-center justify-center shadow-lg transition-colors z-20 ${isOpen ? 'bg-[var(--ui-bg)] text-[var(--text-primary)]' : 'bg-[var(--accent-solid)] text-[var(--accent-solid-text)] hover:bg-[var(--accent-solid-hover)]'}`}
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            aria-label="Settings"
        >
            <AnimatePresence mode="wait">
                <motion.div 
                    key={isOpen ? 'close' : 'open'} 
                    initial={{ opacity: 0, rotate: -90 }} 
                    animate={{ opacity: 1, rotate: 0 }} 
                    exit={{ opacity: 0, rotate: 90 }} 
                    transition={{ duration: 0.15 }}
                    className="flex items-center justify-center w-full h-full"
                >
                    {isOpen ? <XMarkIcon className="w-6 h-6 flex-shrink-0" /> : <Cog6ToothIcon className="w-6 h-6 flex-shrink-0" />}
                </motion.div>
            </AnimatePresence>
        </motion.button>
    </div>
  );
}
