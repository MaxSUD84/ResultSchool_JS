// import React, { Component } from 'react'
import { useParams, Redirect } from "react-router-dom";
import { UserProvider } from "../hooks/useUsers";
import UserPage from "../components/page/userPage";
import EditForm from "../components/ui/editForm";
import UsersListPage from "../components/page/usersListPage";
import { QualityProvider } from "../hooks/useQualities";
import { useAuth } from "../hooks/useAuth";

const Users = () => {
    const params = useParams();
    const { id, edit } = params;
    const { currentUser } = useAuth();

    return (
        <>
            <UserProvider>
                <QualityProvider>
                    {id ? (
                        edit ? (
                            id === currentUser._id ? (
                                <EditForm />
                            ) : (
                                <Redirect
                                    to={`/users/${currentUser._id}/edit`}
                                />
                            )
                        ) : (
                            <UserPage userId={id} />
                        )
                    ) : (
                        <UsersListPage />
                    )}
                </QualityProvider>
            </UserProvider>
        </>
    );
};

export default Users;
