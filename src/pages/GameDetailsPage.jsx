import axios from "axios";
import { useState, useEffect } from "react";
import API_URL from "../config/API_URL";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function GameDetailsPage() {

    const { gameId } = useParams();
    const [game, setGame] = useState();

    useEffect(() => {
        axios.get(`${API_URL}/api/gameslist/${gameId}`)
        .then((response) => {
            console.log(response.data.title)
            const gameArr = response.data;
            setGame(gameArr);
            console.log(game)
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
            <button>Update item</button>
            <button>Delete item</button>
            <Link to="/"> <button> Back to homepage </button> </Link>
            </>
      
    )}
      </div>
    )
}

export default GameDetailsPage;