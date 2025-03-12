import axios from "axios";
import { useState, useEffect } from "react";
import "../styles/homepage.css";
import Loader from "../components/Loader.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


function Homepage() {

    const gameId = { useParams };
    const [games, setGames] = useState(null);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/gameslist`)
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

            <h2> For the love of gaming, in memory of the good old days</h2>
            <p>"The good old days were better..." not sure if this statement is true, except for gaming! Whether you're a Nintendo fan or a Sony player, some games of our childhood still bring vibrant memories. At GameSwa:p, we decided to gather people with the same passion for retrogaming and help them bringing these memories back. It's time to play!</p>
            <Link to={"/signup"}><button>Get Started</button> </Link>


            <h2>share, swap and play!</h2>
            <h3>Have a look at some of the games shared by our community</h3>
            <div className="gamesContainer">
                {games.map((game, i) => {
                    return (

                        <div key={i} className="gameCardOverview">
                            <h3>{game.title}</h3>
                            <p><strong>console:</strong> {game.console}</p>
                            <p><strong>game style:</strong> {game.gameStyle}</p>
                            <img src={game.image} alt="game cover" />
                            <p> <strong>a word from the owner:</strong> <em>"{game.ownerFeedback}"</em></p>

                        </div>

                    )
                })}
            </div>
        </>
    )
}

export default Homepage;