import React from 'react';
import { Form } from 'react-bootstrap';
import { playerLevelOptions } from '../utils/InputValues';

import '../styles/Inputs.css';

interface PlayerLevelInputProps {
  playerLevel: string;
  playerLevelInputChanged: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function PlayerLevelInput({
  playerLevel,
  playerLevelInputChanged,
}: PlayerLevelInputProps) {
  return (
    <Form.Group>
      <Form.Label
        data-testid="player-level-input-label"
        htmlFor="player-level-input"
      >
        Level
      </Form.Label>
      <Form.Select
        value={playerLevel}
        onChange={playerLevelInputChanged}
        id="player-level-input"
        data-testid="player-level-input"
        className="input-field"
      >
        {playerLevelOptions.map((option) => {
          return (
            <option
              key={`player-level-${option}`}
              data-testid={`player-level-${option}`}
            >
              {option}
            </option>
          );
        })}
      </Form.Select>
    </Form.Group>
  );
}
