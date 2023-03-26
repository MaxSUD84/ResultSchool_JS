import { Schema, model } from "mongoose";

const schema = new Schema(
    {
        // uuid: заменим на _id совета ...
        // Начей странице находятся комментарии
        pageId: { type: Schema.Types.ObjectId, ref: "Learner", required: true },
        // Кто оставил комментарий
        from: { type: Schema.Types.ObjectId, ref: "Teacher", required: true },
        //
        topic: String,
        content: String,
    },
    {
        timestamps: true,
    }
);

export default model("Advice", schema);
