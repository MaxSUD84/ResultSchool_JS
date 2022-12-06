// import React from "react";
import { TeacherProvider } from "../hooks/useTeachers";
import MediumFooter from "../components/footer/mdFooter";
import HeroManagment from "../components/heroes/heroManagment";
import ManagmentList from "../components/lists/managmentList";

const Managment = () => {
  return (
    <>
      <TeacherProvider>
        <div>
          <HeroManagment />
          <ManagmentList />
        </div>
      </TeacherProvider>

      <div>
        <MediumFooter />
      </div>
    </>
  );
};

export default Managment;
