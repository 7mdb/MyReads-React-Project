import React from "react";
import PropTypes from "prop-types";

class Book extends React.Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    updateShelf: PropTypes.func.isRequired
  };

  handleShelfUpdate = e => {
    let newVal = e.target.value;
    this.props.updateShelf(this, newVal);
  };
  render() {
    const { book } = this.props;
    return (
      <div key={book.id} className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 192,
              backgroundImage: book.imageLinks
                ? `url(${book.imageLinks.thumbnail})`
                : `url("https://img.icons8.com/metro/52/000000/cancel-2.png")`
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              value={book.shelf ? book.shelf : "none"}
              onChange={this.handleShelfUpdate}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors ? book.authors : "Unknown author"}
        </div>
      </div>
    );
  }
}

export default Book;
