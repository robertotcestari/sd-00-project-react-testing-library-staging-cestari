import React from 'react';
import { MemoryRouter } from 'react-router';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';

test('It renders the details', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  let moreDetailsLinkEl = screen.getByRole('link', { name: /more details/i });

  // click more details
  userEvent.click(moreDetailsLinkEl);
  const pokemonNameEl = screen.getByText(`${pokemons[0].name} Details`);
  moreDetailsLinkEl = screen.queryByRole('link', {
    name: /more details/i,
  });
  expect(moreDetailsLinkEl).not.toBeInTheDocument();
  expect(pokemonNameEl).toBeInTheDocument();

  const summaryTextEl = screen.getByRole('heading', {
    level: 2,
    name: 'Summary',
  });
  expect(summaryTextEl).toBeInTheDocument();

  const paragraphEl = screen.getByText(pokemons[0].summary);
  expect(paragraphEl).toBeInTheDocument();
});

test('It renders game locations', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  // click more details
  const moreDetailsLinkEl = screen.getByRole('link', { name: /more details/i });
  userEvent.click(moreDetailsLinkEl);

  const pokemonNameEl = screen.getByText(`${pokemons[0].name} Details`);
  const gameLocationEl = screen.queryByRole('heading', {
    level: 2,
    name: `Game Locations of ${pokemons[0].name}`,
  });
  expect(gameLocationEl).toBeInTheDocument();
  expect(pokemonNameEl).toBeInTheDocument();

  pokemons[0].foundAt.forEach(({ location }) => {
    const locationTextEl = screen.getByText(location);
    expect(locationTextEl).toBeInTheDocument();
  });

  // renders images
  const locationImgs = screen.getAllByAltText(`${pokemons[0].name} location`);
  expect(locationImgs.length).toBe(pokemons[0].foundAt.length);

  locationImgs.forEach((image, index) => {
    console.log(image.src);
    expect(image.src).toBe(pokemons[0].foundAt[index].map);
  });

  // favorite Pokemon
  const favoriteButtonEl = screen.getByLabelText('Pokémon favoritado?');
  userEvent.click(favoriteButtonEl);
  const starIconEl = screen.getByAltText(`${pokemons[0].name} is marked as favorite`);
  expect(starIconEl).toBeInTheDocument();
});
