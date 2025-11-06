import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { CalculatorIcon } from './icons';

export const NumberConverter: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[var(--bg-translucent)] backdrop-blur-xl flex items-center justify-center border border-[var(--glass-border)] shadow-[var(--glass-shadow)]">
                    <CalculatorIcon className="w-7 h-7 text-[var(--accent-text)]" />
                </div>
                <h1 className="text-3xl font-bold text-[var(--text-primary)]">{t('number_converter')}</h1>
            </div>

            <div className="text-center py-20 bg-[var(--bg-translucent)] backdrop-blur-xl p-4 rounded-2xl border border-[var(--glass-border)] shadow-[var(--glass-shadow)]">
                <p className="text-[var(--text-secondary)]">This tool is currently under development.</p>
            </div>
        </div>
    );
};
