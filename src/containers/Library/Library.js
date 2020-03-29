import React, { Component } from 'react'
import Shelf from '../../components/Shelf/Shelf'
import Button from '../../components/UI/Button/Button'

export default class Library extends Component {
    render() {
        const { shelves, books, onChangeShelf } = this.props;

        const bookLists = {};

        console.log('[Library]', books);
        shelves.forEach(shelf => {
            bookLists[shelf.key] = books.filter(book => book.shelf === shelf.key);
        });

        console.log('[Library]', shelves);
        const shelfItems = shelves.map(shelf => (
            <Shelf
                title={shelf.name}
                key={shelf.key}
                bookList={bookLists[shelf.key]}

                shelfOptions={shelves}
                onChangeShelf={onChangeShelf}
            />
        ));

        console.log('[Library]', shelves);
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