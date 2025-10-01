import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  isbn: { type: String, unique: true, required: true },
  category: { type: String },
  totalCopies: { type: Number, required: true, min: 1 },
  availableCopies: { type: Number, required: true, min: 0 },
  createdAt: { type: Date, default: Date.now },
  coverImg: { type: String, default: null }
});

export const Book = mongoose.model("Book", bookSchema);
