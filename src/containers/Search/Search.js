import React, { Component } from 'react'
import * as BooksAPI from '../../apis/BooksAPI'
import * as _ from 'underscore'
import SearchBar from '../../components/SearchBar/SearchBar'
import SearchResults from '../../components/SearchResults/SearchResults'

export default class Search extends Component {
    state = {
        query: '',
        queryParams: [],
        queryBooks: [],
        loading: false
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
                    });
                })
                .catch(err => console.log(err));

            const updatedBooksWithLocalState = fetchedBooks.map(book => {
                // console.log('[Search] fetched', book);
                console.log('[Search] fetched id', book.title);

                const b = this.props.books.find(b => {
                    console.log('[Search] local name', b.title);

                    return b.title === book.title
                });

                if (b) console.log('[Search] updating the book', b);

                const o = {
                    ...book,
                    shelf: b ? b.shelf : 'none'
                };

                return o;
            });

            console.log('[Search]', updatedBooksWithLocalState);

            this.setState(prevState => ({
                queryBooks: updatedBooksWithLocalState,
                loading: false
            }));



        } else {
            this.setState(prevState => ({
                queryBooks: [],
                loading: false
            }))
        }
    }

    queryHandler = (query) => {

        const queryParams = query.split(/[^\w]/).filter(param => param !== '');

        this.setState(prevState => ({
            query: query,
            queryParams: queryParams,
            loading: true
        }));

        clearTimeout(this.debounceTimer);
        console.log('[Search]', this.debounceTimer, new Date().getTime());
        this.debounceTimer = setTimeout(this.initiateSearch, 1500);
    }

    render() {
        return (
            <div className="search-books">
                <SearchBar
                    value={this.state.query}
                    onQueryChange={this.queryHandler}
                />
                <SearchResults
                    searchState={this.state}
                    
                    shelfOptions={this.props.shelves}
                    onChangeShelf={this.props.onChangeShelf}
                />
            </div>
        )
    }
}
