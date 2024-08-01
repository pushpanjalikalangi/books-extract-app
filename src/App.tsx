import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import BookTable from './components/BooksGrid/BooksGrid';

function App() {
  return (
    <div className="App">
        <Header />
        <BookTable />
        <Footer />
    </div>
  );
}

export default App;

