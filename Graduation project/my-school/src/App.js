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

function App() {
  return (
    <div>
      <NavBar />
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
    </div>
  );
}

export default App;
