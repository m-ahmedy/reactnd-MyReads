import React from 'react'
import BookList from '../BookList/BookList'

const SearchResults = props => {
    const { shelfOptions, onChangeShelf, searchState } = props;

    return (
        <div className="search-books-results">
            {
                searchState.queryBooks.length !== 0
                    ? (
                        <BookList
                            className='books-grid'
                            bookList={searchState.queryBooks}

                            shelfOptions={shelfOptions}
                            onChangeShelf={onChangeShelf}
                        />
                    )
                    : searchState.query !== '' && !searchState.loading
                        ? (
                            <p style={{ textAlign: 'center' }}>Not found</p>
                        )
                        : null
            }
        </div>
    )
}

export default SearchResults
