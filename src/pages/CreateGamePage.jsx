import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";



function CreateGamePage() {

    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const currentYear = new Date().getFullYear();
    const yearsArray = [];
    for (let year = 1990; year <= currentYear; year++) {
        yearsArray.push(year);
    }

    const onSubmit = async (newGame) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/gameslist`,
                newGame,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
                });

            console.log(response.data);
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
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Title:</label> <input
                    {...register("title", { required: "game title is required" })}
                    placeholder="enter game title" />
                {errors.title && <p>{errors.title.message}</p>}
                <label>image url: </label> <input
                    {...register("image", { required: "image url is required" })}
                    placeholder="insert image url" />
                {errors.image && <p>{errors.image.message}</p>}
                <label>console </label> <select
                    {...register("console", { required: "define compatible console" })}

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
                <label>Game style </label><select
                    {...register("gameStyle", { required: "define game style" })}

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
                <label>Feedback</label><input
                    {...register("ownerFeedback", { required: "provide feedback" })}
                    placeholder="provide some feedback about this game" />
                {errors.ownerFeedback && <p>errors.ownerFeedback.message</p>}
                <label>Year of purchase</label><select
                    {...register("purchaseYear", { required: "provide year of purchase" })}
                    placeholder="indicate year of purchase" >
                    {yearsArray.map(year => (

                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>

                {errors.purchaseYear && <p>{errors.purchaseYear.message}</p>}
                <label>condition</label><select
                    {...register("condition", { required: "evaluate game condition" })}
                    defaultValue="">
                    <option value="" disabled> select the state condition of your game </option>
                    <option value="OK"> OK </option>
                    <option value="good"> Good </option>
                    <option value="very good"> Very good </option>
                    <option value="intact"> Intact </option>
                </select>
                {errors.condition && <p>{errors.condition.message}</p>}
                <label>condition certificate</label><select
                    {...register("conditionCertificate", { required: "indicate if game condition has been certificated" })}
                    defaultValue=""
                    placeholder="confirm if game condition has been certified">
                    <option value="" disabled> confirm if game condition has been certified </option>
                    <option value="true"> Certified </option>
                    <option value="false"> Not Certified </option>
                </select>
                {errors.conditionCertificate && <p>{errors.conditionCertificate.message}</p>}
                <label>Available for trading?</label><select
                    {...register("availableForTrade", { required: "indicate if game is eligible to trading" })}
                    defaultValue="">
                    <option value="" disabled> confirm if game is available for trading </option>
                    <option value="true"> Yes </option>
                    <option value="false"> No, it's too good to be swaped! </option>
                </select>
                {errors.availableForTrade && <p>{errors.availableForTrade.message}</p>}

                <button type="submit"> create game </button>
            </form>
            <Link to="/myprofile"> <button> Back to my profile </button> </Link>
        </div>

    )
}

export default CreateGamePage;