import React from 'react';

interface TextWithHighlightsProps {
  text: string;
  highlight?: string;
}

export const TextWithHighlights: React.FC<TextWithHighlightsProps> = ({ text, highlight }) => {
  if (!highlight || highlight.trim() === '') {
    return <>{text}</>;
  }

  const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  
  return (
    <>
      {parts.map((part, index) => 
        regex.test(part) && part.toLowerCase() === highlight.toLowerCase() ? (
          <mark key={index} className="bg-[var(--accent-bg)] rounded px-1 py-0.5 text-[var(--text-primary)]">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
};