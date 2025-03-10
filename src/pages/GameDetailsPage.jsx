import axios from "axios";
import { useState, useEffect } from "react";
import API_URL from "../config/API_URL";
import { useParams, Link, useNavigate } from "react-router-dom";

function GameDetailsPage() {

    const { gameId } = useParams();
    const [game, setGame] = useState();
    const navigate = useNavigate();

    const handleDelete = async (data) => {
        try {
            const response = await axios.delete(`${API_URL}/api/gameslist/${gameId}`);
            console.log(response);
            alert("data succesfully deleted")
            navigate("/")
        } catch (err) {
            console.log(err);
            alert("an error prevents from deleting new item")
        }
    };

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
                    <Link to={`/myprofile/${game._id}/update`}><button>Update item</button></Link>
                    <button onClick={handleDelete}>Delete item</button>
                    <Link to="/"> <button> Send a swap request </button> </Link>
                    <Link to="/"> <button> Back to homepage </button> </Link>
                </>

            )}
        </div>
    )
}

export default GameDetailsPage;