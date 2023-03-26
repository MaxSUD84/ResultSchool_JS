// import React from "react";
import { TeacherProvider } from "../hooks/useTeacher";
import MediumFooter from "../components/footer/mdFooter";
import ManagmentList from "../components/lists/managmentList";
import HeroManagment from "../components/heroes/heroManagment";
// import Achievements from "../components/articles/achievements";

const Managment = () => {
  return (
    <>
      <TeacherProvider>
        <div>
          <HeroManagment />
          <ManagmentList />
          {/* <Achievements /> */}
        </div>
      </TeacherProvider>

      <div>
        <MediumFooter />
      </div>
    </>
  );
};

export default Managment;
