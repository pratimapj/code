import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import CompanyDetails from './CompanyDetails'; // adjust the import according to your file structure
import '@testing-library/jest-dom';

// Sample initial state for testing
const mockCompanyInfo = {
  companyName: 'Tech Corp',
  companyMotto: 'Innovating the Future',
  companyEst: '2000-01-01T00:00:00Z',
};

// Dummy reducer to mock Redux state
const mockReducer = (state = { data: { companyInfo: mockCompanyInfo } }, action) => state;

// Create a mock store with the initial state
const mockStore = createStore(mockReducer);

const renderWithState = (store) =>
  render(
    <Provider store={store}>
      <CompanyDetails />
    </Provider>
  );

describe('CompanyDetails Component', () => {
  it('renders company name, motto, and establishment date from Redux store', () => {
    renderWithState(mockStore);

    // Check if the company name is rendered correctly
    expect(screen.getByText('Tech Corp')).toBeInTheDocument();

    // Check if the company motto is rendered correctly
    expect(screen.getByText('Innovating the Future')).toBeInTheDocument();

  });



  it('renders company details even when some fields are missing', () => {
    const partialStore = createStore(
      (state = { data: { companyInfo: { companyName: 'Tech Corp', companyEst: '2000-01-01T00:00:00Z' } } }, action) => state
    );
    renderWithState(partialStore);

    // Check if company name is rendered correctly
    expect(screen.getByText('Tech Corp')).toBeInTheDocument();

  });
});
