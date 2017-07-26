import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  constructor(props) {
    super(props)

    this.onMove = this.onMove.bind(this)
  }

  state = {
    books: []
  }

  getAllBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  componentDidMount() {
    this.getAllBooks()
  }

  onMove(book, newShelf) {
    console.log(book.title + " : " + newShelf)
    BooksAPI.update(book, newShelf).then(() => this.getAllBooks())
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks books={this.state.books} onMove={this.onMove} />
        )} />
        <Route path="/search" render={() => (
          <SearchBooks onSearch={BooksAPI.search} onMove={this.onMove} />
        )} />
      </div>
    )
  }
}

export default BooksApp
