import React from 'react';
import { Form } from 'react-bootstrap';

import '../styles/Inputs.css';

interface PlayerLevelInputProps {
  playerLevel: string;
  playerLevelInputChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PlayerLevelInput({
  playerLevel,
  playerLevelInputChanged,
}: PlayerLevelInputProps) {
  return (
    <Form.Group>
      <Form.Label htmlFor="player-level-input">Level</Form.Label>
      <Form.Control
        type="number"
        value={playerLevel}
        onChange={playerLevelInputChanged}
        id="player-level-input"
        data-testid="player-level-input"
        className="input-field"
      />
    </Form.Group>
  );
}
