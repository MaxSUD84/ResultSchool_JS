// import React from "react";
// import style from "../styles/styles";
import BenefitsList from "../components/lists/benefitsList";
import HeroMain from "../components/heroes/heroMain";
import MainTopNewsList from "../components/lists/mTopNewsList";
import CalendarEventsList from "../components/lists/calendarEventList";
import MediumFooter from "../components/footer/mdFooter";
// import { Newspaper } from "../assets/icons/newspaper";

const Main = () => {
  return (
    <>
      <div>
        <HeroMain />
        <BenefitsList />
        <MainTopNewsList />
        <CalendarEventsList />
      </div>
      <div>
        <MediumFooter />
      </div>
    </>
  );
};

export default Main;
