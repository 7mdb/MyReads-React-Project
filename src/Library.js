import React from "react";
import PropTypes from "prop-types";
import BookShelf from "./BookShelf";

class Library extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onBookShelfUpdate: PropTypes.func.isRequired
  };

  handleUpdateShelf = (book, shelf) => {
    this.props.onBookShelfUpdate(book, shelf);
  };

  render() {
    return (
      <div className="list-books-content">
        <div>
          <BookShelf
            title="Currently Reading"
            books={this.props.books.filter(b => b.shelf === "currentlyReading")}
            onBookShelfUpdate={this.handleUpdateShelf}
          />
          <BookShelf
            title="Want to Read"
            books={this.props.books.filter(b => b.shelf === "wantToRead")}
            onBookShelfUpdate={this.handleUpdateShelf}
          />
          <BookShelf
            title="Read"
            books={this.props.books.filter(b => b.shelf === "read")}
            onBookShelfUpdate={this.handleUpdateShelf}
          />
        </div>
      </div>
    );
  }
}

export default Library;
