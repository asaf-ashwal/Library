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

  getLowCopyBooks() {
    const result = [];
    this.books.forEach((book) => {
      if (book.copies < book.minCopies) {
        result.push({ ...book, amount: book.minCopies - book.copies });
      }
      if (result.length) {
        result.sort(function (a, b) {
          return a.copies / a.minCopies - b.copies / b.minCopies;
        });
      }
      return result;
    });
  }

  getExpiringBooks(daysAhead) {
    const today = new Date();
    const expayerDate = new Date(today);
    const result = [];
    expayerDate.setDate(expayerDate.getDate() + daysAhead);

    this.books.forEach((book) => {
      if (book.expiresAt < expayerDate) {
        result.push({ ...book, amount: book.copies });
      }
      if (result.length) {
        result.sort(function (a, b) {
          return a.copies / a.minCopies - b.copies / b.minCopies;
        });
      }
      return result;
    });

    // const result = this.books.filter((book) => book.expiresAt < expayerDate);
    // return result;
  }

  generatePurchaseList() {
    const expirBooks = getExpiringBooks();
    const lowCopyBooks = getLowCopyBooks();
    expirBooks.forEach((book) => {
      const tempBook = this.purchaseList.find(
        (inBook) => book.title === inBook.title
      );
      if (tempBook) {
        tempBook.amountToBuy += book.amount;
        if (tempBook.reason !== "expiring_soon") tempBook.reason = "both";
      } else {
        this.purchaseList.push({
          title: book.title,
          category: book.category,
          amountToBuy: book.amount,
          reason: "expiring_soon",
        });
      }
    });
    lowCopyBooks.forEach((book) => {
      const tempBook = this.purchaseList.find(
        (inBook) => book.title === inBook.title
      );
      if (tempBook) {
        tempBook.amountToBuy += book.amount;
        if (tempBook.reason !== "low_copies") tempBook.reason = "both";
      } else {
        this.purchaseList.push({
          title: book.title,
          category: book.category,
          amountToBuy: book.amount,
          reason: "low_copies",
        });
      }
    });
  }

  searchBooks(query) {
    const titleRes = this.getBook(query, "title");
    const categoryRes = this.getBook(query, "category");
    return titleRes || categoryRes;
  }

  getLibrarySummary() {
    const expirBooks = getExpiringBooks();
    const lowCopyBooks = getLowCopyBooks();
    return {
      totalBooks: this.books,
      totalCopies: this.books.reduce((b1, b2) => b1.copies + b2.copies, 0),
      lowCopyCount: lowCopyBooks,
      expiringSoonCount: expirBooks,
    };
  }
}
