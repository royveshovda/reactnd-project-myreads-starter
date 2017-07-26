import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import ShowBook from './ShowBook'

class SearchBooks extends Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    onMove: PropTypes.func.isRequired
  }

  state = {
    query: '',
    foundBooks: []
  }

  updateQuery(query) {
    const newQuery = query.trim()
    this.setState({query: newQuery})
    this.props.onSearch(newQuery, 100).then((books) => {
      if (books.length > 0){
        console.log(books)
        this.setState({foundBooks: books})
      } else {
        this.setState({foundBooks: []})
      }
    })
  }

  render() {
    const { query, foundBooks } = this.state
    const { onMove } = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {foundBooks.map((book) => (
            <li key={book.id}>
              <ShowBook book={book} onMove={onMove} />
            </li>
          ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
