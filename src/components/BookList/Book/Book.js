import React, { Component } from 'react'
import PropTypes from 'prop-types'
import OptionSelect from '../../UI/OptionSelect/OptionSelect'

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
                                options={[]}
                                onChangeOption={() => { }}
                            />
                        </div>
                        <div className="book-title">{this.state.bookInfo.title}</div>
                        <div className="book-authors">{this.state.bookInfo.authors.join(', ')}</div>
                    </div>
                </li>
            );
        }

        return bookItem;
    }
}
