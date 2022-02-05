import React from 'react';
import { Form } from 'react-bootstrap';
import { playerCountOptions } from '../utils/InputValues';

import '../styles/Inputs.css';

interface PlayerCountInputProps {
  playerCount: string;
  playerCountInputChanged: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function PlayerCountInput({
  playerCount,
  playerCountInputChanged,
}: PlayerCountInputProps) {
  return (
    <Form.Group>
      <Form.Label
        data-testid="player-count-input-label"
        htmlFor="player-count-input"
      >
        Players
      </Form.Label>
      <Form.Select
        value={playerCount}
        onChange={playerCountInputChanged}
        id="player-count-input"
        data-testid="player-count-input"
        className="input-field"
      >
        {playerCountOptions.map((option) => {
          return (
            <option
              key={`player-count-${option}`}
              data-testid={`player-count-${option}`}
            >
              {option}
            </option>
          );
        })}
      </Form.Select>
    </Form.Group>
  );
}
