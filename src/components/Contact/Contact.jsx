import React, { useEffect, useState } from 'react';
import './contact.css';
import axios from 'axios';

const apiUrl = 'http://localhost:8080';

const Contact = () => {
  const [user, setUser] = useState({
    phoneNumber: '',
    email: '',
    firstName: '',
    lastName: ''
  });

  const [response, setResponse] = useState([]);
  const [contactResponse, setContactResponse] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/elvis/login`, user);
      setContactResponse(JSON.stringify(res.data));
    } catch (error) {
      setContactResponse(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/elvis/login/${id}`);
      setResponse(response.filter(contact => contact.id !== id));
    } catch (error) {
      console.error("There was an error deleting the contact!", error);
    }
  };

  const handleUpdate = async (id) => {
    // Implement update logic here
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${apiUrl}/elvis/login`);
        setResponse(res.data);
      } catch (error) {
        setResponse([]);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='database'>
      <div className='form'>
        <h1>Enter your Phone Number</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={handleChange}
            placeholder='Enter your mobile number'
            className='input-number'
          />
          <input
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            placeholder='Enter your first Name'
            className='input-number'
          />
          <input
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            placeholder='Enter your last Name'
            className='input-number'
          />
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder='Enter your email'
            className='input-number'
          />
          <button type="submit">SAVE Contact</button>
        </form>
        <h1>{contactResponse}</h1>
      </div>
      <div className='form-display'>
        <h1>Contacts</h1>
        {response.length > 0 ? response.map((contact, index) => (
          <div className='contact' key={index}>
            <h2 className='contact-number'>{contact.phoneNumber}</h2>
            <h2 className='contact-number'>{contact.firstName}</h2>
            <h2 className='contact-number'>{contact.lastName}</h2>
            <h2 className='contact-number'>{contact.email}</h2>
            <button onClick={() => handleDelete(contact.id)}>Delete</button>
            <button onClick={() => handleUpdate(contact.id)}>Update</button>
          </div>
        )) : <p>No contacts available</p>}
      </div>
    </div>
  );
}

export default Contact;
