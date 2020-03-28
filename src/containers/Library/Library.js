import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { paramCase } from 'change-case'
import * as BooksAPI from '../../apis/BooksAPI'
import Shelf from '../../components/Shelf/Shelf'

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
        const shelfItems = shelves.map(shelf => (
            <Shelf
                title={shelf}
                key={paramCase(shelf)}
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
                {/* <Button /> */}
            </div>
        )
    }
}