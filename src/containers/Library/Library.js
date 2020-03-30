import React, { Component } from 'react'
import Shelf from '../../components/Shelf/Shelf'
import ShelfAdd from '../../components/Shelf/ShelfAdd/ShelfAdd'
import Button from '../../components/UI/Button/Button'
import { camelCase } from 'change-case'

export default class Library extends Component {
    state = {
        newShelf: {
            key: '',
            name: ''
        },
        valid: false
    }

    changeNameHandler = (shelfName) => {
        if (shelfName) {
            this.setState(prevState => ({
                newShelf: {
                    key: camelCase(shelfName),
                    name: shelfName
                },
                valid: true
            }));
        } else {
            this.setState(prevState => ({
                newShelf: {
                    key: '',
                    name: ''
                },
                valid: false
            }));
        }
    }

    shelfObjectHandler = () => {
        const { name, key } = this.state.newShelf;
        if (name !== '' && key !== '') {
            this.props.onAddShelf(this.state.newShelf);
            this.setState({
                newShelf: {
                    name: '',
                    key: ''
                },
                valid: false
            })
        }
    }

    render() {
        const { shelves, books, onChangeShelf, onRemoveShelf } = this.props;
        const { newShelf, valid } = this.state;

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
                shelfKey={shelf.key}
                bookList={bookLists[shelf.key]}

                shelfOptions={shelves}
                onChangeShelf={onChangeShelf}
                onRemoveShelf={onRemoveShelf}
            />
        ));

        console.log('[Library]', shelves);
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <ShelfAdd
                    value={newShelf.name}
                    onChangeName={this.changeNameHandler}
                    valid={valid}

                    onAddShelf={this.shelfObjectHandler}
                />
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