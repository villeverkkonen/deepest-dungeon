import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import * as api from './utils/fetchMonsters';
import { testMonsters } from './utils/testMonsters';

function playerCountInput() {
  return screen.getByTestId('player-count-input');
}

function playerLevelInput() {
  return screen.getByTestId('player-level-input');
}

function monsterInput() {
  return screen.getByTestId('monster-input');
}

function expectNoMonstersFound() {
  expect(screen.getByText('No monsters found')).toBeInTheDocument();
}

beforeEach(async () => {
  const mock = jest.spyOn(api, 'fetchMonsters').mockResolvedValue(testMonsters);
  render(<App />);
  expect(mock).toHaveBeenCalledTimes(1);
  await waitFor(() => {
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });
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

test('monster input value changes to lowercase', () => {
  const input = monsterInput();
  fireEvent.change(input, { target: { value: 'Test Dragon' } });
  expect(input).toHaveValue('Test Dragon');
});

test('should display no monsters found when input length is less than two', () => {
  expectNoMonstersFound();
  fireEvent.change(monsterInput(), { target: { value: 'a' } });
  expectNoMonstersFound();
  expect(screen.queryByText('Found monsters')).not.toBeInTheDocument();
});

test('show monsters when monsters input length is two or more', () => {
  expectNoMonstersFound();
  fireEvent.change(monsterInput(), { target: { value: 'dr' } });
  expect(screen.queryByText('No monsters found')).not.toBeInTheDocument();
  expect(screen.getByText('Found monsters: 1')).toBeInTheDocument();
});

test('should list filtered monsters by input', () => {
  fireEvent.change(monsterInput(), { target: { value: 'test' } });
  expect(screen.getByText('Test Orc')).toBeInTheDocument();
  expect(screen.getByText('Test Dragon')).toBeInTheDocument();
  expect(screen.getByText('Found monsters: 2')).toBeInTheDocument();
});