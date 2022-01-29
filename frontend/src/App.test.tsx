import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

function playerCountInput() {
  return screen.getByTestId('player-count-input');
}

function playerLevelInput() {
  return screen.getByTestId('player-level-input');
}

function monsterInput() {
  return screen.getByTestId('monster-input');
}

beforeEach(() => {
  render(<App />);
});

test('show page title', () => {
  expect(screen.getByText('Deepest Dungeon')).toBeInTheDocument();
});

test('has a number input for player count', () => {
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

test('has a number input for player level', () => {
  const input = playerLevelInput();
  expect(input).toBeInTheDocument();
  expect(input).toHaveAttribute('type', 'number');
  expect(input).toHaveAttribute('placeholder', 'Player level');
});

test('player level input value changes', () => {
  const input = playerLevelInput();
  fireEvent.change(input, { target: { value: 8 } });
  expect(input).toHaveValue(8);
});

test('has a text input for monsters', () => {
  const input = monsterInput();
  expect(input).toBeInTheDocument();
  expect(input).toHaveAttribute('type', 'text');
  expect(input).toHaveAttribute('placeholder', 'Monster search');
});

test('monster input value changes', () => {
  const input = monsterInput();
  fireEvent.change(input, { target: { value: 'Black Dragon' } });
  expect(input).toHaveValue('Black Dragon');
});
