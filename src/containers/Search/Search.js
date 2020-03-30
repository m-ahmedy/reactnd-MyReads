import React, { Component } from 'react'
import * as BooksAPI from '../../apis/BooksAPI'
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
        // console.log('[Search] Fired the timer', new Date().getTime());
        const { queryParams } = this.state;

        if (queryParams.length !== 0) {
            // Array of promises which will wait to resolve
            let promises = queryParams.map(param => BooksAPI.search(param.toLowerCase()));

            let resolvedPromises = await Promise.all(promises)
            .catch(err => console.log(err));
            // console.log('resolved promises', resolvedPromises);

            let fetchedBooks = [];
            resolvedPromises.forEach(el => {
                if (Array.isArray(el)) {
                    // console.log('Is an array', el);
                    el.forEach(book => {
                        if (!fetchedBooks.find(b => book.id === b.id)) {
                            fetchedBooks.push(book);
                        }
                    });
                }
            });

            // console.log('[Fetched books]', fetchedBooks);

            const updatedBooks = fetchedBooks.map(book => {

                const localSimilarBook = this.props.books.find(b => b.title === book.title);

                const updatedBook = {
                    ...book,
                    shelf: localSimilarBook ? localSimilarBook.shelf : 'none'
                };

                return updatedBook;
            });

            this.setState(prevState => ({
                queryBooks: updatedBooks,
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
        // console.log('[Search]', this.debounceTimer, new Date().getTime());
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
