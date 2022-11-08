// import logo from "./logo.svg";
import React, { useState } from "react";
import "./App.css";
import EditProfileForm from "./components/editProfileForm";
import ProfilePage from "./components/profilePage";

function App() {
    const [edit, setEdit] = !!localStorage.getItem("user");

    const handlerEditOn = () => setEdit(true);
    const handlerEditOn = () => setEdit(true);

    return (
        <div className="App">
            <div>
                <h1 className="text-3xl font-bold underline">Use profiler: </h1>
            </div>
            {edit ? <EditProfileForm /> : <ProfilePage />}
        </div>
    );
}

export default App;
