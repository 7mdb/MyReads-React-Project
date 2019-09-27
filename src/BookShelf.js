import React from "react";
import PropTypes from "prop-types";
import Book from "./Book";

const BookShelf = function(props) {
  let handleUpdateShelf = (book, shelf) => {
    props.onBookShelfUpdate(book, shelf);
  };

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books.map(book => (
            <li key={book.id}>
              <Book book={book} updateShelf={handleUpdateShelf} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

BookShelf.propTypes = {
  books: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  onBookShelfUpdate: PropTypes.func.isRequired
};
export default BookShelf;
