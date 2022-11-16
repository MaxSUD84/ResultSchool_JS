import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import api from "../../../api";
// import Qualities from "../../ui/qualities";
import PropTypes from "prop-types";
import UserInfoCard from "../../ui/cards/userInfoCard";
import QualitiesCard from "../../ui/cards/qualitiesCard";
import MeetingsCard from "../../ui/cards/meetingsCard";
import CommentsList from "../../ui/comments/commentsList";

const sortComment = (comments) => _.orderBy(comments, ["created_at"], ["desc"]);

const UserPage = ({ id }) => {
    const [user, setUser] = useState(false);
    const [usersList, setUsersList] = useState();
    const [comments, setComments] = useState({});

    useEffect(() => {
        api.users.default.getById(id).then((data) => setUser(data));
        api.comments.fetchCommentsForUser(id).then((data) => setComments(sortComment(data)));
        api.users.default.fetchAll().then((data) => {
            setUsersList(data.map(user => ({ _id: user._id, name: user.name})));
        });
    }, []);
    // }, [id]);

    const history = useHistory();
    // const handleShowAllUsers = () => {
    //     history.replace("/users");
    // };
    
    const UpdateCommentList = () => api.comments.fetchCommentsForUser(id)
        .then((data) => setComments(sortComment(data))); 
        
    const handleAddComment = ({userId, pageId, content}) => {
        api.comments.add({userId, pageId, content});
        UpdateCommentList();
        // console.log(userId, pageId, content);    
    };

    const handleDeleteComment = (CommentId) => {
        api.comments.remove(CommentId);
        UpdateCommentList();
        // console.log(CommentId);
    };

    const handleEditUser = () => {
        history.replace(`/users/${id}/edit`);
    };

    return (
        <>
            {user && usersList
                ? (
                    <div className="container">
                        <div className="row gutters-sm">
                            <div className="col-md-4 mb-3">
                                <UserInfoCard 
                                    name={user.name}
                                    profession={user.profession.name}
                                    rate={user.rate}
                                    onClick={() => handleEditUser()}
                                />
                                <QualitiesCard qualities={user.qualities}/>
                                <MeetingsCard completedMeetings={user.completedMeetings} />
                            </div>
                            <div className="col-md-8">
                                <CommentsList 
                                    userCurId={id}
                                    comments={comments}
                                    usersList={usersList}
                                    onAddComment={handleAddComment}
                                    onDeleteComment={(id) => handleDeleteComment(id)}
                                />

                            </div>
                        </div>
                    </div> )
            : (
                <h1>Loading user data...</h1>
            )}
        </>
    );
};
UserPage.propTypes = {
    id: PropTypes.string.isRequired
};

export default UserPage;
