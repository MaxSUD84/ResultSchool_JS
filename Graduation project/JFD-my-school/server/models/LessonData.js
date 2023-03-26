//             {
//                 "lesson": "Вводное повторение",
//                 "hours": 6,
//                 "labs": 0,
//                 "tests": 1,
//                 "uuid": "b312b8c0-9b6a-432c-b788-cf4d8e24dff0"
//             },

import { Schema, model } from "mongoose";

const lessonSchema = new Schema({
    uuid_subject: { type: Schema.Types.ObjectId, ref: "ProgrammData", required: true },
    hours: Number,
    labs: Number,
    tests: Number,
    lesson: String,
});

export default model("LessonData", lessonSchema);
