import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination'; // adjust the path as necessary
import '@testing-library/jest-dom';

describe('Pagination component', () => {

  const mockOnPageChange = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the pagination buttons correctly for a given totalPages and currentPage', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />);

    // Check if all page buttons are rendered
    for (let i = 1; i <= 5; i++) {
      expect(screen.getByText(i)).toBeInTheDocument();
    }

    // Check Prev and Next buttons
    expect(screen.getByText('Prev')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('should disable the Prev button on the first page', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />);

    // Prev button should be disabled
    expect(screen.getByText('Prev')).toBeDisabled();
  });

  it('should disable the Next button on the last page', () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={mockOnPageChange} />);

    // Next button should be disabled
    expect(screen.getByText('Next')).toBeDisabled();
  });

  it('should trigger the onPageChange callback when a page number is clicked', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />);

    // Simulate clicking on page 3
    fireEvent.click(screen.getByText('3'));

    // Ensure the onPageChange function was called with the correct page number
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it('should trigger the onPageChange callback when the Prev button is clicked', () => {
    render(<Pagination currentPage={2} totalPages={5} onPageChange={mockOnPageChange} />);

    // Simulate clicking on Prev button
    fireEvent.click(screen.getByText('Prev'));

    // Ensure the onPageChange function was called with the correct page number (1)
    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

  it('should trigger the onPageChange callback when the Next button is clicked', () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={mockOnPageChange} />);

    // Simulate clicking on Next button
    fireEvent.click(screen.getByText('Next'));

    // Ensure the onPageChange function was called with the correct page number (4)
    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });

  it('should highlight the active page correctly', () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={mockOnPageChange} />);

    // The button for page 3 should have the "active" class
    expect(screen.getByText('3')).toHaveClass('active');

    // Other page buttons should not have the "active" class
    expect(screen.getByText('1')).not.toHaveClass('active');
    expect(screen.getByText('2')).not.toHaveClass('active');
    expect(screen.getByText('4')).not.toHaveClass('active');
    expect(screen.getByText('5')).not.toHaveClass('active');
  });


});
