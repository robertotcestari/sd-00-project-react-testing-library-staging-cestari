import React from 'react';
import { MemoryRouter, Router } from 'react-router';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';

test('It renders the card of the pokemon', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const pokemonNameEl = screen.getByTestId('pokemon-name'); // eslint-disable-line
  const pokemonTypeEl = screen.getByTestId('pokemon-type');
  const pokemonWeightEl = screen.getByTestId('pokemon-weight');
  const pokemonImgEl = screen.getByAltText(`${pokemons[0].name} sprite`);

  expect(pokemonNameEl.textContent).toBe(pokemons[0].name);
  expect(pokemonTypeEl.textContent).toBe(pokemons[0].type);
  expect(pokemonWeightEl.textContent)
    .toBe(
      'Average weight: '
      + `${pokemons[0].averageWeight.value} `
      + `${pokemons[0].averageWeight.measurementUnit}`,
    );

  expect(pokemonImgEl.src).toBe(pokemons[0].image);
});

test('It navigates to more details page and can be marked as favorite', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <App />
    </Router>,
  );

  // Clicar em mais detalhes
  const moreDetailsLinkEl = screen.getByRole('link', { name: /more details/i });
  userEvent.click(moreDetailsLinkEl);
  expect(history.location.pathname).toBe(`/pokemons/${pokemons[0].id}`);

  // Clicar em Favoritar
  const favoriteButtonEl = screen.getByLabelText('Pokémon favoritado?');
  userEvent.click(favoriteButtonEl);
  const starIconEl = screen.getByAltText(`${pokemons[0].name} is marked as favorite`);
  expect(starIconEl).toBeInTheDocument();
  expect(starIconEl.src).toMatch(/\/star-icon\.svg/);
});
