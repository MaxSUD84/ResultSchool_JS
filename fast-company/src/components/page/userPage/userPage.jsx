import React from "react";
import { useParams, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import UserInfoCard from "../../ui/cards/userInfoCard";
import QualitiesCard from "../../ui/cards/qualitiesCard";
import MeetingsCard from "../../ui/cards/meetingsCard";
import CommentsList from "../../ui/comments/commentsList";
// import { CommentsProvider, useComments } from "../../../hooks/useComments";
// import { useUser } from "../../../hooks/useUsers";

import { useSelector } from "react-redux";
import {
    getUserbyId,
    getUsersLoadingStatus,
    getUsers
} from "../../../store/users";

const UserPage = ({ userId: id }) => {
    // const { users, getUserById } = useUser();
    // const user = getUserById(id);
    // const usersList = users;

    const user = useSelector(getUserbyId(id));
    const usersList = useSelector(getUsers());
    const usersLoading = useSelector(getUsersLoadingStatus());

    // const history = useHistory();

    return (
        <>
            {/* {user && usersList ? ( */}
            {!usersLoading ? (
                <div className="container">
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <UserInfoCard {...user} />
                            <QualitiesCard qualities={user.qualities} />
                            <MeetingsCard
                                completedMeetings={user.completedMeetings}
                            />
                        </div>
                        <div className="col-md-8">
                            <CommentsList />
                        </div>
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
