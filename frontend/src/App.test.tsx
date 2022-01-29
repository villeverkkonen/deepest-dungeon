import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

function playerCountInput() {
  return screen.getByTestId('player-count-input');
}

beforeEach(() => {
  render(<App />);
});

test('show page title', () => {
  expect(screen.getByText('Deepest Dungeon')).toBeInTheDocument();
});

test('has a number input field for player count', () => {
  const input = playerCountInput();
  expect(input).toBeInTheDocument();
  expect(input).toHaveAttribute('type', 'number');
  expect(input).toHaveAttribute('placeholder', 'Player count');
});

test('player count input value changes', () => {
  const input = playerCountInput();
  fireEvent.change(input, { target: { value: 4 } });
  expect(input).toHaveValue(4);
});

test('player count input does not accept other than number input', () => {
  const input = playerCountInput();
  const originalInputValue = input.nodeValue;
  fireEvent.change(input, { target: { value: 'text' } });
  expect(input).toHaveValue(originalInputValue);
});
