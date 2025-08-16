'use client';

import React, { useState, useRef } from 'react';
import { CloudUpload } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (content: string, filename?: string) => void;
  maxFileSize?: number;
  allowedTypes?: string[];
  className?: string;
}

export default function FileUpload({
  onFileSelect,
  maxFileSize = 200 * 1024, // 200KB
  allowedTypes = ['text/plain'],
  className = ''
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (!allowedTypes.includes(file.type)) {
      return `File type not supported. Please upload ${allowedTypes.join(', ')} files only.`;
    }
    if (file.size > maxFileSize) {
      return `File size too large. Maximum size is ${Math.round(maxFileSize / 1024)}KB.`;
    }
    return null;
  };

  const handleFile = async (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const content = await file.text();
      onFileSelect(content, file.name);
    } catch (err) {
      setError('Failed to read file. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`w-full ${className}`}>
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200
          ${isDragOver 
            ? 'border-teal-500 bg-teal-50' 
            : 'border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100'
          }
          ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleBrowseClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={allowedTypes.join(',')}
          onChange={handleFileInput}
          className="hidden"
          disabled={isLoading}
        />
        
        <div className="flex flex-col items-center space-y-4">
          <div className={`p-3 rounded-full ${isDragOver ? 'bg-teal-100' : 'bg-gray-200'}`}>
            <CloudUpload 
              size={32} 
              className={isDragOver ? 'text-teal-600' : 'text-gray-500'} 
            />
          </div>
          
          <div>
            <p className="text-lg font-medium text-gray-700 mb-2">
              {isLoading ? 'Processing file...' : 'Drop your transcript here'}
            </p>
            <p className="text-sm text-gray-500">
              or <span className="text-teal-600 font-medium">browse files</span>
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Supports .txt files up to {Math.round(maxFileSize / 1024)}KB
            </p>
          </div>
        </div>
      </div>
      
      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
}