// {
//     "uuid": "5c525c37-0df1-4842-bdaf-972feb6bdd13",
//     "full_name": "Королёв Спартак",
//     "phone": "(35222) 47-8961",
//     "email": "korolev.spartak_2204@hotmail.com",
//     "password": "7Клара47",
//     "address": "1adf71bb-d3d9-450d-a716-35fcc2424c24",
//     "messages": []
//   },

import { Schema, model } from "mongoose";

const schema = new Schema(
    {
        uuid: { type: String, required: true },
        full_name: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        // address: { type: Schema.Types.ObjectId, ref: "Address", required: true },
        address: { type: Schema.Types.Mixed },
    },
    {
        timestamps: true,
    }
);

export default model("Mother", schema);
