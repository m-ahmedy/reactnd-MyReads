import React from 'react'
import Button from '../UI/Button/Button'

const SearchBar = props => {
    const { value, onQueryChange } = props;

    return (
        <div className="search-books-bar">
            <Button
                className='close-search'
                linkTo='/'
            />
            <div className="search-books-input-wrapper">
                <input
                    type="text"
                    placeholder="Search by title or author"
                    value={value}
                    onChange={(event) => onQueryChange(event.target.value)}
                />
            </div>
        </div>
    )
}

export default SearchBar
