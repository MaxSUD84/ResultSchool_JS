import { useState } from "react";

const useForm = (initialState = {}, onSubmit) => {
    const [form, setForm] = useState(initialState);
    const handeleSubmit = (e) => {
        e.preventDefault();
        // console.log(form);
        onSubmit?.(form);
    };
    const handleChange = (target) => {
        // console.log(target);
        setForm((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }));
    };
    return { handleChange, handeleSubmit, form };
};

export default useForm;
