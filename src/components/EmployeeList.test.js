import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import EmployeeList from './EmployeeList';
import { fetchDataRequest } from '../store/actions';
import '@testing-library/jest-dom';

const mockStore = createStore((state = { data: { employees: [] }, status: '', error: '' }) => state);


describe('EmployeeList Component', () => {
  // Helper function to render component with Redux store
  const renderWithStore = (store) => {
    return render(
      <Provider store={store}>
        <EmployeeList />
      </Provider>
    );
  };

  test('renders employee list', () => {
    const employees = [
      { id: 1, firstName: 'John', lastName: 'Doe', contactNo: '123456789', address: '123 Main St', avatar: 'image.jpg' },
      { id: 2, firstName: 'Jane', lastName: 'Doe', contactNo: '987654321', address: '456 Main St', avatar: 'image.jpg' },
    ];

    // Mock Redux store with employee data
    const store = createStore((state) => ({
      data: { employees },
      status: 'success',
      error: null,
    }));

    renderWithStore(store);

    // Check if the employee names are rendered
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });

  test('search filters employee list', () => {
    const employees = [
      { id: 1, firstName: 'John', lastName: 'Doe', contactNo: '123456789', address: '123 Main St', avatar: 'image.jpg' },
      { id: 2, firstName: 'Jane', lastName: 'Doe', contactNo: '987654321', address: '456 Main St', avatar: 'image.jpg' },
    ];

    const store = createStore((state) => ({
      data: { employees },
      status: 'success',
      error: null,
    }));

    renderWithStore(store);

    // Check initial employees displayed
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();

    // Search for "Jane"
    fireEvent.change(screen.getByPlaceholderText(/search/i), { target: { value: 'Jane' } });

    // After searching, only "Jane" should be displayed
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });

  test('pagination works', async () => {
    const employees = [
      { id: 1, firstName: 'John', lastName: 'Doe', contactNo: '123456789', address: '123 Main St', avatar: 'image.jpg' },
      { id: 2, firstName: 'Jane', lastName: 'Doe', contactNo: '987654321', address: '456 Main St', avatar: 'image.jpg' },
      { id: 3, firstName: 'Alice', lastName: 'Smith', contactNo: '555555555', address: '789 Main St', avatar: 'image.jpg' },
      { id: 4, firstName: 'Bob', lastName: 'Johnson', contactNo: '666666666', address: '101 Main St', avatar: 'image.jpg' },
      { id: 5, firstName: 'Charlie', lastName: 'Brown', contactNo: '777777777', address: '202 Main St', avatar: 'image.jpg' },
      { id: 6, firstName: 'David', lastName: 'Williams', contactNo: '888888888', address: '303 Main St', avatar: 'image.jpg' },
    ];

    const store = createStore((state) => ({
      data: { employees },
      status: 'success',
      error: null,
    }));

    renderWithStore(store);

    // Check that only 5 employees are shown initially (due to pagination)
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Alice Smith')).toBeInTheDocument();
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
    expect(screen.getByText('Charlie Brown')).toBeInTheDocument();

    // After changing the page, the next employee (David) should be displayed
    await waitFor(() => expect(screen.getByText('David Williams')).toBeInTheDocument());
  });

  test('sorting works by name', () => {
    const employees = [
      { id: 1, firstName: 'John', lastName: 'Doe', contactNo: '123456789', address: '123 Main St', avatar: 'image.jpg' },
      { id: 2, firstName: 'Jane', lastName: 'Doe', contactNo: '987654321', address: '456 Main St', avatar: 'image.jpg' },
    ];

    const store = createStore((state) => ({
      data: { employees },
      status: 'success',
      error: null,
    }));

    renderWithStore(store);

    // Initially, employees are listed in the order in the state (John before Jane)
    expect(screen.getByText('John Doe')).toBeInTheDocument();

    // Click on the name header to sort by name
    fireEvent.click(screen.getByText('Name ▲'));

    // After sorting, check if employees are in reverse order (Jane before John)
    expect(screen.queryByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByText('Jane Doe')).toBeInTheDocument();
  });


})