/* eslint-disable no-unused-vars */
// Librares
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

// Components
import MediumFooter from "../components/footer/mdFooter";
import ClassLoader from "../components/hoc/classLoader";
import Preloader from "../components/ui/preloader";

// Service
import localStorageService from "../services/localStorage.service";

// Store
import { isLoggedInSelector } from "../store/authSlice";
import { getCurUser, isLoadedCurrentUser } from "../store/authUser";

const UserLayout = () => {
  const dispatch = useDispatch();
  const isLoadedCurUser = useSelector(isLoadedCurrentUser());
  const isLoggedIn = useSelector(isLoggedInSelector());

  useEffect(() => {
    const curUserLoggedData = localStorageService.getUserId();
    if (isLoggedIn && !isLoadedCurUser) {
      dispatch(
        getCurUser({
          userId: curUserLoggedData.userId,
          isTeacher: curUserLoggedData.isTeacher,
        })
      );
    }
  }, []);

  return (
    <>
      <ClassLoader>
        <Outlet />
      </ClassLoader>
      <MediumFooter />
    </>
  );
};

export default UserLayout;
