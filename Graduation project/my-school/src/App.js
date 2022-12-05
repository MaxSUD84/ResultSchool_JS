// import React from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/navBar";
import Main from "./layouts/main";
import News from "./layouts/news";
import Events from "./layouts/events";
import Managment from "./layouts/managment";
import Faq from "./layouts/faq";
import Login from "./layouts/login";
import About from "./layouts/aboutContact";
import { TeacherProvider } from "./hooks/useTeachers";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="bg-zinc-50 w-full overflow-hidden">
      <NavBar />
      <TeacherProvider>
        <Switch>
          <Route exact path="/" component={Main} />
          {/* <Route path="/users/:id?" component={Users} /> */}
          <Route path="/news" component={News} />
          <Route path="/events" component={Events} />
          <Route path="/managment" component={Managment} />
          <Route path="/faq" component={Faq} />
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
          <Route render={() => <h1>Loading</h1>} />
        </Switch>
      </TeacherProvider>
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
