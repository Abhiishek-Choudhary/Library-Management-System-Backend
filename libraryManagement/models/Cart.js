import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  books: [
    {
      book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
      addedAt: { type: Date, default: Date.now }
    }
  ]
});

export const Cart = mongoose.model("Cart", cartSchema);
