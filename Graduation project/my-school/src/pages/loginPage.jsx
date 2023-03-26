/* eslint-disable indent */
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

// Component
import Card from "../components/cards/cardAuth";
import SpinLoading from "../components/ui/SpinLoader";
import TextField from "../components/common/form/textField";
import CheckBoxField from "../components/common/form/checkBoxField";

// Store
import { login } from "../store/authSlice";
import { clearMessage } from "../store/messageSlice";

// Utils
import { parceYupError } from "../utils/parceYupError";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Логин(электронная почта) обязательн для заполнения!")
    .email("Email введён некорректно"),
  password: Yup.string()
    .required("Пароль обязателен для заполнения!")
    .min(6, "Пароль не может быть менее 6 символов!"),
});

const LoginForm = () => {
  const [loading, setLoading] = useState(false); // , setLoading
  const { message } = useSelector((state) => state.message);
  const [data, setData] = useState({
    email: "",
    password: "",
    stayOn: false,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    validationSchema
      .validate(data, { abortEarly: false })
      .then(() => setErrors({}))
      .catch((yupError) => {
        const _errors = parceYupError(yupError);
        setErrors(_errors);
      });
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  const handleLogin = (formValue) => {
    event.preventDefault();
    const { email, password } = formValue;
    setLoading(true);
    const redirect = location.state
      ? location.state.referrer.pathname
      : "/class/classlist";
    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        navigate(redirect, { replace: true });
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div
        className={`
            mb-12 text-primapy-1
            w-full h-full
            top-0 left-0
            flex justify-center items-center
            fixed
            bg-black bg-opacity-30
            "opacity-100 pointer-events-auto"
            `}
      >
        <div
          className={`
                p-4 scale-100
                rounded
                bg-white
                transition duration-500 ease-out hover:ease-in
                w-1/3 h-fit
            `}
        >
          <Card.Title>Вход в личный кабинет</Card.Title>

          <form
            className={`
              mt-8
            `}
            onSubmit={() => handleLogin(data)}
          >
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
              Остаться в системе
            </CheckBoxField>
            {message && (
              <div className="flex  flex-row justify-start mt-3">
                <div className="text-xs text-red-500" role="alert">
                  {message}
                </div>
              </div>
            )}

            <div className="pt-2">
              <button
                className={`
                  mt-2 p-3 w-full 
                  ring-1 flex flex-row justify-center items-center
                  rounded shadow-md shadow-purple-600
                  bg-primary-1 hover:bg-primary-300 
                  text-white hover:text-primary-42 font-body text-xl
                  disabled:text-primary-42 disabled:bg-slate-700  disabled:shadow-slate-400
                `}
                type="submit"
                disabled={!isValid || loading}
              >
                {loading && <SpinLoading />} Войти
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
