import React from 'react';
import Innobot from './Innobot';

function App() {
  return (
    <div className="App">
      <Innobot 
        apiKey="your-gemini-api-key-here"
        maxQuestions={10}
      />
    </div>
  );
}

export default App;