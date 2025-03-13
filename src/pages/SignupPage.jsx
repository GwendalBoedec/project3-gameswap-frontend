import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {consoleOptions, GameStylesOptions } from "../config/FORMS_OPTIONS";
import Select from "react-select";
import { Button, PasswordInput, Title, MultiSelect } from "@mantine/core";
import "../styles/signupLoginForms.css"


function SignupPage(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [city, setCity] = useState("");
    const [favoriteConsoles, setFavoriteConsoles] = useState([]);
    const [favoriteGameStyles, setFavoriteGameStyles] = useState([]);
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleUsername = (e) => setUsername(e.target.value);
    const handleCity = (e) => setCity(e.target.value);
    const handleFavoriteConsoles = (selectedOptions) => setFavoriteConsoles(selectedOptions || []);
    const handleFavoriteGameStyles = (selectedOptions) => setFavoriteGameStyles(selectedOptions || []);

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        // Create an object representing the request body
        const requestBody = {
            email,
            password,
            username,
            city,
            favoriteConsoles: favoriteConsoles.map(option => option.value),
            favoriteGameStyles
        };

        // Make an axios request to the API
        // If the POST request is a successful redirect to the login page
        // If the request resolves with an error, set the error message in the state
        axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, requestBody)
            .then((response) => {
                navigate("/login")
            })
            .catch((error) => {
                const errorDescription = error.response?.data?.message || "an error occured";
                setErrorMessage(errorDescription);
            })
    };

    return (
        <div >
            <Title order={1} className="form-title">Sign Up</Title>

            <form className="signupLoginForms" onSubmit={handleSignupSubmit}>
                <div className="form-group">  
                    <label className="form-label">Email</label>
                    <input
                        className="form-input"
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleEmail}
                    />
                </div>
                <div className="form-group"> 
                <label>Password</label>
                <PasswordInput
                   
                    type="password"
                    name="password"
                    value={password}
                    onChange={handlePassword}
                />
                 </div>
                <div className="form-group"> 
                <label className="form-label">Username</label>
                <input
                    className="form-input"
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleUsername}
                />
                 </div>
                <div className="form-group"> 
                <label className="form-label">City</label>
                <input
                    className="form-input"
                    type="text"
                    name="city"
                    value={city}
                    onChange={handleCity}
                />
                 </div>
                <div className="form-group"> 
                <label className="form-label">Favorite Console(s)</label>
                <MultiSelect
                    
                    data={consoleOptions}
                    value={favoriteConsoles}
                    onChange={handleFavoriteConsoles}
                    placeholder="choose your favorite consoles"
                    searchable
                    clearable />
                 </div>
                <div className="form-group"> 
                <label className="form-label">Favorite Game Style(s):</label>
                <MultiSelect
                    
                    data={GameStylesOptions}
                    value={favoriteGameStyles}
                    onChange={handleFavoriteGameStyles}
                    placeholder="choose your favorite game styles"
                    searchable
                    clearable />
                </div>
                <Button color="#5315c6" type="submit">Sign Up</Button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="signup-bottom">
            <p>Already have account?</p>
            <Link to={"/login"}> <Button color="#5315c6"> Login </Button></Link>
            </div>
        </div>
    )
}

export default SignupPage;

