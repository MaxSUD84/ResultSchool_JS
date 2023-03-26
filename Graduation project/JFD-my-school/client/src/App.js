// import React from "react";
import { useRoutes, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { isLoggedInSelector, isTeacherLogged } from "./store/authSlice";

import routes from "./pages/routes";
// import NavBar from "./components/navBar";
import { ToastContainer } from "react-toastify";

function App() {
  const isLoggedIn = useSelector(isLoggedInSelector());
  const isTeacherLoggedNow = useSelector(isTeacherLogged());
  const location = useLocation();
  const element = useRoutes(routes(isLoggedIn, isTeacherLoggedNow, location));

  return (
    <div className="bg-zinc-50 w-full overflow-hidden">
      {/* <NavBar /> */}
      {element}
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

/*
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/users/:id?" component={Users} />
        <Route path="/data" component={DataLists} />
        <Route path="/news" component={News} />
        <Route path="/events" component={Events} />
        <Route path="/managment" component={Managment} />
        <Route path="/faq" component={Faq} />
        <Route path="/about" component={About} />
        <Route path="/about" component={About} />
        <Route path="/login" component={Login} />
        <Route render={() => <h1>Loading</h1>} />
      </Switch>
*/
