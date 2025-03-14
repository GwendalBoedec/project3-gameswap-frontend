import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../styles/gameDetailsPage.css";
import { Button } from "@mantine/core";


function GameDetailsPage() {

    const { gameId } = useParams();
    const [game, setGame] = useState();
    const navigate = useNavigate();

    const handleDelete = async (data) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/gameslist/${gameId}`);
            console.log(response);
            alert("data succesfully deleted")
            navigate("/")
        } catch (err) {
            console.log(err);
            alert("an error prevents from deleting new item")
        }
    };

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/gameslist/${gameId}`)
            .then((response) => {
                console.log(response.data.title)
                const gameArr = response.data;
                setGame(gameArr);
                console.log(response.data.conditionCertificate)
            })
            .catch((err) => {
                console.log("oops something went wrong when retrieving game details", err)
            })
    }, []);

    return (

        <div className="gameDetailsCard">
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
                    <Link to={`/gameslist/${game._id}/request`}><Button 
                        style={{ margin: '5px' }} 
                        size="xs"
                        color="#5315c6">Send a swap request</Button></Link>
                    <Link to="/myprofile"><Button
                        style={{ margin: '5px' }} 
                        size="xs"
                        color="#5315c6"
                    >Back to myprofile</Button></Link>
                </>

            )}
        </div>
    )
}

export default GameDetailsPage;