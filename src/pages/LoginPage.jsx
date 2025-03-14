import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Button, PasswordInput, Title } from "@mantine/core";
import "../styles/Forms.css"

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password }
    axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, requestBody)
      .then((response) => {
        // Request to the server's endpoint `/auth/login` returns a response              
        // with the JWT string ->  response.data.authToken
        console.log(response);
        if (!response.data) {
          throw new Error("response.data est undefined !");
        }
        console.log('JWT token', response.data.authToken);
        if (!response.data.authToken) {
          throw new Error("Token manquant dans la réponse !");
        }
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/myprofile")
      })
      .catch((error) => {
        console.error("Erreur Axios :", error);
        const errorDescription = error.response?.data?.message || "Une erreur est survenue.";

        setErrorMessage(errorDescription);
      })
  }

  return (

    <div>
      <Title className="form-title">Login</Title>

      <form className="signupLoginForms" onSubmit={handleLoginSubmit}>
        <div className="form-group">
        <label className="form-label">Email</label>
        <input className="form-input"
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
        />
        </div>
        <div className="form-group">
        <label className="form-label">Password:</label>
        <input
        className="form-input"
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />
        </div>
       
        <Button color="#5315c6" type="submit">Login</Button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="bottom-button">
      <p>Don't have an account yet?</p>
      <Link to={"/signup"}> <Button color="#5315c6"> Sign Up </Button></Link>
      </div>
    </div>

  )

}

export default LoginPage;