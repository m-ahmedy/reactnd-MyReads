import React, { Component } from 'react'
import * as BooksAPI from '../../apis/BooksAPI'
import Button from '../../components/UI/Button/Button'
import BookList from '../../components/BookList/BookList'

export default class Search extends Component {
    state = {
        query: [],
        queryBooks: []
    }

    queryHandler = (query) => {
        console.log(query);
        this.setState(prevState => ({
            query: query.split(' ')
        }));
    }

    searchWithQuery = (event) => {
        const { query } = this.state;

        if (event.key === 'Enter' && query !== ['']) {
            BooksAPI.getAll()
                .then(fetchedBooks => {
                    console.log(query);

                    const queryBooks = fetchedBooks.filter(book => {
                        let found = false;
                        query.forEach(queryParam => {
                            if (book.title.toLowerCase().includes(queryParam.toLowerCase())) {
                                console.log('Found on ', book.title);
                                found = true;
                            }
                        });

                        return found;
                    });

                    const booksWithShelf = queryBooks.map(book => ({
                        ...book,
                        shelf: this.props.books.find(libBook => book.id === libBook.id).shelf
                    }));

                    console.log(booksWithShelf);

                    this.setState(prevState => ({
                        queryBooks: booksWithShelf
                    }));
                });
        }
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Button 
                        className='close-search'
                        linkTo='/'
                    />
                    <div className="search-books-input-wrapper">

                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={this.state.query.join(' ')}
                            onChange={(event) => this.queryHandler(event.target.value)}
                            onKeyUp={this.searchWithQuery}
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    <BookList
                        className='books-grid'
                        bookList={this.state.queryBooks}
                        
                        shelfOptions={this.props.shelves}
                        onChangeShelf={this.props.onChangeShelf}
                    />
                </div>
            </div>
        )
    }
}
