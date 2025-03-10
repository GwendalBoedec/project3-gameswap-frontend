import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API_URL from "../config/API_URL";


function RequestListPage() {

    const [requests, setRequests] = useState([]);
    const [games, setGames] = useState([]);

    const getGameTitle = ((gameId) => {
        const game = games.find((g) => g._id === gameId);
        return game ? game.title : "unknown game"
    })

    const handleReject = async (requestId) => {
        try {
            await axios.delete(`${API_URL}/api/requests/${requestId}`);
            alert("Request successfully rejected");
            setRequests((prevRequests) => prevRequests.filter(req => req._id !== requestId)); // Mise à jour locale de l'état
        } catch (err) {
            console.error("Error rejecting request:", err);
            alert("Failed to reject request.");
        }
    };

    const handleAccept = async (gameId, newOwnerId, requestId) => {
        try {
            await axios.patch(`${API_URL}/api/gameslist/${gameId}`, {
                owner: newOwnerId
            });

            // Supprimer la demande après acceptation
            await axios.delete(`${API_URL}/api/requests/${requestId}`);

            alert("Game successfully transferred!");
            setRequests((prevRequests) => prevRequests.filter(req => req._id !== requestId)); // Mise à jour locale
        } catch (err) {
            console.error("Error accepting request:", err);
            alert("Failed to accept request.");
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
                        <button onClick={() => handleAccept(request.requestedGame, request.offeredBy, request._id)}>
                            Confirm Swap Deal
                        </button>
                        <button onClick={() => handleReject(request._id)}>
                            Refuse Swap Deal
                        </button>
                    </div>
                ))
            ) : (<p>No requests received.</p>)
            }
        </div>
    )
}

export default RequestListPage