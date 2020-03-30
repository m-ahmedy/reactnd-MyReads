import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import './App.css'
import * as BooksAPI from './apis/BooksAPI'
import Library from './containers/Library/Library'
import Search from './containers/Search/Search'

class BooksApp extends React.Component {
  state = {
    shelves: [
      {
        name: 'None',
        key: 'none'
      },
      {
        name: 'Currently reading',
        key: 'currentlyReading'
      },
      {
        name: 'Want to read',
        key: 'wantToRead'
      },
      {
        name: 'Read',
        key: 'read'
      }
    ],
    books: []
  }

  componentDidMount() {
    const localData = localStorage.getItem('bookData');

    if (localData && localData.length !== 0) {
      const savedData = JSON.parse(localData);

      // console.log('[App]', savedData);
      this.setState(prevState => ({
        books: savedData
      }));

    } else {
      BooksAPI.getAll()
        .then(fetchedBooks => {
          // console.log('[App]', fetchedBooks);

          this.setState(prevState => ({
            books: fetchedBooks
          }));

          localStorage.setItem('bookData', JSON.stringify(fetchedBooks.filter(book => book.shelf !== 'none')));
        })
        .catch(err => console.log(err));
    }
  }

  changeShelfHandler = (updatedBookInfo) => {
    // console.log('[App]', updatedBookInfo)

    BooksAPI.update(updatedBookInfo.id, updatedBookInfo.shelf)
      .then(res => {
        const updatedBooks = this.state.books
          .filter(book => book.id !== updatedBookInfo.id)
          .concat(updatedBookInfo);

        // console.log('[App]', updatedBooks);

        this.setState((prevState) => ({
          books: updatedBooks
        }));

        localStorage.setItem('bookData', JSON.stringify(updatedBooks.filter(book => book.shelf !== 'none')));
      })
      .catch(err => console.log(err));
  }

  removeShelfHandler = async (shelfKey) => {
    const updatedShelves = this.state.shelves.filter(sh => sh.key !== shelfKey);
    const removedBooks = this.state.books.filter(book => book.shelf === shelfKey);
    const remainingBooks = this.state.books.filter(book => book.shelf !== shelfKey);

    let promises = removedBooks.map(book => BooksAPI.update(book, 'none').catch(err => console.log(err)));
    
    await Promise.all(promises);

    this.setState(prevState => ({
      shelves: updatedShelves,
      books: remainingBooks
    }));
    
    localStorage.setItem('bookData', JSON.stringify(remainingBooks.filter(book => book.shelf !== 'none')));
  }

  addShelfHandler = (newShelf) => {
    if (this.state.shelves.filter(sh => sh.key.toLowerCase() === newShelf.key.toLowerCase()).length === 0) {
      this.setState(prevState => ({
        shelves: prevState.shelves.concat(newShelf)
      }));
    } else {
      alert('You have a shelf with the same name already!');
    }
  }

  renderLibrary = () => {
    return (
      <Library
        shelves={this.state.shelves}
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
        shelves={this.state.shelves}
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