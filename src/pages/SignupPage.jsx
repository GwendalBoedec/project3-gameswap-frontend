import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../config/API_URL";


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
    const handleFavoriteConsoles = (e) => setFavoriteConsoles(Array.from(e.target.selectedOptions, option => option.value));
    const handleFavoriteGameStyles = (e) => setFavoriteGameStyles(Array.from(e.target.selectedOptions, option => option.value));

    const handleSignupSubmit = (e) => {
        e.preventDefault();
         // Create an object representing the request body
         const requestBody = { email, password, username, city, favoriteConsoles, favoriteGameStyles };

        // Make an axios request to the API
    // If the POST request is a successful redirect to the login page
    // If the request resolves with an error, set the error message in the state
        axios.post(`${API_URL}/auth/signup`, requestBody)
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
                <select 
                    
                    name="favoriteConsoles"
                    value={favoriteConsoles || []}
                    onChange={handleFavoriteConsoles}
                    multiple>
                    <option value="" disabled> select your favorite console </option>
                    <option value="gameboy"> Gameboy </option>
                    <option value="gameboy advanced"> Gameboy advanced </option>
                    <option value="gamecube"> Gamecube </option>
                    <option value="NES"> NES </option>
                    <option value="nintendo 64"> Nintendo 64 </option>
                    <option value="super nintendo"> Super Nintendo </option>
                    <option value="playstation 1"> Playstation 1 </option>
                    <option value="playstation 2"> Playstation 2 </option>
                    <option value="PSP"> PSP </option>
                    <option value="Xbox"> Xbox </option>
                </select>

                <label>Favorite Game Style(s):</label>
                <select 
                    
                    name="favoriteGameStyles"
                    value={favoriteGameStyles || []}
                    onChange= {handleFavoriteGameStyles}
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
            { errorMessage && <p className="error-message">{errorMessage}</p> }
    
            <p>Already have account?</p>
            <Link to={"/login"}> Login</Link>
        </div>
)
}

export default SignupPage;

