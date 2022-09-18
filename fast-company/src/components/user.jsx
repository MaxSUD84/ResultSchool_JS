import React from "react";
import Qualitie from "./qualitie";
import BookMark from "./bookmark";

const User = ({ user, ...rest }) => {
  <tr>
    <td>{user.name}</td>
    <td>
      {user.qualitie.map((ql) => (
        <Qualitie key={ql._id} {...ql} />
      ))}
    </td>
    <td>{user.professions.name}</td>
    <td>{user.completedMeetings}</td>
    <td>{user.rate}</td>
    <td>
      <BookMark />
    </td>
    <td>
      <button
        className="btn m-2 bg-danger btn-sm"
        onClick={() => rest.onDelete(user._id)}
      >
        delete
      </button>
    </td>
  </tr>;
};

export default User;

/*
{users.map((user) => (
        <User key={users._id} {...user} onDelete={users.onDelete} />
      ))}
*/
