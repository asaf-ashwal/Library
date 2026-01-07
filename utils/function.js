export function validateBook(book) {

    let failed = false;
    const toChange = {}

    if (typeof (book) !== 'object') {
        failed = true;
        toChange.book = `book must be an object`
    } else {
        const {
            id,
            title,
            category,
            copies,
            minCopies,
            expiresAt
        } = book
        if (!id || typeof (id) !== 'string' || id.length < 1) {
            failed = true;
            toChange.id = "id is missing or not a string";
        }
        if (!title || typeof (title) !== 'string' || title.length < 1) {
            failed = true;
            toChange.title = "title is missing or not a string"
        }
        if (!category || !Array.isArray(category) || category.length < 1) {
            failed = true;
            toChange.category = "category is missing or not an array"
        } else {
            for (let i = 0; i < category.length; i++) {
                const element = category[i];
                if (!element || typeof (element) !== 'string' || element.length < 1) {
                    failed = true;
                    toChange.category = "vars of category is missing or not a string"
                }
            }
        }
        if (!copies || isNaN(copies) || copies < 1) {
            failed = true;
            toChange.copies = "copies is missing or not a number"
        }
        if (!minCopies || isNaN(minCopies) || minCopies < 1) {
            failed = true;
            toChange.minCopies = "minCopies is missing or not a number"
        }
        if (!expiresAt || typeof (expiresAt) !== 'string' || expiresAt.length < 1) {
            if (expiresAt !== null) {
                failed = true;
                toChange.expiresAt = "expiresAt is missing or not a string or not set as null"
            }
        }
    }
    if (failed) {
        return { vlidity: false, message: `book is invalid here's why `, toChange }
    }
    return { vlidity: true, message: `book's valid, well done champ!` }
}

export function normalizeBook(book) {
    book.title = book.title.trim()
    book.category = book.category.trim()
    book.copies = Number(book.copies)
    book.minCopies = Number(book.minCopies)
    book.expiresAt = book.expiresAt.trim()
    if (!book.copies || !book.minCopies) return `Error: Unable to clean`
    return book
};