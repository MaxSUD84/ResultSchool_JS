// import React, { Component } from 'react'
// import { useParams, Switch, Route } from "react-router-dom";
// import UserPage from "../components/userPage";
// import UsersList from "../components/usersList";

import FullNewArticle from "../components/articles/fullNewArticle";
import MediumFooter from "../components/footer/mdFooter";
import HeroNews from "../components/heroes/heroNews";
import FullNewsList from "../components/lists/fullNewsList";

const News = () => {
  //   const params = useParams();
  //   const { id } = params;

  return (
    <>
      <div>
        <h1>News</h1>
        <HeroNews />
        <FullNewsList />
        <FullNewArticle />
      </div>
      <div>
        <MediumFooter />
      </div>
    </>
  );
};

export default News;

/*
const Users = () => {

    const params = useParams();
    const { id } = params;

    return (
        <div>
            {
                id
                    ? <UserPage id={id} />
                    : <UsersList />
            }
        </div>

    );
};

*/
