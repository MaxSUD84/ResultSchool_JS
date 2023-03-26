// 1. У любого пользователя будет как минимум в БД qualities и professions
// 2. Они равны mock данным

import Profession from "../models/Profession.js";
import Quality from "../models/Quality.js";

import * as _professions from "../mock/professions.json" assert { type: "json" };
import * as _qualities from "../mock/qualities.json" assert { type: "json" };

const professionMock = _professions.default;
const qualitiesMock = _qualities.default;

export default async () => {
    // console.log("initRun: ", professionMock, qualitiesMock);
    const professions = await Profession.find();
    if (professions.length !== professionMock.length) {
        await createInitialEntity(Profession, professionMock);
    }

    const qualities = await Quality.find();
    if (qualities.length !== qualitiesMock.length) {
        await createInitialEntity(Quality, qualitiesMock);
    }
};

async function createInitialEntity(Model, data) {
    await Model.collection.drop();
    return Promise.all(
        data.map(async (item) => {
            try {
                delete item._id;
                const newItem = new Model(item);
                await newItem.save();
                return newItem;
            } catch (error) {
                return error;
            }
        })
    );
}
