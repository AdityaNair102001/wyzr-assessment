import { useEffect, useState } from "react";
import "./Search.css";
import ResultsContainer from "../Components/ResultsContainer";
import getBooks from "../utils/getBooks";
import onChangeHandler from "../utils/onChangeHandler";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import getAccessToken from "../utils/getAccessToken";

function Search() {
  const [input, setInput] = useState("");
  const [books, setBooks] = useState(null);

  // const { code } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  // const [code, setCode] = useState(searchParams.get("code"));

  const navigate = useNavigate();

  let code = searchParams.get("code");
  if (!code) {
    localStorage.setItem("code", code);
  } else {
    navigate("/", { replace: true });
  }

  // searchParams.get("code") ? (code = searchParams.get("code")) : navigate("/");

  useEffect(() => {
    getAccessToken(code, navigate);
  }, []);

  return (
    <div className="searchpage-parent">
      <div className="logout-div">
        <button
          onClick={() => {
            localStorage.removeItem("access_token");
            localStorage.removeItem("id_token");

            navigate("/", { replace: true });
          }}
          className="logout-button"
        >
          Logout
        </button>
      </div>

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
      {books ? <ResultsContainer books={books} /> : <div></div>}
    </div>
  );
}

export default Search;
