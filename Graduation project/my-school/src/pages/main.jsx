// import BenefitsList from "../components/lists/benefitsList";
import HeroMain from "../components/heroes/heroMain";
import MainTopNewsList from "../components/lists/mTopNewsList";
import CalendarEventsList from "../components/lists/calendarEventList";
import MediumFooter from "../components/footer/mdFooter";
import { StaticProvider } from "../hooks/useStatic";

const Main = () => {
  return (
    <>
      <div>
        <HeroMain />
        {/* <BenefitsList /> */}
        <StaticProvider>
          <MainTopNewsList />
          <CalendarEventsList />
        </StaticProvider>
      </div>
      <div>
        <MediumFooter />
      </div>
    </>
  );
};

export default Main;
