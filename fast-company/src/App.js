import React from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/users/:id?" component={Users} />
                <Route path="/login" component={Login} />
                <Route render={() => <h1>Loading</h1>} />
            </Switch>
        </div>
    );
}

export default App;

/* 

    const [users, setUsers] = useState(); // API.users.fetchAll()

    useEffect(() => {
        api.users.default.fetchAll()
            .then((data) => setUsers(data));
    }, []);

    const handleDelete = (id) => {
        setUsers((prevState) => prevState.filter((user) => user._id !== id));
    };

    const handleToggleBookMark = (id) => {
        setUsers((prevState) =>
            prevState.map((user) => ({
                ...user,
                bookmark: user._id === id ? !user.bookmark : user.bookmark
            }))
        );
    };

    return (
        <>
            {
                users && users.length !== 0
                    ? (<Users users={users} onDelete={handleDelete} onToggleBookMark={handleToggleBookMark} />)
                    : ("")
            }
        </>
    );

    */
