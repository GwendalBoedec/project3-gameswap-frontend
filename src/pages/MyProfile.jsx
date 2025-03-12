import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function MyProfile() {

    const [userGames, setUserGames] = useState([]);
    const [users, setUsers] = useState([]);
    const [sentRequests, setSentRequests] = useState([]);
    const [receivedRequests, setReceivedRequests] = useState([]);
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

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

        // get user's received requests
        axios.get(`${import.meta.env.VITE_API_URL}/api/myprofile/receivedRequests`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
        })
            .then((receivedRequestsFromDB) => {
                console.log("received requests in database", receivedRequestsFromDB.data)
                setReceivedRequests(receivedRequestsFromDB.data)
                console.log(receivedRequestsFromDB.data.length)
            })
            .catch((err) => {
                console.log("error while retrieving your sent requests", err)
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

    }, [])

    // to manage deal acceptation
    const handleAccept = async (requestedGameId, offeredGameId, requestId, buyerId, sellerId) => {
        // to avoid multiclicking to swap
        if (loading) return;
        setLoading(true);
        try {
            // Update owner for requested and offered games
            await Promise.all([
                axios.put(`${import.meta.env.VITE_API_URL}/api/gameslist/${requestedGameId}`, { owner: buyerId}),
                axios.put(`${import.meta.env.VITE_API_URL}/api/gameslist/${offeredGameId}`, { owner:  sellerId})
            ]);

            // Delete the request after accepting
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/requests/${requestId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
            });

            alert("Game successfully transferred!");

                 // 3️⃣ Mettre à jour les jeux du user connecté
        const gamesResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/myprofile/games`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
        })

        setUserGames(gamesResponse.data);

        // 4️⃣ Mettre à jour la liste des requêtes
        setReceivedRequests((prevRequests) => prevRequests.filter(req => req._id !== requestId));
        setSentRequests((prevRequests) => prevRequests.filter(req => req._id !== requestId));

        // 5️⃣ Rafraîchir les données utilisateurs pour que l'autre utilisateur voie aussi la mise à jour
        await axios.get(`${import.meta.env.VITE_API_URL}/api/users`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
        })
        
        .then((response) => {
            setUsers(response.data);
        })
        .catch((err) => {
            console.error("Error refreshing community data:", err);
        });

        navigate("/myprofile")

        } catch (err) {
            console.error("Error accepting request:", err);
            alert("Failed to accept request.");
        } finally {
            setLoading(false);
        }
    };

    // to manage request delete
    const handleReject = async (requestId) => {
        // to avoid multiclicking to delete
        if (loading) return;
        setLoading(true);
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/requests/${requestId}`,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
                }
            );
            alert("Request successfully rejected");
            setReceivedRequests((prevRequests) => prevRequests.filter(req => req._id !== requestId)); // Mise à jour locale de l'état

        } catch (err) {
            console.error("Error rejecting request:", err);
            alert("Failed to reject request.");
        } finally {
            setLoading(false)
        }
    };

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
            <h2> My Open Requests </h2>
            <h3>Received Requests</h3>
            {receivedRequests.length > 0 ? (
                receivedRequests.map((receivedRequest) => (
                    <div key={receivedRequest._id} className="gameCardOverview">
                        <p><strong>Game Targeted:</strong> {receivedRequest.requestedGame.title}</p>
                        <img src={receivedRequest.requestedGame.image} alt="game cover" />
                        <p><strong>Game offered for swapping:</strong> {receivedRequest.offeredGame.title}</p>
                        <button
                         
                            onClick={() => handleAccept(receivedRequest.requestedGame._id, receivedRequest.offeredGame._id, receivedRequest._id, receivedRequest.offeredGame.owner, receivedRequest.requestedGame.owner)}
                            disabled={loading}
                            key={`accept-${receivedRequest._id}`}
                        >
                            {loading ? "Processing..." : "Confirm Swap Deal"}
                        </button>
                        <button onClick={() => handleReject(receivedRequest._id)}
                            disabled={loading}
                            key={`reject-${receivedRequest._id}`}>
                            {loading ? "Processing..." : "Refuse Swap Deal"}
                        </button>
                    </div>


                ))
            ) : (
                <p>You haven't received any swap requests yet.</p>
            )}
            <h3>Sent Requests</h3>
            {sentRequests.length > 0 ? (
                sentRequests.map((sentRequest) => (
                    <div key={sentRequest._id} className="gameCardOverview">
                        {sentRequest.requestedGame ? (
                            <>
                                <p><strong>Game targeted:</strong> {sentRequest.requestedGame.title}</p>
                                <img src={sentRequest.requestedGame.image} alt="game cover" />
                                <p><strong>Game offered for swapping:</strong> {sentRequest.offeredGame.title}</p>
                            </>
                        ) : (
                            <p>Sent request details are missing</p>
                        )}
                        <Link to={`/`}> <button>Check more details</button> </Link>
                    </div>
                ))
            ) : (
                <p>You haven't sent any swap requests yet.</p>
            )}
        </>
    )
}



export default MyProfile