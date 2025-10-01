import { Book } from "../models/Book.js";
import { Issue } from "../models/Issue.js";
import cloudinary from "../config/cloudinary.js";

export const addBook = async (req, res, next) => {
  try {
    const { title, author, isbn, category, totalCopies, coverImg } = req.body;

    if (!title || !author || !isbn || !totalCopies) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const existing = await Book.findOne({ isbn });
    if (existing) {
      return res.status(400).json({ message: "Book with this ISBN already exists" });
    }

    let uploadedCoverImg = null;

    if (coverImg) {
      const result = await cloudinary.uploader.upload(coverImg, {
        folder: "library/books"
      });
      uploadedCoverImg = result.secure_url;
    }

    const book = await Book.create({
      title,
      author,
      isbn,
      category,
      totalCopies,
      availableCopies: totalCopies,
      coverImg: uploadedCoverImg
    });

    res.status(201).json({ success: true, book });
  } catch (err) {
    next(err);
  }
};


export const deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    await book.deleteOne();

    res.json({ success: true, message: "Book deleted successfully" });
  } catch (err) {
    next(err);
  }
};


export const bookReport = async (req, res, next) => {
  try {
    const { sortBy, author } = req.query;

    let filter = {};
    if (author) filter.author = author;

    const issues = await Issue.aggregate([
      { $lookup: { from: "books", localField: "book", foreignField: "_id", as: "bookInfo" } },
      { $unwind: "$bookInfo" },
      { $match: filter },
      {
        $group: {
          _id: "$bookInfo._id",
          title: { $first: "$bookInfo.title" },
          author: { $first: "$bookInfo.author" },
          issueCount: { $sum: 1 },
          issuedBy: { $push: "$user" }
        }
      },
      { $sort: { issueCount: sortBy === "least" ? 1 : -1 } }
    ]);

    res.json({ success: true, report: issues });
  } catch (err) {
    next(err);
  }
};

export const browseBooks = async (req, res, next) => {
  try {
    const { title, author, category } = req.query;

    let filter = {};
    if (title) filter.title = new RegExp(title, "i");
    if (author) filter.author = new RegExp(author, "i");
    if (category) filter.category = new RegExp(category, "i");

    const books = await Book.find(filter).select("-__v");

    res.json({ success: true, books });
  } catch (err) {
    next(err);
  }
};
