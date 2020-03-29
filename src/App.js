import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import update from 'immutability-helper'
import './App.css'
import * as BooksAPI from './apis/BooksAPI'
import Library from './containers/Library/Library'
import Search from './containers/Search/Search'

class BooksApp extends React.Component {
  state = {
    shelfOptions: ['Currently reading', 'Want to read', 'Read', 'None'],
    books: []
  }

  componentDidMount() {
    if (localStorage.getItem('bookData')) {
      const savedData = JSON.parse(localStorage.getItem('bookData'));

      console.log('[App]', savedData);
      this.setState(prevState => ({
        books: savedData
      }));

    } else {
      BooksAPI.getAll()
        .then(fetchedBooks => {
          console.log('[App]', fetchedBooks);

          this.setState(prevState => ({
            books: fetchedBooks
          }));
        });
    }
  }

  changeShelfHandler = (updatedBookInfo) => {
    console.log('[App]', updatedBookInfo)

    BooksAPI.update(updatedBookInfo.id, updatedBookInfo.shelf)
      .then(res => {
        const updatedBooks = update(this.state.books, { $push: [] })
          .filter(book => book.id !== updatedBookInfo.id)
          .concat(updatedBookInfo);

        console.log('[App]', updatedBooks);

        this.setState((prevState) => ({
          books: updatedBooks
        }));
      })
  }

  addShelfHandler = () => { }

  removeShelfHandler = () => { }

  renderLibrary = () => {
    return (
      <Library
        shelves={this.state.shelfOptions}
        books={this.state.books}
        onChangeShelf={this.changeShelfHandler}

        onAddShelf={this.addShelfHandler}
        onRemoveShelf={this.removeShelfHandler}
      />
    );
  }

  renderSearch = () => {
    return (
      <Search
        shelves={this.state.shelfOptions}
        books={this.state.books}
        onChangeShelf={this.changeShelfHandler}
      />
    );
  }

  render() {
    return (
      <Switch>
        <Route exact path='/' render={this.renderLibrary} />
        <Route path='/search' render={this.renderSearch} />
        <Redirect to='/' />
      </Switch>
    );
  }
}

export default BooksApp