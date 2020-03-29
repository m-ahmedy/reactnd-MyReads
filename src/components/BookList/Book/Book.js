import React, { Component } from 'react'
import PropTypes from 'prop-types'
import OptionSelect from '../../UI/OptionSelect/OptionSelect'
import { sentenceCase } from 'change-case'

export default class Book extends Component {
    static propTypes = {
        prop: PropTypes
    }

    state = {}

    componentDidMount() {
        this.setState(() => ({
            bookInfo: this.props.bookInfo
        }));
    }

    changeOptionHandler = (event) => {
        console.log({ ...event });
        console.log(event.target.value);

        const selectedShelf = sentenceCase(event.target.value);
        const updatedBookInfo = {
            ...this.state.bookInfo,
            shelf: selectedShelf
        };

        this.setState(prevState => updatedBookInfo);

        this.props.onChangeShelf(updatedBookInfo);
    }

    render() {
        let bookItem = null;
        if (this.state.bookInfo) {
            const { bookInfo } = this.state;
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
                                options={this.props.shelfOptions}
                                onChangeOption={this.changeOptionHandler}
                            />
                        </div>
                        <div className="book-title">{bookInfo.title}</div>
                        <div className="book-authors">{bookInfo.authors.join(', ')}</div>
                    </div>
                </li>
            );
        }

        return bookItem;
    }
}
