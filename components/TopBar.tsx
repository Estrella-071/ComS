import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, ChevronLeftIcon, SearchIcon } from './icons';

interface TopBarProps {
    pageTitle: string;
    onOpenSidebar: () => void;
    showBackButton: boolean;
    onBack: () => void;
    onOpenSearch: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ pageTitle, onOpenSidebar, showBackButton, onBack, onOpenSearch }) => {
    return (
        <header className="h-16 flex-shrink-0 z-[var(--z-sticky-l1)]">
            <div className="h-full px-4 lg:px-6 grid grid-cols-3 items-center glass-pane border-b border-[var(--ui-border)] lg:bg-transparent lg:backdrop-filter-none lg:border-none">
                <div className="flex items-center gap-1 justify-start">
                    <button 
                        onClick={onOpenSidebar} 
                        className="lg:hidden p-2 -m-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                        aria-label="Open menu"
                    >
                        <Bars3Icon className="w-7 h-7" />
                    </button>
                    <AnimatePresence>
                        {showBackButton && (
                            <motion.button 
                                onClick={onBack} 
                                className="p-2 -m-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                aria-label="Go back"
                            >
                                <ChevronLeftIcon className="w-6 h-6" />
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>
                <h1 className="text-lg lg:text-xl font-bold text-[var(--text-primary)] text-center truncate">
                    {pageTitle}
                </h1>
                <div className="flex items-center justify-end">
                     <button 
                        onClick={onOpenSearch} 
                        className="p-2 -m-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                        aria-label="Search"
                    >
                        <SearchIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </header>
    );
};