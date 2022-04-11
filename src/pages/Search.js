import { useState } from "react";
import "./Search.css";
import ResultsContainer from "../Components/ResultsContainer";
import { getBooks } from "../utils/getBooks";

function onChangeHandler(event, setInput) {
  setInput(event.target.value);
}

function Search() {
  const [input, setInput] = useState("");
  const [books, setBooks] = useState(null);

  return (
    <div className="searchpage-parent">
      <h1 className="searchpage-title">Search Books!</h1>

      <input
        onChange={(event) => {
          onChangeHandler(event, setInput);
        }}
        placeholder="Search book"
        className="searchpage-input"
      ></input>

      <div>
        <button
          onClick={() => {
            getBooks(input, setBooks);
          }}
          className="searchpage-search"
        >
          Search
        </button>
      </div>
      {books ? <ResultsContainer books={books} /> : <div>Loading</div>}
    </div>
  );
}

export default Search;
