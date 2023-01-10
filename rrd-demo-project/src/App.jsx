import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthLayout from "./layouts/AuthLayout";
import PostsLayout from "./layouts/PostsLayout";
import MainPage from "./pages/MainPage";
import NavBar from "./components/NavBar/NavBar";
// import ProtectedRoute from "./components/ProtectedRoute";
import withRedux from "./hoc/withRedux";
import withRouter from "./hoc/withRouter";
import "react-toastify/dist/ReactToastify.css";

// Pages
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SigupPage";
import PostsListPage from "./pages/Posts/PostsListPage";
import PostPage from "./pages/Posts/PostPage";

function App() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-150 flex flex-col">
            <NavBar />
            <Routes>
                <Route index element={<MainPage />} />
                <Route path="auth/*" element={<AuthLayout />}>
                    <Route index element={<Navigate to="/auth/signup" />} />
                    <Route path={"login"} element={<LoginPage />} />
                    <Route path={"signup"} element={<SignUpPage />} />
                    <Route path="*" element={<Navigate to="/auth/signup" />} />
                </Route>
                <Route path="posts/*" element={<PostsLayout />}>
                    <Route index element={<PostsListPage />} />
                    {/* редирект при ошибочном параметре пути реализован внутри PostPage */}
                    <Route path=":postId" element={<PostPage />} />
                </Route>
                <Route path="*" element={<Navigate to="/posts" />} />
                {/* <ProtectedRoute path="/posts/:id?" element={<PostsLayout />} /> */}
            </Routes>

            <ToastContainer />
        </div>
    );
}
const AppWithStoreAndRoutes = withRedux(withRouter(App));
export default AppWithStoreAndRoutes;
