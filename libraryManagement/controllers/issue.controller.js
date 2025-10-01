import { Cart } from "../models/Cart.js";
import { Issue } from "../models/Issue.js";

export const checkout = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("books.book");
    if (!cart || cart.books.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const issues = [];

    for (let item of cart.books) {
      const book = item.book;

      if (book.availableCopies <= 0) {
        continue;
      }

      const issue = await Issue.create({
        user: req.user._id,
        book: book._id,
        issuedAt: new Date(),
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) 
      });

      book.availableCopies -= 1;
      await book.save();

      issues.push(issue);
    }

    cart.books = [];
    await cart.save();

    const bill = {
      user: req.user.name,
      totalIssued: issues.length,
      issuedBooks: issues.map((i) => ({
        issueId: i._id,
        bookId: i.book,
        dueDate: i.dueDate
      }))
    };

    res.json({ success: true, message: "Checkout successful", bill });
  } catch (err) {
    next(err);
  }
};


export const returnBook = async (req, res, next) => {
  try {
    const { issueId } = req.body;

    const issue = await Issue.findById(issueId).populate("book");
    if (!issue) {
      return res.status(404).json({ message: "Issue record not found" });
    }

    if (issue.returnedAt) {
      return res.status(400).json({ message: "Book already returned" });
    }

    issue.returnedAt = new Date();

    const lateDays = Math.ceil(
      (issue.returnedAt - issue.dueDate) / (1000 * 60 * 60 * 24)
    );
    if (lateDays > 0) {
      issue.fine = lateDays * 10;
    }

    await issue.save();

    issue.book.availableCopies += 1;
    await issue.book.save();

    res.json({
      success: true,
      message: "Book returned successfully",
      details: {
        book: issue.book.title,
        returnedAt: issue.returnedAt,
        fine: issue.fine
      }
    });
  } catch (err) {
    next(err);
  }
};

export const getMyIssues = async (req, res, next) => {
  try {
    const issues = await Issue.find({ user: req.user._id })
      .populate("book", "title author")
      .sort({ issuedAt: -1 });

    res.json({ success: true, issues });
  } catch (err) {
    next(err);
  }
};

export const getAllIssues = async (req, res, next) => {
  try {
    const issues = await Issue.find()
      .populate("book", "title author")
      .populate("user", "name email")
      .sort({ issuedAt: -1 });

    res.json({ success: true, issues });
  } catch (err) {
    next(err);
  }
};