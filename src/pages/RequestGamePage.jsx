import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

function RequestGamePage() {

    const navigate = useNavigate()
    const { gameId } = useParams();
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
    const [requestedGame, setRequestedGame] = useState();
    const [availableGames, setAvailableGames] = useState()

    useEffect(() => {

        axios.get(`${import.meta.env.VITE_API_URL}/api/gameslist/${gameId}`)
            .then((requestedGameFromDb) => {
                setRequestedGame(requestedGameFromDb.data)
                console.log(requestedGameFromDb.data)
            })
            .catch((err) => {
                console.log(err, "something went wrong when retrieving game details");
            })
        axios.get(`${import.meta.env.VITE_API_URL}/api/gameslist`)
            .then((allGames) => {
                console.log(allGames.data)
                setAvailableGames(allGames.data)
            })
            .catch((e) => {
                console.log(e, "something went wrong when retrieving all games details");
            })
    }, [gameId])

    useEffect(() => {
        if (requestedGame) {
            setValue("requestedGame", requestedGame._id);
        }
    }, [requestedGame, setValue]);

    const onSubmit = async (newRequest) => {

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/gameslist/${gameId}/requests`,
                newRequest,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
                }
            );
            //console.log(response.newRequest);
            alert("data succesfully sent");

            reset(); // Réinitialisation du formulaire après soumission
            navigate("/myprofile")
        } catch (err) {
            console.log(err);
            alert("an error prevents from creating new item")
        }
    };


    return (
        <div className="">
            <h2>Make your swap offer!</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <p>Targeted game</p>
                <input type="text"
                    value={requestedGame?.title || ""}
                    readOnly />
                <input type="hidden"
                    {...register("requestedGame")}
                    value={requestedGame?._id || ""}
                />
                <p>Offered game</p> <select
                    {...register("offeredGame", { required: "pick a game among your collection" })}
                    defaultValue="" >
                    <option value="" disabled> pick a game among your collection </option>
                    {availableGames?.map((game) => (
                        <option key={game._id} value={game._id}>{game.title}</option>
                    ))}
                </select>

                <p>Message</p> <input {...register("comment", { required: "pick a game among your collection" })}
                    placeholder={`leave a message to the owner of ${requestedGame}`} />
                {errors.comment && <p>{errors.comment.message}</p>}

                <p>Contact Details</p> <input {...register("contactDetails", { required: "add your phonenumber and/or email to get contacted by the owner" })}
                    placeholder="add your phonenumber and/or email to get contacted by the owner" />
                {errors.contactDetails && <p>{errors.contactDetails.message}</p>}

                <button type="submit"> send request </button>
            </form>

        </div>

    )
}

export default RequestGamePage;