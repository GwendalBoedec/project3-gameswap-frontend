import axios from "axios";
import API_URL from "../config/API_URL";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";



function CreateGamePage() {
    console.log("create game page");
    console.log(API_URL);

    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const currentYear = new Date().getFullYear();
    const yearsArray = [];
    for (let year = 1990; year <= currentYear; year++) {
        yearsArray.push(year);
    }

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${API_URL}/api/gameslist`, data);
            console.log(response.data);
            alert("data succesfully sent");

            reset(); // Réinitialisation du formulaire après soumission
            navigate("/")
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
                {errors.ownerFeedback && <p>errors.ownerFeedback.message</p>}
                <p>Year of purchase</p><select
                    {...register("purchaseYear", { required: "provide year of purchase" })}
                    placeholder="indicate year of purchase" >
                    {yearsArray.map(year => (

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

                <button type="submit"> create game </button>
            </form>
            <Link to="/"> <button> Back to homepage </button> </Link>
        </div>

    )
}

export default CreateGamePage;