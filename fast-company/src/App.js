import React, { useState } from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import API from "./api";

function App() {
  const [users, setUsers] = useState(API.users.fetchAll());

  const handleDelete = (id) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== id));
  };
  const handleToggleBookMark = (id) => {
    console.log("first");
  };

  return (
    <>
      <SearchStatus />
      {users.length !== 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            <Users
              {...users}
              onDelete={handleDelete}
              onToggleBookMark={handleToggleBookMark}
            />
          </tbody>
        </table>
      ) : (
        ""
      )}
    </>
  );
}

export default App;
