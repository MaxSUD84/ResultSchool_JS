/* eslint-disable multiline-ternary */
import { Navigate } from "react-router-dom";

// Pages
import Main from "./main";
import DataLists from "./dataLists";
import News from "./news";
// import Events from "./events";
import Managment from "./managment";
// import Faq from "./faq";
import About from "./aboutContact";
import LoginForm from "./loginPage";
import SignUpPage from "./signUpPage";
import TeacherProfile from "./teacherProfile";
import LearnerProfile from "./learnerProfile";
import Class from "./class";
import ClassList from "./classList";
import JournalSuject from "./journalSuject";

// Layouts
import AuthLayout from "../layouts/AuthLayout";
import UserLayout from "../layouts/UserLayout";
import PageLayout from "../layouts/PageLayout";

// eslint-disable-next-line no-unused-vars
function routes(isLoggedIn, isTeacherLogged, location) {
  return [
    {
      path: "/",
      element: <PageLayout />,
      children: [
        {
          path: "/",
          element: <Main />,
        },
        {
          path: "data",
          element: <DataLists />,
        },
        {
          path: "news",
          element: <News />,
        },
        // {
        //   path: "events",
        //   element: <Events />,
        // },
        {
          path: "managment",
          element: <Managment />,
        },
        // {
        //   path: "faq",
        //   element: <Faq />,
        // },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "class",
          element: isLoggedIn ? <UserLayout /> : <Navigate to="/auth/login" />,
          // : <Navigate to="/auth/login" state={{ referrer: location }}/>,

          children: [
            {
              path: ":classId",
              element: <Class />,
            },
            {
              path: "teacher/:teacherId",
              element: <TeacherProfile />,
            },
            {
              path: "learner/:learnerId",
              element: <LearnerProfile />,
            },
            {
              path: "classlist",
              element: <ClassList />,
            },
            {
              path: "journalSub/:journalSubId",
              element: isTeacherLogged ? (
                <JournalSuject />
              ) : (
                <Navigate to={"../classlist"} />
              ),
            },
          ],
        },
        {
          path: "*",
          element: <Navigate to={isLoggedIn ? "/class" : "/"} />,
        },
      ],
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          path: "",
          element: <Navigate to="/auth/login" />,
        },
        {
          path: "login",
          element: <LoginForm />,
        },
        {
          path: "signup",
          element: <SignUpPage />,
        },
        {
          path: "*",
          element: <Navigate to="/auth/signup" />,
        },
      ],
    },
  ];
}

export default routes;
