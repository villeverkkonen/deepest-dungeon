import React, { useMemo } from 'react';
import {
  Difficulty,
  DifficultyColors,
  Monster,
  monsterMultiplier,
  xpByCr,
  xpThresholds,
} from '../utils/Monster';

interface DifficultyCalculatorProps {
  enemies: ReadonlyArray<Monster>;
  players: number;
  level: number;
}

export default function Calculator({
  enemies,
  players,
  level,
}: DifficultyCalculatorProps) {
  const totalXpOfMonsters = useMemo(() => {
    let xp = 0;
    let monstersCount = 0;
    enemies.forEach((enemy) => {
      xp += xpByCr[enemy.challenge_rating] * enemy.quantity;
      monstersCount += enemy.quantity;
    });
    // multiplier increases the more monsters there are
    return xp * monsterMultiplier(monstersCount);
  }, [enemies]);

  const playersXpThreshold = useMemo(() => {
    const easy = xpThresholds[level][Difficulty.EASY];
    const medium = xpThresholds[level][Difficulty.MEDIUM];
    const hard = xpThresholds[level][Difficulty.HARD];
    const deadly = xpThresholds[level][Difficulty.DEADLY];
    return {
      [Difficulty.EASY]: easy * players,
      [Difficulty.MEDIUM]: medium * players,
      [Difficulty.HARD]: hard * players,
      [Difficulty.DEADLY]: deadly * players,
    };
  }, [players, level]);

  const difficulty = useMemo(() => {
    if (
      totalXpOfMonsters >= playersXpThreshold[Difficulty.EASY] &&
      totalXpOfMonsters < playersXpThreshold[Difficulty.MEDIUM]
    ) {
      return Difficulty.EASY;
    }
    if (
      totalXpOfMonsters >= playersXpThreshold[Difficulty.MEDIUM] &&
      totalXpOfMonsters < playersXpThreshold[Difficulty.HARD]
    ) {
      return Difficulty.MEDIUM;
    }
    if (
      totalXpOfMonsters >= playersXpThreshold[Difficulty.HARD] &&
      totalXpOfMonsters < playersXpThreshold[Difficulty.DEADLY]
    ) {
      return Difficulty.HARD;
    }
    if (totalXpOfMonsters >= playersXpThreshold[Difficulty.DEADLY]) {
      return Difficulty.DEADLY;
    }
    return Difficulty.TRIVIAL;
  }, [playersXpThreshold, totalXpOfMonsters]);

  function getColorClass(difficulty: string) {
    switch (difficulty) {
      case Difficulty.EASY:
        return DifficultyColors.EASY;
      case Difficulty.MEDIUM:
        return DifficultyColors.MEDIUM;
      case Difficulty.HARD:
        return DifficultyColors.HARD;
      case Difficulty.DEADLY:
        return DifficultyColors.DEADLY;
      default:
        return DifficultyColors.TRIVIAL;
    }
  }

  return (
    <div id="difficulty-text" data-testid="difficulty-text">
      Difficulty:{' '}
      <span className={getColorClass(difficulty)}>{difficulty}</span>
    </div>
  );
}
