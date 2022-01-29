import React from 'react';
import { Form } from 'react-bootstrap';
import './App.css';

function App() {
  return (
    <div>
      <h1>Deepest Dungeon</h1>
      <div>
        <Form.Control
          type="text"
          placeholder="Player count"
          data-testid="player-count-input"
        />
      </div>
    </div>
  );
}

export default App;
