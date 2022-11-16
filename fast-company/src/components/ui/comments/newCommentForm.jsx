import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";

const NewCommentForm = ({ userCurId, userList, onAdd }) => {
    const [data, setData] = useState({ userId: "", content: "" });
    const [errors, setErrors] = useState({});

    const handleChange = ({target}) => {
        // console.log(target);
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd({
            userId: data.userId, 
            pageId: userCurId, 
            content: data.content
        });
        setData({ userId: "", content: "" });
    };

    useEffect(() => {
        const errorsCur = Object.keys(data).reduce((a, v) => ({ ...a, [v]: data[v]==""}), {});
        setErrors(errorsCur);
    }, [data]);
    
    const isValid = (!errors.userId && !errors.content);


    return (
        <>
            <form className={"was-validated"} onSubmit={handleSubmit}>
                <div className="form-floating">
                    <div className="mb-3">
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
                    </div>

                    <div className="mb-3">
                        <p className="h4 mb-0">Коментарий</p>
                        <textarea 
                            className="form-control" 
                            placeholder="Введите текст коментария" 
                            id="floatingTextarea"
                            value={data.content || ""}
                            onChange={handleChange} 
                            name="content"
                            style={{ "minHeight" : "calc(1.5em + 0.75rem + 2px + 3.0rem)"}}
                            required>
                        </textarea>
                        {errors.content && <div className="invalid-feedback">Введите текст комментария</div>}
                    </div>
                    {/* <label htmlFor="floatingTextarea">Коментарий</label> */}
                
                </div>
                <div className="mb-3">
                    <button 
                        className="btn btn-primary" 
                        type="submit" 
                        disabled={!isValid}
                    >
                        Опубликовать
                    </button>
                </div>
            </form>
        </>
    );
};

NewCommentForm.propTypes = {
    userList: PropTypes.arrayOf(PropTypes.object),
    userCurId: PropTypes.string.isRequired, 
    onAdd: PropTypes.func.isRequired
};

export default NewCommentForm;