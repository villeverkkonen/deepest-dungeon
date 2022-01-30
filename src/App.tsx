import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import './App.css';

function App() {
  const [playerCount, setPlayerCount] = useState<string>('');
  const [playerLevel, setPlayerLevel] = useState<string>('');
  const [monsterInput, setMonsterInput] = useState<string>('');

  const playerCountInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerCount(e.target.value);
  };

  const playerLevelInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerLevel(e.target.value);
  };

  const monsterInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMonsterInput(e.target.value);
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
      <div>
        <Form.Control
          type="number"
          value={playerLevel}
          onChange={playerLevelInputChanged}
          placeholder="Player level"
          data-testid="player-level-input"
        />
      </div>
      <div>
        <Form.Control
          type="text"
          value={monsterInput}
          onChange={monsterInputChanged}
          placeholder="Monster search"
          data-testid="monster-input"
        />
      </div>
    </div>
  );
}

export default App;
