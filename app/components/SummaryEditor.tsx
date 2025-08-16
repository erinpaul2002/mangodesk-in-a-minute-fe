'use client';

import React, { useState } from 'react';
import { SquarePen } from 'lucide-react';

interface SummaryEditorProps {
  value: string;
  onChange: (value: string) => void;
  isLoading?: boolean;
  className?: string;
}

export default function SummaryEditor({
  value,
  onChange,
  isLoading = false,
  className = ''
}: SummaryEditorProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const wordCount = value.trim().split(/\s+/).filter(word => word.length > 0).length;

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <label className="block text-sm font-medium text-gray-700">
          Generated Summary
        </label>
        <div className="flex items-center space-x-3">
          <span className="text-xs text-gray-500">
            {wordCount} words
          </span>
          {value && !isLoading && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`
                flex items-center space-x-1 text-xs px-2 py-1 rounded-md transition-colors duration-150
                ${isEditing 
                  ? 'text-teal-700 bg-teal-100 hover:bg-teal-200' 
                  : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
                }
              `}
            >
              <SquarePen size={12} />
              <span>{isEditing ? 'Done' : 'Edit'}</span>
            </button>
          )}
        </div>
      </div>
      
      <div className="relative">
        {isLoading ? (
          <div className="w-full h-64 border border-gray-300 rounded-lg bg-gray-50 flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-600"></div>
              <span className="text-gray-600">Generating summary...</span>
            </div>
          </div>
        ) : (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Your AI-generated summary will appear here..."
            rows={12}
            readOnly={!isEditing}
            className={`
              w-full px-4 py-3 border rounded-lg resize-y overflow-auto transition-all duration-200
              text-sm leading-relaxed
              ${isFocused && isEditing
                ? 'border-teal-500 ring-2 ring-teal-100 outline-none' 
                : 'border-gray-300'
              }
              ${isEditing 
                ? 'bg-white cursor-text' 
                : 'bg-gray-50 cursor-default'
              }
              placeholder-gray-400
            `}
            style={{ minHeight: '16rem' }}
          />
        )}
      </div>
      
      {isEditing && (
        <p className="mt-2 text-xs text-gray-500">
          Click outside or press "Done" to finish editing
        </p>
      )}
    </div>
  );
}