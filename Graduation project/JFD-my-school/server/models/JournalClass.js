// {
//     uuid_class: uuid_class,
//     name_class: className,
//     progress_journal: [{ subject: "", uuid_subject_journal: "" }],
//   }

import { Schema, model } from "mongoose";

const schema = new Schema(
    {
        uuid_class: { type: Schema.Types.ObjectId, ref: "Class", required: true },
        name_class: { type: String }, // class - name
        progress_journal: [
            {
                subject: { type: String }, // subject - name
                uuid_subject_journal: { type: Schema.Types.ObjectId, ref: "JournalSubject", required: true },
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default model("JournalClass", schema);
