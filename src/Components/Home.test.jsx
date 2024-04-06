import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './Home';

describe('Home Component', () => {
  test('renders welcome message', () => {
    render(<Home />);
    expect(screen.getByText(/Welcome to NOT JAG Bad Bank/i)).toBeInTheDocument();
  });

  test('renders the create account button', () => {
    render(<Home />);
    expect(screen.getByRole('link', { name: /create account/i })).toBeInTheDocument();
  });
});
