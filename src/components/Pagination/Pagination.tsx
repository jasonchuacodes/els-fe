import React from 'react';

const Pagination = ({
  totalPages,
  onPageChange,
  currentPage
}: {
  totalPages: number;
  onPageChange: (value: number) => void;
  currentPage: number
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex">
      <button onClick={() => (currentPage > 1) && onPageChange(currentPage-1)}>Previous</button>
      <ul className="flex">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button className="mx-2 border-2 rounded-full px-2" onClick={() => onPageChange(number)}> {number} </button>
          </li>
        ))}
      </ul>
      <button onClick={() => (currentPage < totalPages ) && onPageChange(currentPage+1)}>Next</button>
    </div>
  );
};

export default Pagination;
