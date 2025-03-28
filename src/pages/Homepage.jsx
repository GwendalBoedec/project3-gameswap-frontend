import axios from "axios";
import { useState, useEffect } from "react";
import "../styles/homepage.css";
import Loader from "../components/Loader.jsx";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";


function Homepage() {

    const [games, setGames] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/gameslist`)
            .then((response) => {
                console.log(response.data);
                const gamesArr = response.data;
                setGames(gamesArr)
            })
            .catch((err) => {
                console.log("ooops error", err)
                setError("Sorry, we are currently unable to display the list of available games in our platform.")
            })

    }, [])

    if (error) {
        return <div>{error}</div>;
    }

    if (games === null) {
        return <Loader />
    }


    return (
        <>
            <header className="header">
                <img className="homelogo" src="/logo swap.png" alt="swapgame logo"></img>
                <section className="textHeader">
                    <h1>Share, Swap & Play!</h1>
                    <h2> GameSwa:p: For the love of gaming, in memory of the good old days</h2>
                    <p> <strong>"The good old days were better." not sure if this statement is true... except for gaming! Whether you're a Nintendo fan or a Sony player, some games of our childhood still bring vibrant memories. At GameSwa:p, we decided to gather people with the same passion for retrogaming and help them bring these memories back. It's time to play!  </strong></p>
                    <Link to={"/signup"}><Button color="#5315c6">Get Started</Button> </Link>
                </section>
            </header>

            <h2>Have a look at some of the games shared by our community</h2>
            <main className="gamesContainer">
                {games.map((game) => {
                    return (

                        <section key={game._id} className="gameCardOverview">
                            <h3>{game.title}</h3>
                            <p><strong> {game.console} </strong> </p>
                            <img src={game.image} alt="game cover" />

                        </section>

                    )
                })}
            </main>
        </>
    )
}

export default Homepage;