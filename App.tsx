import React, { useState, useCallback } from 'react';
import { generateArtisticImage } from './services/geminiService';
import { ImageDisplay } from './components/ImageDisplay';
import { Header } from './components/Header';
import { ActionPanel } from './components/ActionPanel';
import { fileToBase64 } from './utils/fileUtils';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);

  const handleImageUpload = useCallback((file: File) => {
    setError(null);
    setGeneratedImage(null);
    setOriginalFile(file);
    fileToBase64(file).then(base64 => {
      setOriginalImage(base64);
    }).catch(err => {
      setError('Falha ao ler o arquivo de imagem. Por favor, tente outro.');
      console.error(err);
    });
  }, []);

  const handleGenerate = async () => {
    if (!originalFile) {
      setError('Por favor, carregue uma imagem primeiro.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const base64Image = await fileToBase64(originalFile);
      // Remove the data URL prefix e.g., "data:image/jpeg;base64,"
      const base64Data = base64Image.split(',')[1];
      const mimeType = originalFile.type;

      const prompt = `Use minha imagem como base e recrie no estilo de um retrato artístico em estúdio, fundo totalmente preto, iluminação dramática com um feixe de luz estreito iluminando parcialmente o rosto e deixando áreas em sombra profunda. Alta definição, contraste intenso, atmosfera misteriosa e cinematográfica, inspirado em fotografia de baixo perfil (low-key lighting).`;

      const generatedBase64 = await generateArtisticImage(prompt, base64Data, mimeType);
      
      setGeneratedImage(`data:${mimeType};base64,${generatedBase64}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.';
      setError(`A geração falhou: ${errorMessage}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4 sm:p-6 md:p-8">
      <Header />
      <main className="w-full max-w-6xl flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <ImageDisplay title="Original" imageUrl={originalImage} />
          <ImageDisplay 
            title="Retrato Artístico" 
            imageUrl={generatedImage} 
            isLoading={isLoading} 
            placeholderText="Seu retrato cinematográfico aparecerá aqui." 
          />
        </div>
        
        {error && (
          <div className="mt-6 text-center bg-red-900/50 border border-red-600 text-red-300 p-3 rounded-lg">
            <p>{error}</p>
          </div>
        )}

      </main>
      <ActionPanel
        onImageUpload={handleImageUpload}
        onGenerate={handleGenerate}
        isGenerating={isLoading}
        isImageUploaded={!!originalImage}
      />
      <Footer />
    </div>
  );
};

export default App;