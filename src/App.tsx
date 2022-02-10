import React, { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import { fetchMonsters } from './utils/fetchMonsters';
import { Monster } from './utils/Monster';
import PlayerCountInput from './components/PlayerCountInput';
import PlayerLevelInput from './components/PlayerLevelInput';
import MonsterInput from './components/MonsterInput';
import MonstersTable from './components/MonstersTable';
import EnemiesTable from './components/EnemiesTable';

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
  const [enemies, setEnemies] = useState<ReadonlyArray<Monster>>([]);

  const playerCountInputChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPlayerCount(e.target.value);
  };

  const playerLevelInputChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
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

  function updateEnemyQuantityByOne(enemy: Monster, value: number): Monster {
    const enemiesList = [...enemies];
    let updatedEnemy: Monster = enemies.filter(
      (en) => en.name === enemy.name
    )[0];
    const enemyIndex = enemiesList.indexOf(updatedEnemy);
    updatedEnemy = { ...updatedEnemy, quantity: updatedEnemy.quantity + value };
    enemiesList[enemyIndex] = updatedEnemy;
    setEnemies(enemiesList);

    return updatedEnemy;
  }

  const addMonster = (monster: Monster) => {
    monster = { ...monster, quantity: monster.quantity + 1 };
    setFilteredMonsters(
      filteredMonsters.filter((mon) => mon.name !== monster.name)
    );
    setEnemies([...enemies, monster]);
  };

  const addEnemy = (enemy: Monster) => {
    updateEnemyQuantityByOne(enemy, 1);
  };

  const removeEnemy = (enemy: Monster) => {
    const updatedEnemy = updateEnemyQuantityByOne(enemy, -1);
    if (updatedEnemy.quantity === 0) {
      // Add removed enemy back to monsters table
      // if it still matches the search input
      if (
        updatedEnemy.name.toLowerCase().includes(monsterInput.toLowerCase())
      ) {
        setFilteredMonsters([...filteredMonsters, updatedEnemy]);
      }
      setEnemies(enemies.filter((en) => en.name !== updatedEnemy.name));
    }
  };

  useEffect(() => {
    const fetch = async () => {
      await fetchMonsters().then((monsters) => setMonsters(monsters));
      setLoadingMonsters(false);
    };
    fetch();
  }, []);

  return (
    <Container className="app">
      <Card>
        <Card.Header as="h1" className="page-title" data-testid="page-title">
          Deepest Dungeon
        </Card.Header>
        {loadingMonsters ? (
          <p>Loading...</p>
        ) : (
          <Card.Body>
            <div className="inputs">
              <div className="dropdown-inputs">
                <PlayerCountInput
                  playerCount={playerCount}
                  playerCountInputChanged={playerCountInputChanged}
                />
                <PlayerLevelInput
                  playerLevel={playerLevel}
                  playerLevelInputChanged={playerLevelInputChanged}
                />
              </div>
              <MonsterInput
                monsterInput={monsterInput}
                monsterInputChanged={monsterInputChanged}
              />
            </div>
            <EnemiesTable
              enemies={enemies}
              addEnemy={addEnemy}
              removeEnemy={removeEnemy}
            />
            <MonstersTable
              monsters={filteredMonsters}
              monsterInput={monsterInput}
              addMonster={addMonster}
            />
          </Card.Body>
        )}
      </Card>
    </Container>
  );
}

export default App;
