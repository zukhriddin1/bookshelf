import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import getUser from "../service/getUser";

interface Book {
  id: number;
  title: string;
  author: string;
  status: string;
}

const Bookshelf: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [bookTitle, setBookTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleAddBook = () => {
    const newBook: Book = {
      id: new Date().getTime(),
      title: bookTitle,
      author: author,
      status: status,
    };

    setBooks([...books, newBook]);
    setBookTitle("");
    setAuthor("");
    setStatus("");
  };

  const handleEditStatus = (id: number, newStatus: string) => {
    const updatedBooks = books.map((book) =>
      book.id === id ? { ...book, status: newStatus } : book
    );

    setBooks(updatedBooks);
  };

  const handleDeleteBook = (id: number) => {
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
  };

  useEffect(() => {
    const user = getUser();
    if (!user) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <h2>Bookshelf</h2>
      <div>
        <TextField
          label="Book Title"
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)}
        />
        <TextField
          label="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <FormControl>
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value as string)}
          >
            <MenuItem value="unread">Unread</MenuItem>
            <MenuItem value="reading">Reading</MenuItem>
            <MenuItem value="read">Read</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" onClick={handleAddBook}>
          Add Book
        </Button>
      </div>
      <div>
        {books.map((book) => (
          <Card key={book.id}>
            <CardContent>
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>Status: {book.status}</p>
            </CardContent>
            <CardActions>
              <Button
                onClick={() => handleEditStatus(book.id, "read")}
                disabled={book.status === "read"}
              >
                Mark as Read
              </Button>
              <Button onClick={() => handleDeleteBook(book.id)}>Delete</Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Bookshelf;
