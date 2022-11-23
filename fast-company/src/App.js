import React from "react";
import { Switch, Route } from "react-router-dom";
// import NavBar from "./components/navBar";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";

function App() {
    return (
        <div>
            <NavBar />
            <ProfessionProvider>
                <Switch>
                    <Route path="/users/:id?/:edit?" component={Users} />
                    <Route path="/login/:type?" component={Login} />
                    <Route exact path="/" component={Main} />
                    <Route render={() => <h1>Loading</h1>} />
                </Switch>
            </ProfessionProvider>
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
