import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import consoleOptions from "../config/FORMS_OPTIONS";
import Select from "react-select";


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
    const handleFavoriteGameStyles = (e) => setFavoriteGameStyles(Array.from(e.target.selectedOptions, option => option.value));

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
        <div className="">
            <h1>Sign Up</h1>

            <form onSubmit={handleSignupSubmit}>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleEmail}
                />

                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handlePassword}
                />

                <label>username:</label>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleUsername}
                />

                <label>City:</label>
                <input
                    type="text"
                    name="city"
                    value={city}
                    onChange={handleCity}
                />

                <label>Favorite Console(s):</label>
                <Select
                    options={consoleOptions}
                    isMulti
                    value={favoriteConsoles}
                    onChange={handleFavoriteConsoles} />


                <label>Favorite Game Style(s):</label>
                <select

                    name="favoriteGameStyles"
                    value={favoriteGameStyles || []}
                    onChange={handleFavoriteGameStyles}
                    multiple>
                    <option value="" disabled> select your favorite game style </option>
                    <option value="adventure"> Adventure </option>
                    <option value="fight"> Fight </option>
                    <option value="FPS"> FPS </option>
                    <option value="platform"> Platform </option>
                    <option value="racing"> Racing </option>
                    <option value="RPG"> RPG </option>
                    <option value="strategy"> Strategy </option>
                </select>

                <button type="submit">Sign Up</button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <p>Already have account?</p>
            <Link to={"/login"}> Login</Link>
        </div>
    )
}

export default SignupPage;

