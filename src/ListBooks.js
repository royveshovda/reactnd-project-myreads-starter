import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import ShowBook from './ShowBook'

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }

  render() {
    const { books } = this.props

    let currentlyReadingListing = books.filter((book) => book.shelf === 'currentlyReading')
    currentlyReadingListing.sort(sortBy('title'))

    let wantToReadListing = books.filter((book) => book.shelf === 'wantToRead')
    wantToReadListing.sort(sortBy('title'))

    let readListing = books.filter((book) => book.shelf === 'read')
    readListing.sort(sortBy('title'))

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {currentlyReadingListing.map((book) => (
                    <li key={book.id}>
                      <ShowBook book={book} />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {wantToReadListing.map((book) => (
                    <li key={book.id}>
                      <ShowBook book={book} />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {readListing.map((book) => (
                    <li key={book.id}>
                      <ShowBook book={book} />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
