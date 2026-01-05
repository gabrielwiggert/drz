const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4001';

export async function uploadText(text: string): Promise<{ message: string }> {
  const response = await fetch(`${API_BASE_URL}/upload-text`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error('Falha ao enviar o texto');
  }

  return { message: 'ok' };
}

export async function askQuestion(question: string): Promise<{ answer: string }> {
  const response = await fetch(`${API_BASE_URL}/ask`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question }),
  });

  if (!response.ok) {
    throw new Error('Falha ao fazer a pergunta');
  }

  return response.json();
}
