import React from 'react';

interface ImageDisplayProps {
  title: string;
  imageUrl: string | null;
  isLoading?: boolean;
  placeholderText?: string;
}

const PhotoIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const Spinner: React.FC = () => (
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-t-2 border-purple-400"></div>
);

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ title, imageUrl, isLoading = false, placeholderText = "Carregue uma imagem para começar." }) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold text-gray-300 mb-4">{title}</h2>
      <div className="w-full aspect-square bg-gray-800 border-2 border-dashed border-gray-600 rounded-xl flex items-center justify-center overflow-hidden relative">
        {isLoading && (
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center z-10">
            <Spinner />
            <p className="mt-4 text-lg text-gray-300">Criando seu retrato...</p>
          </div>
        )}
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          !isLoading && (
            <div className="text-center text-gray-500 flex flex-col items-center">
                <PhotoIcon />
                <p className="mt-2">{placeholderText}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};