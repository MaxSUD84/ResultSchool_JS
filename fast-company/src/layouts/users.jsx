// import React, { Component } from 'react'
import { useParams, Switch, Route } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";

const Users = () => {
    const params = useParams();
    const { id } = params;

    return <div>{id ? <UserPage id={id} /> : <UsersListPage />}</div>;
};

export default Users;
