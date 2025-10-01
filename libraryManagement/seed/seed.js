import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import { User } from "../models/User.js";
import { Book } from "../models/Book.js";

dotenv.config();

async function seed() {
  try {
    await connectDB(process.env.MONGO_URI);

    await User.deleteMany();
    await Book.deleteMany();

    const admin = await User.create({
      name: "Admin",
      email: "admin@library.com",
      password: "12345678",
      role: "Librarian"
    });

    const books = await Book.insertMany([
      {
        title: "Clean Code",
        author: "Robert C. Martin",
        isbn: "9780132350884",
        category: "Programming",
        totalCopies: 5,
        availableCopies: 5
      },
      {
        title: "The Pragmatic Programmer",
        author: "Andrew Hunt",
        isbn: "9780201616224",
        category: "Programming",
        totalCopies: 3,
        availableCopies: 3
      }
    ]);

    console.log("Seeded data successfully!");
    console.log("Admin login ->", admin.email, "password: admin123");
    console.log("Books added ->", books.length);

    process.exit(0);
  } catch (err) {
    console.error("Error seeding data:", err);
    process.exit(1);
  }
}

seed();
