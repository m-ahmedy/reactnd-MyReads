/*
<div className="search-books">
    <div className="search-books-bar">
        <Button />
        <div className="search-books-input-wrapper">
            
            <input type="text" placeholder="Search by title or author" />

        </div>
    </div>
    <div className="search-books-results">
        <BookList />
    </div>
</div>
*/

import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Search extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        return (
            <div>
                Search
            </div>
        )
    }
}
