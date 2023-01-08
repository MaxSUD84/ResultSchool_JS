// import React from "react";

import HeroAbout from "../components/heroes/heroAbout";
import MediumFooter from "../components/footer/mdFooter";
import { useHistory } from "react-router-dom";
import styles from "../styles/styles";

const About = () => {
  const history = useHistory();

  const showData = () => {
    history.push("/data");
  };

  return (
    <>
      <HeroAbout />

      <div className={`${styles.flexCenter} pt-6`}>
        <button
          className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full 
          border border-purple-200 hover:text-white hover:bg-purple-600 
          hover:border-transparent focus:outline-none focus:ring-2 
          focus:ring-purple-600 focus:ring-offset-2"
          onClick={showData}
        >
          Redirect DataPage
        </button>
      </div>

      <MediumFooter />
    </>
  );
};

export default About;
