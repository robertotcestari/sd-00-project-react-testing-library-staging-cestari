import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';

import App from '../App';

test('Page contains infos about pokedex', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <App />
    </Router>,
  );

  history.push('about');
  const headingEl = screen.getByRole('heading', {
    level: 2,
    name: 'About Pokédex',
  });
  expect(headingEl).toBeInTheDocument();

  const imageEl = screen.getByAltText('Pokédex');
  expect(imageEl).toBeInTheDocument();
  expect(imageEl.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
