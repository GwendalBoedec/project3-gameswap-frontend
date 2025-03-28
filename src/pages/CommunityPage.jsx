import { useEffect, useState } from "react"
import axios from "axios"
import Loader from "../components/Loader"
import { Link } from "react-router-dom";

function CommunityPage() {

    const [users, setUsers] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/users`,
            {
                headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
            }
        )
            .then((response) => {
                console.log(response.data);
                const userArr = response.data;
                setUsers(userArr)
            })
            .catch((err) => {
                console.log("ooops error while retrieving list of users", err)
                setError("Sorry, we are currently unable to display the Communinity. Please try again later.");
            })

    }, [])

    if (error) {
        return <div>{error}</div>;
    }

    if (users === null) {
        return <Loader />
    }


    return (
        <>
            <h1>Check other players profiles!</h1>

            <main className="gamesContainer">
                {users?.map((user) => {
                    return (

                        <section key={user._id} className="gameCardOverview">
                            <h3>{user.username}</h3>
                            <p><strong>city:</strong> {user.city}</p>
                            <p><strong>favorite game style(s)</strong> </p>
                            <p>{user.favoriteGameStyles.join(", ")}</p>
                            <p><strong>favorite console(s)</strong> </p>
                            <p>{user.favoriteConsoles.join(", ")}</p>
                            <p><strong>Current game collection</strong> </p>
                            <p> {user.ownedGames.length} game(s)</p>
                            <section>{user.ownedGames?.length > 0 ? (
                                user.ownedGames.map((game) => (
                                    <p className="game-list-container" key={game._id}>
                                        <Link className="game-list" to={`/gameslist/${game._id}`}> {game.title} </Link>
                                    </p>
                                ))
                            ) : (
                                <span className="game-check">No games available</span>
                            )}
                            </section>
                        </section>

                    )
                })}
            </main>
        </>

    )
}

export default CommunityPage