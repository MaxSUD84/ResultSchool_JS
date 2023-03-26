/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

// Store
import {
  getChTeacherLoaded,
  getChoosenTeacher,
  loadChoosenTeacher,
  clearChoosenTeacher,
} from "../store/chTeacher";
import { isLoadedCurrentUser, getCurrentUserData } from "../store/authUser";

// Component
import Preloader from "../components/ui/preloader";
import SubTitleBar from "../components/elems/subTitleBar";
import HeroTeacher from "../components/heroes/heroTeacher";
import ClassJournal from "../components/ui/journal/classJournal";

const TeacherProfile = (props) => {
  const dispatch = useDispatch();
  const { teacherId } = useParams();
  const isTeacherLoaded = useSelector(getChTeacherLoaded());
  const teacher = useSelector(getChoosenTeacher());
  const curUserLoaded = useSelector(isLoadedCurrentUser());
  const curUser = useSelector(getCurrentUserData());
  const [classId, setClassId] = useState([]);
  // console.log(learnerId, user);

  useEffect(() => {
    if (!isTeacherLoaded) dispatch(loadChoosenTeacher(teacherId));
  }, [teacherId]);

  useEffect(() => {
    return () => {
      dispatch(clearChoosenTeacher());
    };
  }, []);

  useEffect(() => {
    if (curUserLoaded) {
      const arrClassId = [...curUser.uuid_class];
      if (curUser.uuid_mentor) arrClassId.push(curUser.uuid_mentor);
      setClassId(_.uniq(arrClassId));
    }
    return () => {
      setClassId([]);
    };
  }, [curUserLoaded, curUser]);

  if (!isTeacherLoaded)
    return (
      <>
        <div className="w-full h-[400px]"></div>
        <Preloader />
      </>
    );

  return (
    <>
      <div>
        <SubTitleBar
          userName={teacher.full_name}
          classTextName={`
              ${teacher.isMentor ? "Классный руководитель" : ""} `}
          classId={teacher.uuid_mentor}
        />
        <HeroTeacher {...teacher} />
        {curUserLoaded && curUser._id === teacherId ? (
          <>
            {classId.map((cls, ind) => (
              <ClassJournal key={cls + ind * 11} classId={cls} />
            ))}{" "}
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

TeacherProfile.propTypes = {};

export default TeacherProfile;
