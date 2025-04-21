import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('https://web-dep-backend.vercel.app/api/books');
        
        if (!response.ok) {
          throw new Error(`HTTP error!! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setBooks(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (isLoading) {
    return <div className="loading">Loading books...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="app">
      <header>
        <h1>Book List Application</h1>
      </header>
      <main>
        <div className="book-list">
          {books.map(book => (
            <div key={book.id} className="book-card">
              <h2>{book.title}</h2>
              <p className="author">By: {book.author}</p>
              <p className="year">Published: {book.year}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
