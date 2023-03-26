import { Outlet } from "react-router-dom";
import NavBar from "../components/navBar";
// Components
// import BackgroundGradiend from "../components/ui/BackgroundGradient";
// import ScreenWidthWrapper from "../components/ui/ScreenWidthWrapper";
//Store
// import { getPosts } from "../store/postsSlice";

const PageLayout = () => {
  // const dispatch = useDispatch();
  // const params = useParams();
  // console.log(params);

  // useEffect(() => {
  //     const loadPostData = () => {
  //         dispatch(getPosts());
  //     };
  //     loadPostData();
  // }, [dispatch]);

  //   let { path } = useRouteMatch();
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default PageLayout;
