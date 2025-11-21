
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import { 
    XMarkIcon, 
    GlobeAltIcon, 
    PencilIcon, 
    ArrowsRightLeftIcon, 
    SparklesIcon, 
    CodeBracketIcon, 
    Cog6ToothIcon,
    ArrowsPointingOutIcon,
    ArrowsPointingInIcon,
} from './icons';
import { SegmentedControl } from './common/SegmentedControl';
import { ToggleSwitch } from './common/ToggleSwitch';
import { View } from '../types';

interface SettingsProps { 
    isOpen: boolean; 
    setIsOpen: (isOpen: boolean) => void; 
    view: View;
    settings: { 
        fontSize: number; 
        lineHeight: number; 
        pageWidth: string; 
        readTheme: string; 
        initialMode: boolean; 
        displayMode: 'en' | 'zh' | 'bilingual'; 
    }; 
    setters: { 
        setFontSize: (size: number) => void; 
        setLineHeight: (height: number) => void; 
        setPageWidth: (width: string) => void; 
        setReadTheme: (theme: string) => void; 
        setInitialMode: (enabled: boolean) => void; 
        setDisplayMode: (mode: 'en' | 'zh' | 'bilingual') => void; 
    }; 
    theme: 'light' | 'dark'; 
    setTheme: (theme: 'light' | 'dark') => void; 
}

const FONT_SIZE_STEP = 1;
const MIN_FONT_SIZE = 12;
const MAX_FONT_SIZE = 24;

const SettingRow: React.FC<{icon: React.ReactNode, label: string, children: React.ReactNode, layout?: 'stacked' | 'inline'}> = ({ icon, label, children, layout = 'stacked' }) => {
    if (layout === 'inline') {
        return (
            <div className="flex items-center justify-between gap-4 w-full">
                <label className="flex-shrink-0 flex items-center gap-2 text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider whitespace-nowrap select-none">{icon}<span>{label}</span></label>
                <div className="flex-1 min-w-[140px] flex justify-end">{children}</div>
            </div>
        );
    }
    return (
        <div className="space-y-3 w-full">
            <label className="flex items-center gap-2 text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider select-none">{icon}<span>{label}</span></label>
            <div className="w-full">{children}</div>
        </div>
    );
};

export const Settings: React.FC<SettingsProps> = ({ isOpen, setIsOpen, view, settings, setters, theme, setTheme }) => {
  const { t } = useTranslation();
  const spring = { type: 'spring' as const, stiffness: 350, damping: 30 };
  
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
    <div className="relative flex flex-col items-center">
        <motion.div
            variants={{
                open: { opacity: 1, y: 0, scale: 1, pointerEvents: 'auto' },
                closed: { opacity: 0, y: 20, scale: 0.95, pointerEvents: 'none' }
            }}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            transition={spring}
            className="absolute bottom-[calc(100%+0.75rem)] right-0 glass-pane rounded-2xl w-[26rem] shadow-2xl text-[var(--text-primary)] max-h-[calc(100vh-6rem)] overflow-y-auto overflow-x-hidden origin-bottom-right ring-1 ring-[var(--ui-border)]"
        >
          <div className="flex justify-between items-center px-6 py-4 border-b border-[var(--ui-border)] sticky top-0 bg-[var(--bg-translucent)] backdrop-blur-xl z-10">
              <h3 className="font-bold text-sm uppercase tracking-wide">{t('sidebar_tab_settings')}</h3>
              <button onClick={() => setIsOpen(false)} className="p-1.5 -m-1.5 text-[var(--text-secondary)] hover:bg-[var(--ui-bg-hover)] rounded-full transition-colors">
                  <XMarkIcon className="w-5 h-5" />
              </button>
          </div>
          
          <div className="p-6 space-y-8">
              {/* Global Settings */}
              <div className="space-y-5">
                  <SettingRow icon={<SparklesIcon className="w-5 h-5 text-[var(--text-secondary)]"/>} label={t('reading_settings_theme')} layout="inline">
                      <SegmentedControl
                        options={[
                          { label: 'Light', value: 'light' },
                          { label: 'Dark', value: 'dark' }
                        ]}
                        value={theme}
                        onChange={(val) => {
                            setTheme(val as 'light' | 'dark');
                            if (val === 'dark') setters.setReadTheme('default'); 
                        }}
                        layoutId="theme-toggle"
                      />
                  </SettingRow>

                  <SettingRow icon={isFullscreen ? <ArrowsPointingInIcon className="w-5 h-5 text-[var(--text-secondary)]"/> : <ArrowsPointingOutIcon className="w-5 h-5 text-[var(--text-secondary)]"/>} label={isFullscreen ? t('exit_fullscreen') : t('enter_fullscreen')} layout="inline">
                     <ToggleSwitch
                        id="fullscreen-toggle"
                        checked={isFullscreen}
                        onChange={toggleFullscreen}
                     />
                  </SettingRow>
              </div>

              {/* Textbook Specific Settings */}
              <AnimatePresence initial={false}>
                {isTextbook && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="h-px w-full bg-[var(--ui-border)] my-6"></div>
                        <div className="text-xs font-bold text-[var(--text-subtle)] uppercase tracking-wider mb-6">
                             {t('reading_settings_title')}
                        </div>
                        
                        <div className="space-y-6">
                             <SettingRow icon={<GlobeAltIcon className="w-5 h-5 text-[var(--text-secondary)]"/>} label={t('reading_settings_language')} layout="stacked">
                                <SegmentedControl 
                                    options={[
                                        { label: t('reading_settings_lang_zh'), value: 'zh' }, 
                                        { label: t('reading_settings_lang_en'), value: 'en' }, 
                                        { label: t('reading_settings_lang_bilingual'), value: 'bilingual' }
                                    ]} 
                                    value={settings.displayMode} 
                                    onChange={setters.setDisplayMode} 
                                    layoutId="display-mode-toggle" 
                                />
                            </SettingRow>

                            <SettingRow icon={<PencilIcon className="w-5 h-5 text-[var(--text-secondary)]"/>} label={`${t('reading_settings_font_size')} (${settings.fontSize}px)`}>
                                <div className="bg-[var(--ui-bg)] rounded-xl px-4 py-3">
                                    <input 
                                        type="range" 
                                        min={MIN_FONT_SIZE} 
                                        max={MAX_FONT_SIZE} 
                                        step={1}
                                        value={settings.fontSize}
                                        onChange={(e) => setters.setFontSize(Number(e.target.value))}
                                        className="w-full accent-[var(--accent-solid)] cursor-pointer"
                                    />
                                    <div className="flex justify-between text-[10px] text-[var(--text-subtle)] mt-2 font-mono font-bold">
                                        <span>Aa</span>
                                        <span className="text-sm">Aa</span>
                                    </div>
                                </div>
                            </SettingRow>

                            {/* Full width rows for sliders to prevent squeezing */}
                            <SettingRow icon={<ArrowsRightLeftIcon className="w-5 h-5 text-[var(--text-secondary)] transform rotate-90"/>} label={t('reading_settings_line_height')}>
                                <SegmentedControl 
                                    options={[{ label: '1.5', value: '1.5' }, { label: '1.7', value: '1.7' }, { label: '2.0', value: '2.0' }]} 
                                    value={settings.lineHeight.toFixed(1)} 
                                    onChange={(v) => setters.setLineHeight(parseFloat(v))} 
                                    layoutId="line-height-toggle" 
                                />
                            </SettingRow>

                            <SettingRow icon={<ArrowsRightLeftIcon className="w-5 h-5 text-[var(--text-secondary)]"/>} label={t('reading_settings_page_width')}>
                                <SegmentedControl options={[{ label: 'Small', value: 'max-w-4xl' }, { label: 'Medium', value: 'max-w-6xl' }, { label: 'Large', value: 'max-w-7xl' }]} value={settings.pageWidth} onChange={setters.setPageWidth} layoutId="page-width-toggle" />
                            </SettingRow>
                            
                             {theme === 'light' && (
                                <SettingRow icon={<SparklesIcon className="w-5 h-5 text-[var(--text-secondary)]" />} label={'Paper Tone'} layout="inline">
                                    <div className="flex items-center gap-3 bg-[var(--ui-bg)] p-1.5 rounded-full">
                                        <button onClick={() => setters.setReadTheme('default')} className={`w-8 h-8 rounded-full border border-stone-200 bg-[#f4f1ea] transition-all relative ${settings.readTheme === 'default' ? 'ring-2 ring-[var(--accent-solid)] shadow-sm z-10 scale-110' : 'hover:scale-105'}`} aria-label="Default Paper"></button>
                                        <button onClick={() => setters.setReadTheme('sepia')} className={`w-8 h-8 rounded-full bg-[#DBCDBA] border border-[#c4b5a3] transition-all relative ${settings.readTheme === 'sepia' ? 'ring-2 ring-[var(--accent-solid)] shadow-sm z-10 scale-110' : 'hover:scale-105'}`} aria-label="Sepia Paper"></button>
                                    </div>
                                </SettingRow>
                            )}
                            
                            <SettingRow icon={<CodeBracketIcon className="w-5 h-5 text-[var(--text-secondary)]" />} label={t('reading_settings_formatting')} layout="inline">
                                <ToggleSwitch
                                    id="initial-mode-toggle"
                                    checked={settings.initialMode}
                                    onChange={setters.setInitialMode}
                                />
                            </SettingRow>
                        </div>
                    </motion.div>
                )}
              </AnimatePresence>
          </div>
        </motion.div>
      <motion.button 
          onClick={() => setIsOpen(!isOpen)} 
          className="w-14 h-14 bg-[var(--accent-solid)] rounded-full text-[var(--accent-solid-text)] flex items-center justify-center shadow-xl hover:bg-[var(--accent-solid-hover)] transition-colors" 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }} 
          aria-label="Settings"
      >
          <AnimatePresence mode="wait">
            <motion.div 
                key={isOpen ? 'close' : 'open'} 
                initial={{ opacity: 0, scale: 0.6, rotate: -90 }} 
                animate={{ opacity: 1, scale: 1, rotate: 0 }} 
                exit={{ opacity: 0, scale: 0.6, rotate: 90 }} 
                transition={{ duration: 0.2 }}
            >
                {isOpen ? <XMarkIcon className="w-7 h-7" /> : <Cog6ToothIcon className="w-7 h-7" />}
            </motion.div>
          </AnimatePresence>
      </motion.button>
    </div>
  );
}
