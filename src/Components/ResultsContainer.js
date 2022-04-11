import React from "react";
import Card from "./Card";
import "./ResultsContainer.css";

function ResultsContainer({ books }) {
  console.log(books);

  return (
    <div className="results-container">
      {books.map((book) => {
        return <Card book={book}></Card>;
      })}
    </div>
  );
}

export default ResultsContainer;
