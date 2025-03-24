import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/myprofile.css";
import { Button } from "@mantine/core";
import Loader from "../components/Loader";


function MyProfile() {

    const [userGames, setUserGames] = useState(null);
    const [users, setUsers] = useState([]);
    const [sentRequests, setSentRequests] = useState([]);
    const [receivedRequests, setReceivedRequests] = useState([]);
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const getUserData = () => {
        
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

    };


    useEffect(() => {getUserData()}, [])
    //magaging game delete
    
    const handleGameDelete = async (gameId) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/gameslist/${gameId}`);
            console.log(response);
            alert("data succesfully deleted");
           getUserData();
        } catch (err) {
            console.log(err);
            alert("an error prevents from deleting new item")
        }
    };



    // to manage deal acceptation
    const handleAccept = async (requestedGameId, offeredGameId, requestId, buyerId, sellerId) => {
        // Vérifie la validité des IDs
        console.log(requestedGameId, offeredGameId, buyerId, sellerId)

        // to avoid multiclicking to swap
        if (loading) return;
        setLoading(true);
        try {
            // Update owner for requested and offered games
            /* await  Promise.all([
                axios.put(`${import.meta.env.VITE_API_URL}/api/gameslist/${requestedGameId}`, { owner: buyerId}),
                axios.put(`${import.meta.env.VITE_API_URL}/api/gameslist/${offeredGameId}`, { owner:  sellerId})
            ]); */

            await axios.put(`${import.meta.env.VITE_API_URL}/api/gameslist/swap`, {

                requestedGameId,
                offeredGameId,
                buyerId,
                sellerId,
            })
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error("Erreur lors de l'échange:", error);
                });

            // Delete the request after accepting
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/requests/${requestId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
            });

            alert("Game successfully transferred!");

            // updating user Games after swap
            const gamesResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/myprofile/games`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
            })

            setUserGames(gamesResponse.data);

            // Updating requests
            setReceivedRequests((prevRequests) => prevRequests.filter(req => req._id !== requestId));
            setSentRequests((prevRequests) => prevRequests.filter(req => req._id !== requestId));

            // Update all users data to vehiculate new changes of ownership
            await axios.get(`${import.meta.env.VITE_API_URL}/api/users`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
            })

                .then((response) => {
                    setUsers(response.data);
                })
                .catch((err) => {
                    console.error("Error refreshing community data:", err);
                });

           // navigate("/myprofile")

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

    if (userGames === null) {
        return <Loader />
    }

    return (
    <>
        <header className="textHeader">
        <h1> What's up? </h1>
        <h2> My Game Collection </h2>

        </header>

        <div className="profileContainer">
           
            {errorMessage && <p>{errorMessage}</p>}
            {userGames.length > 0 ? (
                userGames.map((game) => (
                    <section key={game._id} className="gameCardOverview">
                        <p><strong>{game.title}</strong> </p>
                        <img src={game.image} alt="game cover"/>
                        <Link to={`/gameslist/${game._id}`}><Button style={{ margin: '5px' }} size="xs" color="#5315c6"> check more details</Button></Link>
                        <Link to={`/myprofile/${game._id}/update`}><Button style={{ margin: '5px' }} size="xs" color="#5315c6">Update game?</Button></Link>
                        <Button style={{ margin: '5px' }} size="xs" color="#bb0b0b" onClick={() => handleGameDelete(game._id)}>Delete item</Button>
                    </section>
        
                ))
            ) : (
                <p>You haven't added any games yet.</p>
            )}
            
            </div>
            <section className="add-button"> 
            <Link to="/myprofile/addgame">
                <Button color="#5315c6">Want to expose a new game?</Button>
            </Link>
            </section>
            <section className="textHeader">
            <h2> My Open Swap Requests </h2>
            <h3>Received Requests</h3>
            </section>
            <div className="profileContainer">
            {receivedRequests.length > 0 ? (
                receivedRequests.map((receivedRequest) => (
                    <section key={receivedRequest._id} className="gameCardOverview">
                        <p><strong>Request Sent By</strong> </p> 
                        <p> {receivedRequest.createdBy.username}</p>
                        <p><strong>Game Targeted</strong> </p>
                        <p>  {receivedRequest.requestedGame.title}</p>
                        <img src={receivedRequest.requestedGame.image} alt="game cover" />
                        <p><strong>Game offered for swapping</strong> </p>
                        <p>  {receivedRequest.offeredGame.title}</p>
                        <p><strong>Message from {receivedRequest.createdBy.username}</strong> </p>
                        <p>   {receivedRequest.comment}</p>
                        <p><strong>Contact details of the requestor</strong> </p>
                        <p>   {receivedRequest.contactDetails}</p>
                        <Button
                            style={{ margin: '5px' }} 
                            size="xs"
                            color="#5315c6"
                            onClick={() => handleAccept(receivedRequest.requestedGame._id, receivedRequest.offeredGame._id, receivedRequest._id, receivedRequest.offeredGame.owner, receivedRequest.requestedGame.owner)}
                            disabled={loading}
                            key={`accept-${receivedRequest._id}`}
                        >
                            {loading ? "Processing..." : "Confirm Swap Deal"}
                        </Button>
                        <Button 
                        style={{ margin: '5px' }} 
                        size="xs"
                        color="#5315c6"
                        onClick={() => handleReject(receivedRequest._id)}
                            disabled={loading}
                            key={`reject-${receivedRequest._id}`}>
                            {loading ? "Processing..." : "Refuse Swap Deal"}
                        </Button>
                    </section>
               


                ))
            ) : (
                <p>Sorry, you haven't received any swap requests yet.</p>
            )}
             </div>
             <section className="textHeader">
            <h3>Sent Requests</h3>
            </section>
            <div className="profileContainer">
            {sentRequests.length > 0 ? (
                sentRequests.map((sentRequest) => (
                    <section key={sentRequest._id} className="gameCardOverview">
                        {sentRequest.requestedGame ? (
                            <>
                                <p><strong>Game targeted</strong> </p>
                                <p> {sentRequest.requestedGame.title}</p>
                                <img src={sentRequest.requestedGame.image} alt="game cover" />
                                <p><strong>Game offered for swapping</strong> </p>
                                <p>{sentRequest.offeredGame.title}</p>
                                <p><strong>My Message</strong> </p>
                                <p>{sentRequest.comment}</p>
                                <p><strong>Contact provided</strong> </p>
                                <p>{sentRequest.contactDetails}</p>
                            </>
                        ) : (
                            <p>Sent request details are missing</p>
                        )}
                       
                    </section>
                ))
            ) : (
                <section className="bottom-button">
                <p>You haven't sent any swap requests yet. Want to have a look at the games of our community? </p>
                <Link to="/community"> <Button color="#5315c6">Check Our Community</Button> </Link>
                </section>

            )}
            </div>
        
        </>
    )
}



export default MyProfile