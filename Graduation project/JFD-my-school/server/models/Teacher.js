// {
//     "full_name": "Давыдоваа Ксения Ивановна",
//     "uuid": "88131796-a242-4b0b-82c3-b0f7c8cc4bb8",
//     "experience_education": "Окончил: Российский государственный профессионально-педагогический университет. Опыт работы: Педагог дополнительного образования, Учитель литературы и русского языка.",
//     "subject": "Литература",
//     "email": "davydovaa.kseniya4507@rambler.ru",
//     "password": "7Надежда60",
//     "uuid_class": [],
//     "isMentor": false,
//     "uuid_mentor": "",
//     "education_rating": 0,
//     "learner_rating": 0,
//     "advices": [],
//     "messages": []
//   },

import { Schema, model } from "mongoose";

const schema = new Schema(
    {
        uuid: { type: String },
        full_name: String,
        experience_education: String,
        subject: String,
        email: { type: String, require: true },
        image: { type: String },
        password: { type: String, require: true },
        // uuid_class: [{ type: Schema.Types.ObjectId, ref: "Class" }],
        uuid_class: [{ type: Schema.Types.Mixed }],
        isMentor: Boolean,
        // uuid_mentor: { type: Schema.Types.ObjectId, ref: "Class" },
        uuid_mentor: { type: Schema.Types.Mixed },
        education_rating: Number,
        learner_rating: Number,
        advices: [Schema.Types.Mixed],
        messages: [Schema.Types.Mixed],
    },
    {
        timestamps: true,
    }
);

export default model("Teacher", schema);
