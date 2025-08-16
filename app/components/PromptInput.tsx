'use client';

import React, { useState, useRef, useEffect } from 'react';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const EXAMPLE_PROMPTS = [
  "Summarize in bullet points for executives",
  "Highlight only action items and deadlines", 
  "Create a brief overview with key decisions",
  "Focus on technical requirements and next steps",
  "Extract main discussion points and outcomes"
];

export default function PromptInput({
  value,
  onChange,
  className = ''
}: PromptInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleExampleClick = (example: string) => {
    onChange(example);
    setShowExamples(false);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [value]);

  return (
    <div className={`w-full ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Custom Instructions
      </label>
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="e.g., 'Summarize in bullet points for executives'"
          rows={2}
          className={`
            w-full px-4 py-3 border rounded-lg transition-all duration-200 resize-none
            ${isFocused 
              ? 'border-teal-500 ring-2 ring-teal-100 outline-none' 
              : 'border-gray-300 hover:border-gray-400'
            }
            placeholder-gray-400 bg-white text-sm
          `}
          style={{ minHeight: '3rem', maxHeight: '12rem', overflow: 'auto' }}
        />
      </div>
      <button
        type="button"
        onClick={() => setShowExamples(!showExamples)}
        className="mt-2 text-xs text-teal-600 hover:text-teal-700 font-medium"
      >
        Examples
      </button>
      {(showExamples || (isFocused && !value)) && (
        <div className="mt-2 p-3 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-xs text-gray-600 mb-2 font-medium">Example prompts:</p>
          <div className="space-y-1">
            {EXAMPLE_PROMPTS.map((example, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(example)}
                className="block w-full text-left text-xs text-gray-700 hover:text-teal-600 hover:bg-white px-2 py-1 rounded transition-colors duration-150"
              >
                "{example}"
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}