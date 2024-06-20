import React, { useState } from "react";
import axios from "axios";
import "../css/address.css"; // Import the CSS file

function Address() {
  const [formData, setFormData] = useState({
    username: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, street, city, state, postalCode, country } = formData;
    axios
      .post(`http://localhost:8081/api/v1/target/${username}/address`, {
        street,
        city,
        state,
        postalCode,
        country,
      })
      .then((response) => {
        console.log("Address submitted successfully:", response.data);
      })
      .catch((error) => {
        console.error("There was an error submitting the address:", error);
      });
  };

  return (
    <div>
      <header className="header">
        <img src={require("../images.png")} alt="Logo" className="logo" />{" "}
        <h3>Address Form</h3>
      </header>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Street:</label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>City:</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>State:</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Postal Code:</label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Country:</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Address;
