import './App.css';
import { useState, useEffect } from 'react';
import { search } from './BooksAPI';
import { update } from './BooksAPI';
import { getAll } from './BooksAPI';

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [books, setBooks] = useState([]);
  const [allbooks, setAllBooks] = useState([]);
  const [input, setinput] = useState('');
  const [read, setRead] = useState([]);

  const searchhandler = (e) => {
    setinput(e.target.value);
    console.log(e.target.value);
  };

  const Books = async () => {
    const books = await search(input);
    setBooks(books);
    console.log(books);
  };

  const getAllBooks = async () => {
    const books = await getAll();
    setAllBooks(books);
    console.log(books);
  };

  const updateBook = async (book, ch) => {
    const data = await update(book, ch);
    console.log(data);
  };

  useEffect(() => {
    Books();
  }, [input]);

  useEffect(() => {
    getAllBooks();
    updateBook();
  }, []);

  const readShelf = allbooks.filter((books) => books.shelf === 'read');
  const currentReadShelf = allbooks.filter(
    (books) => books.shelf === 'currentlyReading',
  );
  const wanttReadShelf = allbooks.filter(
    (books) => books.shelf === 'wantToRead',
  );
  // console.log(read);

  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                onChange={searchhandler}
                value={input}
                type="text"
                placeholder="Search by title, author, or ISBN"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {Array.isArray(books)
                ? books?.map((book, idx) => {
                    return (
                      <li key={idx}>
                        <div className="book">
                          <div className="book-top">
                            <div
                              className="book-cover"
                              style={{
                                width: 128,
                                height: 193,
                                backgroundImage: `url(${book.imageLinks.thumbnail})`,
                              }}
                            ></div>
                            <div className="book-shelf-changer">
                              <select
                                onChange={(e) => {
                                  console.log(e.target.value);
                                  console.log(book);
                                  updateBook(book, e.target.value);
                                  getAllBooks();
                                }}
                              >
                                <option value="none" disabled>
                                  Move to...
                                </option>
                                <option value="currentlyReading">
                                  Currently Reading
                                </option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          {Array.isArray(book.authors)
                            ? book?.authors?.map((auth, idx) => {
                                return (
                                  <div key={idx} className="book-authors">
                                    {auth}
                                  </div>
                                );
                              })
                            : ''}
                        </div>
                      </li>
                    );
                  })
                : ''}
            </ol>
          </div>
        </div>
      ) : (
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
                    {currentReadShelf.map((book, idx) => (
                      <li key={idx}>
                        <div className="book">
                          <div className="book-top">
                            <div
                              className="book-cover"
                              style={{
                                width: 128,
                                height: 193,
                                backgroundImage: `url(${book.imageLinks.thumbnail})`,
                              }}
                            ></div>
                            <div className="book-shelf-changer">
                              <select
                                onChange={(e) => {
                                  console.log(e.target.value);
                                  console.log(book);
                                  updateBook(book, e.target.value);
                                  getAllBooks();
                                }}
                              >
                                <option value="none" disabled>
                                  Move to...
                                </option>
                                <option value="currentlyReading">
                                  Currently Reading
                                </option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          {Array.isArray(book.authors)
                            ? book?.authors?.map((auth, idx) => {
                                return (
                                  <div key={idx} className="book-authors">
                                    {auth}
                                  </div>
                                );
                              })
                            : ''}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {wanttReadShelf.map((book, idx) => (
                      <li key={idx}>
                        <div className="book">
                          <div className="book-top">
                            <div
                              className="book-cover"
                              style={{
                                width: 128,
                                height: 193,
                                backgroundImage: `url(${book.imageLinks.thumbnail})`,
                              }}
                            ></div>
                            <div className="book-shelf-changer">
                              <select
                                onChange={(e) => {
                                  console.log(e.target.value);
                                  console.log(book);
                                  updateBook(book, e.target.value);
                                  getAllBooks();
                                }}
                              >
                                <option value="none" disabled>
                                  Move to...
                                </option>
                                <option value="currentlyReading">
                                  Currently Reading
                                </option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          {Array.isArray(book.authors)
                            ? book?.authors?.map((auth, idx) => {
                                return (
                                  <div key={idx} className="book-authors">
                                    {auth}
                                  </div>
                                );
                              })
                            : ''}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {readShelf.map((book) => (
                      <li>
                        <div className="book">
                          <div className="book-top">
                            <div
                              className="book-cover"
                              style={{
                                width: 128,
                                height: 192,
                                backgroundImage: `url(${book.imageLinks.thumbnail})`,
                              }}
                            ></div>
                            <div className="book-shelf-changer">
                              <select
                                onChange={(e) => {
                                  console.log(e.target.value);
                                  console.log(book);
                                  updateBook(book, e.target.value);
                                  getAllBooks();
                                }}
                              >
                                <option value="none" disabled>
                                  Move to...
                                </option>
                                <option value="currentlyReading">
                                  Currently Reading
                                </option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          {Array.isArray(book.authors)
                            ? book?.authors?.map((auth, idx) => {
                                return (
                                  <div key={idx} className="book-authors">
                                    {auth}
                                  </div>
                                );
                              })
                            : ''}{' '}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
