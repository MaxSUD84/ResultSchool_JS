// import React from "react";
import MediumFooter from "../components/footer/mdFooter";
import { TeacherProvider } from "../hooks/useTeachers";

const LearnerProfile = () => {
  return (
    <>
      <div>
        <div>Learner profiler</div>
        <TeacherProvider>
          <div>Teachers profiler</div>
        </TeacherProvider>
      </div>

      <div>
        <MediumFooter />
      </div>
    </>
  );
};

export default LearnerProfile;
