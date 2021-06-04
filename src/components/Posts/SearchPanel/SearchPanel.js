import React from 'react';
import c from './SearchPanel.module.css';

const SearchPanel = ({term, onSearchChange}) => {
  const onSearchChangeInput = (e) => {
    onSearchChange(e.target.value);
  };

  return ( 
    <input 
      className={c.input}
      type="text"
      placeholder="Type here title for search" 
      value={term} 
      onChange={onSearchChangeInput}/>
  );
};

export default SearchPanel;