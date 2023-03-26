// "prog_data": [
//     {
//         "uuid": "5988dc46-a4b9-4ae5-83fd-b4bc6cdf9e23",
//         "description": "Математика",
//         "lp_data": [
//             {
//                 "lesson": "Вводное повторение",
//                 "hours": 6,
//                 "labs": 0,
//                 "tests": 1,
//                 "uuid": "b312b8c0-9b6a-432c-b788-cf4d8e24dff0"
//             },
//             ...
//         ]
//     },

import { Schema, model } from "mongoose";

const lessonSchema = new Schema({
    // uuid: { type: Schema.Types.Mixed },
    hours: Number,
    labs: Number,
    tests: Number,
    lesson: String,
});

const schema = new Schema(
    {
        classNum: String,
        description: String,
        lp_data: { type: [lessonSchema] },
    },
    {
        timestamps: true,
    }
);

export default model("ProgrammData", schema);
