import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { fetchMonsters } from './utils/fetchMonsters';
import { Monster } from './utils/Monster';

import './App.css';

function App() {
  const [playerCount, setPlayerCount] = useState<string>('');
  const [playerLevel, setPlayerLevel] = useState<string>('');
  const [monsterInput, setMonsterInput] = useState<string>('');
  const [monsters, setMonsters] = useState<ReadonlyArray<Monster>>([]);
  const [filteredMonsters, setFilteredMonsters] = useState<
    ReadonlyArray<Monster>
  >([]);
  const [loadingMonsters, setLoadingMonsters] = useState<boolean>(true);

  const playerCountInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerCount(e.target.value);
  };

  const playerLevelInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerLevel(e.target.value);
  };

  const monsterInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMonsterInput = e.target.value;
    setMonsterInput(newMonsterInput);
    if (newMonsterInput.length > 1) {
      setFilteredMonsters(
        monsters.filter((monster) =>
          monster.name.toLowerCase().includes(newMonsterInput.toLowerCase())
        )
      );
    } else {
      setFilteredMonsters([]);
    }
  };

  useEffect(() => {
    fetchMonsters().then((monsters) => setMonsters(monsters));
    setLoadingMonsters(false);
  }, []);

  return (
    <div>
      <h1>Deepest Dungeon</h1>
      {loadingMonsters ? <p>Loading...</p> : null}
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
      <div>
        {filteredMonsters.length === 0 ? (
          <p>No monsters found</p>
        ) : (
          <p>Found monsters: {filteredMonsters.length}</p>
        )}
      </div>
    </div>
  );
}

export default App;
