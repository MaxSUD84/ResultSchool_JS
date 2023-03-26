// lesson: "",
// uuid_lesson: les_uuid,
// uuid_progress: casual.uuid,
// progress: {
// avg: 0,
// values: [],
// },

import { Schema, model } from "mongoose";

const schema = new Schema(
    {
        // uuid_progress: { type: String, required: true, unique: true }, воспользуемся _id
        journalId: { type: Schema.Types.ObjectId, ref: "JournalSubject", required: true },
        learnerId: { type: Schema.Types.ObjectId, ref: "Learner", required: true },
        lesson: String,
        uuid_lesson: { type: Schema.Types.ObjectId, ref: "LessonData", required: true },
        progress: {
            avg: Number,
            values: [Schema.Types.Mixed],
        },
    },
    {
        timestamps: true,
    }
);

export default model("TopicProgress", schema);
