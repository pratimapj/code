import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Pagination from './Pagination';
import '@testing-library/jest-dom';


describe('Pagination', () => {

    const mockOnPageChange = jest.fn();
  
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should disable the Prev button on the first page', () => {
        render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />);
    
        // Prev button should be disabled
        expect(screen.getByText('Prev')).toBeDisabled();
      });

})