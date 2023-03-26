// {
//     "uuid": "7470f911-fcc1-4e23-b68c-497146a345fc",
//     "sex": "w",
//     "first_name": "София",
//     "last_name": "Уварова",
//     "phone": "(812) 024-95-86",
//     "email": "uvarova.sofiya3338@yandex.ru",
//     "password": "2Искра76",
//     "address": "683194aa-dfa3-4e92-8246-fe306020f733",
//     "hobby": [],
//     "add_education": [],
//     "achievements": [],
//     "study_subjects": [
//       "Математика",
//       "Русский язык",
//       "Литература",
//       "Англиский язык",
//       "Физика",
//       "Биология"
//     ],
//     "academic_progress_sum": 0,
//     "teacher_raiting": 0,
//     "birthday": {
//       "day": 26,
//       "month": "8",
//       "year": 2012
//     },
//     "parents": {
//       "father": "975e4107-83da-40c9-b979-e28480a252c2",
//       "mother": "c853d3de-de1c-47fc-9e80-36e31068b864"
//     },
//     "advices": [],
//     "messages": [],
//     "uuid_class": "f4567a84-9160-42be-be3e-1e1047ad031e",
//     "uuid_progress": ""
//   }
import { Schema, model } from "mongoose";

const schema = new Schema(
    {
        uuid: { type: String },
        sex: { type: String, enum: ["w", "m"] },
        first_name: { type: String },
        last_name: { type: String },
        image: { type: String },
        phone: { type: String },
        email: { type: String, unique: true },
        password: { type: String },
        address: { type: Schema.Types.Mixed },
        uuid_class: { type: Schema.Types.Mixed },
        birthday: {
            day: { type: Number },
            month: { type: Number },
            year: { type: Number },
        },
        parents: {
            father: { type: Schema.Types.Mixed },
            mother: { type: Schema.Types.Mixed },
        },
        study_subjects: [String],
        advices: [Schema.Types.Mixed],
        messages: [Schema.Types.Mixed],
        hobby: [Schema.Types.Mixed],
        add_education: [Schema.Types.Mixed],
        achievements: [Schema.Types.Mixed],
        academic_progress_sum: { type: Number },
        teacher_raiting: { type: Number },
        uuid_progress: { type: String },
    },
    {
        timestamps: true,
    }
);

export default model("Learner", schema);
