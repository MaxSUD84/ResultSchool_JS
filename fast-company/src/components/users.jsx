import React from "react";
import User from "./user";

const Users = ({ users, ...rest }) => {
  return (
    <>
      {users.map((user) => (
        <User key={users._id} {...user} onDelete={users.onDelete} />
      ))}
    </>
  );
};

// const [users, setUsers] = useState(api.users.fetchAll());

// const handleDelete = (userId) => {
//   setUsers((prevItems) => prevItems.filter((user) => user._id !== userId));
// };

/*

  return (
    <>
      <span
        className={"badge p-2 m-2 bg-" + (users.length ? "primary" : "danger")}
      >
        {renderPhrase(users.length)}
      </span>
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
            {users.length !== 0 &&
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>
                    {user.qualities.map((qlts) => (
                      <span
                        key={qlts._id}
                        className={"badge p-2 m-1 bg-" + qlts.color}
                      >
                        {qlts.name}
                      </span>
                    ))}
                  </td>
                  <td>{user.professions.name}</td>
                  <td>{user.completedMeetings}</td>
                  <td>{user.rate}</td>
                  <td>
                    <button
                      className="btn m-2 bg-danger btn-sm"
                      onClick={() => handleDelete(user._id)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        ""
      )}
    </>
  );
};
*/

export default Users;
