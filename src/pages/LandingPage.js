import "./LandingPage.css";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="landingpage-parent">
      <div className="logo-holder">
        <img className="logo" src={logo}></img>
      </div>

      <div className="login-holder">
        <h1>Login</h1>
        {/* <Link to="https://d1v4oztjof20qz.auth.ap-south-1.amazoncognito.com/login?client_id=vf5064o5alo16krvjd4n83d2p&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://d1v4oztjof20qz.cloudfront/search">
          {" "}
        </Link> */}

        <a href="https://d1v4oztjof20qz.auth.ap-south-1.amazoncognito.com/login?client_id=vf5064o5alo16krvjd4n83d2p&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://d1v4oztjof20qz.cloudfront.net/search">
          {" "}
          <button className="login-button">Login with google</button>
        </a>
      </div>
    </div>
  );
}
