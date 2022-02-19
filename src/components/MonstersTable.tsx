import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { challengeRatingConverted, Monster } from '../utils/Monster';

import '../styles/Monsters.css';

interface MonstersTableProps {
  monsters: ReadonlyArray<Monster>;
  monsterInput: string;
  addMonster: (monster: Monster) => void;
}

interface SortConfig {
  key: string;
  direction: string;
}

const sortMonsters = (
  monstersToSort: ReadonlyArray<Monster>,
  sortConfig: SortConfig | null
) => {
  let sortedMonsters: Monster[] = [...monstersToSort];
  sortedMonsters.sort((a: Monster, b: Monster) => {
    if (sortConfig === null) {
      return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
    }
    if (
      a[sortConfig.key as keyof Monster] < b[sortConfig.key as keyof Monster]
    ) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (
      a[sortConfig.key as keyof Monster] > b[sortConfig.key as keyof Monster]
    ) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });
  return sortedMonsters;
};

export default function MonstersTable({
  monsters,
  monsterInput,
  addMonster,
}: MonstersTableProps) {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const sortedMonsters = sortMonsters(monsters, sortConfig);

  const requestSort = (key: string) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <>
      {sortedMonsters.length === 0 ? (
        monsterInput.length > 1 ? (
          <span>No monsters found</span>
        ) : null
      ) : (
        <>
          <span>Found monsters: {sortedMonsters.length}</span>

          <Table id="monsters-table" data-testid="monsters-table">
            <thead>
              <tr>
                <th
                  data-testid="monsters-table-header-name"
                  className="hoverable"
                  onClick={() => requestSort('name')}
                >
                  Name
                </th>
                <th
                  data-testid="monsters-table-header-type"
                  className="hoverable"
                  onClick={() => requestSort('type')}
                >
                  Type
                </th>
                <th
                  data-testid="monsters-table-header-cr"
                  className="hoverable"
                  onClick={() => requestSort('challenge_rating')}
                >
                  CR
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {sortedMonsters.map((monster, index) => {
                return (
                  <tr
                    key={`monster-${index + 1}`}
                    data-testid="monsters-table-body-row"
                  >
                    <td data-testid={`monster-name-${index + 1}`}>
                      {monster.name}
                    </td>
                    <td data-testid={`monster-type-${index + 1}`}>
                      {monster.type}
                    </td>
                    <td data-testid={`monster-cr-${index + 1}`}>
                      {challengeRatingConverted(monster.challenge_rating)}
                    </td>
                    <td>
                      <button
                        data-testid={`monster-add-btn-${index + 1}`}
                        className="hoverable add-btn"
                        onClick={() => addMonster(monster)}
                      >
                        +
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
}
