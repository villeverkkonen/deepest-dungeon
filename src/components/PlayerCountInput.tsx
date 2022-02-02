import React from 'react';
import { Form } from 'react-bootstrap';

import '../styles/Inputs.css';

interface PlayerCountInputProps {
  playerCount: string;
  playerCountInputChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PlayerCountInput({
  playerCount,
  playerCountInputChanged,
}: PlayerCountInputProps) {
  return (
    <Form.Group>
      <Form.Label htmlFor="player-count-input">Players</Form.Label>
      <Form.Control
        type="number"
        value={playerCount}
        onChange={playerCountInputChanged}
        id="player-count-input"
        data-testid="player-count-input"
        className="input-field"
      />
    </Form.Group>
  );
}
