import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";

import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";

// import { useQualities } from "../../hooks/useQualities";
import { getQualities } from "../../store/qualities";

import { useProfessions } from "../../hooks/useProfessions";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

const RegisterForm = () => {
    const history = useHistory();
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        name: "",
        qualities: [],
        licence: false
    });

    const { signUp } = useAuth();
    const [errors, setErrors] = useState({ email: "", password: "" });
    const { professions } = useProfessions();
    const professionsList = professions.map((p) => ({
        label: p.name,
        value: p._id
    }));

    // const { qualities } = useQualities();
    const qualities = useSelector(getQualities());

    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id
    }));

    // console.log(professions);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "email введен не корректно"
            }
        },
        name: {
            isRequired: {
                message: "Имя обязательна для заполнения"
            },
            min: {
                message: "Имя должно состоять минимум из 3 символов",
                value: 3
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        // validate(); // Валидация данных в момент отправки сообщения
        const isValid = validate();
        if (!isValid) return;

        const newData = {
            ...data,
            qualities: data.qualities.map((q) => q.value)
        };
        // console.log(newData);
        try {
            await signUp(newData);
            history.push("/");
        } catch (error) {
            console.log(error);
            setErrors(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <SelectField
                label="Выбирите вашу профессию:"
                defaultOption="Выбирите..."
                name="profession"
                // options={professions}
                options={professionsList}
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
                // defaultValue={data.qualities}
                // options={qualities}
                options={qualitiesList}
                name="qualities"
                onChange={handleChange}
                label="Выбирите ваши качества:"
            />
            <CheckBoxField
                value={data.licence}
                onChange={handleChange}
                name="licence"
                error={errors.licence}
            >
                Подтвердить <a>лицензионное соглашение</a>
            </CheckBoxField>
            <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                Отправить
            </button>
        </form>
    );
};

export default RegisterForm;
