import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom";

function MyProfile() {

    const [userGames, setUserGames] = useState([]);
    const [sentRequests, setSentRequests] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        // get user's games
        axios.get(`${import.meta.env.VITE_API_URL}/api/myprofile/games`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
        })
            .then((gamesFromDB) => {
                console.log("games arr owned by user", gamesFromDB.data);
                setUserGames(gamesFromDB.data)
            })
            .catch((err) => {
                console.log("something wrong happened when retrieving user's games", err)
                setErrorMessage("apologies, we are currently not able to load your game collection")
            });
        // get user's sent requests
        axios.get(`${import.meta.env.VITE_API_URL}/api/myprofile/sentRequests`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
        })
            .then((sentRequestsFromDB) => {
                console.log("sent requests in database", sentRequestsFromDB.data)
                setSentRequests(sentRequestsFromDB.data)
            })
            .catch((err) => {
                console.log("error while retrieving your sent requests", err)
            });
        // get user's received requests
        axios.get(`${import.meta.env.VITE_API_URL}/api/myprofile/sentRequests`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
        })
            .then((sentRequestsFromDB) => {
                console.log("sent requests in database", sentRequestsFromDB.data)
                setSentRequests(sentRequestsFromDB.data)
            })
            .catch((err) => {
                console.log("error while retrieving your sent requests", err)
            })
    }, [])
    return (
        <>
            <h1> my profile </h1>
            <h2> my games </h2>
            {errorMessage && <p>{errorMessage}</p>}
            {userGames.length > 0 ? (
                userGames.map((game) => (
                    <div key={game._id} className="gameCardOverview">
                        <p><strong>Title:</strong> {game.title}</p>
                        <img src={game.image} alt="game cover" />
                        <Link to={`/gameslist/${game._id}`}> <button> check more details </button> </Link>
                    </div>


                ))
            ) : (
                <p>You haven't added any games yet.</p>
            )}
            <Link to="/myprofile/addgame">
                <button>Want to expose a new game?</button>
            </Link>
            <h2> my opened requests </h2>
            <h3>Received Requests</h3>
            <h3>Sent Requests</h3>
            {sentRequests.length > 0 ? (
                sentRequests.map((sentRequest) => (
                    <div key={sentRequest._id} className="gameCardOverview">
                        <p><strong>Game targeted:</strong> {sentRequest.requestedGame.title}</p>
                        <img src={sentRequest.requestedGame.image} alt="game cover" />
                        <p><strong>Game offered for swapping:</strong> {sentRequest.offeredGame.title}</p>
                        <Link to={`/`}> <button> check more details </button> </Link>
                    </div>


                ))
            ) : (
                <p>You haven't sent any swap requests yet.</p>
            )}
        </>
    )
}



export default MyProfile