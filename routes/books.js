const express = require("express");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");
const router = express.Router();
/*
 *Route: /books
 *Method:get
 *Description:getting all books
 *Access: public
 *Parameters: none
 */
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Books over here",
    data: books,
  });
});
/*
 *Route: /books/issued
 *Method:get
 *Description:getting books issued
 *Access: public
 *Parameters: none
 */
router.get("/issued", (req, res) => {
  const usersWithIssuedBooks = users.filter((each) => {
    if (each.issuedBook) return each;
  });
  const issuedbooks = [];
  usersWithIssuedBooks.forEach((each) => {
    const book = books.find((book) => book.id === each.issuedBook);
    book.issuedBy = each.name;
    book.issuedDate = each.issuedDate;
    book.returnDate = each.returnDate;
    issuedbooks.push(book);
  });

  if (issuedbooks.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No issued book",
    });
  }
  return res.status(200).json({
    success: true,
    message: "issued books over here",
    data: issuedbooks,
  });
});
/*
 *Route: /books/:id
 *Method:get
 *Description:getting book by id
 *Access: public
 *Parameters: id
 */
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((each) => each.id === id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "book doesnt exist",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Books found by id",
    data: books,
  });
});

module.exports = router;
