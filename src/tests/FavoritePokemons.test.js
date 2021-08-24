import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import userEvent from '@testing-library/user-event';
import App from '../App';

test('If there is no pokemon, no pokemon message should be displayed', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const favoriteLinkEl = screen.getByRole('link', {
    name: /favorite pokémons/i,
  });
  userEvent.click(favoriteLinkEl);

  const textEl = screen.getByText('No favorite pokemon found');
  expect(textEl).toBeInTheDocument();
});

test('If there is a favorite pokemon it should be displayed', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
  expect(moreDetailsLink).toBeInTheDocument();

  // Clicou no more details
  userEvent.click(moreDetailsLink);
  const favoriteEl = screen.getByLabelText('Pokémon favoritado?');
  expect(favoriteEl).toBeInTheDocument();

  // clicou para favoritar
  userEvent.click(favoriteEl);

  // vai nos favoritos
  const favoriteLinkEl = screen.getByRole('link', {
    name: /favorite pokémons/i,
  });
  userEvent.click(favoriteLinkEl);

  // Pikachu deve estar lá
  const textEl = screen.getByText('Pikachu');
  expect(textEl).toBeInTheDocument();
});
