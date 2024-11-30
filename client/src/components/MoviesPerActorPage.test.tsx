import React from 'react';
import { render, screen } from '@testing-library/react';
import { MoviesPerActorPage } from './MoviesPerActorPage';

test('renders Movies Per Actor page title', () => {
  render(<MoviesPerActorPage />);
  const titleElement = screen.getByText(/Movies Per Actor/i);
  expect(titleElement).toBeInTheDocument();
});
