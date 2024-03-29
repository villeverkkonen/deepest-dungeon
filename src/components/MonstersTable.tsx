import React, { useState, useMemo } from 'react';
import { Table } from 'react-bootstrap';
import {
  challengeRatingConverted,
  Direction,
  Header,
  Key,
  Monster,
  SortConfig,
  sortMonsters,
} from '../utils/Monster';

import '../styles/Monsters.css';

interface MonstersTableProps {
  monsters: ReadonlyArray<Monster>;
  monsterInput: string;
  addMonster: (monster: Monster) => void;
}

export default function MonstersTable({
  monsters,
  monsterInput,
  addMonster,
}: MonstersTableProps) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: Key.NAME,
    direction: Direction.ASC,
  });

  const sortedMonsters = useMemo(() => {
    return sortMonsters(monsters, sortConfig);
  }, [monsters, sortConfig]);

  const requestSort = (key: string) => {
    let direction = Direction.ASC;
    if (sortConfig.key === key && sortConfig.direction === Direction.ASC) {
      direction = Direction.DESC;
    }
    setSortConfig({ key, direction });
  };

  const getSortByDirectionImg = (key: string) => {
    if (sortConfig.key === key) {
      if (sortConfig.direction === Direction.ASC) {
        return (
          <img
            className="sort-by-img"
            data-testid={`${key}-asc`}
            src="/images/sort-by-asc.png"
          />
        );
      }
      return (
        <img
          className="sort-by-img"
          data-testid={`${key}-desc`}
          src="/images/sort-by-desc.png"
        />
      );
    }
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
                  onClick={() => requestSort(Key.NAME)}
                >
                  <div className="header">
                    {Header.NAME}
                    {getSortByDirectionImg(Key.NAME)}
                  </div>
                </th>
                <th
                  data-testid="monsters-table-header-type"
                  className="hoverable"
                  onClick={() => requestSort(Key.TYPE)}
                >
                  <div className="header">
                    {Header.TYPE}
                    {getSortByDirectionImg(Key.TYPE)}
                  </div>
                </th>
                <th
                  data-testid="monsters-table-header-cr"
                  className="hoverable"
                  onClick={() => requestSort(Key.CHALLENGE_RATING)}
                >
                  <div className="header">
                    {Header.CR}
                    {getSortByDirectionImg(Key.CHALLENGE_RATING)}
                  </div>
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
