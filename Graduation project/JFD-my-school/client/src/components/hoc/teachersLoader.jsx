import { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { loadFullTeachersList, getAllDataStatus } from "../../store/teachers";

const TeachersLoader = ({ children }) => {
  const dataStatus = useSelector(getAllDataStatus());
  const dispatch = useDispatch();

  useEffect(() => {
    if (!dataStatus) dispatch(loadFullTeachersList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!dataStatus) return "Loading All teachers data...";

  return children;
};

TeachersLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default TeachersLoader;
