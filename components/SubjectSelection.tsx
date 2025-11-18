

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import { useAppContext } from '../contexts/AppContext';
import { subjects } from '../data/subjects';
import { BookOpenIcon, CodeBracketIcon, SparklesIcon, ChevronRightIcon } from './icons';

const iconMap: { [key: string]: React.FC<any> } = {
    'intro-to-cs': BookOpenIcon,
    'c-programming': CodeBracketIcon,
};

export const SubjectSelection: React.FC = () => {
    const { t } = useTranslation();
    const { setSubject, language } = useAppContext();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.1 }
        }
    };
    
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 250, damping: 25 } }
    };

    return (
        <div className="h-full overflow-y-auto flex flex-col items-center justify-center p-6 md:p-12 relative">
            {/* Background texture or simple grid could go here, but keeping it clean for now */}
            
            <div className="w-full max-w-5xl z-10">
                 <div className="text-center mb-16">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="inline-flex items-center justify-center p-4 rounded-full border-2 border-[var(--text-primary)] mb-8"
                    >
                        <SparklesIcon className="w-8 h-8 text-[var(--text-primary)]" />
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold tracking-tight text-[var(--text-primary)] mb-6"
                    >
                        {t('subject_selection_title')}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg md:text-xl text-[var(--text-secondary)] font-serif italic"
                    >
                        {t('subject_selection_subtitle')}
                    </motion.p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto"
                >
                    {subjects.map(subject => {
                        const Icon = iconMap[subject.id] || BookOpenIcon;
                        return (
                            <motion.button 
                                key={subject.id} 
                                variants={itemVariants}
                                onClick={() => subject.enabled && setSubject(subject.id)}
                                disabled={!subject.enabled}
                                className="group relative w-full h-full bg-[var(--bg-color)] border border-[var(--ui-border)] rounded-xl p-8 text-left transition-all duration-300 hover:border-[var(--text-primary)] hover:shadow-lg overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                                whileHover={{ y: -4 }}
                                whileTap={{ scale: 0.99 }}
                            >
                                <div className="flex flex-col h-full relative z-10">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="p-3 rounded-lg bg-[var(--ui-bg)] text-[var(--text-primary)] group-hover:bg-[var(--text-primary)] group-hover:text-[var(--bg-color)] transition-colors duration-300">
                                            <Icon className="w-8 h-8"/>
                                        </div>
                                        <span className="px-3 py-1 text-xs font-bold uppercase tracking-widest border border-[var(--ui-border)] rounded-full text-[var(--text-secondary)]">
                                            {subject.type === 'quiz' ? 'Quiz' : 'Code'}
                                        </span>
                                    </div>

                                    <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3 font-serif">
                                        {subject.name[language]}
                                    </h2>
                                    <p className="text-sm font-medium text-[var(--text-subtle)] uppercase tracking-wider mb-4">
                                        {subject.name[language === 'en' ? 'zh' : 'en']}
                                    </p>
                                    <p className="text-base text-[var(--text-secondary)] leading-relaxed line-clamp-3 mb-6">
                                        {subject.description[language]}
                                    </p>
                                    
                                    <div className="mt-auto pt-4 border-t border-[var(--ui-border)] flex items-center justify-between group-hover:border-[var(--text-primary)] transition-colors">
                                        <span className="text-sm font-bold text-[var(--text-primary)]">Start Learning</span>
                                        <ChevronRightIcon className="w-5 h-5 text-[var(--text-primary)] transform group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </motion.button>
                        )
                    })}
                </motion.div>
            </div>
        </div>
    );
};