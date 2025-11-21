
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import { useBilingualAnnotation } from '../hooks/useBilingualAnnotation';

interface ProblemExplanationProps {
  explanation: string;
  isVisible: boolean;
}

export const ProblemExplanation: React.FC<ProblemExplanationProps> = ({ explanation, isVisible }) => {
  const { t } = useTranslation();
  const annotate = useBilingualAnnotation();
  const [isOpen, setIsOpen] = useState(isVisible);

  // Sync local state when prop changes
  useEffect(() => {
      if (isVisible) setIsOpen(true);
  }, [isVisible]);

  return (
    <div className="mt-4 pt-4 border-t border-[var(--ui-border)]">
       {!isVisible && (
        <div className="flex justify-center mb-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-[var(--ui-bg)] text-[var(--text-secondary)] font-semibold px-5 py-2 rounded-lg hover:bg-[var(--ui-bg-hover)] transition-colors"
            >
                {isOpen ? t('hide_explanation') : t('show_explanation')}
            </button>
        </div>
       )}

      <AnimatePresence>
        {isOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                <div className={isVisible ? "" : "mt-4 pt-4 border-t border-[var(--ui-border)]"}>
                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{t('explanation')}</h3>
                    <div className="prose prose-slate dark:prose-invert max-w-none text-left prose-p:text-[var(--text-secondary)] prose-li:text-[var(--text-secondary)]">
                        <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>{annotate(explanation)}</ReactMarkdown>
                    </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
