import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { MonsterType } from '../utils/MonsterType';
import Monster from './Monster';

import '../styles/Inputs.css';

interface MonstersListProps {
  monsters: ReadonlyArray<MonsterType>;
}

export default function MonstersList({ monsters }: MonstersListProps) {
  return (
    <ListGroup>
      {monsters.length === 0 ? (
        <p>No monsters found</p>
      ) : (
        <p>Found monsters: {monsters.length}</p>
      )}
      <div>
        {monsters.map((monster) => {
          return <Monster monster={monster} />;
        })}
      </div>
    </ListGroup>
  );
}
