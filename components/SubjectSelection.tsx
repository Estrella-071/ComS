
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import { useAppContext } from '../contexts/AppContext';
import { subjects } from '../data/subjects';
import { BookOpenIcon, CodeBracketIcon } from './icons';

const iconMap: { [key: string]: React.FC<any> } = {
    'intro-to-cs': BookOpenIcon,
    'c-programming': CodeBracketIcon,
};

export const SubjectSelection: React.FC = () => {
    const { t } = useTranslation();
    const { setSubject } = useAppContext();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };
    
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
    };

    return (
        <div className="h-full overflow-y-auto flex items-center justify-center p-4">
            <div className="w-full max-w-4xl text-center">
                 <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl md:text-5xl font-bold tracking-tighter text-[var(--text-primary)] mb-16"
                >
                    {t('select_subject')}
                </motion.h1>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    {subjects.map(subject => {
                        const Icon = iconMap[subject.id] || BookOpenIcon;
                        return (
                            <motion.div key={subject.id} variants={itemVariants}>
                                <motion.button 
                                    onClick={() => subject.enabled && setSubject(subject.id)}
                                    disabled={!subject.enabled}
                                    className="w-full h-full glass-pane rounded-2xl p-8 text-left disabled:opacity-50 disabled:cursor-not-allowed group"
                                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                    whileTap={{ scale: 0.97, y: -2 }}
                                >
                                    <Icon className="w-10 h-10 mb-6 text-[var(--accent-text)] transition-transform group-hover:scale-110"/>
                                    <h2 className="text-2xl font-bold text-[var(--text-primary)]">{subject.name.zh}</h2>
                                    <p className="text-md text-[var(--text-secondary)] mt-1">{subject.name.en}</p>
                                    <p className="text-sm text-[var(--text-secondary)] mt-4 leading-relaxed">{subject.description.zh}</p>
                                </motion.button>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>
        </div>
    );
};
