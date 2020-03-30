import React from 'react'
import PropTypes from 'prop-types'
import BookList from '../BookList/BookList'

const Shelf = props => {
    const { title, shelfKey, bookList, shelfOptions, onChangeShelf, onRemoveShelf } = props;

    let shelfItem = title !== 'None'
        ? (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <BookList
                        className='books-grid'
                        bookList={bookList}

                        shelfOptions={shelfOptions}
                        onChangeShelf={onChangeShelf}
                    />
                </div>
                <button
                    className="remove-shelf"
                    onClick={() => onRemoveShelf(shelfKey)}
                >
                    X
                </button>
            </div>
        )
        : null;
    return shelfItem;
}

Shelf.propTypes = {
    title: PropTypes.string.isRequired,
    bookList: PropTypes.array
};

export default Shelf
