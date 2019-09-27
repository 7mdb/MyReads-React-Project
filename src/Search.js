import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

class Search extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onBookShelfUpdate: PropTypes.func.isRequired
  };
  state = {
    query: "",
    results: []
  };
  updateQuery = query => {
    if (query.length > 0) {
      this.setState(() => ({
        results: [],
        query: query
      }));
      this.searchBook(query);
    } else {
      this.clearQuery();
    }
  };

  clearQuery = () => {
    this.setState({
      query: "",
      results: []
    });
  };

  searchBook(query) {
    if (query.length > 0)
      BooksAPI.search(query).then(sResults => {
        if (query === this.state.query)
          this.setState(currentState => ({
            results: this.updateBookShelf(sResults)
          }));
      });
  }

  updateBookShelf(sResults) {
    if (!sResults.error) {
      const books = this.props.books;
      const addShelf = sResults.filter(result =>
        books.find(b => {
          if (b.id === result.id) {
            result.shelf = b.shelf;
            return result;
          }
        })
      );
      books.concat(addShelf);
      return sResults;
    }
  }

  render() {
    const { query, results } = this.state;
    const { onBookShelfUpdate } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search" onClick={this.clearQuery}>
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
      NOTES: The search from BooksAPI is limited to a particular set of search terms.
      You can find these search terms here:
      https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

      However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
      you don't find a specific author or title. Every search is limited by search terms.
    */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {results ? (
              results.map(book => (
                <li key={book.id}>
                  <Book book={book} updateShelf={onBookShelfUpdate} />
                </li>
              ))
            ) : (
              <h1>No results for, "{query}"</h1>
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
