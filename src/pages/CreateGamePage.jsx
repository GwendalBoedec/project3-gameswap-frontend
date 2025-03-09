import axios from "axios";
import API_URL from "../config/API_URL";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

function CreateGamePage() {
    console.log("create game page");
    console.log(API_URL);

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${API_URL}/api/gameslist`, data);
            console.log(response.data);
            alert("data succesfully sent")
            reset(); // Réinitialisation du formulaire après soumission
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
                {errors.title && <p>errors.title.message</p>}
                <p>image url </p> <input
                    {...register("image", { required: "image url is required" })}
                    placeholder="insert image url" />
                {errors.image && <p>errors.image.message</p>}
                <p>console </p> <input
                    {...register("console", { required: "define compatible console" })}
                    placeholder="enter compatible console" />
                {errors.console && <p>errors.console.message</p>}
                <p>Game style </p><input
                    {...register("gameStyle", { required: "define game style" })}
                    placeholder="enter game style" />
                {errors.gameStyle && <p>errors.gameStyle.message</p>}
                <p>Feedback</p><input
                    {...register("ownerFeedback", { required: "provide feedback" })}
                    placeholder="provide some feedback about this game" />
                {errors.ownerFeedback && <p>errors.ownerFeedback.message</p>}
                <p>Year of purchase</p><input
                    {...register("purchaseYear", { required: "provide year of purchase" })}
                    placeholder="indicate year of purchase" />
                {errors.purchaseYear && <p>errors.purchaseYear.message</p>}
                <p>condition</p><input
                    {...register("condition", { required: "evaluate game condition" })}
                    placeholder="evaluate game condition" />
                {errors.condition && <p>errors.condition.message</p>}
                <p>condition certificate</p><input
                    {...register("conditionCertificate", { required: "indicate if game condition has been certificated" })}
                    placeholder="confirm if game condition has been certified" />
                {errors.conditionCertificate && <p>errors.conditionCertificate.message</p>}
                <p>Available for trading?</p><input
                    {...register("availableForTrade", { required: "indicate if game is eligible to trading" })}
                    placeholder="is your game available for trade?" />
                {errors.availableForTrade && <p>errors.availableForTrade.message</p>}

                <button type="submit"> create game </button>
            </form>
        </div>

    )
}

export default CreateGamePage;