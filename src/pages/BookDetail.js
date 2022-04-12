import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./BookDetail.css";

async function getBookDetail(id, setBookDetail) {
  try {
    const bookDetail = await axios.get(
      "https://www.googleapis.com/books/v1/volumes/" + id
    );
    setBookDetail(bookDetail.data);
    console.log(bookDetail.data);
  } catch (err) {
    console.log(err);
  }
}

function BookDetail() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [bookDetail, setBookDetail] = useState(null);

  console.log("book id is", id);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/");
    }

    getBookDetail(id, setBookDetail);
  }, []);

  return (
    <div>
      {bookDetail ? (
        <div>
          <div className="box1">
            <div className="imageHolder">
              <img
                className="bookImage"
                alt="no preview"
                src={
                  bookDetail.volumeInfo?.imageLinks?.small
                    ? bookDetail.volumeInfo.imageLinks.small
                    : bookDetail.volumeInfo.imageLinks.thumbnail
                }
              ></img>
            </div>

            <div className="bookDetails">
              <h2 className="bookTitle">{bookDetail.volumeInfo.title}</h2>

              <h3 className="bookAuthors">
                {bookDetail.volumeInfo.authors.map((author) => {
                  return <span>By {author} </span>;
                })}
              </h3>

              <span className="bookPublishedDate">
                {bookDetail.volumeInfo.publishedDate}
              </span>

              <p className="bookRating">
                Average Rating:{" "}
                {bookDetail.volumeInfo.averageRating
                  ? bookDetail.volumeInfo.averageRating
                  : "no rating"}
                /5
              </p>
            </div>
          </div>

          <div className="bookDescription">
            <h2>Description</h2>
            {bookDetail.volumeInfo.description}
          </div>
        </div>
      ) : (
        <div>Loading book..</div>
      )}
    </div>
  );
}

export default BookDetail;
