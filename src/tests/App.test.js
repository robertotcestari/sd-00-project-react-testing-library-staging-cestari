import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router';
import { createMemoryHistory } from 'history';

import userEvent from '@testing-library/user-event';
import App from '../App';

test('Navbar has all the required items', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const linkElements = screen.getAllByRole('link');

  expect(linkElements[0].textContent).toBe('Home');
  expect(linkElements[1].textContent).toBe('About');
  expect(linkElements[2].textContent).toBe('Favorite Pokémons');
  expect(linkElements[3].textContent).toMatch(/more details/i);
});

test('Navigating through pages', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <App />
    </Router>,
  );

  const homeLinkEl = screen.getAllByRole('link')[0];
  userEvent.click(homeLinkEl);
  expect(screen.getByText('Encountered pokémons')).toBeInTheDocument();

  const aboutLinkEl = screen.getAllByRole('link')[1];
  userEvent.click(aboutLinkEl);
  expect(screen.getByText('About Pokédex')).toBeInTheDocument();

  const favoritesLinkEl = screen.getAllByRole('link')[2];
  userEvent.click(favoritesLinkEl);
  expect(screen.getByText('Favorite pokémons')).toBeInTheDocument();

  history.push('/does-not-exist');
  expect(screen.getByText('Page requested not found')).toBeInTheDocument();
});
