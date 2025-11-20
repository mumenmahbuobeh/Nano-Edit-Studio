import React from 'react';
import { Sparkles } from 'lucide-react';

interface PromptInputProps {
  prompt: string;
  setPrompt: (val: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
  disabled: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ 
  prompt, 
  setPrompt, 
  onGenerate, 
  isLoading, 
  disabled 
}) => {
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!disabled && !isLoading) {
        onGenerate();
      }
    }
  };

  return (
    <div className="w-full flex flex-col space-y-3">
      <label className="block text-sm font-medium text-gray-300">
        Describe your edits
      </label>
      <div className="relative">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="E.g., Make the background a cyberpunk city, put him in a spacesuit..."
          className="w-full bg-dark-card text-white placeholder-gray-500 border border-dark-border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-banana-500/50 focus:border-banana-500 transition-all resize-none h-32 shadow-inner"
          disabled={isLoading}
        />
        <div className="absolute bottom-3 right-3 text-xs text-gray-500 pointer-events-none">
          Gemini 2.5 Flash
        </div>
      </div>

      <button
        onClick={onGenerate}
        disabled={disabled || isLoading || !prompt.trim()}
        className={`
          group relative w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg
          ${disabled || !prompt.trim() 
            ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
            : 'bg-gradient-to-r from-banana-500 to-orange-600 text-white hover:shadow-banana-500/25 hover:scale-[1.01] active:scale-[0.99]'}
        `}
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <Sparkles className={`w-5 h-5 ${!disabled && "group-hover:animate-pulse"}`} />
            <span>Generate Edits</span>
          </>
        )}
      </button>
    </div>
  );
};