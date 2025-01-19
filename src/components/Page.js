import React, { useState } from 'react';
import Pagination from './Pagination';

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // Set total number of pages

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1>Pagination Example</h1>
      <p>Current Page: {currentPage}</p>
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Page;