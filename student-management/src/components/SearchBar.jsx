import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm, sortAsc, setSortAsc }) => {
  return (
    <div className="search-bar-container">
      <input 
        className="search-input"
        type="text" 
        placeholder="Tìm kiếm học sinh theo tên..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <button 
        className="btn btn-sort"
        onClick={() => setSortAsc(!sortAsc)} 
      >
        Sắp xếp: <strong>{sortAsc ? "A → Z" : "Z → A"}</strong>
      </button>
    </div>
  );
};

export default SearchBar;