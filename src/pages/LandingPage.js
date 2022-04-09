import "./LandingPage.css";
import logo from "../assets/logo.svg";
export default function LandingPage() {
  return (
    <div className="landingpage-parent">
      <div className="logo-holder">
        <img className="logo" src={logo}></img>
      </div>

      <div className="login-holder">
        <h1>Login</h1>
      </div>
    </div>
  );
}
