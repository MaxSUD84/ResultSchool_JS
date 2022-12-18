import React, { useState } from "react";
import PropTypes from "prop-types";
import Comment from "./comment";
import NewCommentForm from "./newCommentForm";
import { useComments } from "../../../hooks/useComments";
import { useParams } from "react-router-dom";
import { orderBy } from "lodash";

const createAt = (ms) => {
    const nowTime = new Date(); // Date.now();
    const comDate = new Date();
    comDate.setTime(ms);
    const d = (x) => (num) => ("" + (10 ** x + num)).slice(-x);
    const d2 = d(2); // функция для отображение 0 перед временем, минутами и датами
    // return JSON.stringify(comDate);
    return nowTime - ms <= 60 * 1000
        ? "(1 минуту назад)"
        : nowTime - ms <= 5 * 60 * 1000
        ? "(5 минут назад)"
        : nowTime - ms <= 10 * 60 * 1000
        ? "(10 минут назад)"
        : nowTime - ms <= 30 * 60 * 1000
        ? "(30 минут назад)"
        : nowTime - ms <= 24 * 60 * 60 * 1000
        ? `(${
              nowTime.getHours() - comDate.getHours() < 0 ? "вчера" : "сегодня"
          } ${d2(comDate.getHours())}:${d2(comDate.getMinutes())})`
        : nowTime - ms <= 31 * 24 * 60 * 60 * 1000
        ? `(${d2(comDate.getDate())}.${d2(comDate.getMonth() + 1)})`
        : `(${d2(comDate.getDate())}.${d2(
              comDate.getMonth() + 1
          )}.${comDate.getFullYear()})`;
};

const CommentsList = () => {
    const { createComment, removeComment, comments } = useComments();

    const handleSubmit = (data) => {
        createComment(data);
    };

    const handleRemoveComment = (id) => {
        // console.log(id);
        removeComment(id);
    };

    const sortedComments = (comments) =>
        orderBy(comments, ["created_at"], ["desc"]);

    return (
        <>
            <div className="card mb-2">
                {" "}
                <div className="card-body ">
                    <h2>Add comment</h2>
                    <hr />
                    <NewCommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            {comments && (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        {sortedComments(comments).map((cm) => (
                            <Comment
                                key={cm._id}
                                _id={cm._id}
                                // userName={
                                //     usersList.filter(
                                //         (c) => c._id === cm.userId
                                //     )[0].name
                                // }
                                userId={cm.userId}
                                content={cm.content}
                                createAt={createAt(cm.created_at)}
                                onDelete={handleRemoveComment}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

CommentsList.propTypes = {
    comments: PropTypes.arrayOf(PropTypes.object),
    usersList: PropTypes.arrayOf(PropTypes.object),
    userCurId: PropTypes.string.isRequired,
    onAddComment: PropTypes.func,
    onDeleteComment: PropTypes.func
};

export default CommentsList;
