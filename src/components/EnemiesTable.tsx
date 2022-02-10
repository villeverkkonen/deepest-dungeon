import React from 'react';
import { Table } from 'react-bootstrap';
import { challengeRatingConverted, Monster } from '../utils/Monster';

import '../styles/Monsters.css';

interface EnemiesTableProps {
  enemies: ReadonlyArray<Monster>;
  addEnemy: (enemy: Monster) => void;
  removeEnemy: (enemy: Monster) => void;
}

export default function EnemiesTable({
  enemies,
  addEnemy,
  removeEnemy,
}: EnemiesTableProps) {
  if (enemies.length === 0) {
    return null;
  }

  return (
    <>
      <span>Enemies: {enemies.length}</span>
      <Table id="enemies-table" data-testid="enemies-table">
        <thead>
          <tr>
            <th data-testid="enemies-table-header-name">Name</th>
            <th data-testid="enemies-table-header-cr">CR</th>
            <th data-testid="enemies-table-header-qty">Qty</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {enemies.map((enemy, index) => {
            return (
              <tr
                key={`enemy-${index + 1}`}
                data-testid="enemies-table-body-row"
              >
                <td data-testid={`enemy-name-${index + 1}`}>{enemy.name}</td>
                <td data-testid={`enemy-cr-${index + 1}`}>
                  {challengeRatingConverted(enemy.challenge_rating)}
                </td>
                <td data-testid={`enemy-qty-${index + 1}`}>{enemy.quantity}</td>
                <td>
                  <div className="enemy-table-buttons">
                    <div className="enemy-table-add-btn">
                      <button
                        data-testid={`enemy-add-btn-${index + 1}`}
                        className="hoverable add-btn"
                        onClick={() => addEnemy(enemy)}
                      >
                        +
                      </button>
                    </div>
                    <div className="enemy-table-remove-btn">
                      <button
                        data-testid={`enemy-remove-btn-${index + 1}`}
                        className="hoverable remove-btn"
                        onClick={() => removeEnemy(enemy)}
                      >
                        -
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
