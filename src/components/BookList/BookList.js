import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book/Book'

const BookList = props => {
    const { bookList, className } = props;

    const bookItems = new Array(3).length 
        ? new Array(3).fill("A book").map(book => (
            <Book key={Math.random()*10}/>
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
