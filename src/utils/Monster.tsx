export interface Monster {
  readonly name: string;
  readonly type: string;
  readonly challenge_rating: string;
  readonly quantity: number;
}

export enum Header {
  NAME = 'Name',
  TYPE = 'Type',
  CR = 'CR',
  QTY = 'Qty',
}

export enum Difficulty {
  TRIVIAL = 'Trivial',
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard',
  DEADLY = 'Deadly',
}

export enum DifficultyColors {
  TRIVIAL = 'trivial-text',
  EASY = 'easy-text',
  MEDIUM = 'medium-text',
  HARD = 'hard-text',
  DEADLY = 'deadly-text',
}

export enum Key {
  NAME = 'name',
  TYPE = 'type',
  CHALLENGE_RATING = 'challenge_rating',
}

export enum Direction {
  ASC = 'asc',
  DESC = 'desc',
}

export interface SortConfig {
  key: string;
  direction: string;
}

export const sortMonsters = (
  monstersToSort: ReadonlyArray<Monster>,
  sortConfig: SortConfig
): ReadonlyArray<Monster> => {
  let sortedMonsters: Monster[] = [...monstersToSort];
  sortedMonsters.sort((a: Monster, b: Monster) => {
    if (
      a[sortConfig.key as keyof Monster] < b[sortConfig.key as keyof Monster]
    ) {
      return sortConfig.direction === Direction.ASC ? -1 : 1;
    }

    if (
      a[sortConfig.key as keyof Monster] > b[sortConfig.key as keyof Monster]
    ) {
      return sortConfig.direction === Direction.ASC ? 1 : -1;
    }

    if (a[Key.NAME] < b[Key.NAME]) {
      return -1;
    }

    if (a[Key.NAME] > b[Key.NAME]) {
      return 1;
    }

    return 0;
  });
  return sortedMonsters;
};

export function challengeRatingConverted(cr: string) {
  if (cr === '0.125') {
    return '1/8';
  }
  if (cr === '0.25') {
    return '1/4';
  }
  if (cr === '0.5') {
    return '1/2';
  }
  return cr;
}

export const monsterMultiplier = (enemiesCount: number) => {
  if (enemiesCount === 1) {
    return 1;
  }
  if (enemiesCount === 2) {
    return 1.5;
  }
  if (enemiesCount >= 3 && enemiesCount <= 6) {
    return 2;
  }
  if (enemiesCount >= 7 && enemiesCount <= 10) {
    return 2.5;
  }
  if (enemiesCount >= 11 && enemiesCount <= 14) {
    return 3;
  }
  return 4;
};

export const xpByCr: { [key: string]: number } = {
  '0': 10,
  '0.125': 25,
  '0.25': 50,
  '0.5': 100,
  '1': 200,
  '2': 450,
  '3': 700,
  '4': 1100,
  '5': 1800,
  '6': 2300,
  '7': 2900,
  '8': 3900,
  '9': 5000,
  '10': 5900,
  '11': 7200,
  '12': 8400,
  '13': 10000,
  '14': 11500,
  '15': 13000,
  '16': 15000,
  '17': 18000,
  '18': 20000,
  '19': 22000,
  '20': 25000,
  '21': 33000,
  '22': 41000,
  '23': 50000,
  '24': 62000,
  '25': 75000,
  '26': 90000,
  '27': 105000,
  '28': 120000,
  '29': 135000,
  '30': 155000,
};

export const xpThresholds: { [key: number]: { [key in Difficulty]: number } } =
  {
    1: {
      [Difficulty.TRIVIAL]: 0,
      [Difficulty.EASY]: 25,
      [Difficulty.MEDIUM]: 50,
      [Difficulty.HARD]: 75,
      [Difficulty.DEADLY]: 100,
    },
    2: {
      [Difficulty.TRIVIAL]: 0,
      [Difficulty.EASY]: 50,
      [Difficulty.MEDIUM]: 100,
      [Difficulty.HARD]: 150,
      [Difficulty.DEADLY]: 200,
    },
    3: {
      [Difficulty.TRIVIAL]: 0,
      [Difficulty.EASY]: 75,
      [Difficulty.MEDIUM]: 150,
      [Difficulty.HARD]: 225,
      [Difficulty.DEADLY]: 400,
    },
    4: {
      [Difficulty.TRIVIAL]: 0,
      [Difficulty.EASY]: 125,
      [Difficulty.MEDIUM]: 250,
      [Difficulty.HARD]: 375,
      [Difficulty.DEADLY]: 500,
    },
    5: {
      [Difficulty.TRIVIAL]: 0,
      [Difficulty.EASY]: 250,
      [Difficulty.MEDIUM]: 500,
      [Difficulty.HARD]: 750,
      [Difficulty.DEADLY]: 1100,
    },
    6: {
      [Difficulty.TRIVIAL]: 0,
      [Difficulty.EASY]: 300,
      [Difficulty.MEDIUM]: 600,
      [Difficulty.HARD]: 900,
      [Difficulty.DEADLY]: 1400,
    },
    7: {
      [Difficulty.TRIVIAL]: 0,
      [Difficulty.EASY]: 350,
      [Difficulty.MEDIUM]: 750,
      [Difficulty.HARD]: 1100,
      [Difficulty.DEADLY]: 1700,
    },
    8: {
      [Difficulty.TRIVIAL]: 0,
      [Difficulty.EASY]: 450,
      [Difficulty.MEDIUM]: 900,
      [Difficulty.HARD]: 1400,
      [Difficulty.DEADLY]: 2100,
    },
    9: {
      [Difficulty.TRIVIAL]: 0,
      [Difficulty.EASY]: 550,
      [Difficulty.MEDIUM]: 1100,
      [Difficulty.HARD]: 1600,
      [Difficulty.DEADLY]: 2400,
    },
    10: {
      [Difficulty.TRIVIAL]: 0,
      [Difficulty.EASY]: 600,
      [Difficulty.MEDIUM]: 1200,
      [Difficulty.HARD]: 1900,
      [Difficulty.DEADLY]: 2800,
    },
    11: {
      [Difficulty.TRIVIAL]: 0,
      [Difficulty.EASY]: 800,
      [Difficulty.MEDIUM]: 1600,
      [Difficulty.HARD]: 2400,
      [Difficulty.DEADLY]: 3600,
    },
    12: {
      [Difficulty.TRIVIAL]: 0,
      [Difficulty.EASY]: 1000,
      [Difficulty.MEDIUM]: 2000,
      [Difficulty.HARD]: 3000,
      [Difficulty.DEADLY]: 4500,
    },
    13: {
      [Difficulty.TRIVIAL]: 0,
      [Difficulty.EASY]: 1100,
      [Difficulty.MEDIUM]: 2200,
      [Difficulty.HARD]: 3400,
      [Difficulty.DEADLY]: 5100,
    },
    14: {
      [Difficulty.TRIVIAL]: 0,
      [Difficulty.EASY]: 1250,
      [Difficulty.MEDIUM]: 2500,
      [Difficulty.HARD]: 3800,
      [Difficulty.DEADLY]: 5700,
    },
    15: {
      [Difficulty.TRIVIAL]: 0,
      [Difficulty.EASY]: 1400,
      [Difficulty.MEDIUM]: 2800,
      [Difficulty.HARD]: 4300,
      [Difficulty.DEADLY]: 6400,
    },
    16: {
      [Difficulty.TRIVIAL]: 0,
      [Difficulty.EASY]: 1600,
      [Difficulty.MEDIUM]: 3200,
      [Difficulty.HARD]: 4800,
      [Difficulty.DEADLY]: 7200,
    },
    17: {
      [Difficulty.TRIVIAL]: 0,
      [Difficulty.EASY]: 2000,
      [Difficulty.MEDIUM]: 3900,
      [Difficulty.HARD]: 5900,
      [Difficulty.DEADLY]: 8800,
    },
    18: {
      [Difficulty.TRIVIAL]: 0,
      [Difficulty.EASY]: 2100,
      [Difficulty.MEDIUM]: 4200,
      [Difficulty.HARD]: 6300,
      [Difficulty.DEADLY]: 9500,
    },
    19: {
      [Difficulty.TRIVIAL]: 0,
      [Difficulty.EASY]: 2400,
      [Difficulty.MEDIUM]: 4900,
      [Difficulty.HARD]: 7300,
      [Difficulty.DEADLY]: 10900,
    },
    20: {
      [Difficulty.TRIVIAL]: 0,
      [Difficulty.EASY]: 2800,
      [Difficulty.MEDIUM]: 5700,
      [Difficulty.HARD]: 8500,
      [Difficulty.DEADLY]: 12700,
    },
  };
