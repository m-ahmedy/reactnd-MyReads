import React from 'react'
import PropTypes from 'prop-types'

const Shelf = props => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.title}</h2>
            <div className="bookshelf-books">
                {/* <BookList /> */}
                BookList
            </div>
        </div>
    )
}

Shelf.propTypes = {
    title: PropTypes.string.isRequired
};

export default Shelf
