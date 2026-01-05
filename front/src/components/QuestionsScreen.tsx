import { useState } from 'react';
import { askQuestion } from '../api/api';

interface QuestionsScreenProps {
  onBack: () => void;
}

export function QuestionsScreen({ onBack }: QuestionsScreenProps) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAsk = async () => {
    if (!question.trim()) {
      setError('Por favor, digite uma pergunta.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await askQuestion(question);
      setAnswer(response.answer);
    } catch {
      setError('Erro ao fazer a pergunta. Verifique se o servidor está rodando.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Fazer Perguntas
          </h1>
          <button
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            onClick={onBack}
          >
            Trocar texto
          </button>
        </div>
        <p className="text-gray-600 mb-4">
          Digite sua pergunta sobre o texto enviado.
        </p>

        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Digite sua pergunta..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <button
            className="bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
            onClick={handleAsk}
            disabled={isLoading}
          >
            {isLoading ? '...' : 'Perguntar'}
          </button>
        </div>

        {error && (
          <p className="text-red-500 mt-2 text-sm">{error}</p>
        )}

        {answer && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h2 className="text-sm font-semibold text-gray-500 mb-2">Resposta:</h2>
            <p className="text-gray-800 whitespace-pre-wrap">{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
}
