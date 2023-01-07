import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import CheckBoxField from "../common/form/checkBoxField";

// import { useAuth } from "../../hooks/useAuth";
import history from "../../utils/history";
import { getAuthErrors, login } from "../../store/users";
import { useDispatch, useSelector } from "react-redux";
// import * as yup from "yup";  // Библиотека валидация (npm install -s yup)

const LoginForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    // const { signIn } = useAuth();
    const dispatch = useDispatch();

    const loginError = useSelector(getAuthErrors());
    const [errors, setErrors] = useState({ email: "", password: "" });
    // errors
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
        // validate(); // Валидация данных в момент отправки сообщения
        const isValid = validate();
        if (!isValid) return;
        // console.log(data);
        const redirect = history.location.state
            ? history.location.state.from.pathname
            : "/";

        dispatch(login({ payload: data, redirect: redirect }));
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
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <CheckBoxField
                value={data.stayOn}
                onChange={handleChange}
                name="stayOn"
            >
                Оставаться в системе
            </CheckBoxField>
            {loginError && <p className="text-danger">{loginError}</p>}
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

export default LoginForm;
