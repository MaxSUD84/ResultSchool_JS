import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
import CustomReactSelect from "./styles/customReactSelect";

const EditForm = () => {
    const params = useParams();
    const { id } = params;
    const history = useHistory();

    const [data, setData] = useState({});
    const [errors, setErrors] = useState({ email: "", password: "" });
    const [professions, setProfessions] = useState();
    const [qualities, setQualities] = useState([]);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const handleShowUser = () => {
        history.replace(".");
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfessions(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });

        api.users.default.getById(id).then((data) => {
            if (data) {
                setData({
                    name: data.name,
                    email: data.email,
                    profession: data.profession._id,
                    sex: data.sex,
                    qualities: Object.keys(data.qualities).map(
                        (optionName) => ({
                            color: data.qualities[optionName].color,
                            label: data.qualities[optionName].name,
                            value: data.qualities[optionName]._id
                        })
                    )
                });
            }
        });
    }, []);

    const validatorConfig = {
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

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // validate(); // Валидация данных в момент отправки сообщения
        const isValid = validate();
        if (!isValid) return;
        // console.log(data);
        const { profession, qualities } = data;

        const newData = {
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        };
        console.log(newData);

        api.users.default.update(id, newData).finally(handleShowUser());
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

    let isDataReady =
        data.name &&
        data.email &&
        data.sex &&
        data.profession &&
        data.qualities;

    return (
        <div className="container mt-5">
            <div className="row">
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
                                    // error={errors.password}
                                />
                                <TextField
                                    label="Электронная почта"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                />
                                <SelectField
                                    label="Профессию:"
                                    defaultOption="Выбирите..."
                                    name="profession"
                                    options={professions}
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
                                {/* <MultiSelectField
                                    defaultValue={data.qualities}
                                    options={qualities}
                                    name="qualities"
                                    onChange={handleChange}
                                    label="Качества:"
                                /> */}
                                <CustomReactSelect />
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
