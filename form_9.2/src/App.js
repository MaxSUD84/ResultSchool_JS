// import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import "./App.css";
import EditProfileForm from "./components/editProfileForm";
import ProfilePage from "./components/profilePage";

function App() {
    // const [edit, setEdit] = useState();

    const history = useHistory();

    const handlerEditPush = () => {
        history.replace("/edit");
    };

    const data = localStorage.getItem("user");
    const isCreated = data?.length ? JSON.parse(data) : false;

    useEffect(() => {
        if (isCreated) {
            history.replace("/user");
        }
    }, []);

    return (
        <>
            <div className="container px-4 py-2">
                <div>
                    <h1 className="text-4xl font-bold">Карточка студента</h1>
                    {/* <h1 className="text-3xl font-bold underline">{edit ? "Edit u" : "U"}ser profiler: </h1> */}
                    <hr />
                </div>
            </div>
            <Switch>
                {/* <Route exact path="/" component={Main} /> */}
                <Route exact path="/user" component={ProfilePage} />
                <Route exact path="/edit" component={EditProfileForm} />
                <Route
                    render={() => (
                        <>
                            <div className="flex-col content-center">
                                <div className="font-l font-semibold">Нет данных</div>
                                <button
                                    className="bg-sky-500 text-white rounded-md p-2.5 w-fit mt-9"
                                    type="button"
                                    onClick={handlerEditPush}>
                                    Создать
                                </button>
                            </div>
                        </>
                    )}
                />
            </Switch>
        </>
    );
}

export default App;
