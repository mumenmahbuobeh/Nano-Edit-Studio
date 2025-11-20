import React, { useState } from 'react';
import { ImageUpload } from './components/ImageUpload';
import { PromptInput } from './components/PromptInput';
import { ResultViewer } from './components/ResultViewer';
import { editImage } from './services/geminiService';
import { GeneratedImage, AppState } from './types';
import { Wand2, Zap } from 'lucide-react';

function App() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<GeneratedImage | null>(null);
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!selectedImage || !prompt) return;

    setAppState(AppState.PROCESSING);
    setErrorMsg(null);

    try {
      const generated = await editImage(selectedImage, prompt);
      setResult(generated);
      setAppState(AppState.SUCCESS);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Something went wrong during generation");
      setAppState(AppState.ERROR);
    }
  };

  // Example prompt to help the user, based on the request context (but generalized)
  const prefillExample = () => {
    setPrompt("Cyberpunk style, neon lights, futuristic city background, wearing high-tech visor.");
  };

  return (
    <div className="min-h-screen bg-dark-bg text-gray-100 p-4 md:p-8 font-sans selection:bg-banana-500/30 selection:text-banana-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-dark-border pb-6">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-banana-300 to-orange-500 bg-clip-text text-transparent flex items-center gap-3">
              <Zap className="text-banana-400 fill-banana-400" />
              Nano Edit Studio
            </h1>
            <p className="text-gray-400 mt-2 text-lg">
              Remix reality with <span className="text-banana-200 font-medium">Gemini 2.5 Flash Image</span>
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-xs font-mono text-gray-600 bg-dark-card px-3 py-1 rounded-full border border-dark-border">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            System Online
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Controls */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="space-y-2">
              <ImageUpload 
                selectedImage={selectedImage} 
                onImageSelect={(file) => {
                  setSelectedImage(file);
                  // Reset result if new image is picked
                  if (appState === AppState.SUCCESS) {
                    setAppState(AppState.IDLE);
                    setResult(null);
                  }
                }} 
              />
            </div>

            <div className="bg-dark-card p-6 rounded-xl border border-dark-border shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-banana-500/5 rounded-bl-full pointer-events-none"></div>
                <PromptInput 
                  prompt={prompt}
                  setPrompt={setPrompt}
                  onGenerate={handleGenerate}
                  isLoading={appState === AppState.PROCESSING}
                  disabled={!selectedImage}
                />
                
                {!prompt && (
                  <button 
                    onClick={prefillExample}
                    className="mt-3 text-xs text-banana-500 hover:text-banana-400 flex items-center gap-1 transition-colors"
                  >
                    <Wand2 size={12} />
                    Try an example prompt
                  </button>
                )}
            </div>

            <div className="text-xs text-gray-600 px-2">
                <p>Tip: Describe both the subject and the environment clearly for best results.</p>
            </div>
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-7">
            <div className="h-full flex flex-col">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Generated Result
                </label>
                <ResultViewer 
                  result={result} 
                  isLoading={appState === AppState.PROCESSING} 
                  error={errorMsg}
                />
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

export default App;