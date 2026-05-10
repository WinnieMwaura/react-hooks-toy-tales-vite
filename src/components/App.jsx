import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

const API_URL = "http://localhost:3001/toys";

function App() {
  const [showForm, setShowForm] = useState(false);
  // Central toy state — single source of truth for all toy data
  const [toys, setToys] = useState([]);

  // --- FEATURE: Display all Toys ---
  // When the component mounts, fetch all toys from the backend
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setToys(data));
  }, []); // Empty dependency array = runs once on mount

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  // --- FEATURE: Add a Toy ---
  // When a new toy is created via the form, add it to state
  function handleAddToy(newToy) {
    setToys((prevToys) => [...prevToys, newToy]);
  }

  // --- FEATURE: Like a Toy ---
  // When a toy is liked, update that specific toy's likes in state
  // Preserve array order by mapping over toys and replacing the updated one
  function handleLike(updatedToy) {
    setToys((prevToys) =>
      prevToys.map((toy) => (toy.id === updatedToy.id ? updatedToy : toy))
    );
  }

  // --- FEATURE: Donate (Delete) a Toy ---
  // When a toy is donated, filter it out of state by id
  function handleDelete(deletedId) {
    setToys((prevToys) => prevToys.filter((toy) => toy.id !== deletedId));
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer
        toys={toys}
        onLike={handleLike}
        onDelete={handleDelete}
      />
    </>
  );
}

export default App;
