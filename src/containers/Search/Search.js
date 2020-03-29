import React, { Component } from 'react'
import Button from '../../components/UI/Button/Button'
import BookList from '../../components/BookList/BookList'

export default class Search extends Component {
    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Button 
                        className='close-search'
                        linkTo='/'
                    />
                    <div className="search-books-input-wrapper">

                        <input type="text" placeholder="Search by title or author" />

                    </div>
                </div>
                <div className="search-books-results">
                    <BookList
                        bookList={[]}
                    />
                </div>
            </div>
        )
    }
}
