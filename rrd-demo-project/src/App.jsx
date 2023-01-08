import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthLayout from "./layouts/AuthLayout";
// import PostsLayout from "./layouts/PostsLayout";
import MainPage from "./pages/MainPage";
import NavBar from "./components/NavBar/NavBar";
// import ProtectedRoute from "./components/ProtectedRoute";
import withRedux from "./hoc/withRedux";
import withRouter from "./hoc/withRouter";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-150 flex flex-col">
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/auth" element={<AuthLayout />} />
        {/* <ProtectedRoute path="/posts/:id?" element={<PostsLayout />} /> */}
        {/* <Redirect from="*" to="/" /> */}
      </Routes>

      <ToastContainer />
    </div>
  );
}
const AppWithStoreAndRoutes = withRedux(withRouter(App));
export default AppWithStoreAndRoutes;
