'use client';

import React, { useState } from 'react';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  minRows?: number;
  className?: string;
  label?: string;
  required?: boolean;
}

export default function TextInput({
  value,
  onChange,
  placeholder = "Paste your transcript here...",
  maxLength = 200000,
  minRows = 8,
  className = '',
  label,
  required = false
}: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  
  const characterCount = value.length;
  const isNearLimit = characterCount > maxLength * 0.8;
  const isOverLimit = characterCount > maxLength;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          rows={minRows}
          maxLength={maxLength}
          className={`
            w-full px-4 py-3 border rounded-lg resize-y transition-all duration-200
            font-mono text-sm leading-relaxed
            ${isFocused 
              ? 'border-teal-500 ring-2 ring-teal-100 outline-none' 
              : 'border-gray-300 hover:border-gray-400'
            }
            ${isOverLimit ? 'border-red-500 ring-2 ring-red-100' : ''}
            placeholder-gray-400 bg-white
          `}
          style={{ minHeight: `${minRows * 1.5}rem` }}
        />
        
        <div className="absolute bottom-3 right-3 flex items-center space-x-2">
          <span className={`
            text-xs px-2 py-1 rounded-full
            ${isOverLimit 
              ? 'text-red-600 bg-red-100' 
              : isNearLimit 
                ? 'text-yellow-600 bg-yellow-100'
                : 'text-gray-500 bg-gray-100'
            }
          `}>
            {characterCount.toLocaleString()}/{maxLength.toLocaleString()}
          </span>
        </div>
      </div>
      
      {isOverLimit && (
        <p className="mt-2 text-sm text-red-600">
          Character limit exceeded. Please reduce the text length.
        </p>
      )}
    </div>
  );
}