import React from 'react'
import '../public/css/Searchbar.css'

function SearchBar ({ onChange }) {
  return (
    <div className='seachbar'>
      <form action='POST' id='searchBar'>
        <input
          type='search'
          className='searchbar__input'
          onChange={onChange}
          id=''
          list='searchBar'
        />
      </form>
    </div>
  )
}

export default SearchBar
