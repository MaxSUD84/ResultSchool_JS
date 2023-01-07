import React from "react";
import { Switch, Route } from "react-router-dom";
// import NavBar from "./components/navBar";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "../src/layouts/logOut";
import AppLoader from "./components/ui/hoc/appLoader";

function App() {
    return (
        <div>
            <AppLoader>
                <NavBar />
                <Switch>
                    <ProtectedRoute
                        path="/users/:id?/:edit?"
                        component={Users}
                    />
                    <Route path="/login/:type?" component={Login} />
                    <Route path="/logout" component={LogOut} />
                    <Route exact path="/" component={Main} />
                    <Route render={() => <h1>Loading</h1>} />
                </Switch>
            </AppLoader>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    );
}

export default App;
