import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
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

      console.log(savedData);
      this.setState(prevState => ({
        books: savedData
      }));

    } else {
      BooksAPI.getAll()
        .then(fetchedBooks => {
          console.log(fetchedBooks);

          const bookData = fetchedBooks.map(book => ({
            ...book,
            shelf: 'None'
          }));

          console.log(bookData);
          this.setState(prevState => ({
            books: bookData
          }));

          const localBookData = bookData.filter(book => book.shelf !== 'None');

          if (localBookData.length) {
            localStorage.setItem('bookData', JSON.stringify(localBookData));
          } else {
            localStorage.removeItem('bookData')
          }
        });
    }
  }

  changeShelfHandler = (updatedBookInfo) => {
    console.log('[App]', updatedBookInfo)

    const updatedBooks = this.state.books.map(book => {
      return book.id === updatedBookInfo.id
        ? updatedBookInfo
        : book
    });

    this.setState((prevState) => ({
      books: updatedBooks
    }));

    const localBookData = updatedBooks.filter(book => book.shelf !== 'None');

    if (localBookData.length) {
      localStorage.setItem('bookData', JSON.stringify(localBookData));
    } else {
      localStorage.removeItem('bookData')
    }

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