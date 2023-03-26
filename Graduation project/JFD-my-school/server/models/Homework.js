// lesson: les_uuid,
// uuid_homework: casual.uuid,
// date: "",
// task: "",

import { Schema, model } from "mongoose";

const schema = new Schema(
    {
        // uuid_homework: { type: String, required: true, unique: true }, воспользуемся _id
        class_id: { type: Schema.Types.ObjectId, ref: "Class", required: true },
        journal_id: { type: Schema.Types.ObjectId, ref: "JournalSubject", required: true },
        uuid_lesson: { type: Schema.Types.ObjectId, ref: "LessonData", required: true },
        date: { type: Date, required: true },
        task: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

export default model("Homework", schema);
