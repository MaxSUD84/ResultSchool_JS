import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Container from "./components/common/container";
import NavBar from "./components/ui/NavBar";
import routes from "./routes";
import { ToastContainer } from "react-toastify";
const getRoutes = (routes) => {
    return routes.map((prop, key) => {
        return <Route path={prop.path} component={prop.component} key={key} />;
    });
};

function App() {
    return (
        <div className="App">
            <NavBar routes={routes} />
            <Container>
                <Switch>
                    {getRoutes(routes)}
                    <Redirect to="/" />
                </Switch>
            </Container>
            <ToastContainer
            // position="bottom-right"
            // autoClose={5000}
            // hideProgressBar={false}
            // newestOnTop={false}
            // closeOnClick
            // rtl={false}
            // pauseOnFocusLoss
            // draggable
            // pauseOnHover
            // theme="colored"
            />
        </div>
    );
}

export default App;
