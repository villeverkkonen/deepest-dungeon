import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import './App.css';

function App() {
  const [playerCount, setPlayerCount] = useState<string>('4');

  const playerCountInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerCount(e.target.value);
  };

  return (
    <div>
      <h1>Deepest Dungeon</h1>
      <div>
        <Form.Control
          type="number"
          value={playerCount}
          onChange={playerCountInputChanged}
          placeholder="Player count"
          data-testid="player-count-input"
        />
      </div>
    </div>
  );
}

export default App;
