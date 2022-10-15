/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import Post from "./post";
import PostsList from "./postsList";
import { useRouteMatch, useParams } from "react-router-dom";

const Posts = () => {
    // const match = useRouteMatch();
    const params = useParams();
    const posts = [
        { id: 1, label: "Post #1" },
        { id: 2, label: "Post #2" },
        { id: 3, label: "Post #3" }
    ];

    // const postId = match.params.postId;
    const { postId } = params;

    return (
        <>
            {
                postId 
                    ?   <> 
                        <Post id={postId} posts={posts} />
                    </>
                    : <PostsList posts={posts} />
            }
        </>
    );
};

export default Posts;

/*

    const search = query.parse(location.search);

    // // ***  Пример из лекции ***
    // const [showOffer, setShowOffer] = useState(false);
    // const { search } = useLocation();
    // const { fromUrl, block } = search;

    // // Проверка Query-параметров 
    // useEffect(() => {
    //     if (!showOffer && fromUrl && block) {
    //         setShowOffer(true);
    //     }
    // }, [fromUrl, block, showOffer]);

    // // Отображение специального контента
    // return (
    //     <>
    //         {showOffer && <div>Специальное предложение</div>}
    //     </>
    // );
    

    const postId = match.params.postId;
    // const display = match.params.display;
    useEffect(() => console.log(search), [search]);
    const cropPosts = search ? _(posts).slice(0).take(search.count).value() : posts;

    return (
        <>
            {
                postId 
                    ?   <> 
                        {/* {display && <h2>{display}</h2> } /}
                        <Post id={postId} posts={posts} />
                    </>
                    : <PostsList posts={cropPosts} />
            }
        </>
    );

    */