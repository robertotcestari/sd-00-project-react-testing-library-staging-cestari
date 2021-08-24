import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';

import App from '../App';

test('Not found has the required elements', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <App />
    </Router>,
  );

  history.push('/this-page-does-not-exist');

  const pageNotFoundEl = screen.getByRole('heading', {
    name: /Page requested not found/i,
    level: 2,
  });

  const imageEl = screen
    .getByAltText('Pikachu crying because the page requested was not found');

  expect(imageEl.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  expect(pageNotFoundEl).toBeInTheDocument();
});
