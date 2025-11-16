import React, { useRef } from 'react';

interface ActionPanelProps {
  onImageUpload: (file: File) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  isImageUploaded: boolean;
}

const UploadIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
);

const SparklesIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L11 15l-4 6h10l-4-6-2.293-2.293a1 1 0 010-1.414L15 3z" />
    </svg>
);

export const ActionPanel: React.FC<ActionPanelProps> = ({ onImageUpload, onGenerate, isGenerating, isImageUploaded }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  const baseButtonClasses = "px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900";
  const disabledButtonClasses = "bg-gray-600 cursor-not-allowed";

  return (
    <div className="sticky bottom-0 left-0 right-0 w-full bg-gray-900/80 backdrop-blur-sm p-4 border-t border-gray-700">
      <div className="max-w-md mx-auto flex items-center justify-center space-x-4">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        <button
          onClick={handleUploadClick}
          className={`${baseButtonClasses} bg-gray-700 hover:bg-gray-600 focus:ring-gray-500`}
        >
          <UploadIcon />
          {isImageUploaded ? 'Trocar Imagem' : 'Carregar Imagem'}
        </button>

        <button
          onClick={onGenerate}
          disabled={!isImageUploaded || isGenerating}
          className={`${baseButtonClasses} ${isImageUploaded && !isGenerating ? 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500' : disabledButtonClasses}`}
        >
          <SparklesIcon />
          {isGenerating ? 'Gerando...' : 'Gerar'}
        </button>
      </div>
    </div>
  );
};