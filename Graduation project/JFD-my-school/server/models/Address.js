// {
//     "uuid": "1adf71bb-d3d9-450d-a716-35fcc2424c24",
//     "addr": "город Москва, бульвар Космонавтов, 87"
// },

import { Schema, model } from "mongoose";

const schema = new Schema(
    {
        // uuid: привязка к User
        uuid: { type: String, required: true },
        addr: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

export default model("Address", schema);
