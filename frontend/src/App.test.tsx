import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders page title', () => {
  const { getByText } = render(<App />);
  expect(getByText('Deepest Dungeon')).toBeInTheDocument();
});
