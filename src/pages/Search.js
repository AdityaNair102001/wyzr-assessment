import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../AuthProvider";
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

  const [searchParams, setSearchParams] = useSearchParams();

  const [username, setUsername] = useState(null);

  // const [code, setCode] = useState(searchParams.get("code"));

  let code = searchParams.get("code");
  console.log(code);

  // const { login, setLogin } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (code) {
      getAccessToken(code, navigate, setUsername);
    } else {
      if (!localStorage.getItem("access_token")) {
        navigate("/");
      }
    }

    // getAccessToken(code, navigate, setLogin);
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

      {username ? <h1>{username}</h1> : <h2>Logging out</h2>}

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
