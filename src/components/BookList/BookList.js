import React from 'react'
import PropTypes from 'prop-types'

const BookList = props => {
    const { bookList, className } = props;

    const bookItems = bookList.length 
        ? bookList.map(book => (
            <p key={book}>
                A book
            </p>
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
