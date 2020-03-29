import React, { Component } from 'react'
import update from 'immutability-helper'
import { camelCase } from'change-case'
import OptionSelect from '../../UI/OptionSelect/OptionSelect'

export default class Book extends Component {
    changeOptionHandler = (event) => {
        console.log('[Book]', { ...event });

        const selectedShelf = camelCase(event.target.value);
        const updatedBookInfo = update(this.props.bookInfo, { $merge: { shelf: selectedShelf } })

        this.props.onChangeShelf(updatedBookInfo);
    }

    render() {
        let bookItem = null;
        if (this.props.bookInfo) {
            const { bookInfo } = this.props;
            const style = {
                width: 128,
                height: 193,
                backgroundImage: `url(${bookInfo.imageLinks.thumbnail})`
            };

            bookItem = (
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
        }

        return bookItem;
    }
}
