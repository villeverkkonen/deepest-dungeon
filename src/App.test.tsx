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

function expectNotNoMonstersFound() {
  expect(screen.queryByText('No monsters found')).not.toBeInTheDocument();
}

function searchMonsters(input: string) {
  fireEvent.change(monsterInput(), { target: { value: input } });
}

function monstersTableHeaderName() {
  return screen.getByTestId('monsters-table-header-name');
}

function monstersTableHeaderCr() {
  return screen.getByTestId('monsters-table-header-cr');
}

function sortedTestMonstersWithInput(inputValue: string) {
  return testMonsters
    .filter((monster) => monster.name.toLocaleLowerCase().includes(inputValue))
    .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
}

function challengeRatingConverted(cr: string) {
  if (cr === '0.25') {
    return '1/4';
  }
  if (cr === '0.5') {
    return '1/2';
  }
  return cr;
}

function sortAndVerifyTableByHeader(sortBy: string, sortOrder: string) {
  const inputValue = 'test';
  let foundMonsters = sortedTestMonstersWithInput(inputValue);

  searchMonsters(inputValue);
  expect(monstersTableHeaderName()).toBeInTheDocument();

  if (sortBy === 'name') {
    fireEvent.click(monstersTableHeaderName());
    foundMonsters.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
      }
      return a.name > b.name ? -1 : b.name > a.name ? 1 : 0;
    });
  } else if (sortBy === 'cr') {
    fireEvent.click(monstersTableHeaderCr());
    foundMonsters.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.challenge_rating > b.challenge_rating
          ? 1
          : b.challenge_rating > a.challenge_rating
          ? -1
          : 0;
      }
      return a.challenge_rating > b.challenge_rating
        ? -1
        : b.challenge_rating > a.challenge_rating
        ? 1
        : 0;
    });
  }

  foundMonsters.forEach((monster, index) => {
    expect(screen.getByTestId(`monster-name-${index + 1}`)).toHaveTextContent(
      monster.name
    );
    expect(screen.getByTestId(`monster-cr-${index + 1}`)).toHaveTextContent(
      challengeRatingConverted(monster.challenge_rating)
    );
  });
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

test('no monsters found when input length is two or more and no matches', () => {
  expectNotNoMonstersFound();
  searchMonsters('a');
  expectNotNoMonstersFound();
  searchMonsters('zx');
  expectNoMonstersFound();
});

test('show monsters when monsters input length is two or more', () => {
  expectNotNoMonstersFound();
  searchMonsters('dr');
  expectNotNoMonstersFound();
  expect(screen.getByText('Found monsters: 1')).toBeInTheDocument();
});

test('should show monsters with name, cr and button on table by search input', () => {
  const inputValue = 'test';
  const foundMonsters = sortedTestMonstersWithInput(inputValue);

  expect(screen.queryByTestId('monsters-table')).not.toBeInTheDocument();
  searchMonsters(inputValue);
  expect(
    screen.getByText(`Found monsters: ${foundMonsters.length}`)
  ).toBeInTheDocument();
  expect(monstersTableHeaderName()).toHaveTextContent('Name');
  expect(monstersTableHeaderCr()).toHaveTextContent('CR');

  foundMonsters.forEach((monster, index) => {
    expect(screen.getByTestId(`monster-name-${index + 1}`)).toHaveTextContent(
      monster.name
    );
    expect(screen.getByTestId(`monster-cr-${index + 1}`)).toHaveTextContent(
      challengeRatingConverted(monster.challenge_rating)
    );
  });
});

test('should order monsters table by name', () => {
  sortAndVerifyTableByHeader('name', 'asc');
  sortAndVerifyTableByHeader('name', 'desc');
});

test('should order monsters table by challenge rating', () => {
  sortAndVerifyTableByHeader('cr', 'asc');
  sortAndVerifyTableByHeader('cr', 'desc');
});
