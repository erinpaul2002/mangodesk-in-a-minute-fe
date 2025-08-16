'use client';

import React, { useState } from 'react';
import { SendHorizontal } from 'lucide-react';

interface EmailFormProps {
  onSend: (emails: string[], subject: string, body: string) => void;
  isLoading?: boolean;
  defaultSubject?: string;
  className?: string;
  body?: string;
}

export default function EmailForm({
  onSend,
  isLoading = false,
  defaultSubject = '',
  className = '',
  body = '',
}: EmailFormProps) {
  const [emails, setEmails] = useState('');
  const [subject, setSubject] = useState(defaultSubject);
  const [emailErrors, setEmailErrors] = useState<string[]>([]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  const parseEmails = (emailString: string): string[] => {
    return emailString
      .split(/[,;\s]+/)
      .map(email => email.trim())
      .filter(email => email.length > 0);
  };

  const validateEmails = (emailList: string[]): string[] => {
    const errors: string[] = [];
    emailList.forEach((email, index) => {
      if (!validateEmail(email)) {
        errors.push(`Invalid email format: ${email}`);
      }
    });
    return errors;
  };

  const handleSend = () => {
    const emailList = parseEmails(emails);
    const errors = validateEmails(emailList);
    
    if (errors.length > 0) {
      setEmailErrors(errors);
      return;
    }
    
    if (emailList.length === 0) {
      setEmailErrors(['Please enter at least one email address']);
      return;
    }
    
    if (!subject.trim()) {
      setEmailErrors(['Please enter a subject']);
      return;
    }
    
    setEmailErrors([]);
    onSend(emailList, subject, body); // Use body prop from parent
  };

  const handleEmailChange = (value: string) => {
    setEmails(value);
    if (emailErrors.length > 0) {
      setEmailErrors([]);
    }
  };

  const canSend = emails.trim() && subject.trim() && !isLoading;

  return (
    <div className={`w-full ${className}`}>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Share Summary</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recipient Emails *
          </label>
          <input
            type="text"
            value={emails}
            onChange={(e) => handleEmailChange(e.target.value)}
            placeholder="colleague1@company.com, colleague2@company.com"
            className={`
              w-full px-4 py-3 border rounded-lg transition-all duration-200
              ${emailErrors.length > 0
                ? 'border-red-500 ring-2 ring-red-100' 
                : 'border-gray-300 hover:border-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-100'
              }
              placeholder-gray-400 bg-white text-sm outline-none
            `}
            disabled={isLoading}
          />
          <p className="mt-1 text-xs text-gray-500">
            Separate multiple emails with commas
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subject *
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Meeting Summary - [Date]"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg transition-all duration-200 hover:border-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 placeholder-gray-400 bg-white text-sm outline-none"
            disabled={isLoading}
          />
        </div>
        
        {emailErrors.length > 0 && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <ul className="text-sm text-red-600 space-y-1">
              {emailErrors.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </div>
        )}
        
        <button
          onClick={handleSend}
          disabled={!canSend}
          className={`
            w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200
            ${canSend
              ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-sm hover:shadow-md'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Sending...</span>
            </>
          ) : (
            <>
              <SendHorizontal size={16} />
              <span>Send Summary</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}