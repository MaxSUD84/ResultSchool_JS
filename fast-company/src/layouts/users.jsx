// import React, { Component } from 'react'
import { useParams, Switch, Route } from "react-router-dom";
import { UserProvider } from "../hooks/useUsers";
import UserPage from "../components/page/userPage";
import EditForm from "../components/ui/editForm";
import UsersListPage from "../components/page/usersListPage";
import { QualityProvider } from "../hooks/useQualities";

const Users = () => {
    const params = useParams();
    const { id, edit } = params;

    return (
        <>
            <UserProvider>
                <QualityProvider>
                    {id ? (
                        edit ? (
                            <EditForm />
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
