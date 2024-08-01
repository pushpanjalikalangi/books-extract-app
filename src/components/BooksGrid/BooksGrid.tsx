import React, { useState, useEffect } from 'react';
import './BooksGrid.scss';

const BooksGrid = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [sortConfig, setSortConfig] = useState({ key: 'title', direction: 'ascending' });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('/getextracts?titlecontains=s');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setBooks(data.Extracts);
    } catch (error: any) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Show loader while loading
  if (loading) {
    return <div className='table-container'>Loading...</div>;
  }

  const sortBooks = (key:any) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    const sortedBooks = [...books].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });
    setBooks(sortedBooks);
    setSortConfig({ key, direction });
  };


  return (
    <div className="table-container">
      <table className='table'>
      <thead>
          <tr>
            <th>#</th>
            <th onClick={() => sortBooks('title')}>
             Title
            </th>
            <th onClick={() => sortBooks('title')}>
             Author
            </th>
            <th>Cover</th>
            <th onClick={() => sortBooks('title')}>
             Reading Time (min)
            </th>
            <th onClick={() => sortBooks('title')}>
             Publication Date
            </th>
            <th>Biography</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book:any, index) => (
            <tr key={book.isbn}>
              <td>{index + 1}</td>
              <td>
                <a href={`https://extracts.panmacmillan.com/extract?isbn=${book.isbn}`} target="_blank" rel="noopener noreferrer">
                  {book.title}
                </a>
              </td>
              <td>{book.author}</td>
              <td>
              <a href={`https://extracts.panmacmillan.com/extract?isbn=${book.isbn}`} target="_blank" rel="noopener noreferrer">

                <img src={book.jacketUrl} alt={book.title} style={{ width: '50px', height: '75px' }} />
                </a>
              </td>
              <td>{book.estimatedReadingTimeMinutes}</td>
              <td>{formatPublicationDate(book.publicationDate)}</td>
              <td>{stripHtml(book.authorBiography)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksGrid;

const formatPublicationDate = (date: any) => {
  const d = new Date(date);
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear().toString().slice(-2)}`;
};

const stripHtml = (html:any) => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
};