import React, { Component } from 'react'
import { camelCase } from 'change-case'
import Shelf from '../../components/Shelf/Shelf'
import Button from '../../components/UI/Button/Button'

export default class Library extends Component {
    render() {
        const { shelves, books, onChangeShelf } = this.props;

        const bookLists = {};

        console.log('[Library]', books);
        shelves.forEach(shelf => {
            bookLists[camelCase(shelf)] = books.filter(book => camelCase(book.shelf) === camelCase(shelf))
        });

        const shelfOptions = shelves.map(shelf => camelCase(shelf));

        console.log('[Library]', shelfOptions);
        const shelfItems = shelves.map(shelf => (
            <Shelf
                title={shelf}
                key={camelCase(shelf)}
                bookList={bookLists[camelCase(shelf)]}

                shelfOptions={shelfOptions}
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