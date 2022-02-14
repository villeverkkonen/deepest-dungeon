import React from 'react';
import { Form } from 'react-bootstrap';

import '../styles/Inputs.css';

interface MonsterInputProps {
  monsterInput: string;
  monsterInputChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleShowAllMonsters: () => void;
}

export default function MonsterInput({
  monsterInput,
  monsterInputChanged,
  toggleShowAllMonsters,
}: MonsterInputProps) {
  return (
    <>
      <Form.Group>
        <Form.Control
          type="text"
          value={monsterInput}
          onChange={monsterInputChanged}
          placeholder="Search..."
          data-testid="monster-input"
          className="input-field"
        />
      </Form.Group>
      <Form.Group>
        <Form.Check
          type="checkbox"
          id="all-monsters-btn"
          data-testid="all-monsters-btn"
          label="Show all monsters"
          onClick={() => toggleShowAllMonsters()}
        />
      </Form.Group>
    </>
  );
}
