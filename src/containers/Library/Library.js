/*
<div className="list-books">
    <div className="list-books-title">
        <h1>MyReads</h1>
    </div>
    <div className="list-books-content">
        <div>
            <Shelf />
            <Shelf />
            <Shelf />
        </div>
    </div>
    <Button />
</div>

*/
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Library extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        return (
            <div>
                Library
            </div>
        )
    }
}