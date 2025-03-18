import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Title, Button } from "@mantine/core";
import { gameStylesOptions, consoleOptions, conditionOptions } from "../config/FORMS_OPTIONS";

function UpdateGamePage() {

    const navigate = useNavigate();
    const { gameId } = useParams();

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const [years, setYears] = useState([]);
    const [simplifiedDate, setSimplifiedDate] = useState(null);

    useEffect(() => {

        const currentYear = new Date().getFullYear();
        const yearsArray = [];
        for (let year = 1990; year <= currentYear; year++) {
            yearsArray.push(year);
        }
        setYears(yearsArray);

        const getGameDetails = async (data) => {

            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/gameslist/${gameId}`);
                console.log(response.data);
                const fullDate = response.data.purchaseYear;
                const simplifiedDate = new Date(fullDate).getFullYear();
                setSimplifiedDate(simplifiedDate);
                const updatedData = {
                    ...response.data,
                    purchaseYear: simplifiedDate
                }

                reset(updatedData);

            } catch (err) {
                console.log("oops something wrong happened when retrieving game details", err);
                alert("an error prevents from getting item details")

            };
        };
        getGameDetails();

    }, [gameId, reset]) //reload when gameId changes

    const onSubmit = async (data) => {

        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/gameslist/${gameId}`, data);
            console.log(response.data);
            alert("game succesfully updated")
            reset(); // Réinitialisation du formulaire après soumission
            navigate(`/gameslist/${gameId}`)
        } catch (err) {
            console.log(err);
            alert("an error prevents from updating game")
        }
    };

    return (
        <div>
            <Title className="form-title"> Need an update?</Title>
            <form className="signupLoginForms" onSubmit={handleSubmit(onSubmit)}>
                <label className="form-label">Title</label> <input className="form-input"
                    {...register("title", { required: "game title is required" })}
                    placeholder="enter game title" />
                {errors.title && <p>{errors.title.message}</p>}
                <label className="form-label">image url </label> <input className="form-input"
                    {...register("image", { required: "image url is required" })}
                    placeholder="insert image url" />
                {errors.image && <p>{errors.image.message}</p>}
                <label className="form-label">console </label> <select className="form-input"
                    {...register("console", { required: "define compatible console" })}
                    //placeholder="enter compatible console" 
                    defaultValue="">
                    <option value="" disabled> select compatible console for this game </option>
                    {consoleOptions.map((console) => (
                        <option key={console.value} value={console.value}>
                            {console.label}
                        </option>
                    ))}
                </select>
                {errors.console && <p>{errors.console.message}</p>}
                <label className="form-label">Game style </label><select className="form-input"
                    {...register("gameStyle", { required: "define game style" })}
                    //placeholder="enter game style" 
                    defaultValue=""
                >
                    <option value="" disabled> select main style of the game </option>
                    {gameStylesOptions.map((gameStyle) => (
                        <option key={gameStyle.value} value={gameStyle.value}> {gameStyle.label} </option>
                    ))}
                </select>

                {errors.gameStyle && <p>{errors.gameStyle.message}</p>}
                <label className="form-label">Feedback</label><input className="form-input"
                    {...register("ownerFeedback", { required: "provide feedback" })}
                    placeholder="provide some feedback about this game" />
                {errors.ownerFeedback && <p>{errors.ownerFeedback.message}</p>}
                <label>Year of purchase</label><select className="form-input"
                    {...register("purchaseYear", { required: "provide year of purchase" })}
                    defaultValue={simplifiedDate || ""} >
                    <option value="" disabled>Select the year</option>
                    {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
                {errors.purchaseYear && <p>{errors.purchaseYear.message}</p>}
                <label className="form-label">condition</label><select className="form-input"
                    {...register("condition", { required: "evaluate game condition" })}
                    defaultValue="">
                    <option value="" disabled> select the state condition of your game </option>
                    {conditionOptions.map((condition) => (
                        <option key={condition.value} value={condition.value}>{condition.label}</option>
                    ))}
                </select>
                {errors.condition && <p>{errors.condition.message}</p>}
                <label className="form-label">condition certificate</label><select className="form-input"
                    {...register("conditionCertificate", { required: "indicate if game condition has been certificated" })}
                    defaultValue=""
                    placeholder="confirm if game condition has been certified">
                    <option value="" disabled> confirm if game condition has been certified </option>
                    <option value="true"> Certified </option>
                    <option value="false"> Not Certified </option>
                </select>
                {errors.conditionCertificate && <p>{errors.conditionCertificate.message}</p>}
                <label className="form-label">Available for trading?</label><select className="form-input"
                    {...register("availableForTrade", { required: "indicate if game is eligible to trading" })}
                    defaultValue="">
                    <option value="" disabled> confirm if game is available for trading </option>
                    <option value="true"> Yes </option>
                    <option value="false"> No, it's too good to be swaped! </option>
                </select>
                {errors.availableForTrade && <p>{errors.availableForTrade.message}</p>}
                <div className="update-button">
                    <Button color="#5315c6" type="submit"> update game </Button>
                </div>
            </form>
            <div className="bottom-button">
                <Link to={`/gameslist/${gameId}`}> <Button color="#5315c6"> Back to game details </Button> </Link>
            </div>
        </div>
    )
}

export default UpdateGamePage;