import React from "react";
import { useParams, Redirect } from "react-router-dom";
import UsersListPage from "../components/page/usersListPage";
import UserPage from "../components/page/userPage";
import EditForm from "../components/ui/editForm";
// import { UserProvider } from "../hooks/useUsers";
// import { QualityProvider } from "../hooks/useQualities";
// import { useAuth } from "../hooks/useAuth";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../store/users";
import UsersLoader from "../components/ui/hoc/usersLoader";

const Users = () => {
    const params = useParams();
    const { id, edit } = params;
    const currentUserId = useSelector(getCurrentUserId());

    return (
        <>
            <UsersLoader>
                {/* <UserProvider> */}
                {/* <QualityProvider> */}
                {id ? (
                    edit ? (
                        id === currentUserId ? (
                            <EditForm />
                        ) : (
                            <Redirect to={`/users/${currentUserId}/edit`} />
                        )
                    ) : (
                        <UserPage userId={id} />
                    )
                ) : (
                    <UsersListPage />
                )}
                {/* </QualityProvider> */}
                {/* </UserProvider> */}
            </UsersLoader>
        </>
    );
};

export default Users;
