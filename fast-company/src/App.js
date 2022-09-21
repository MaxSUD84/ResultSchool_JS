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
    setUsers((prevState) =>
      prevState.map((user) => ({
        ...user,
        bookmark: user._id === id ? !user.bookmark : user.bookmark,
      }))
    );
  };

  return (
    <>
      <SearchStatus length={users.length} />
      {users.length !== 0 ? (
        <Users
          users={users}
          onDelete={handleDelete}
          onToggleBookMark={handleToggleBookMark}
        />
      ) : (
        ""
      )}

    </>
  );
}

export default App;
