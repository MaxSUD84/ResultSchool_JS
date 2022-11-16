import React from "react";
import PropTypes from "prop-types";
import Comment from "./comment";
import NewCommentForm from "./newCommentForm";
// import userApi from "../../../api/fake.api/user.api";

const createAt = (ms) => {
    const nowTime = new Date(); // Date.now();
    const comDate = new Date();
    comDate.setTime(ms);
    const d = (x) => ((num) => ("" + (10**x+num)).slice(-x));
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
                    :  nowTime - ms <= 24 * 60 * 60 * 1000 
                        ? `(${nowTime.getHours() - comDate.getHours() < 0 
                                ? "вчера" : "сегодня"} ${d2(comDate.getHours())}:${d2(comDate.getMinutes())})`
                        :  nowTime - ms <= 31 * 24 * 60 * 60 * 1000 
                            ? `(${d2(comDate.getDate())}.${d2(comDate.getMonth() + 1)})`
                            : `(${d2(comDate.getDate())}.${d2(comDate.getMonth() + 1)}.${comDate.getFullYear()})`;                          
};

const CommentsList = ({ userCurId, usersList, comments, onAddComment, onDeleteComment}) => {
    return (
        <>
            <div className="card mb-2">
                {" "}
                <div className="card-body ">
                    <h2>Add comment</h2>
                    <hr />
                    <NewCommentForm
                        userList={usersList}
                        userCurId={userCurId}
                        onAdd={onAddComment}
                    />
                </div>
            </div>
            {comments && 
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        {comments.map((cm) => (
                            <Comment
                                key={cm._id}
                                _id={cm._id}
                                userName={usersList.filter((c) => c._id === cm.userId)[0].name}
                                content={cm.content}
                                createAt={createAt(cm.created_at)}
                                onDelete={onDeleteComment}
                            />))}
                    </div>
                </div>
            }
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