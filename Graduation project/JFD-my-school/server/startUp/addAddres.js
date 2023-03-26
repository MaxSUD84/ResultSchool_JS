import Address from "../models/Address.js";
import Father from "../models/Father.js";
import Mother from "../models/Mother.js";
import Learner from "../models/Learner.js";

export async function addAddress() {
    const address = await Address.find({});

    if (address) {
        Promise.all(
            address.map(async (_adr) => {
                const fathers = await Father.findOne({ address: _adr.uuid });
                const mothers = await Mother.findOne({ address: _adr.uuid });
                if (mothers && fathers) {
                    try {
                        fathers.address = _adr._id;
                        fathers.markModified("address");
                        await fathers.save();

                        mothers.address = _adr._id;
                        mothers.markModified("address");
                        await mothers.save();

                        return fathers;
                    } catch (error) {
                        return error;
                    }
                }
            })
        );
    }
}

export async function addAddressForLearners() {
    // меняем в learner uuid на ссылку _id для: parents и address
    const fathers = await Father.find();
    const learner = await Learner.find();
    const mother = await Mother.find();

    if (fathers && learner && mother) {
        learner.forEach(async (learner) => {
            const leFamily = learner.sex === "w" ? learner.last_name.slice(0, -1) : learner.last_name;
            const findFather = fathers.find((fath) => fath.full_name.includes(leFamily));
            const findMother = mother.find((moth) => moth.full_name.includes(leFamily + "а"));
            if (findMother && findFather) {
                learner.parents.father = findFather._id;
                learner.parents.markModified("father");
                learner.parents.mother = findMother._id;
                learner.parents.markModified("mother");
                learner.address = findMother.address;
                learner.markModified("address");
                await learner.save();
            }
        });
    }
}
