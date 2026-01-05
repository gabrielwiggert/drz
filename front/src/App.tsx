import { useState } from 'react';
import { UploadTextScreen } from './components/UploadTextScreen';
import { QuestionsScreen } from './components/QuestionsScreen';

type Screen = 'upload' | 'questions';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('upload');

  return (
    <>
      {currentScreen === 'upload' && (
        <UploadTextScreen onTextUploaded={() => setCurrentScreen('questions')} />
      )}
      {currentScreen === 'questions' && (
        <QuestionsScreen onBack={() => setCurrentScreen('upload')} />
      )}
    </>
  );
}

export default App;
