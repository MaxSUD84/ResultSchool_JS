import React from "react";
import { useParams, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import UserInfoCard from "../../ui/cards/userInfoCard";
import QualitiesCard from "../../ui/cards/qualitiesCard";
import MeetingsCard from "../../ui/cards/meetingsCard";
import CommentsList from "../../ui/comments/commentsList";
import { useUser } from "../../../hooks/useUsers";
import { CommentsProvider, useComments } from "../../../hooks/useComments";

const UserPage = ({ userId: id }) => {
    const { comments } = useComments;
    const { users, getUserById } = useUser();
    const user = getUserById(id);
    const usersList = users;

    const history = useHistory();

    // const handleShowAllUsers = () => {
    //     history.replace("/users");
    // };

    // const UpdateCommentList = () =>
    //     api.comments
    //         .fetchCommentsForUser(id)
    //         .then((data) => setComments(sortComment(data)));

    // const handleAddComment = ({ userId, pageId, content }) => {
    //     api.comments.add({ userId, pageId, content });
    //     UpdateCommentList();
    //     // console.log(userId, pageId, content);
    // };

    // const handleDeleteComment = (CommentId) => {
    //     api.comments.remove(CommentId);
    //     UpdateCommentList();
    //     // console.log(CommentId);
    // };

    // const handleEditUser = () => {
    //     history.replace(`/users/${id}/edit`);
    // };

    // console.log("choosen user: ", user);

    return (
        <>
            {user && usersList ? (
                <div className="container">
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <UserInfoCard {...user} />
                            <QualitiesCard qualities={user.qualities} />
                            <MeetingsCard
                                completedMeetings={user.completedMeetings}
                            />
                        </div>
                        <CommentsProvider>
                            <div className="col-md-8">
                                <CommentsList
                                    userCurId={id}
                                    comments={comments}
                                    usersList={usersList}
                                    // onAddComment={handleAddComment}
                                    onDeleteComment={(id) =>
                                        handleDeleteComment(id)
                                    }
                                />
                            </div>
                        </CommentsProvider>
                    </div>
                </div>
            ) : (
                <h1>Loading user data...</h1>
            )}
        </>
    );
};
UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
