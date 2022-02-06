import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { MonsterType } from '../utils/MonsterType';

import '../styles/Monsters.css';

interface MonstersTableProps {
  monsters: ReadonlyArray<MonsterType>;
  monsterInput: string;
}

interface SortConfig {
  key: string;
  direction: string;
}

const sortMonsters = (
  monsters: ReadonlyArray<MonsterType>,
  sortConfig: SortConfig | null
) => {
  let sortedMonsters: MonsterType[] = [...monsters];
  sortedMonsters.sort((a: MonsterType, b: MonsterType) => {
    console.log(sortConfig);
    if (sortConfig === null) {
      return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
    }
    if (
      a[sortConfig.key as keyof MonsterType] <
      b[sortConfig.key as keyof MonsterType]
    ) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (
      a[sortConfig.key as keyof MonsterType] >
      b[sortConfig.key as keyof MonsterType]
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
      {monsterInput.length > 1 ? (
        monsters.length === 0 ? (
          <span>No monsters found</span>
        ) : (
          <>
            <span>Found monsters: {monsters.length}</span>

            <Table id="monsters-table" data-testid="monsters-table">
              <thead>
                <tr>
                  <th
                    data-testid="monsters-table-header-name"
                    onClick={() => requestSort('name')}
                  >
                    Name
                  </th>
                  <th
                    data-testid="monsters-table-header-cr"
                    onClick={() => requestSort('challenge_rating')}
                  >
                    CR
                  </th>
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
                      <td data-testid={`monster-cr-${index + 1}`}>
                        {monster.challenge_rating}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </>
        )
      ) : null}
    </>
  );
}
