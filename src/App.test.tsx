import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import * as api from './utils/fetchMonsters';
import { testMonsters } from './utils/testMonsters';
import { playerCountOptions, playerLevelOptions } from './utils/InputValues';

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
  expect(screen.getByTestId('page-title')).toHaveTextContent('Deepest Dungeon');
});

test('has a select input for player count with options', () => {
  const input = playerCountInput();
  expect(input).toBeInTheDocument();
  expect(screen.getByTestId('player-count-input-label')).toHaveTextContent(
    'Players'
  );
  playerCountOptions.forEach((option) => {
    expect(screen.getByTestId(`player-count-${option}`)).toHaveValue(option);
  });
});

test('player count input value changes', () => {
  const input = playerCountInput();
  fireEvent.change(input, { target: { value: '4' } });
  expect(input).toHaveValue('4');
});

test('has a select input for players level with options', () => {
  const input = playerLevelInput();
  expect(input).toBeInTheDocument();
  expect(screen.getByTestId('player-level-input-label')).toHaveTextContent(
    'Level'
  );
  playerLevelOptions.forEach((option) => {
    expect(screen.getByTestId(`player-level-${option}`)).toHaveValue(option);
  });
});

test('player level input value changes', () => {
  const input = playerLevelInput();
  fireEvent.change(input, { target: { value: '8' } });
  expect(input).toHaveValue('8');
});

test('has a text input for monsters', () => {
  const input = monsterInput();
  expect(input).toBeInTheDocument();
  expect(input).toHaveAttribute('type', 'text');
  expect(input).toHaveAttribute('placeholder', 'Search...');
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
  expect(screen.getByText('Found monsters: 2')).toBeInTheDocument();
  expect(screen.getByText('Test Orc')).toBeInTheDocument();
  expect(screen.getByText('Test Dragon')).toBeInTheDocument();
});
