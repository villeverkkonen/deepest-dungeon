import React from 'react';
import { MonsterType } from '../utils/MonsterType';

interface MonsterProps {
  monster: MonsterType;
}

export default function Monster({ monster }: MonsterProps) {
  return <p>{monster.name}</p>;
}
