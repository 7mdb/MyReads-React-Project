import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Library from "./Library";
import Search from "./Search";
import { Route, Link } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({
        books: books
      });
    });
  }

  moveBookToShelf = (book, newVal) => {
    book.props.book.shelf = newVal;

    this.setState(state => ({
      books: state.books
        .filter(b => b.id !== book.props.book.id)
        .concat([book.props.book])
    }));

    BooksAPI.update(book.props.book, newVal);
  };
  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <Library
                books={this.state.books}
                onBookShelfUpdate={this.moveBookToShelf}
              />
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}
        />
        <Route
          path="/search"
          render={() => (
            <Search
              books={this.state.books}
              onBookShelfUpdate={this.moveBookToShelf}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
