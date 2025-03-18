import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { consoleOptions, gameStylesOptions } from "../config/FORMS_OPTIONS";
import Select from "react-select";
import { Button, PasswordInput, Title, MultiSelect } from "@mantine/core";
import "../styles/Forms.css"


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


    const dropdownStyles = {
        control: (styles, {hasValue}) => ({
            ...styles,
            backgroundColor: "#2b2b3c", // Fond du champ sélectionné
            borderColor: "#444", // Bordure plus foncée
            boxShadow: "none",
            ":focus": {
                boxShadow: "none"
            },
            ":hover": {
                borderColor: "#ffd400"
            }, // Bordure dorée au survol
        }),
        menu: (styles) => ({
            ...styles,
            backgroundColor: "#2b2b3c", // Fond de la liste déroulante
        }),
        option: (styles, { isFocused, isSelected }) => ({
            ...styles,
            backgroundColor: isSelected ? "#ffd400" : isFocused ? "#555" : "#2b2b3c", // Fond différent si sélectionné ou survolé
            color: "white", // Texte en blanc
            cursor: "pointer",
        }),
        multiValue: (styles) => ({
            ...styles,
            backgroundColor: "#444", // Fond des tags sélectionnés
        }),
        multiValueLabel: (styles) => ({
            ...styles,
            color: "white", // Texte des tags
        }),
        multiValueRemove: (styles) => ({
            ...styles,
            color: "white",
            ":hover": {
                backgroundColor: "#555",
                color: "#ff5757",
            },
        }),
    };

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        // Create an object representing the request body
        const requestBody = {
            email,
            password,
            username,
            city,
            favoriteConsoles: favoriteConsoles.map(console => console.value),
            favoriteGameStyles: favoriteGameStyles.map(gameStyle => gameStyle.value)
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
        <main>
            <Title order={1} className="form-title">Sign Up</Title>

            <form className="signupLoginForms" onSubmit={handleSignupSubmit}>
                <section className="form-group">
                    <label className="form-label">Email</label>
                    <input
                        className="form-input"
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleEmail}
                    />
                </section>
                <section className="form-group">
                    <label>Password</label>
                    <PasswordInput

                        type="password"
                        name="password"
                        value={password}
                        onChange={handlePassword}
                    />
                </section>
                <section className="form-group">
                    <label className="form-label">Username</label>
                    <input
                        className="form-input"
                        type="text"
                        name="username"
                        value={username}
                        onChange={handleUsername}
                    />
                </section>
                <section className="form-group">
                    <label className="form-label">City</label>
                    <input
                        className="form-input"
                        type="text"
                        name="city"
                        value={city}
                        onChange={handleCity}
                    />
                </section>
                <section className="form-group">
                <label className="form-label">Game style </label>
                    <Select
                        className="form-input"
                        isMulti
                        options={consoleOptions}
                        value={favoriteConsoles}
                        onChange={handleFavoriteConsoles}
                        placeholder="Choose your favorite consoles"
                        styles={dropdownStyles}
                        />
                </section>
                <section className="form-group">
                    <label className="form-label">Game style </label>
                    <Select
                        className="form-input"
                        isMulti
                        options={gameStylesOptions}
                        value={favoriteGameStyles}
                        onChange={handleFavoriteGameStyles}
                        placeholder="Choose your favorite game styles"
                        styles={dropdownStyles}
                        />
                    


                </section>
                <Button color="#5315c6" type="submit">Sign Up</Button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <section className="bottom-button">
                <p>Already have account?</p>
                <Link to={"/login"}> <Button color="#5315c6"> Login </Button></Link>
            </section>
        </main>
    )
}

export default SignupPage;

