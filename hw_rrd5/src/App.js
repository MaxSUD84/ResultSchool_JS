import "./App.css";
import { Route, Switch, Redirect, Link, useRouteMatch, useParams } from "react-router-dom";

const UsersList = () => {
    return (
        <div>
            <h2>Users List Page</h2>
            <ul>
                <li>
                    <Link to="/users/1">User 1</Link>
                </li>
                <li>
                    <Link to="/users/2">User 2</Link>
                </li>
                <li>
                    <Link to="/users/3">User 3</Link>
                </li>
                <li>
                    <Link to="/users/4">User 4</Link>
                </li>
                <li>
                    <Link to="/users/5">User 5</Link>
                </li>
                <li>
                    <Link to="/users/6">User 6</Link>
                </li>
            </ul>
        </div>
    );
};

const UserPage = () => {
    const { userId } = useParams();
    return (
        <div>
            <h2>User Page</h2>
            <ul>
                <li>
                    <Link to="/users">Users List Page</Link>
                </li>
                <li>
                    <Link to={`/users/${userId}/edit`}>Edit this user</Link>
                </li>
            </ul>
            <h4>userId: {userId}</h4>
        </div>
    );
};

const EditUserPage = () => {
    const { userId } = useParams();
    return (
        <div>
            <h2>Edit User Page</h2>
            <ul>
                <li>
                    <Link to={`/users/${userId}/profile`}>User profile Page</Link>
                </li>
                <li>
                    <Link to={`/users/${parseInt(userId) + 1}/profile`}>Another User</Link>
                </li>
                <li>
                    <Link to={`/users`}>Users List Page</Link>
                </li>
            </ul>
        </div>
    );
};

const UsersLayout = () => {
    const { path } = useRouteMatch("/users");
    console.log(path);
    return (
        <div>
            <h2>UsersLayout</h2>
            <Link to="/">Home Page</Link>
            <Switch>
                <Route path={path + "/:userId/profile"} component={UserPage} />
                <Route path={path + "/:userId/edit"} component={EditUserPage} />
                <Route path={path} exact component={UsersList} />
                <Redirect from={path + "/:userId"} to={path + "/:userId/profile"} />
            </Switch>
        </div>
    );
};

function App() {
    return (
        <>
            <h3>App Layout</h3>
            <Link to="/users">Users List Page</Link>
            <Switch>
                <Route
                    path="/"
                    exact
                    render={() => (
                        <div>
                            <h1>Home Page</h1>
                        </div>
                    )}
                />
                <Route path="/users" component={UsersLayout} />
                <Route>
                    <Redirect to="/" />
                </Route>
            </Switch>
        </>
    );
}

export default App;
