

export class Library {
  constructor() {
    this.books = [];
    this.purchaseList = [];
  }

  getBook(value, key = "id") {
    const result = this.books.filter((book) => book[key] === value);
    return result.length ? result : null;
  }

  addBook(book) {
    // TO DO  --  לפתוח לאחר שיש את הפונקצייה --
    // const isValid = validateBook(book);
    // if (!isValid.status) return 'Book not valid'

    const bookfromData = this.getBook(book.id);
    if (bookfromData) return "Book is alredy exist";
    this.books.push(book);
    console.log({ bookAdded: book });
    return "Book added.";
  }

  removeBook(bookId) {
    const book = this.getBook(bookId);
    if (!book) return "Book is not exist";

    const bookindex = this.books.indexOf(book);
    this.books.splice(bookindex, 1);
    console.log({ bookDeleted: book });
    return true;
  }
}
