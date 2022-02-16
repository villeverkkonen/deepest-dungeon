import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import * as api from './utils/fetchMonsters';
import { testMonsters } from './utils/testMonsters';
import { playerCountOptions, playerLevelOptions } from './utils/InputValues';
import { challengeRatingConverted, Monster } from './utils/Monster';

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

function monstersTableHeaderType() {
  return screen.getByTestId('monsters-table-header-type');
}

function monstersTableHeaderCr() {
  return screen.getByTestId('monsters-table-header-cr');
}

function sortedTestMonsters() {
  return testMonsters
    .map((monster) => monster)
    .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
}

function sortedTestMonstersWithInput(inputValue: string) {
  return testMonsters
    .filter((monster) => monster.name.toLocaleLowerCase().includes(inputValue))
    .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
}

function clickAddMonster(index: number) {
  fireEvent.click(screen.getByTestId(`monster-add-btn-${index}`));
}

function clickAddEnemy(index: number) {
  fireEvent.click(screen.getByTestId(`enemy-add-btn-${index}`));
}

function clickRemoveEnemy(index: number) {
  fireEvent.click(screen.getByTestId(`enemy-remove-btn-${index}`));
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
    const monsterId = index + 1;
    expect(screen.getByTestId(`monster-name-${monsterId}`)).toHaveTextContent(
      monster.name
    );
    expect(screen.getByTestId(`monster-cr-${monsterId}`)).toHaveTextContent(
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

test('should show monsters with name, type, cr and button on table by search input', () => {
  const inputValue = 'test';
  const foundMonsters = sortedTestMonstersWithInput(inputValue);

  expect(screen.queryByTestId('monsters-table')).not.toBeInTheDocument();
  searchMonsters(inputValue);
  expect(
    screen.getByText(`Found monsters: ${foundMonsters.length}`)
  ).toBeInTheDocument();
  expect(monstersTableHeaderName()).toHaveTextContent('Name');
  expect(monstersTableHeaderType()).toHaveTextContent('Type');
  expect(monstersTableHeaderCr()).toHaveTextContent('CR');

  foundMonsters.forEach((monster, index) => {
    const monsterId = index + 1;
    expect(screen.getByTestId(`monster-name-${monsterId}`)).toHaveTextContent(
      monster.name
    );
    expect(screen.getByTestId(`monster-type-${monsterId}`)).toHaveTextContent(
      monster.type
    );
    expect(screen.getByTestId(`monster-cr-${monsterId}`)).toHaveTextContent(
      challengeRatingConverted(monster.challenge_rating)
    );
    expect(
      screen.getByTestId(`monster-add-btn-${monsterId}`)
    ).toHaveTextContent('+');
  });
});

test('should order monsters table by name', () => {
  sortAndVerifyTableByHeader('name', 'asc');
  sortAndVerifyTableByHeader('name', 'desc');
});

test('should order monsters table by type', () => {
  sortAndVerifyTableByHeader('type', 'asc');
  sortAndVerifyTableByHeader('type', 'desc');
});

test('should order monsters table by challenge rating', () => {
  sortAndVerifyTableByHeader('cr', 'asc');
  sortAndVerifyTableByHeader('cr', 'desc');
});

test('toggle show all monsters when clicked', () => {
  // Monsters table hidden at start
  expect(screen.getByTestId('all-monsters-btn')).toBeInTheDocument();
  expect(screen.getByText('Show all monsters')).toBeInTheDocument();
  expect(screen.queryByTestId('monsters-table')).not.toBeInTheDocument();

  // Show all monsters sorted in table
  fireEvent.click(screen.getByTestId('all-monsters-btn'));
  expect(screen.queryByTestId('monsters-table')).toBeInTheDocument();
  const allMonsters = sortedTestMonsters();
  allMonsters.forEach((monster, index) => {
    const monsterId = index + 1;
    expect(screen.getByTestId(`monster-name-${monsterId}`)).toHaveTextContent(
      monster.name
    );
    expect(screen.getByTestId(`monster-cr-${monsterId}`)).toHaveTextContent(
      challengeRatingConverted(monster.challenge_rating)
    );
  });

  // Monsters table hidden after second click
  fireEvent.click(screen.getByTestId('all-monsters-btn'));
  expect(screen.queryByTestId('monsters-table')).not.toBeInTheDocument();
});

test('should be able to add monsters as enemy and remove them', () => {
  expect(screen.queryByTestId('enemies-table')).not.toBeInTheDocument();
  const inputValue = 'test';
  let foundMonsters = sortedTestMonstersWithInput(inputValue);
  searchMonsters(inputValue);

  let monstersAdded = 0;
  let enemies: ReadonlyArray<Monster> = [];
  foundMonsters.forEach((monster, index) => {
    const indexPlusOne = index + 1;
    // Add every second monster
    if (indexPlusOne % 2 === 0) {
      const monsterId = indexPlusOne - monstersAdded;
      clickAddMonster(monsterId);
      enemies = [...enemies, monster];
      monstersAdded++;

      // Enemies table checks
      expect(screen.getByTestId('enemies-table')).toBeInTheDocument();
      expect(screen.getByText(`Enemies: ${monstersAdded}`)).toBeInTheDocument();
      expect(
        screen.getByTestId(`enemy-name-${monstersAdded}`)
      ).toHaveTextContent(monster.name);
      expect(
        screen.getByTestId(`enemy-type-${monstersAdded}`)
      ).toHaveTextContent(monster.type);
      expect(screen.getByTestId(`enemy-cr-${monstersAdded}`)).toHaveTextContent(
        challengeRatingConverted(monster.challenge_rating)
      );
      expect(
        screen.getByTestId(`enemy-qty-${monstersAdded}`)
      ).toHaveTextContent('1');
      expect(
        screen.getByTestId(`enemy-remove-btn-${monstersAdded}`)
      ).toHaveTextContent('-');

      // When added, should be removed from monsters table
      const lastMonsterId = foundMonsters.length - monstersAdded;
      if (monsterId < lastMonsterId) {
        expect(
          screen.getByTestId(`monster-name-${monsterId}`)
        ).not.toHaveTextContent(monster.name);
      } else {
        expect(
          screen.getByTestId(`monster-name-${lastMonsterId}`)
        ).not.toHaveTextContent(monster.name);
      }
    }
  });

  // Remove added enemies from monsters table
  foundMonsters = foundMonsters.filter((monster) => !enemies.includes(monster));

  let enemiesRemoved = 0;
  enemies.forEach((enemy, index) => {
    const enemyId = index + 1 - enemiesRemoved;
    clickRemoveEnemy(enemyId);
    enemiesRemoved++;
    const enemiesCount = monstersAdded - enemiesRemoved;

    // When removed last one whole enemies table should disappear
    if (enemiesCount === 0) {
      expect(screen.queryByText('Enemies:')).not.toBeInTheDocument();
      expect(screen.queryByTestId('enemies-table')).not.toBeInTheDocument();
    } else {
      expect(screen.getByText(`Enemies: ${enemiesCount}`)).toBeInTheDocument();
      expect(
        screen.queryByTestId(`enemy-name-${enemyId}`)
      ).not.toHaveTextContent(enemy.name);
    }

    // Removed enemy from enemy table goes back to monsters table
    foundMonsters = [...foundMonsters, enemy].sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    );
    const monsterIndex = foundMonsters.indexOf(enemy) + 1;
    expect(
      screen.getByTestId(`monster-name-${monsterIndex}`)
    ).toHaveTextContent(enemy.name);
  });
});

test('removed enemy from enemies table goes back to monsters table if search input still matches', () => {
  searchMonsters('test dragon');
  clickAddMonster(1);
  const secondInput = 'monster';
  searchMonsters(secondInput);
  const foundMonsters = sortedTestMonstersWithInput(secondInput);
  clickRemoveEnemy(1);

  // Monsters table should have only monsters by second search input
  foundMonsters.forEach((monster, index) => {
    const monsterId = index + 1;
    const monsterNameElement = screen.getByTestId(`monster-name-${monsterId}`);
    expect(monsterNameElement).toHaveTextContent(monster.name);
    expect(monsterNameElement).not.toHaveTextContent(secondInput);
  });
  // There should be no more rows than found by search input
  expect(
    screen.queryByTestId(`monster-name-${foundMonsters.length + 1}`)
  ).not.toBeInTheDocument();
});

test('should be able to add more than one of the same monster', () => {
  searchMonsters('test dragon');
  clickAddMonster(1);
  expect(screen.getByTestId('enemy-qty-1')).toHaveTextContent('1');

  clickAddEnemy(1);
  expect(screen.getByTestId('enemy-qty-1')).toHaveTextContent('2');

  for (let i = 0; i < 3; i++) {
    clickAddEnemy(1);
  }
  expect(screen.getByTestId('enemy-qty-1')).toHaveTextContent('5');
});

test('remove enemy from table when quantity goes to zero', () => {
  searchMonsters('test dragon');
  clickAddMonster(1);
  for (let i = 0; i < 3; i++) {
    clickAddEnemy(1);
  }
  expect(screen.getByTestId('enemy-qty-1')).toHaveTextContent('4');

  clickRemoveEnemy(1);
  expect(screen.getByTestId('enemy-qty-1')).toHaveTextContent('3');
  clickRemoveEnemy(1);
  expect(screen.getByTestId('enemy-qty-1')).toHaveTextContent('2');
  clickRemoveEnemy(1);
  expect(screen.getByTestId('enemy-qty-1')).toHaveTextContent('1');
  clickRemoveEnemy(1);
  expect(screen.queryByTestId('enemy-qty-1')).not.toBeInTheDocument();
});
