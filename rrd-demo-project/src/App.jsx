import React from "react";
import { useLocation, useRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/NavBar/NavBar";
// import ProtectedRoute from "./components/ProtectedRoute";
import withRedux from "./hoc/withRedux";
import withRouter from "./hoc/withRouter";
import "react-toastify/dist/ReactToastify.css";
// Routes
import routes from "./routes";
import { useSelector } from "react-redux";
import { isLoggedInSelector } from "./store/authSlice";

function App() {
  const isLoggedIn = useSelector(isLoggedInSelector());
  const location = useLocation();
  const element = useRoutes(routes(isLoggedIn, location));
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-150 flex flex-col">
      <NavBar />
      {element}
      <ToastContainer />
    </div>
  );

  //   return (
  //     <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-150 flex flex-col">
  //       <NavBar />
  //       <Routes>
  //         <Route index element={<MainPage />} />
  //         <Route path="auth/*" element={<AuthLayout />}>
  //           <Route index element={<Navigate to="/auth/signup" />} />
  //           <Route path={"login"} element={<LoginPage />} />
  //           <Route path={"signup"} element={<SignUpPage />} />
  //           <Route path="*" element={<Navigate to="/auth/signup" />} />
  //         </Route>
  //         <Route
  //           path="posts"
  //           element={
  //             <ProtectedRoute redirectTo={"/auth/login"}>
  //               <PostsLayout />
  //             </ProtectedRoute>
  //           }
  //         >
  //           {/* <Route path="posts/*" element={<PostsLayout />}> */}
  //           <Route index element={<PostsListPage />} />
  //           {/* редирект при ошибочном параметре пути реализован внутри PostPage */}
  //           <Route path=":postId" element={<PostPage />} />
  //         </Route>
  //         <Route path="*" element={<Navigate to="/posts" />} />
  //       </Routes>

  //       <ToastContainer />
  //     </div>
  //   );
}
const AppWithStoreAndRoutes = withRedux(withRouter(App));
export default AppWithStoreAndRoutes;
