import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CompanyDetails from './CompanyDetails';
import '@testing-library/jest-dom';

describe('CompanyDetails', () => {
test('renders learn react link', () => {
  render(<CompanyDetails />);
  const linkElement = screen.getByText(/since/i);
  expect(linkElement).toBeInTheDocument();
});

});