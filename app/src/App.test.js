import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders welcome message', () => {
  const { getByText } = render(<App />);
  const welcomeElement = getByText(/Welcome! Please enter you game info/i);
  expect(welcomeElement).toBeInTheDocument();
});
