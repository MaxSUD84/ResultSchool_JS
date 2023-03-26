import { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { loadFullLearnersList, getAllDataStatus } from "../../store/learners";

const LearnersLoader = ({ children }) => {
  const dataStatus = useSelector(getAllDataStatus());
  const dispatch = useDispatch();

  useEffect(() => {
    if (!dataStatus) dispatch(loadFullLearnersList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!dataStatus) return "Loading All learners data...";

  return children;
};

LearnersLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default LearnersLoader;
