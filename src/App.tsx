import React, { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import { fetchMonsters } from './utils/fetchMonsters';
import { MonsterType } from './utils/MonsterType';
import PlayerCountInput from './components/PlayerCountInput';
import PlayerLevelInput from './components/PlayerLevelInput';
import MonsterInput from './components/MonsterInput';
import MonstersList from './components/MonstersList';

import './App.css';

function App() {
  const [playerCount, setPlayerCount] = useState<string>('');
  const [playerLevel, setPlayerLevel] = useState<string>('');
  const [monsterInput, setMonsterInput] = useState<string>('');
  const [monsters, setMonsters] = useState<ReadonlyArray<MonsterType>>([]);
  const [filteredMonsters, setFilteredMonsters] = useState<
    ReadonlyArray<MonsterType>
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
    <Container className="deepest-dungeon">
      <Card>
        <Card.Header as="h1" className="page-title">
          Deepest Dungeon
        </Card.Header>
        {loadingMonsters ? (
          <p>Loading...</p>
        ) : (
          <Card.Body>
            <PlayerCountInput
              playerCount={playerCount}
              playerCountInputChanged={playerCountInputChanged}
            />
            <PlayerLevelInput
              playerLevel={playerLevel}
              playerLevelInputChanged={playerLevelInputChanged}
            />
            <MonsterInput
              monsterInput={monsterInput}
              monsterInputChanged={monsterInputChanged}
            />
            <MonstersList monsters={filteredMonsters} />
          </Card.Body>
        )}
      </Card>
    </Container>
  );
}

export default App;
