import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { paramCase, camelCase } from 'change-case'
import * as BooksAPI from '../../apis/BooksAPI'
import Shelf from '../../components/Shelf/Shelf'
import Button from '../../components/UI/Button/Button'

export default class Library extends Component {
    static propTypes = {
        prop: PropTypes
    }

    state = {
        books: []
    }

    componentDidMount () {
        BooksAPI.getAll()
            .then(fetchedBooks => {
                console.log(fetchedBooks);

                const bookInfo = fetchedBooks.map(book => ({
                    ...book,
                    shelf: 'None'
                }));

                console.log(bookInfo);
                this.setState(prevState => ({
                    books: bookInfo
                }));
            });
    }

    render() {
        const { shelves } = this.props;
        const { books } = this.state;

        const bookLists = {};

        shelves.forEach(shelf => {
            bookLists[camelCase(shelf)] = books.filter(book => camelCase(book.shelf) === camelCase(shelf))
        });

        const shelfOptions = shelves.map(shelf => paramCase(shelf));

        const shelfItems = shelves.map(shelf => (
            <Shelf
                title={shelf}
                key={paramCase(shelf)}
                bookList={bookLists[camelCase(shelf)]}

                shelfOptions={shelfOptions}
            />
        ));

        console.log(shelves);
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {shelfItems}
                    </div>
                </div>
                <Button
                    linkTo='/search'
                    className='open-search'
                />
            </div>
        )
    }
}