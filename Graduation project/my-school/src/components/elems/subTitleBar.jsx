import style from "../../styles/styles";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const SubTitleBar = ({ userName, classTextName, classId }) => {
  return (
    <div className={`flex justify-center items-center`}>
      <div className={`${style.boxWidth} ${style.paddingX} `}>
        <div className={`flex flex-row flex-between p-2 px-4 bg-primary-1`}>
          <div className="flex basis-1/2 font-bold text-2xl text-primary-42">
            {userName}
          </div>
          <div className="flex basis-1/2 font-bold justify-end text-2xl text-primary-41">
            <NavLink className="cursor-pointer" to={`../${classId}`}>
              {classTextName}
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

SubTitleBar.propTypes = {
  userName: PropTypes.string,
  classTextName: PropTypes.string,
  classId: PropTypes.string,
};

export default SubTitleBar;
