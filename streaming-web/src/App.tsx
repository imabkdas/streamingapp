import React from 'react';
import './App.css';
import WebSocketClient from './components/WebSocketClient.tsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <WebSocketClient />
      </header>
    </div>
  );
}

export default App;
