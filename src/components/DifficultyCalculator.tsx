import React from 'react';

interface DifficultyCalculatorProps {}

export default function Calculator({}: DifficultyCalculatorProps) {
  return (
    <div id="difficulty-text" data-testid="difficulty-text">
      Difficulty:
    </div>
  );
}
