// {
//     "title": "5К",
//     "uuid": "1da79643-e2ec-4b94-baf6-9c365ff67a62",
//     "description": "Класс 5К",
//     "group_mentor": "e65cb94e-2a2a-4c90-af28-b27707c70c44",
//     "study_program": [
//       {
//         "uuid": "5988dc46-a4b9-4ae5-83fd-b4bc6cdf9e23",
//         "name": "Математика",
//         "teacher_uuid": "a58d08d8-38f9-4b45-9422-a979d5b79d33"
//       },
//       ...
//     ],
//     "learners_list": [
//       "c1fe30c4-6c23-4ae1-900e-379e4af329bd",
//       ...
//       "cc8af0e1-5607-4e61-ae69-bffdee04677a"
//     ]
//   },

import { Schema, model } from "mongoose";

const SubjectProgrammSchema = new Schema({
    uuid: { type: Schema.Types.ObjectId, ref: "ProgrammData" },
    name: { type: String },
    teacher_uuid: { type: Schema.Types.ObjectId, ref: "Teacher" },
});

const schema = new Schema(
    {
        // uuid: { type: String, required: true, unique: true },
        title: { type: String },
        description: { type: String },
        group_mentor: { type: Schema.Types.ObjectId, ref: "Teacher" },
        study_subjects: { type: [SubjectProgrammSchema] },
        learners_list: { type: [{ type: Schema.Types.ObjectId, ref: "Learners" }] },
    },
    {
        timestamps: true,
    }
);

export default model("Class", schema);
