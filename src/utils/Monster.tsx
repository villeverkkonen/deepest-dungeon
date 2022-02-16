export interface Monster {
  readonly name: string;
  readonly type: string;
  readonly challenge_rating: string;
  readonly quantity: number;
}

export function challengeRatingConverted(cr: string) {
  if (cr === '0.25') {
    return '1/4';
  }
  if (cr === '0.5') {
    return '1/2';
  }
  return cr;
}
