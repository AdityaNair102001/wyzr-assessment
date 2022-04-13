import axios from "axios";

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export default async function getAccessToken(
  code,
  navigate,
  setLogin,
  setUsername
) {
  const params = new URLSearchParams();
  params.append("client_id", "vf5064o5alo16krvjd4n83d2p");
  params.append("code", code);
  params.append("grant_type", "authorization_code");
  params.append("redirect_uri", "https://d1v4oztjof20qz.cloudfront.net/search");
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

    const idObj = parseJwt(response.data.id_token);
    setUsername(idObj.name);
    // setLogin(true);
    console.log(idObj);
    localStorage.setItem("id_token", JSON.stringify(response.data.id_token));
    localStorage.setItem(
      "access_token",
      JSON.stringify(response.data.access_token)
    );
    localStorage.setItem("id_token", JSON);

    console.log(response.data);
  } catch (err) {
    console.log(err.message);
    // navigate("/");
  }
}
