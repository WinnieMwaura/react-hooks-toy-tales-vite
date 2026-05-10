import React, { useState } from "react";

const API_URL = "http://localhost:3001/toys";

// ToyForm manages its own local input state and fires onAddToy when done
function ToyForm({ onAddToy }) {
  // Controlled form state — tracks name and image inputs
  const [formData, setFormData] = useState({ name: "", image: "" });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // --- FEATURE: Add a Toy ---
  // When the form is submitted:
  // 1. Make a POST request to create a new toy (likes start at 0)
  // 2. Pass the newly created toy up to App to add to state
  // 3. Reset the form fields
  function handleSubmit(e) {
    e.preventDefault();

    const newToy = {
      name: formData.name,
      image: formData.image,
      likes: 0, // New toys always start with 0 likes
    };

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newToy),
    })
      .then((res) => res.json())
      .then((createdToy) => {
        onAddToy(createdToy);         // Add to App's state
        setFormData({ name: "", image: "" }); // Reset the form
      });
  }

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value={formData.name}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={formData.image}
          onChange={handleChange}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
