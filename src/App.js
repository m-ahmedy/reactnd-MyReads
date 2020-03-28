import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import './App.css'
import Library from './containers/Library/Library'
import Search from './containers/Search/Search'

class BooksApp extends React.Component {
  state = {
    shelfOptions: ['Currently Reading', 'Want to read', 'Read']
  };

  addShelfHandler = () => { }

  removeShelfHandler = () => { }

  renderLibrary = () => {
    return (
      <Library
        shelves={this.state.shelfOptions}
        onAddShelf={this.addShelfHandler}
        onRemoveShelf={this.removeShelfHandler}
      />
    );
  }

  renderSearch = () => {
    return (
      <Search
        shelves={this.state.shelfOptions}
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