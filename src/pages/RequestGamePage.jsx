import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Title, Button } from "@mantine/core";

function RequestGamePage() {

    const navigate = useNavigate()
    const { gameId } = useParams();
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
    const [requestedGame, setRequestedGame] = useState();
    const [userGames, setUserGames] = useState();

    useEffect(() => {

        axios.get(`${import.meta.env.VITE_API_URL}/api/gameslist/${gameId}`)
            .then((requestedGameFromDb) => {
                setRequestedGame(requestedGameFromDb.data)
                console.log(requestedGameFromDb.data)
            })
            .catch((err) => {
                console.log(err, "something went wrong when retrieving game details");
            })
    }, [gameId])

    useEffect(() => {
        if (requestedGame) {
            setValue("requestedGame", requestedGame._id);
        }
    }, [requestedGame, setValue]);

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

            });
    }, [])


    const onSubmit = async (newRequest) => {

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/gameslist/${gameId}/requests`,
                newRequest,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
                }
            );
            //console.log(response.newRequest);
            alert("your request has been sent!");

            reset(); // Réinitialisation du formulaire après soumission
            navigate("/myprofile")
        } catch (err) {
            console.log(err);
            alert("an error prevents from creating new item")
        }
    };


    return (
        <main>
            <Title className="form-title">Make your swap offer!</Title>
            <form className="signupLoginForms" onSubmit={handleSubmit(onSubmit)}>
                <section className="form-group">
                    <label className="form-label">Targeted game</label>
                    <input type="text" className="form-input"
                        value={requestedGame?.title || ""}
                        readOnly />
                </section>
                <section className="form-group">
                    <input type="hidden" className="form-input"
                        {...register("requestedGame")}
                        value={requestedGame?._id || ""}
                    />
                </section>
                <section className="form-group">
                    <label className="form-label">Offered game</label> <select className="form-input"
                        {...register("offeredGame", { required: "pick a game among your collection" })}
                        defaultValue="" >
                        <option value="" disabled> pick a game among your collection </option>
                        {userGames?.map((game) => (
                            <option key={game._id} value={game._id}>{game.title}</option>
                        ))}
                    </select>
                </section>
                <section className="form-group">
                    <label className="form-label">Message</label> <input {...register("comment", { required: "pick a game among your collection" })}
                        className="form-input" placeholder="leave a message to the owner" />
                    {errors.comment && <p>{errors.comment.message}</p>}
                </section>
                <section className="form-group">
                    <label className="form-label">Contact Details</label> <input {...register("contactDetails", { required: "add your phonenumber and/or email to get contacted by the owner" })}
                        className="form-input" placeholder="add your phonenumber and/or email to get contacted by the owner" />
                    {errors.contactDetails && <p>{errors.contactDetails.message}</p>}
                </section>
                <Button color="#5315c6" type="submit"> send request </Button>
            </form>

        </main>

    )
}

export default RequestGamePage;