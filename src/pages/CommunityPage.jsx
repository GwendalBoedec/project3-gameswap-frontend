import { useEffect, useState } from "react"
import axios from "axios"
import Loader from "../components/Loader"
import { Link } from "react-router-dom";

function CommunityPage() {

    const [users, setUsers] = useState();

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
            })

    }, [])

    if (users === null) {
        return <Loader />
    }


    return (
        <>
            <h1>Check other players profiles!</h1>

            <div className="gamesContainer">
                {users?.map((user) => {
                    return (

                        <div key={user._id} className="gameCardOverview">
                            <h3>{user.username}</h3>
                            <p><strong>city:</strong> {user.city}</p>
                            <p><strong>favorite game style(s):</strong> {user.favoriteGameStyles}</p>
                            <p><strong>favorite console(s):</strong> {user.favoriteConsoles}</p>
                            <p><strong>Current game collection:</strong> {user.ownedGames?.length > 0 ? (
                                user.ownedGames.map((game) => (
                                    <Link key={game._id} to={`/gameslist/${game._id}`}> {game.title} </Link>
                                ))
                            ) : (
                                <span>No games available</span>
                            )}
                            </p>
                        </div>

                    )
                })}
            </div>
        </>

    )
}

export default CommunityPage