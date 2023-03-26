import { Schema, model } from "mongoose";

const schema = new Schema(
    {
        content: { type: String, required: true },
        // Начей странице находятся комментарии
        pageId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        // Кто оставил комментарий
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    {
        timestamps: { createdAt: "created_at" },
    }
);

export default model("Comment", schema);
