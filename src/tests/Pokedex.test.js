import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';

test('Pokedex Page renders title', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const favoriteLinkEl = screen.getByRole('heading', {
    name: /Encountered pokémons/i,
    level: 2,
  });
  expect(favoriteLinkEl).toBeInTheDocument();
});

test('next pokemon button work as expected', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const buttonNextEl = screen.getByRole('button', { name: 'Próximo pokémon' });
  expect(buttonNextEl).toBeInTheDocument();

  // Clica no botão X vezes até o fim da lista
  pokemons.forEach((pokemon) => {
    const nextPokemonText = screen.getByText(pokemon.name);
    expect(nextPokemonText).toBeInTheDocument();
    userEvent.click(buttonNextEl);
  });

  // Faz novamente o loop, para ver se continua funcionando
  // eslint-disable-next-line
  pokemons.forEach((pokemon) => {
    const nextPokemonText = screen.getByText(pokemon.name);
    expect(nextPokemonText).toBeInTheDocument();
    userEvent.click(buttonNextEl);
  });
});

test('filters work as expected', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  // Vamos primeiro ver os filtros únicos de data.js
  const filters = [...new Set(pokemons.map((pokemon) => pokemon.type))];

  // vamos ver se há todos os botões
  filters.forEach((filter) => {
    const buttonEl = screen.getByRole('button', { name: filter });
    expect(buttonEl).toBeInTheDocument();
    const buttonAll = screen.getByRole('button', { name: /all/i });
    expect(buttonAll).toBeInTheDocument();
  });

  const FilterButtons = screen.getAllByTestId('pokemon-type-button');
  expect(FilterButtons.length).toBe(filters.length);
});

test('filters loop only between expected pokemons', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  // se pegarmos o botão 'Fire' e o 'next pokemon'
  const fireFilterEl = screen.getByRole('button', { name: 'Fire' });
  const nextPokemonButtonEl = screen.getByRole('button', {
    name: 'Próximo pokémon',
  });

  expect(fireFilterEl).toBeInTheDocument();
  expect(nextPokemonButtonEl).toBeInTheDocument();

  userEvent.click(fireFilterEl);
  expect(screen.getByTestId('pokemon-name').textContent).toBe('Charmander'); // eslint-disable-line
  userEvent.click(nextPokemonButtonEl);
  expect(screen.getByTestId('pokemon-name').textContent).toBe('Rapidash');
  userEvent.click(nextPokemonButtonEl);
  expect(screen.getByTestId('pokemon-name').textContent).toBe('Charmander');
  userEvent.click(nextPokemonButtonEl);
  expect(screen.getByTestId('pokemon-name').textContent).toBe('Rapidash');

  // vamos clicar no All para ver se volta na lista inicial
  const allButtonEl = screen.getByRole('button', { name: 'All' });
  expect(allButtonEl).toBeInTheDocument();
  userEvent.click(allButtonEl);
  expect(screen.getByTestId('pokemon-name').textContent).toBe('Pikachu');
});
