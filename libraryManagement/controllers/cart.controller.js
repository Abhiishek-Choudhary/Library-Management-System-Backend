import { Cart } from "../models/Cart.js";
import { Book } from "../models/Book.js";

export const addToCart = async (req, res, next) => {
  try {
    const { bookId } = req.body;

    const book = await Book.findById(bookId);
    if (!book || book.availableCopies <= 0) {
      return res.status(400).json({ message: "Book not available" });
    }

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, books: [] });
    }

    cart.books.push({ book: bookId });
    await cart.save();

    res.json({ success: true, cart });
  } catch (err) {
    next(err);
  }
};

export const saveForLater = async (req, res, next) => {
  try {
    const { bookId } = req.body;

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(400).json({ message: "Cart not found" });

    cart.books = cart.books.filter((b) => b.book.toString() !== bookId);

    await cart.save();

    res.json({ success: true, message: "Book saved for later (removed from cart)" });
  } catch (err) {
    next(err);
  }
};
