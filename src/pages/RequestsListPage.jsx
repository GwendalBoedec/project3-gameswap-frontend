import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API_URL from "../config/API_URL";


function RequestListPage() {

    const [requests, setRequests] = useState([]);
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false)

    const getGameTitle = ((gameId) => {
        const game = games.find((g) => g._id === gameId);
        return game ? game.title : "unknown game"
    })

    const handleReject = async (requestId) => {
        // to avoid multiclicking to delete
        if (loading) return;
        setLoading(true);
        try {
            await axios.delete(`${API_URL}/api/requests/${requestId}`);
            alert("Request successfully rejected");
            setRequests((prevRequests) => prevRequests.filter(req => req._id !== requestId)); // Mise à jour locale de l'état
        } catch (err) {
            console.error("Error rejecting request:", err);
            alert("Failed to reject request.");
        } finally {
            setLoading(false)
        }
    };

    const handleAccept = async (requestedGameId, buyerId, requestId, offeredGameId, sellerId) => {
       // to avoid multiclicking to swap
        if (loading) return;
        setLoading(true);
        try {
            // changer le propriétaire sur le jeu demandé
            await Promise.all([
                axios.put(`${API_URL}/api/gameslist/${requestedGameId}`, {
                    owner: buyerId })
                .catch (err => { throw new Error("error updating requested game owner ID" + err.message); }),
             // changer le propriétaire sur le jeu proposé
             await axios.put(`${API_URL}/api/gameslist/${offeredGameId}`, {
                owner: sellerId })
                .catch (err => { throw new Error("error updating offered game owner ID" + err.message); }),
            ]) 
                      
            // Supprimer la demande après acceptation
            await axios.delete(`${API_URL}/api/requests/${requestId}`)
            .catch (err => { throw new Error("error deleting request" + err.message); });

            alert("Game successfully transferred!");
            setRequests((prevRequests) => prevRequests.filter(req => req._id !== requestId)); // Mise à jour locale
        } catch (err) {
            console.error("Error accepting request:", err);
            alert("Failed to accept request.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const getGamesAndRequests = async () => {

            try {
                const requestsResponse = await axios.get(`${API_URL}/api/requests`);
                console.log(requestsResponse.data);
                setRequests(requestsResponse.data);

                const gamesResponse = await axios.get(`${API_URL}/api/gameslist`);
                console.log(gamesResponse.data);
                setGames(gamesResponse.data);
            }
            catch (err) {
                console.log("something went wrong when retrieving request", err);
            }
        };
        getGamesAndRequests();
    }, [])



    return (
        <div className="">
            {requests?.length > 0 ? (
                requests.map((request, i) => (
                    <div key={i} className="gameDetailsCard">
                        <p>targeted game: {getGameTitle(request.requestedGame?._id)}</p>
                        <p>offer: {getGameTitle(request.offeredGame?._id)}</p>
                        <p>{request.comment}</p>
                        <p>{request.contactDetails}</p>
                        <button onClick={() => handleAccept(request.requestedGame._id, request.offeredGame._id, request._id, request.offeredGame._id, request.requestedGame.owner)}
                            disabled={loading}>
                            {loading ? "Processing..." : "Confirm Swap Deal"}
                        </button>
                        <button onClick={() => handleReject(request._id)} disabled={loading}>
                            {loading ? "Processing..." : "Refuse Swap Deal"}                        
                        </button>
                    </div>
                ))
            ) : (<p>No requests received.</p>)
            }
        </div>
    )
}

export default RequestListPage