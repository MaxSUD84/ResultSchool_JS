import React from "react";
import { useState } from "react";
import Pagination from "./pagination";
import User from "./user";

const Users = ({ users, ...rest }) => {
  const count = users.length;
  const pageSize = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (pageIndex) => {
    // console.log("page", pageIndex);
    setCurrentPage(pageIndex);
  };

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col">Избранное</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {users.map((user) => (
            <User
              key={user._id}
              user={user}
              onDelete={rest.onDelete}
              onToggleBookMark={rest.onToggleBookMark}
            />
          ))}
        </tbody>
      </table>
      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Users;
