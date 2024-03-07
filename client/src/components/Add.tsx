import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const [book, setBook] = React.useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });

  const navigate = useNavigate();

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setBook((prev) => ({...prev, [e.target.name]: e.target.value }));
  };

  const handleForm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/books", book);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form>
      <h1>Add a new book</h1>
      <input type="text" placeholder='title' name='title' onChange={handleChange}/>
      <input type="text" placeholder='desc' name='desc' onChange={handleChange}/>
      <input type="number" placeholder='price' name='price' onChange={handleChange}/>
      <input type="text" placeholder='cover' name='cover' onChange={handleChange}/>
      <button onClick={handleForm}>Add</button>
    </form>
  )
}

export default Add