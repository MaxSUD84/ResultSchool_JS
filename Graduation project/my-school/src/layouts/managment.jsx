// import React from "react";
import MediumFooter from "../components/footer/mdFooter";
import HeroManagment from "../components/heroes/heroManagment";
import ManagmentList from "../components/lists/managmentList";

const Managment = () => {
  return (
    <>
      <div>
        <HeroManagment />
        <ManagmentList />
      </div>
      <div>
        <MediumFooter />
      </div>
    </>
  );
};

export default Managment;
