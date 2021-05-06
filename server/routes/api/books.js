const express = require("express");
const router = express.Router();

const Book = require("../../models/Book");

// Get all books
router.get("/", (req, res) => {
  Book.find()
    .then((books) =>
      books.length > 0
        ? res.json(books)
        : res.json({ success: false, error: "No Books found" })
    )
    .catch((err) =>
      res.status(404).json({ success: false, error: "No Books found" })
    );
});

// Get single book by id
router.get("/:id", (req, res) => {
  Book.findById(req.params.id)
    .then((book) => res.json(book))
    .catch((err) =>
      res
        .status(404)
        .json({ success: false, error: "There is no book with that id" })
    );
});

// Create a new book
router.post("/", (req, res) => {
  Book.create(req.body)
    .then((book) =>
      res.json({ success: true, message: "Book added successfully" })
    )
    .catch((err) => res.status(400).json({ error: "Could not add this book" }));
});

// Update specific book by id
router.put("/:id", (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body)
    .then((book) => res.json({ msg: "Book updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update this book" })
    );
});

// Delete book by id
router.delete("/:id", (req, res) => {
  Book.findByIdAndRemove(req.params.id, req.body)
    .then((book) => res.json({ mgs: "Book deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "No Book found" }));
});

module.exports = router;
