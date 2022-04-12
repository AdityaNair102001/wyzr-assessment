import { useEffect, useState } from "react";
import "./Search.css";
import ResultsContainer from "../Components/ResultsContainer";
import getBooks from "../utils/getBooks";
import onChangeHandler from "../utils/onChangeHandler";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

function Search() {
  const [input, setInput] = useState("");
  const [books, setBooks] = useState(null);

  // const { code } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  let code = searchParams.get("code");

  console.log(code);

  async function getAccessToken() {
    const params = new URLSearchParams();
    params.append("client_id", "vf5064o5alo16krvjd4n83d2p");
    params.append("code", code);
    params.append("grant_type", "authorization_code");
    params.append(
      "redirect_uri",
      "https://d1v4oztjof20qz.cloudfront.net/search"
    );
    console.log(params);
    // axios.post("/foo", params);
    try {
      const response = await axios.post(
        "https://d1v4oztjof20qz.auth.ap-south-1.amazoncognito.com/oauth2/token",
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic dmY1MDY0bzVhbG8xNmtydmpkNG44M2QycDoxZGU5ZHE4bjU0b3IzMmo0aW1oMGx0c2RjOWtlaXNuc2E5NzN2bTFuamNxcGVhZm0xOXYw`,
          },
        }
      );

      localStorage.setItem("id_token", JSON.stringify(response.data.id_token));
      localStorage.setItem(
        "access_token",
        JSON.stringify(response.data.access_token)
      );

      console.log(response.data);
    } catch (err) {
      console.log(err.message);
      // navigate("/");
    }
  }

  useEffect(() => {
    getAccessToken();
  }, []);

  return (
    <div className="searchpage-parent">
      <div className="logout-div">
        <button
          onClick={() => {
            localStorage.removeItem("access_token");
            localStorage.removeItem("id_token");

            navigate("/");
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
