import { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

// Store
import { loadClassesList, getDataStatus } from "../../store/classes";
import { crossClassArr, isLoadedCurrentUser } from "../../store/authUser";

// Component
import Preloader from "../ui/preloader";

const ClassLoader = ({ children }) => {
  const userDataLoaded = useSelector(isLoadedCurrentUser());
  const classArr = useSelector(crossClassArr());
  const dataStatus = useSelector(getDataStatus());
  const dispatch = useDispatch();

  useEffect(() => {
    if (userDataLoaded && !dataStatus && classArr)
      dispatch(loadClassesList(classArr));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classArr, userDataLoaded]);

  if (!dataStatus)
    return (
      <>
        <div className="w-full h-[400px]"></div>
        <Preloader />
      </>
    );

  return children;
};

ClassLoader.propTypes = {
  classId: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default ClassLoader;
