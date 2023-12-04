/*
Code Filename: ComplexApplication.js
Description: This code is a complex JavaScript application to handle a book library system. It includes features such as adding, removing, and searching for books, as well as managing book borrowing and returning.
Author: [Your Name]
Date: [Current Date]
*/

// Book object constructor
function Book(title, author, genre, status) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.status = status;
}

// Library object constructor
function Library() {
  this.books = [];

  // Add a book to the library
  this.addBook = function(title, author, genre, status) {
    const book = new Book(title, author, genre, status);
    this.books.push(book);
    console.log(`Book "${book.title}" has been added to the library.`);
  };

  // Remove a book from the library
  this.removeBook = function(title) {
    let index = -1;
    for (let i = 0; i < this.books.length; i++) {
      if (this.books[i].title === title) {
        index = i;
        break;
      }
    }

    if (index !== -1) {
      const removedBook = this.books.splice(index, 1)[0];
      console.log(`Book "${removedBook.title}" has been removed from the library.`);
    } else {
      console.log(`Book "${title}" not found.`);
    }
  };

  // Search for a book by title or author
  this.searchBook = function(query) {
    const foundBooks = [];
    for (let i = 0; i < this.books.length; i++) {
      if (
        this.books[i].title.toLowerCase().includes(query.toLowerCase()) ||
        this.books[i].author.toLowerCase().includes(query.toLowerCase())
      ) {
        foundBooks.push(this.books[i]);
      }
    }

    if (foundBooks.length > 0) {
      console.log(`Found ${foundBooks.length} books:`);
      for (let i = 0; i < foundBooks.length; i++) {
        console.log(`- "${foundBooks[i].title}" by ${foundBooks[i].author}`);
      }
    } else {
      console.log(`No books found matching "${query}".`);
    }
  };

  // Mark a book as borrowed
  this.borrowBook = function(title) {
    let bookFound = false;
    for (let i = 0; i < this.books.length; i++) {
      if (this.books[i].title === title) {
        if (this.books[i].status === 'available') {
          this.books[i].status = 'borrowed';
          console.log(`Book "${this.books[i].title}" has been borrowed.`);
        } else {
          console.log(`Book "${this.books[i].title}" is not available for borrowing.`);
        }
        bookFound = true;
        break;
      }
    }

    if (!bookFound) {
      console.log(`Book "${title}" not found.`);
    }
  };

  // Mark a book as returned
  this.returnBook = function(title) {
    let bookFound = false;
    for (let i = 0; i < this.books.length; i++) {
      if (this.books[i].title === title) {
        if (this.books[i].status === 'borrowed') {
          this.books[i].status = 'available';
          console.log(`Book "${this.books[i].title}" has been returned.`);
        } else {
          console.log(`This book "${this.books[i].title}" is already available in the library.`);
        }
        bookFound = true;
        break;
      }
    }

    if (!bookFound) {
      console.log(`Book "${title}" not found.`);
    }
  };
}

// Create a new library
const myLibrary = new Library();

// Add example books
myLibrary.addBook('The Great Gatsby', 'F. Scott Fitzgerald', 'Fiction', 'available');
myLibrary.addBook('To Kill a Mockingbird', 'Harper Lee', 'Fiction', 'available');
myLibrary.addBook('1984', 'George Orwell', 'Science Fiction', 'available');

// Search for a book
myLibrary.searchBook('Great');

// Borrow a book
myLibrary.borrowBook('The Great Gatsby');

// Return a book
myLibrary.returnBook('The Great Gatsby');

// Remove a book
myLibrary.removeBook('To Kill a Mockingbird');
