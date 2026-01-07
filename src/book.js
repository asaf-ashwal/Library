import { v4 as uuidv4 } from "uuid"

export class Book {
    constructor(titel, category, copies, minCopies, expiresAt) {
        this.id = uuidv4()
        this.titel = titel
        this.category = category
        this.copies = copies
        this.minCopies = minCopies
        this.expiresAt = expiresAt
    }
}