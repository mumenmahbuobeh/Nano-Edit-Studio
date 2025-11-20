import React, { useCallback, useState } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';

interface ImageUploadProps {
  selectedImage: File | null;
  onImageSelect: (file: File | null) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ selectedImage, onImageSelect }) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFiles = useCallback((files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      if (!file.type.startsWith('image/')) {
        alert("Please upload an image file.");
        return;
      }
      onImageSelect(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  }, [onImageSelect]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const clearImage = () => {
    onImageSelect(null);
    setPreviewUrl(null);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <label className="block text-sm font-medium text-gray-300 mb-2">Original Image</label>
      
      {previewUrl ? (
        <div className="relative w-full h-64 md:h-96 bg-dark-card rounded-xl border border-dark-border overflow-hidden group">
           <img 
             src={previewUrl} 
             alt="Preview" 
             className="w-full h-full object-contain"
           />
           <button 
             onClick={clearImage}
             className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-red-500/80 text-white rounded-full transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
           >
             <X size={16} />
           </button>
        </div>
      ) : (
        <div
          className={`relative flex-1 w-full min-h-[250px] h-64 md:h-96 flex flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer
            ${dragActive ? "border-banana-400 bg-banana-400/10" : "border-dark-border hover:border-banana-500/50 bg-dark-card"}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            onChange={handleChange}
            accept="image/*"
          />
          <div className="flex flex-col items-center text-center p-6 pointer-events-none">
            <div className="w-16 h-16 rounded-full bg-dark-bg flex items-center justify-center mb-4 border border-dark-border shadow-lg">
              <Upload className={`w-8 h-8 ${dragActive ? 'text-banana-400' : 'text-gray-400'}`} />
            </div>
            <p className="text-lg font-semibold text-gray-200">
              Click or drag image
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Upload a photo to start editing
            </p>
          </div>
        </div>
      )}
    </div>
  );
};