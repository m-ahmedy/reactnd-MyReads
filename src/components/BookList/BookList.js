import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book/Book'

const BookList = props => {
    const { bookList, className, shelfOptions, onChangeShelf } = props;

    const bookItems = new Array(3).length 
        ? bookList.map(book => (
            <Book
                key={book.id}
                bookInfo={{...book}}

                shelfOptions={shelfOptions}
                onChangeShelf={onChangeShelf}
            />
        ))
        : null;
    
    return (
        <div className={className ? className : null}>
            { bookItems }
        </div>
    )
}

BookList.propTypes = {
    bookList: PropTypes.array.isRequired,
    className: PropTypes.string
}

export default BookList
