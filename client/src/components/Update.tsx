import axios from "axios";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [book, setBook] = React.useState({
    title: "",
    desc: "",
    price: 0,
    cover: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const bookId = location.pathname.split("/")[2];

  React.useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books/"+ bookId);
        setBook(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBook();
  }, [bookId]);

  React.useEffect(() => {
    console.log(book.title)
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleForm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8800/books/"+bookId, book);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form>
      <h1>Add a new book</h1>
      <input
        type="text"
        placeholder="title"
        name="title"
        value={book.title}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="desc"
        name="desc"
        value={book.desc}
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="price"
        name="price"
        value={book.price}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="cover"
        name="cover"
        value={book.cover}
        onChange={handleChange}
      />
      <button onClick={handleForm}>Update</button>
    </form>
  );
};

export default Update;
