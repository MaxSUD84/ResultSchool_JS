import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import TextField from "./textField";
import styles from "./styles" // , {layout}
import { validate } from "../utils/validator";
import { validationSchema } from "../utils/validationSchema";

const EditProfileForm = () => {
  const history = useHistory();
  const [loadUser,setLoadUser] = useState({});
  
  const [errors, setErrors] = useState({ 
    name: "", 
    surname: "",
    year: "",
    link: ""
  });

  const isValid = (loadUser !== {}) && Object.keys(errors).length === 0;

  useEffect(() => {
      const errors = validate(loadUser, validationSchema);
      setErrors(errors);
  }, [loadUser]);

  // useEffect(() => {
  //     const errors = validate(loadUser, validationSchema);
  //     setErrors(errors);
  // }, []);

  const handleChange = (target) => {
    setLoadUser((prevState) => ({
          ...prevState,
          [target.name]: target.value
      }));
  };

  useEffect(() => {
    const data = localStorage.getItem("user");
    const user = data?.length ? JSON.parse(data) : false;
    setLoadUser(user || {     
      name: "", 
      surname: "",
      year: "",
      link: "" })
  }, [])

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      localStorage.clear();
      localStorage.setItem("user", JSON.stringify(loadUser));
      history.replace("/user");
      console.log("Карточка изменена!");
    }
  };

  return (
    <>
      <div className="py-12 px-6 flex-col content-center">
        <h2 className="text-2xl font-bold">Создать</h2>
        <div className="mt-8 max-w-md">
          <div className="grid grid-cols-1 gap-6">
            <TextField
                label="Имя: "
                name="name"
                nameClass={`${styles.inputText}`}
                value={loadUser.name }
                onChange={handleChange}
                error={errors.name}
            />
            <TextField
                label="Фамилия: "
                name="surname"
                nameClass={`${styles.inputText}`}
                value={loadUser.surname}
                onChange={handleChange}
                error={errors.surname}
            />
            <TextField
                label="Год рождения: "
                name="year"
                type="number"
                nameClass={`${styles.inputText}`}
                value={loadUser.year}
                onChange={handleChange}
                error={errors.year}
            />
            <TextField
                label="Портфолио: "
                name="link"
                type="url"
                nameClass={`${styles.inputText}`}
                value={loadUser.link}
                onChange={handleChange}
                error={errors.link}
            />
            <div className="flex md:flex-row flex-col">
              <button 
              className={`${styles.flexCenter} bg-sky-500 text-white font-bold rounded-md 
              p-2.5 disabled:bg-slate-300 disabled:border-slate-200 disabled:shadow-none` }
              type="button"
              disabled ={!isValid}
              onClick={handlerSubmit}
              >Создать</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditProfileForm
