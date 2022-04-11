import React from "react";
import "./Card.css";

function Card({ book }) {
  return (
    <div className="card-holder">
      <div className="card-smallThumbnail">
        <img
          alt="No thumbnail"
          src={
            book.volumeInfo.imageLinks?.smallThumbnail
              ? book.volumeInfo.imageLinks?.smallThumbnail
              : ""
          }
          width="100%"
        ></img>
      </div>
      <div className="card-title">{book.volumeInfo.title}</div>
      <div className="card-author">
        {book?.volumeInfo?.authors ? book.volumeInfo.authors[0] : ""}
      </div>
      <div className="card-published">
        •{book?.volumeInfo?.publishedDate?.substring(0, 4)}
      </div>
    </div>
  );
}

export default Card;
