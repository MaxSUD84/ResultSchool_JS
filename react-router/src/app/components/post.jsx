/* eslint-disable react/prop-types */
import React from "react";
import { useHistory } from "react-router-dom";

const Post = ({ id, posts }) => {
    const history = useHistory();    
    const getPostById = (id) => { 
        return posts.find((post) => post.id==id);   
    };

    const post = getPostById(id);
    const handleSave = () => {
        history.push("/posts"); // сохраняет историю перехода, позволяет вернуться по кнопке "Назад"
        // history.replace("/posts"); // при переходе заменяет последнюю страницу (нет перехода "Назад")
    };

    return (
        <>
            {" "}
            <h2>{ post ? post.label : `Post with id: ${id} not found` }</h2>
            <button onClick={() => {handleSave();}}>Сохранить</button>
        </>
    );
};

export default Post;