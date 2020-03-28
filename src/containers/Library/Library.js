import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from '../../apis/BooksAPI'

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
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {/* <Shelf />
                        <Shelf />
                        <Shelf /> */}
                    </div>
                </div>
                {/* <Button /> */}
            </div>
        )
    }
}