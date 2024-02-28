import { useState } from "react";
import "../assets/css/login.css";

function Login({ onLogin, error }) {
  const [username, setUserName] = useState("");
  const [passcode, setPasscode] = useState("");

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUserName(value);
    } else if (name === "passcode") {
      setPasscode(value);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    onLogin(username, passcode);
    setUserName("");
    setPasscode("");
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h1>Using the Power of Storytelling</h1>
        <p>Using the power of narration to provide more immersive and enjoyable language improving experience</p>
      </div>
	  <button className="learnMore">Learn more+</button>
      <div className="login-form">
        <form onSubmit={submitHandler}>
          <div className="input-field">
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onInput={handleInput}
              placeholder="Username"
            />
          </div>
          {/* <div className="input-field">
            <input
              type="password"
              id="passcode"
              name="passcode"
              value={passcode}
              onInput={handleInput}
              placeholder="Passcode"
            />
          </div> */}
          <button type="submit" className="login-btn">Log In -{">"}</button>
        </form>
        	{error && <span className="error-msg">{error}</span>}
      </div>
    </div>
  );
}

export default Login;
