import React from "react";

const API_URL = "http://localhost:3001/toys";

// ToyCard receives a single toy object plus handlers for like and delete
function ToyCard({ toy, onLike, onDelete }) {
  const { id, name, image, likes } = toy;

  // --- FEATURE: Like a Toy ---
  // When the like button is clicked:
  // 1. Make a PATCH request to increment this toy's likes by 1
  // 2. Pass the updated toy back up to App to update state
  function handleLike() {
    fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: likes + 1 }),
    })
      .then((res) => res.json())
      .then((updatedToy) => onLike(updatedToy));
  }

  // --- FEATURE: Donate (Delete) a Toy ---
  // When the donate button is clicked:
  // 1. Make a DELETE request to remove this toy from the backend
  // 2. On success, pass the toy's id up to App to remove it from state
  function handleDelete() {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    }).then(() => onDelete(id));
  }

  return (
    <div className="card" data-testid="toy-card">
      <h2>{name}</h2>
      <img
        src={image}
        alt={name}
        className="toy-avatar"
      />
      <p>{likes} Likes </p>
      <button className="like-btn" onClick={handleLike}>
        Like {"<3"}
      </button>
      <button className="del-btn" onClick={handleDelete}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;
