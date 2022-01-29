import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  render(<App />);
});

function playerCountInput() {
  return screen.getByTestId('player-count-input');
}

test('show page title', () => {
  expect(screen.getByText('Deepest Dungeon')).toBeInTheDocument();
});

test('has an input field for player count', () => {
  const input = playerCountInput();
  expect(input).toBeInTheDocument();
  expect(input).toHaveAttribute('placeholder', 'Player count');
});
