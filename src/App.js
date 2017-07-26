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
    this.getBookState = this.getBookState.bind(this)
    this.onSearchBooks = this.onSearchBooks.bind(this)
  }

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  onMove(book, newShelf) {
    console.log(book.title + " : " + newShelf)
    BooksAPI.update(book, newShelf).then(() => {
      book.shelf = newShelf
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([book])
      }))
    })
  }

  getBookState(bookId) {
    const book = this.state.books.filter(b => b.id === bookId)
    if (book.length === 1){
      return book[0].shelf
    }else{
      return 'none'
    }
  }

  onSearchBooks(query, max) {
    return new Promise((resolve, reject) => {
      BooksAPI.search(query, max).then(books => {
        if (books.length > 0){
          const enrichedBooks = books.map(book => {
            book.shelf = this.getBookState(book.id)
            return book
          })
          resolve(enrichedBooks)
        }else{
          resolve([])
        }
      })
    })

  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks books={this.state.books} onMove={this.onMove} />
        )} />
        <Route path="/search" render={() => (
          <SearchBooks onSearch={this.onSearchBooks} onMove={this.onMove} />
        )} />
      </div>
    )
  }
}

export default BooksApp
