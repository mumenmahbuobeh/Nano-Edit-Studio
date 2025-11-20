import React from 'react';
import { Download, Maximize2, AlertCircle } from 'lucide-react';
import { GeneratedImage } from '../types';

interface ResultViewerProps {
  result: GeneratedImage | null;
  isLoading: boolean;
  error: string | null;
}

export const ResultViewer: React.FC<ResultViewerProps> = ({ result, isLoading, error }) => {
  
  const handleDownload = () => {
    if (!result) return;
    const link = document.createElement("a");
    link.href = `data:${result.mimeType};base64,${result.base64}`;
    link.download = `nano-edit-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (error) {
    return (
      <div className="w-full h-64 md:h-[500px] bg-red-500/10 border border-red-500/30 rounded-xl flex flex-col items-center justify-center text-center p-6">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h3 className="text-xl font-semibold text-red-400 mb-2">Generation Failed</h3>
        <p className="text-gray-400 max-w-xs">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full h-64 md:h-[500px] bg-dark-card border border-dark-border rounded-xl flex flex-col items-center justify-center relative overflow-hidden">
        {/* Abstract animated background */}
        <div className="absolute inset-0 opacity-20">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-banana-500 rounded-full blur-[100px] animate-pulse-slow"></div>
        </div>
        
        <div className="z-10 flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-dark-bg border-t-banana-500 animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-8 h-8 bg-dark-bg rounded-full"></div>
            </div>
          </div>
          <p className="text-banana-300 font-medium animate-pulse">Dreaming up pixels...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="w-full h-64 md:h-[500px] bg-dark-card border border-dark-border rounded-xl flex flex-col items-center justify-center text-gray-600">
        <div className="w-20 h-20 bg-dark-bg rounded-full flex items-center justify-center mb-4 border border-dark-border">
          <Maximize2 className="w-8 h-8 opacity-30" />
        </div>
        <p>Generated image will appear here</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
        <div className="relative w-full flex-1 bg-black rounded-xl border border-dark-border overflow-hidden group shadow-2xl min-h-[300px]">
            {/* Background blur for fill */}
            <div 
                className="absolute inset-0 opacity-50 blur-3xl scale-110"
                style={{
                    backgroundImage: `url(data:${result.mimeType};base64,${result.base64})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                }}
            />
            
            {/* Actual Image */}
            <img 
                src={`data:${result.mimeType};base64,${result.base64}`} 
                alt="AI Generated" 
                className="relative w-full h-full object-contain z-10"
            />

            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={handleDownload}
                    className="w-full py-3 bg-white text-black font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
                >
                    <Download size={18} />
                    Download Image
                </button>
            </div>
        </div>
    </div>
  );
};