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
            <th data-testid="monsters-table-header-name">Name</th>
            <th data-testid="monsters-table-header-cr">CR</th>
          </tr>
        </thead>
        <tbody>
          {monsters.map((monster, index) => {
            return (
              <tr>
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
  );
}
