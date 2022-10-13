// import React, { Component } from 'react'
import { useParams, Switch, Route } from "react-router-dom";
import UserPage from "../components/userPage";
import UsersList from "../components/usersList";

const Users = () => {

    const params = useParams();
    const { id } = params;

    return (
        <div>
            {
                id 
                    ? <UserPage id={id} />
                    : <UsersList />
            }
        </div>
        
    );
};

export default Users;