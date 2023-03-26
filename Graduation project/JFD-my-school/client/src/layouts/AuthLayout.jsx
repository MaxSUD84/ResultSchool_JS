// Librares
// import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

// Components
import Card from "../components/cards/cardAuth";

// Service

// Store
import { isLoggedInSelector } from "../store/authSlice";

const AuthLayout = () => {
  const isLoggedIn = useSelector(isLoggedInSelector());

  if (isLoggedIn) {
    return <Navigate to="/class/classlist" />;
  }

  return (
    <>
      <div className="w-full h-full flex grow flex-col justify-center items-center gap-3 dark:text-slate-200 ">
        <Card>
          <Outlet />
        </Card>
      </div>
    </>
  );
};

export default AuthLayout;
