import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { challengeRatingConverted, Monster } from '../utils/Monster';

import '../styles/Monsters.css';

interface EnemiesTableProps {
  enemies: ReadonlyArray<Monster>;
}

interface SortConfig {
  key: string;
  direction: string;
}

export default function EnemiesTable({ enemies }: EnemiesTableProps) {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const requestSort = (key: string) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  if (enemies.length === 0) {
    return null;
  }

  return (
    <Table id="enemies-table" data-testid="enemies-table">
      <thead>
        <tr>
          <th
            data-testid="enemies-table-header-name"
            className="hoverable"
            onClick={() => requestSort('name')}
          >
            Name
          </th>
          <th
            data-testid="enemies-table-header-cr"
            className="hoverable"
            onClick={() => requestSort('challenge_rating')}
          >
            CR
          </th>
          <th />
        </tr>
      </thead>
      <tbody>
        {enemies.map((enemy, index) => {
          return (
            <tr key={`enemy-${index + 1}`} data-testid="enemies-table-body-row">
              <td data-testid={`enemy-name-${index + 1}`}>{enemy.name}</td>
              <td data-testid={`enemy-cr-${index + 1}`}>
                {challengeRatingConverted(enemy.challenge_rating)}
              </td>
              <td>
                <button
                  data-testid={`enemy-remove-btn-${index + 1}`}
                  className="hoverable"
                >
                  -
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
