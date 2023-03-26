// {
//     uuid: "", // subject - learning programm
//     subject: "", // subject - name
//     topics: [
//       {
//         uuid_lesson: "",
//         uuid_homeworks: [""],
//         uuid_progress: [""],
//       },
//     ],
//   }

import { Schema, model } from "mongoose";

const schema = new Schema(
    {
        uuid: { type: Schema.Types.ObjectId, ref: "ProgrammData", required: true }, // subject - learning programm
        subject: { type: String }, // subject - name
        uuid_class: { type: Schema.Types.ObjectId, ref: "Class", required: true }, // class
        topics: [
            {
                uuid_lesson: { type: Schema.Types.ObjectId, ref: "LessonData", required: true },
                uuid_homeworks: [Schema.Types.Mixed],
                uuid_progress: [Schema.Types.Mixed],
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default model("JournalSubject", schema);
