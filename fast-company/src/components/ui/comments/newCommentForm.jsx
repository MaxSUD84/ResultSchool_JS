import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { validator } from "../../../utils/validator";

const NewCommentForm = ({ onSubmit }) => {
    const [data, setData] = useState({ content: "" });
    const [errors, setErrors] = useState({});

    const handleChange = ({ target }) => {
        // console.log(target);
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        content: {
            isRequired: {
                message: "Сообщение не может быть пустым"
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const clearForm = () => {
        setData({ content: "" });
        setErrors({});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit({
            pageId: data.userId,
            content: data.content
        });
        clearForm();
    };

    useEffect(() => {
        const errorsCur = Object.keys(data).reduce(
            (a, v) => ({ ...a, [v]: data[v] == "" }),
            {}
        );
        setErrors(errorsCur);
    }, [data]);

    return (
        <>
            <form className={"was-validated"} onSubmit={handleSubmit}>
                <div className="form-floating">
                    {/* <div className="mb-3">
                        <select 
                            className="form-select" 
                            id="floatingSelect" 
                            name="userId"
                            value={data.userId} 
                            // defaultValue={""}
                            onChange={handleChange} 
                            aria-label="Floating label select example"
                            required
                        >
                            <option value="" disabled>Выберите пользователя</option>
                            {userList.map((user) => (
                                <option key={user._id} value={user._id}>{user.name}</option>
                            ))}
                        </select>
                    </div> */}

                    <div className="mb-3">
                        <p className="h4 mb-0">Сообщение</p>
                        <textarea
                            className="form-control"
                            placeholder="Введите текст коментария"
                            id="floatingTextarea"
                            value={data.content || ""}
                            onChange={handleChange}
                            name="content"
                            style={{
                                minHeight:
                                    "calc(1.5em + 0.75rem + 2px + 3.0rem)"
                            }}
                            required
                        ></textarea>
                        {errors.content && (
                            <div className="invalid-feedback">
                                {errors.content}
                            </div>
                        )}
                    </div>
                </div>
                <div className="mb-3">
                    <button
                        className="btn btn-primary"
                        type="submit"
                        // disabled={!isValid}
                    >
                        Опубликовать
                    </button>
                </div>
            </form>
        </>
    );
};

NewCommentForm.propTypes = {
    // userList: PropTypes.arrayOf(PropTypes.object),
    // userId: PropTypes.string,
    onSubmit: PropTypes.func
};

export default NewCommentForm;
