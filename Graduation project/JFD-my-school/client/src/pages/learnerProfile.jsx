/* eslint-disable multiline-ternary */
import { useEffect } from "react";
// import PropTypes from 'prop-types'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Service
// import localStorageService from "../services/localStorage.service";

// Store
import {
  getChLearnerLoaded,
  getChoosenLearner,
  loadChoosenLearner,
  clearChoosenLearner,
} from "../store/chLearner";
import { getCurrentUserData } from "../store/authUser";

//Component
import Preloader from "../components/ui/preloader";
import HeroUser from "../components/heroes/heroUser";
import SubTitleBar from "../components/elems/subTitleBar";
import Toolbar from "../components/elems/toolbar";
// import Title from "../components/elems/title";
// import DeskUser from "../components/elems/deskUser";

const LearnerProfile = () => {
  // const curUserCfg = localStorageService.getUserId();
  const curUserData = useSelector(getCurrentUserData());
  const dispatch = useDispatch();
  const { learnerId } = useParams();
  const isUserLoaded = useSelector(getChLearnerLoaded());
  const user = useSelector(getChoosenLearner());

  // console.log(learnerId, user);

  useEffect(() => {
    if (!isUserLoaded || learnerId !== user._id)
      dispatch(loadChoosenLearner(learnerId));
  }, [learnerId]);

  useEffect(() => {
    return () => {
      dispatch(clearChoosenLearner());
    };
  }, []);

  if (!isUserLoaded)
    return (
      <>
        <div className="w-full h-[400px]"></div>
        <Preloader />
      </>
    );

  return (
    <>
      <div>
        {/* <TeacherProvider> */}
        <SubTitleBar
          userName={`${user.first_name} ${user.last_name}`}
          classTextName={`Класс ${user.name_class}`}
          classId={user.uuid_class}
        />
        <HeroUser {...user} />
        {curUserData._id !== learnerId ? (
          ""
        ) : (
          <>
            <Toolbar class_uuid={curUserData.uuid_class} />
            {/* <DeskUser /> */}
          </>
        )}
      </div>
    </>
  );
};

// LearnerProfile.propTypes = {};

export default LearnerProfile;
