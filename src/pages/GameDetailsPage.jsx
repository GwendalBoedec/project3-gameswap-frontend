import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../styles/gameDetailsPage.css";
import { Button } from "@mantine/core";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import Loader from "../components/Loader";

function GameDetailsPage() {

    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    const { gameId } = useParams();
    const [game, setGame] = useState(null);
    const [error, setError] = useState(null);
   

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/gameslist/${gameId}`)
            .then((response) => {
                const gameArr = response.data;
                setGame(gameArr);
            })
            .catch((err) => {
                console.log("oops something went wrong when retrieving game details", err)
                setError("Sorry, we are currently unable to display game details. Please try later.")
            })
    }, []);

    const isOwner = game && game.owner._id === user._id;
  
    if (error) {
        return <div>{error}</div>;
    }
    
    if (game && game.owner === null) {
        return <Loader />
    }

    return (

        <main className="gameDetailsCard">
            {game && (
                <>
                    <h3>{game.title}</h3>
                    <p><strong>console:</strong> {game.console}</p>
                    <p><strong>game style:</strong> {game.gameStyle}</p>
                    <img src={game.image} alt="game cover" />
                    <p> <strong>a word from the owner:</strong> <em>"{game.ownerFeedback}"</em></p>
                    <p><strong>game condition:</strong> {game.condition}</p>
                    <p><strong>Year of purchase:</strong> {game.purchaseYear}</p>
                    <p><strong>Is game condition certificated?</strong> {game.conditionCertificate ? "Yes" : " No"}</p>
                    <p><strong>Is owner ok for swaping?</strong> {game.availableForTrade ? "yes, let's talk!" : "No, unless you have a very good offer!"}</p>
                    {!isOwner && (
                        <Link to={`/gameslist/${game._id}/request`}><Button 
                        style={{ margin: '5px' }} 
                        size="xs"
                        color="#5315c6">Send a swap request</Button></Link>
                    )}
                    <Link to="/myprofile"><Button
                        style={{ margin: '5px' }} 
                        size="xs"
                        color="#5315c6"
                    >Back to myprofile</Button></Link>
                </>

            )}
        </main>
    )
}

export default GameDetailsPage;