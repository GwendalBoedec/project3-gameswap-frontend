import axios from "axios";
import { useState, useEffect } from "react";
import API_URL from "../config/API_URL";
import "../styles/homepage.css";
import Loader from "../components/Loader.jsx";


function Homepage() {

    const [games, setGames] = useState(null);

    useEffect(() => {
        axios.get(`${API_URL}/api/gameslist`)
            .then((response) => {
                console.log(response.data);
                const gamesArr = response.data;
                setGames(gamesArr)
            })
            .catch((err) => {
                console.log("ooops error", err)
            })

    }, [])

    if (games === null) {
        return <Loader />
    }


    return (
        <>
            <h1>GameSwa:p</h1>
            <h2>share, swap and play!</h2>
            <h3>Have a look at some of the games shared by our community</h3>
            {games.map((game, i) => {
                return (
                    <div key={i} className="gameCardOverview">
                        <h3>{game.title}</h3>
                        <p>console: {game.console}</p>
                        <p>game style: {game.gameStyle}</p>
                        <img src={game.image} alt="game cover" />
                    </div>
                )
            })}
            <h2> GameSwa:p, for the love of gaming, in memory of the good old days</h2>
            <p>"The good old days were better..." not sure if this statement is true, except for gaming! Whether you're a Nintendo fan or a Sony player, some games of our childhood still bring vibrant memories. At GameSwa:p, we decided to gather people with the same passion for retrogaming and help them bringing these memories back. It's time to play!</p>
            <button>Get Started</button>
        </>
    )
}

export default Homepage;