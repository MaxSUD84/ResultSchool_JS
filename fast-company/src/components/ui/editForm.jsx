/* eslint-disable multiline-ternary */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
// import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";

import { customStyles, getColourOptions } from "../ui/styles/data";
// import { useProfessions } from "../../hooks/useProfessions";
// import { useQualities } from "../../hooks/useQualities";
import { useAuth } from "../../hooks/useAuth";

import {
    getQualities,
    getQualitiesLoadingStatus
    // getQualitiesByIds
} from "../../store/qualities";
import {
    getProfessions,
    getProfessionsLoadingStatus
} from "../../store/professions";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserData, updateUser } from "../../store/users";

const convertProfession = (professionData) => ({
    label: professionData.name,
    value: professionData._id
});

const convertQuality = (qualityData) => ({
    label: qualityData.name,
    value: qualityData._id,
    color: qualityData.color
});

function getQuality(qualities, id) {
    return qualities.find((p) => p._id === id);
}

const EditForm = () => {
    // const params = useParams();
    const history = useHistory();

    const [data, setData] = useState(false);
    const [errors, setErrors] = useState({ email: "", name: "" }); // { email: "", password: "" }

    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUserData());

    // const { setUserData } = useAuth();
    // const { isLoading: isProfLoading, professions } = useProfessions();
    // const { isLoading: isQualLoading, qualities, getQuality } = useQualities();

    const professions = useSelector(getProfessions());
    const isProfLoading = useSelector(getProfessionsLoadingStatus());

    const qualities = useSelector(getQualities());
    const isQualLoading = useSelector(getQualitiesLoadingStatus());
    // const getQualitiesList = useSelector(getQualitiesByIds());

    const handleChange = (target) => {
        setData((prevState) => {
            return {
                ...prevState,
                [target.name]: target.value
            };
        });
    };

    const handleShowUser = () => {
        history.replace(".");
    };

    useEffect(() => {
        if (currentUser && !isQualLoading) {
            const qual = currentUser.qualities.map((qual) =>
                convertQuality(getQuality(qualities, qual))
            );

            setData({
                ...currentUser,
                qualities: getColourOptions(qual)
            });
        }
    }, [currentUser, isQualLoading]);

    const validatorConfig = {
        name: {
            isRequired: {
                message: "?????? ?????????????????????? ?????? ????????????????????"
            },
            min: {
                message: "?????? ???????????? ???????????????? ?????????????? ???? 3 ????????????????",
                value: 3
            }
        },
        email: {
            isRequired: {
                message: "?????????????????????? ?????????? ?????????????????????? ?????? ????????????????????"
            },
            isEmail: {
                message: "email ???????????? ???? ??????????????????"
            }
        },
        password: {
            isRequired: {
                message: "???????????? ???????????????????? ?????? ????????????????????"
            },
            isCapitalSymbol: {
                message: "???????????? ???????????? ?????????????????? ???????????? ???????? ?????????????????? ??????????"
            },
            isContainDigit: {
                message: "???????????? ???????????? ?????????????????? ???????????? ???????? ??????????"
            },
            min: {
                message: "???????????? ???????????? ???????????????? ?????????????? ???? 8 ????????????????",
                value: 8
            }
        },
        profession: {
            isRequired: {
                message: "?????????????????????? ???????????????? ???????? ??????????????????"
            }
        },
        licence: {
            isRequired: {
                message:
                    "???? ???? ???????????? ???????????????????????? ?????? ???????????? ?????? ?????????????????????????? ?????????????????????????? ????????????????????"
            }
        }
    };

    const validate = () => {
        const terrors = validator(data, validatorConfig);
        setErrors(terrors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    useEffect(() => {
        validate();
    }, [data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // validate(); // ?????????????????? ???????????? ?? ???????????? ???????????????? ??????????????????
        const isValid = validate();
        if (!isValid) return;
        const { qualities } = data;

        const newData = {
            ...data,
            qualities: qualities.map((qual) => qual._id)
        };
        // console.log(newData);

        // setUserData(newData);
        dispatch(updateUser(newData));
        // history.replace(".");
    };

    const handlerReturn = () => {
        history.push(".");
    };

    /*
        {
            _id: "67rdca3eeb7f6fgeed47181r",
            name: "???????? ????????",
            email: "superstar@star.com",
            sex: "male",
            profession: professions.actor,
            qualities: [qualities.handsome],
            completedMeetings: 434,
            rate: 5,
            bookmark: false
        }
    */
    // console.log(data);
    // console.log(currentUser);

    let isDataReady = !isProfLoading && !isQualLoading && data;

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-2 p-1 ">
                    <button
                        className="btn btn-primary shadow p-2"
                        type="button"
                        onClick={handlerReturn}
                    >
                        ??????????
                    </button>
                </div>
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {isDataReady ? (
                        <>
                            <h3 className="mb-4">Edit</h3>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="??????"
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                />
                                <TextField
                                    label="?????????????????????? ??????????"
                                    name="email"
                                    value={data.email}
                                    onChange={() => data.email}
                                    // onChange={handleChange}
                                    // error={errors.email}
                                />
                                <SelectField
                                    label="??????????????????:"
                                    defaultOption="????????????????..."
                                    name="profession"
                                    options={professions.map((p) =>
                                        convertProfession(p)
                                    )}
                                    onChange={handleChange}
                                    value={data.profession}
                                    error={errors.profession}
                                />
                                <RadioField
                                    options={[
                                        { name: "Male", value: "male" },
                                        { name: "Female", value: "female" },
                                        { name: "Other", value: "other" }
                                    ]}
                                    value={data.sex}
                                    name="sex"
                                    label="??????:"
                                    onChange={handleChange}
                                />
                                <MultiSelectField
                                    defaultValue={data.qualities}
                                    options={getColourOptions(
                                        qualities.map((q) => convertQuality(q))
                                    )}
                                    styles={customStyles}
                                    name="qualities"
                                    onChange={handleChange}
                                    label="????????????????:"
                                />
                                <button
                                    type="submit"
                                    disabled={!isValid}
                                    className="btn btn-primary w-100 mx-auto"
                                >
                                    ????????????????
                                </button>
                            </form>
                        </>
                    ) : (
                        <div>
                            <h6>Loading ...</h6>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditForm;
