import { useState } from "react";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../../store/authUser";
import { NavLink } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
// import { useUser } from "../../hooks/useUser";

// Style and Icons
import style from "../../styles/styles";
import { FiLogOut } from "react-icons/fi";
import { FaUserGraduate, FaUsers } from "react-icons/fa";
import localStorageService from "../../services/localStorage.service";

const NavProfile = () => {
  const curUserCfg = localStorageService.getUserId();
  const isTeacherLoaded = curUserCfg.isTeacher;
  const user = useSelector(getCurrentUserData());
  // const { user } = useUser();
  // const isTeacherLoaded = useSelector(isTeacherLogged());

  // console.log(user);

  const currentUser = {
    name: isTeacherLoaded
      ? `${user.full_name}`
      : `${user.last_name} ${user.first_name}`,
    image: user.image,
    _id: user._id,
  };

  const [isOpen, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen((prevState) => !prevState);
  };

  const handleLogout = useLogout();

  if (!curUserCfg.userId || !user.image) return "loading ...";

  return (
    <div
      onClick={toggleMenu}
      className={`
      cursor-pointer
      `}
      //   border-spacing-2 border-l-2 border-primary-2 border-opacity-40
    >
      <div
        // onClick={toggleMenu}
        className={`
            flex flex-row justify-center items-center w-fit 
        `}
      >
        <img
          className="w-8 h-8 mx-3 rounded-full ring-1 ring-primary-2"
          src={`http://${currentUser.image}`}
          alt=""
          height="40"
        />
        <div className="">{currentUser.name}</div>
      </div>
      <div
        className={`${
          isOpen ? "flex" : "hidden"
        } p-4 bg-gradient-to-r from-primary-1 to-purple-800
                absolute top-16 right-8 mx-4 my-2 min-w-[140px] rounded-md sidebar
                ring-2 ring-primary-42 shadow-md shadow-purple-600
                z-100
            `}
      >
        <ul className={` ${style.paragraph}`}>
          <li className="">
            <NavLink
              to={`/class/classlist`}
              className="flex flex-row items-center text-primary-41 hover:text-blue-400"
            >
              <FaUsers className="w-10 h-10 p-2 px-3" />
              Список классов
            </NavLink>
          </li>
          <li className="">
            <NavLink
              to={`/class/${isTeacherLoaded ? "teacher" : "learner"}/${
                currentUser._id
              }`}
              className="flex flex-row items-center text-primary-41 hover:text-blue-400"
            >
              <FaUserGraduate className="w-10 h-10 p-2 px-3" />
              Профиль
            </NavLink>
          </li>
          <li>
            <button
              onClick={handleLogout}
              type="submit"
              className="flex flex-row  items-center text-primary-41 hover:text-blue-400"
            >
              <FiLogOut className="w-10 h-10 p-2 px-3" />
              Выйти
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavProfile;

/*
    

*/
