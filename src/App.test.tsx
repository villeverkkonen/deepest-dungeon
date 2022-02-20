import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import * as api from './utils/fetchMonsters';
import { testMonsters } from './utils/testMonsters';
import { playerCountOptions, playerLevelOptions } from './utils/InputValues';
import {
  challengeRatingConverted,
  Difficulty,
  Direction,
  Key,
  Monster,
  sortMonsters,
  Header,
} from './utils/Monster';

function playerCountInput() {
  return screen.getByTestId('player-count-input');
}

function playerLevelInput() {
  return screen.getByTestId('player-level-input');
}

function monsterInput() {
  return screen.getByTestId('monster-input');
}

function showAllMonstersBtn() {
  return screen.getByTestId('all-monsters-btn');
}

function clickShowAllMonstersBtn() {
  fireEvent.click(showAllMonstersBtn());
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
  return sortMonsters(
    testMonsters
      .map((monster) => monster)
      .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0)),
    { key: Key.NAME, direction: Direction.ASC }
  );
}

function sortedTestMonstersWithInput(inputValue: string) {
  return sortMonsters(
    testMonsters.filter((monster) =>
      monster.name.toLocaleLowerCase().includes(inputValue)
    ),
    { key: Key.NAME, direction: Direction.ASC }
  );
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

  if (sortBy === Key.NAME) {
    fireEvent.click(monstersTableHeaderName());
    if (sortOrder === Direction.ASC) {
      foundMonsters = sortMonsters(foundMonsters, {
        key: Key.NAME,
        direction: Direction.ASC,
      });
    } else {
      foundMonsters = sortMonsters(foundMonsters, {
        key: Key.NAME,
        direction: Direction.DESC,
      });
    }
  } else if (sortBy === Key.TYPE) {
    fireEvent.click(monstersTableHeaderType());
    if (sortOrder === Direction.ASC) {
      foundMonsters = sortMonsters(foundMonsters, {
        key: Key.TYPE,
        direction: Direction.ASC,
      });
    } else {
      foundMonsters = sortMonsters(foundMonsters, {
        key: Key.TYPE,
        direction: Direction.DESC,
      });
    }
  } else if (sortBy === Key.CHALLENGE_RATING) {
    fireEvent.click(monstersTableHeaderCr());
    if (sortOrder === Direction.ASC) {
      foundMonsters = sortMonsters(foundMonsters, {
        key: 'challenge_rating',
        direction: Direction.ASC,
      });
    } else {
      foundMonsters = sortMonsters(foundMonsters, {
        key: 'challenge_rating',
        direction: Direction.DESC,
      });
    }
  }

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
  });
}

function setPlayers(players: number) {
  fireEvent.change(screen.getByTestId('player-count-input'), {
    target: { value: players },
  });
}

function setLevel(level: number) {
  fireEvent.change(screen.getByTestId('player-level-input'), {
    target: { value: level },
  });
}

function addMonsters(monster: string, amount: number, index: number) {
  searchMonsters(monster);
  clickAddMonster(1);
  for (let i = 1; i < amount; i++) {
    clickAddEnemy(index);
  }
}

function checkDifficulty(difficulty: string) {
  expect(screen.getByTestId('difficulty-text')).toHaveTextContent(
    `Difficulty: ${difficulty}`
  );
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
  expect(input).toHaveAttribute(Key.TYPE, 'text');
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
  expect(monstersTableHeaderName()).toHaveTextContent(Header.NAME);
  expect(monstersTableHeaderType()).toHaveTextContent(Header.TYPE);
  expect(monstersTableHeaderCr()).toHaveTextContent(Header.CR);

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
  // Default is asc by name
  sortAndVerifyTableByHeader(Key.NAME, Direction.DESC);
  sortAndVerifyTableByHeader(Key.NAME, Direction.ASC);
});

test('should order monsters table by type', () => {
  sortAndVerifyTableByHeader(Key.TYPE, Direction.ASC);
  sortAndVerifyTableByHeader(Key.TYPE, Direction.DESC);
});

test('should order monsters table by challenge rating', () => {
  sortAndVerifyTableByHeader(Key.CHALLENGE_RATING, Direction.ASC);
  sortAndVerifyTableByHeader(Key.CHALLENGE_RATING, Direction.DESC);
});

test('should show order by direction in monsters table', () => {
  clickShowAllMonstersBtn();
  expect(screen.getByTestId('name-asc')).toBeInTheDocument();
  fireEvent.click(monstersTableHeaderName());
  expect(screen.getByTestId('name-desc')).toBeInTheDocument();

  fireEvent.click(monstersTableHeaderType());
  expect(screen.getByTestId('type-asc')).toBeInTheDocument();
  fireEvent.click(monstersTableHeaderType());
  expect(screen.getByTestId('type-desc')).toBeInTheDocument();

  fireEvent.click(monstersTableHeaderCr());
  expect(screen.getByTestId('challenge_rating-asc')).toBeInTheDocument();
  fireEvent.click(monstersTableHeaderCr());
  expect(screen.getByTestId('challenge_rating-desc')).toBeInTheDocument();
});

test('toggle show all monsters when clicked', () => {
  // Monsters table hidden at start
  expect(showAllMonstersBtn()).toBeInTheDocument();
  expect(screen.getByText('Show all monsters')).toBeInTheDocument();
  expect(screen.queryByTestId('monsters-table')).not.toBeInTheDocument();

  // Show all monsters sorted in table
  clickShowAllMonstersBtn();
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
  clickShowAllMonstersBtn();
  expect(screen.queryByTestId('monsters-table')).not.toBeInTheDocument();
});

test('should clear search input and show all monsters when clicked', () => {
  const input = monsterInput();
  searchMonsters('dr');
  expect(input).toHaveValue('dr');
  clickShowAllMonstersBtn();
  expect(input).toHaveValue('');
  expect(
    screen.getByTestId(`monster-name-${testMonsters.length}`)
  ).toBeInTheDocument();
});

test('should toggle show all monsters off when typing in search input', () => {
  clickShowAllMonstersBtn();
  expect(
    screen.getByTestId(`monster-name-${testMonsters.length}`)
  ).toBeInTheDocument();
  searchMonsters('x');
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

test('show all monsters, add and remove enemy, should still show all monsters', () => {
  clickShowAllMonstersBtn();
  clickAddMonster(testMonsters.length);
  clickRemoveEnemy(1);
  expect(screen.getByTestId(`monster-name-${testMonsters.length}`));
});

test('monsters table should not contain enemies when added enemy and searched again', () => {
  clickShowAllMonstersBtn();
  clickAddMonster(testMonsters.length);
  expect(
    screen.queryByTestId(`monster-name-${testMonsters.length}`)
  ).not.toBeInTheDocument();
});

test('should show difficulty title when enemies added', () => {
  expect(screen.queryByTestId('difficulty-text')).not.toBeInTheDocument();
  clickShowAllMonstersBtn();
  clickAddMonster(1);
  expect(screen.getByTestId('difficulty-text')).toHaveTextContent('Difficulty');
});

test('should show trivial difficulty with one monster', () => {
  setPlayers(1);
  setLevel(1);
  addMonsters('cat', 1, 1);
  checkDifficulty(Difficulty.TRIVIAL);
});

test('should show trivial difficulty with two monsters', () => {
  setPlayers(1);
  setLevel(2);
  addMonsters('cat', 1, 1);
  addMonsters('homunculus', 1, 2);
  checkDifficulty(Difficulty.TRIVIAL);
});

test('should show easy difficulty with one monster', () => {
  setPlayers(4);
  setLevel(2);
  addMonsters('goblin', 3, 1);
  checkDifficulty(Difficulty.EASY);
});

test('should show easy difficulty with two monsters', () => {
  setPlayers(3);
  setLevel(3);
  addMonsters('goblin', 1, 1);
  addMonsters('orc', 1, 2);
  checkDifficulty(Difficulty.EASY);
});

test('should show medium difficulty with one monster', () => {
  setPlayers(4);
  setLevel(2);
  addMonsters('goblin', 4, 1);
  checkDifficulty(Difficulty.MEDIUM);
});

test('should show medium difficulty with two monsters', () => {
  setPlayers(3);
  setLevel(3);
  addMonsters('goblin', 1, 1);
  addMonsters('orc', 2, 2);
  checkDifficulty(Difficulty.MEDIUM);
});

test('should show hard difficulty with one monster', () => {
  setPlayers(4);
  setLevel(2);
  addMonsters('goblin', 6, 1);
  checkDifficulty(Difficulty.HARD);
});

test('should show hard difficulty with two monsters', () => {
  setPlayers(3);
  setLevel(3);
  addMonsters('goblin', 3, 1);
  addMonsters('orc', 2, 2);
  checkDifficulty(Difficulty.HARD);
});

test('should show deadly difficulty with one monster', () => {
  setPlayers(4);
  setLevel(2);
  addMonsters('goblin', 7, 1);
  checkDifficulty(Difficulty.DEADLY);
});

test('should show deadly difficulty with two monsters', () => {
  setPlayers(3);
  setLevel(3);
  addMonsters('goblin', 3, 1);
  addMonsters('orc', 4, 2);
  checkDifficulty(Difficulty.DEADLY);
});

test('should show deadly with super high difficulty and 4x multiplier', () => {
  addMonsters('goblin', 15, 1);
  checkDifficulty(Difficulty.DEADLY);
});
