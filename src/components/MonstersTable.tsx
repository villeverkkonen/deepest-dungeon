import React from 'react';
import { Table } from 'react-bootstrap';
import { MonsterType } from '../utils/MonsterType';

import '../styles/Monsters.css';

interface MonstersTableProps {
  monsters: ReadonlyArray<MonsterType>;
}

export default function MonstersTable({ monsters }: MonstersTableProps) {
  return (
    <>
      {monsters.length === 0 ? (
        <span>No monsters found</span>
      ) : (
        <span>Found monsters: {monsters.length}</span>
      )}

      <Table id="monsters-table">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {monsters.map((monster) => {
            return (
              <tr>
                <td>{monster.name}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
