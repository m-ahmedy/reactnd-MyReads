import React from 'react'
import PropTypes from 'prop-types'
import BookList from '../BookList/BookList'

const Shelf = props => {
    const { title, bookList } = props;

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <BookList
                    className='books-grid'
                    bookList={bookList}
                />
            </div>
        </div>
    )
}

Shelf.propTypes = {
    title: PropTypes.string.isRequired,
    bookList: PropTypes.array
};

export default Shelf
