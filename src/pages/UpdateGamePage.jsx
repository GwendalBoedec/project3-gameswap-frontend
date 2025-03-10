import axios from "axios";
import { useState, useEffect } from "react";
import API_URL from "../config/API_URL";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

function UpdateGamePage() {
    console.log("update game page");
    console.log(API_URL);

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
                const response = await axios.get(`${API_URL}/api/gameslist/${gameId}`);
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
            const response = await axios.put(`${API_URL}/api/gameslist/${gameId}`, data);
            console.log(response.data);
            alert("data succesfully sent")
            reset(); // Réinitialisation du formulaire après soumission
            navigate(`/gameslist/${gameId}`)
        } catch (err) {
            console.log(err);
            alert("an error prevents from creating new item")
        }
    };

    return (
        <div className="">
            <form onSubmit={handleSubmit(onSubmit)}>
                <p>Title</p> <input
                    {...register("title", { required: "game title is required" })}
                    placeholder="enter game title" />
                {errors.title && <p>{errors.title.message}</p>}
                <p>image url </p> <input
                    {...register("image", { required: "image url is required" })}
                    placeholder="insert image url" />
                {errors.image && <p>{errors.image.message}</p>}
                <p>console </p> <select
                    {...register("console", { required: "define compatible console" })}
                    //placeholder="enter compatible console" 
                    defaultValue="">
                    <option value="" disabled> select compatible console for this game </option>
                    <option value="gameboy"> Gameboy </option>
                    <option value="gameboy advanced"> Gameboy advanced </option>
                    <option value="gamecube"> Gamecube </option>
                    <option value="NES"> NES </option>
                    <option value="nintendo 64"> Nintendo 64 </option>
                    <option value="super nintendo"> Super Nintendo </option>
                    <option value="playstation 1"> Playstation 1 </option>
                    <option value="playstation 2"> Playstation 2 </option>
                    <option value="PSP"> PSP </option>
                    <option value="Xbox"> Xbox </option>
                </select>
                {errors.console && <p>{errors.console.message}</p>}
                <p>Game style </p><select
                    {...register("gameStyle", { required: "define game style" })}
                    //placeholder="enter game style" 
                    defaultValue=""
                >
                    <option value="" disabled> select main style of the game </option>
                    <option value="adventure"> Adventure </option>
                    <option value="fight"> Fight </option>
                    <option value="FPS"> FPS </option>
                    <option value="platform"> Platform </option>
                    <option value="racing"> Racing </option>
                    <option value="RPG"> RPG </option>
                    <option value="strategy"> Strategy </option>
                </select>

                {errors.gameStyle && <p>{errors.gameStyle.message}</p>}
                <p>Feedback</p><input
                    {...register("ownerFeedback", { required: "provide feedback" })}
                    placeholder="provide some feedback about this game" />
                {errors.ownerFeedback && <p>{errors.ownerFeedback.message}</p>}
                <p>Year of purchase</p><select
                    {...register("purchaseYear", { required: "provide year of purchase" })}
                    defaultValue={simplifiedDate || ""} >
                    <option value="" disabled>Select the year</option>
                    {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
                {errors.purchaseYear && <p>{errors.purchaseYear.message}</p>}
                <p>condition</p><select
                    {...register("condition", { required: "evaluate game condition" })}
                    defaultValue="">
                    <option value="" disabled> select the state condition of your game </option>
                    <option value="ok"> OK </option>
                    <option value="good"> Good </option>
                    <option value="very good"> Very good </option>
                    <option value="intact"> Intact </option>
                </select>
                {errors.condition && <p>{errors.condition.message}</p>}
                <p>condition certificate</p><select
                    {...register("conditionCertificate", { required: "indicate if game condition has been certificated" })}
                    defaultValue=""
                    placeholder="confirm if game condition has been certified">
                    <option value="" disabled> confirm if game condition has been certified </option>
                    <option value="true"> Certified </option>
                    <option value="false"> Not Certified </option>
                </select>
                {errors.conditionCertificate && <p>{errors.conditionCertificate.message}</p>}
                <p>Available for trading?</p><select
                    {...register("availableForTrade", { required: "indicate if game is eligible to trading" })}
                    defaultValue="">
                    <option value="" disabled> confirm if game is available for trading </option>
                    <option value="true"> Yes </option>
                    <option value="false"> No, it's too good to be swaped! </option>
                </select>
                {errors.availableForTrade && <p>{errors.availableForTrade.message}</p>}

                <button type="submit"> update game </button>
            </form>
            <Link to={`/gameslist/${gameId}`}> <button> Back to game details </button> </Link>
        </div>
    )
}

export default UpdateGamePage;