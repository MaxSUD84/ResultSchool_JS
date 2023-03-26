// Components
import MediumFooter from "../components/footer/mdFooter";
import HeroNews from "../components/heroes/heroNews";
import HeroEvent from "../components/heroes/heroEvent";

// Hooks
import { StaticProvider } from "../hooks/useStatic";

const News = () => {
  //   const params = useParams();
  //   const { id } = params;

  return (
    <>
      <div>
        <StaticProvider>
          <HeroNews />
          <HeroEvent />
        </StaticProvider>
      </div>
      <div>
        <MediumFooter />
      </div>
    </>
  );
};

export default News;
