import { useState } from 'react';
import { uploadText } from '../api/api';

interface UploadTextScreenProps {
  onTextUploaded: () => void;
}

export function UploadTextScreen({ onTextUploaded }: UploadTextScreenProps) {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!text.trim()) {
      setError('Por favor, insira um texto.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await uploadText(text);
      onTextUploaded();
    } catch (err) {
      console.error('Upload error:', err);
      setError('Erro ao enviar o texto. Verifique se o servidor está rodando.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Enviar Texto
        </h1>
        <p className="text-gray-600 mb-4 text-center">
          Cole o texto abaixo para que a IA possa responder perguntas sobre ele.
        </p>

        <textarea
          className="w-full h-64 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Cole seu texto aqui..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isLoading}
        />

        {error && (
          <p className="text-red-500 mt-2 text-sm">{error}</p>
        )}

        <button
          className="w-full mt-4 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? 'Enviando...' : 'Enviar texto para a IA'}
        </button>
      </div>
    </div>
  );
}
