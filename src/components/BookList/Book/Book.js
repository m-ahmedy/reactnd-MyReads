import React, { Component } from 'react'
import update from 'immutability-helper'
import OptionSelect from '../../UI/OptionSelect/OptionSelect'

export default class Book extends Component {
    changeOptionHandler = (event) => {
        console.log('[Book] options', this.props.shelfOptions);

        const selectedShelf = event.target.value;
        const updatedBookInfo = update(this.props.bookInfo, { $merge: { shelf: selectedShelf } })

        this.props.onChangeShelf(updatedBookInfo);
    }

    render() {

        const { bookInfo } = this.props;
        const style = {
            width: 128,
            height: 193,
            backgroundImage: bookInfo.imageLinks ? `url(${bookInfo.imageLinks.thumbnail})` : 'none'
        };

        const bookItem = (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={style}></div>
                        <OptionSelect
                            title='Move'
                            selectedOption={bookInfo.shelf}

                            options={this.props.shelfOptions}
                            onChangeOption={this.changeOptionHandler}
                        />
                    </div>
                    <div className="book-title">{bookInfo.title}</div>
                    {
                        bookInfo.authors
                            ? <div className="book-authors">{bookInfo.authors.join(', ')}</div>
                            : null
                    }
                </div>
            </li>
        );


        return bookItem;
    }
}
