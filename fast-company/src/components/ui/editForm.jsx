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
import { useProfessions } from "../../hooks/useProfessions";
// import { useQualities } from "../../hooks/useQualities";
import { useAuth } from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { getQualities, getQualitiesLoadingStatus } from "../../store/qualities";

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
    const { currentUser, setUserData } = useAuth();
    const { isLoading: isProfLoading, professions } = useProfessions();

    // const { isLoading: isQualLoading, qualities, getQuality } = useQualities();

    const qualities = useSelector(getQualities());
    const isQualLoading = useSelector(getQualitiesLoadingStatus());

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
                message: "Имя обязательно для заполнения"
            },
            min: {
                message: "Имя должно состоять минимум из 3 символов",
                value: 3
            }
        },
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "email введен не корректно"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотябы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотябы одну цифру"
            },
            min: {
                message: "Пароль должен состоять минимум из 8 символов",
                value: 8
            }
        },
        profession: {
            isRequired: {
                message: "Обязательно выбирите вашу профессию"
            }
        },
        licence: {
            isRequired: {
                message:
                    "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
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

    // const getProfessionById = (id) => {
    //     for (const prof of professions) {
    //         if (prof.value === id) {
    //             return { _id: prof.value, name: prof.label };
    //         }
    //     }
    // };

    // const getQualities = (elements) => {
    //     const qualitiesArray = [];
    //     for (const elem of elements) {
    //         for (const quality in qualities) {
    //             // if (elem.value === qualities[quality].value) {
    //             if (elem._id === qualities[quality].value) {
    //                 qualitiesArray.push({
    //                     _id: qualities[quality].value,
    //                     name: qualities[quality].label,
    //                     color: qualities[quality].color
    //                 });
    //             }
    //         }
    //     }
    //     return qualitiesArray;
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        // validate(); // Валидация данных в момент отправки сообщения
        const isValid = validate();
        if (!isValid) return;
        // console.log(data);
        const { qualities } = data;

        const newData = {
            ...data,
            // profession: getProfession(profession),
            qualities: qualities.map((qual) => qual._id)
        };
        // console.log(newData);

        setUserData(newData);
        history.replace(".");
        // api.users.default.update(id, newData).finally(handleShowUser());
    };

    const handlerReturn = () => {
        history.push(".");
    };

    /*
        {
            _id: "67rdca3eeb7f6fgeed47181r",
            name: "Брэд Питт",
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
                        Назад
                    </button>
                </div>
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {isDataReady ? (
                        <>
                            <h3 className="mb-4">Edit</h3>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Имя"
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                />
                                <TextField
                                    label="Электронная почта"
                                    name="email"
                                    value={data.email}
                                    onChange={() => data.email}
                                    // onChange={handleChange}
                                    // error={errors.email}
                                />
                                <SelectField
                                    label="Профессию:"
                                    defaultOption="Выбирите..."
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
                                    label="Пол:"
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
                                    label="Качества:"
                                />
                                <button
                                    type="submit"
                                    disabled={!isValid}
                                    className="btn btn-primary w-100 mx-auto"
                                >
                                    Изменить
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
