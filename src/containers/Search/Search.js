import React, { Component } from 'react'
import * as BooksAPI from '../../apis/BooksAPI'
import Button from '../../components/UI/Button/Button'
import BookList from '../../components/BookList/BookList'

export default class Search extends Component {
    state = {
        query: '',
        queryParams: [],
        queryBooks: []
    }

    debounceTimer = null;

    initiateSearch = () => {
        console.log('Fired the timer', new Date().getTime());

        const { queryParams } = this.state;
        if (queryParams.length !== 0) {
            BooksAPI.getAll()
                .then(fetchedBooks => {
                    console.log(queryParams);

                    const queryBooks = fetchedBooks.filter(book => {
                        let found = false;
                        queryParams.forEach(queryParam => {
                            if (book.title.toLowerCase().includes(queryParam.toLowerCase()) || book.authors.join(' ').toLowerCase().includes(queryParam.toLowerCase())) {
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
        } else {
            this.setState(prevState => ({
                queryBooks: []
            }));
        }
    }

    queryHandler = (query) => {
        console.log();

        const queryParams = query.split(/[^\w]/).filter(param => param !== '');

        this.setState(prevState => ({
            query: query,
            queryParams: queryParams
        }));

        clearTimeout(this.debounceTimer);
        console.log(this.debounceTimer, new Date().getTime());
        this.debounceTimer = setTimeout(this.initiateSearch, 1500);
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
                            value={this.state.query}
                            onChange={(event) => this.queryHandler(event.target.value)}
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
