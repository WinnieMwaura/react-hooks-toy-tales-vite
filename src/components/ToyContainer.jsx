import React from "react";
import ToyCard from "./ToyCard";

// ToyContainer receives the full toy list and CRUD handlers from App
// It renders a ToyCard for each toy, passing down the relevant props
function ToyContainer({ toys, onLike, onDelete }) {
  return (
    <div id="toy-collection">
      {toys.map((toy) => (
        <ToyCard
          key={toy.id}
          toy={toy}
          onLike={onLike}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default ToyContainer;
