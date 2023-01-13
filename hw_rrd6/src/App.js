import { useRoutes, Navigate, NavLink, useParams, Outlet } from "react-router-dom";
import "./App.css";

const MainPage = () => {
    return (
        <div>
            <h1>Main Page</h1>
        </div>
    );
};

const UsersLayout = () => {
    return (
        <div>
            <h1>Users Layout</h1>
            <NavLink to="..">Main Page</NavLink>
            <Outlet />
        </div>
    );
};

const UsersListPage = () => {
    return (
        <div>
            <h1>Users List Page</h1>
            <ul>
                {new Array(6).fill("").map((_, ind) => (
                    <li key={ind}>
                        <NavLink to={`./${ind + 1}`}>User {ind + 1}</NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const UserPage = () => {
    const { userId } = useParams();
    return (
        <div>
            <h1>User Page</h1>
            <ul>
                <li>
                    <NavLink to="..">Users list page</NavLink>
                </li>
                <li>
                    <NavLink to={`../${userId}/edit`}>Edit this page</NavLink>
                </li>
            </ul>
            <h4>userID: {userId}</h4>
        </div>
    );
};

const EditUserPage = () => {
    const { userId } = useParams();
    return (
        <div>
            <h1>Edit user page</h1>
            <ul>
                <li>
                    <NavLink to={`../${userId}/profile`}>User profile page</NavLink>
                </li>
                <li>
                    <NavLink to={`../${parseInt(userId) + 1}/`}>Another User page</NavLink>
                </li>
                <li>
                    <NavLink to="..">Users list page</NavLink>
                </li>
            </ul>
        </div>
    );
};

const routes = () => [
    {
        path: "/",
        element: <MainPage />,
    },
    {
        path: "users/*",
        element: <UsersLayout />,
        children: [
            {
                path: ":userId/profile",
                element: <UserPage />,
            },
            {
                path: ":userId/edit",
                element: <EditUserPage />,
            },
            {
                path: ":userId",
                element: <Navigate to="./profile" />,
            },
            {
                path: "",
                element: <UsersListPage />,
            },
        ],
    },
    {
        path: "*",
        element: <Navigate to="/" />,
    },
];

function App() {
    const element = useRoutes(routes());
    return (
        <div>
            <h1>App Layout</h1>
            <NavLink to="users">Users list Page</NavLink>
            {element}
        </div>
    );
}

export default App;
