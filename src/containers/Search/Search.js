import React, { Component } from 'react'
import * as BooksAPI from '../../apis/BooksAPI'
import * as _ from 'underscore'
import Button from '../../components/UI/Button/Button'
import BookList from '../../components/BookList/BookList'

export default class Search extends Component {
    state = {
        query: '',
        queryParams: [],
        queryBooks: []
    }

    debounceTimer = null;

    initiateSearch = async () => {
        console.log('[Search] Fired the timer', new Date().getTime());

        const { queryParams } = this.state;
        if (queryParams.length !== 0) {
            let promises = queryParams.map(param => BooksAPI.search(param));

            let fetchedBooks = [];
            await Promise.all(promises)
                .then(res => {
                    res.forEach(arr => {
                        console.log('[Search]', arr);
                        fetchedBooks = _.union(fetchedBooks, arr);
                    })
                })
                .catch(err => console.log(err));
            
            console.log('[Search]',fetchedBooks);

            this.setState(prevState => ({
                queryBooks: fetchedBooks
            }))
        }
    }

    queryHandler = (query) => {

        const queryParams = query.split(/[^\w]/).filter(param => param !== '');

        this.setState(prevState => ({
            query: query,
            queryParams: queryParams
        }));

        clearTimeout(this.debounceTimer);
        console.log('[Search]', this.debounceTimer, new Date().getTime());
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
