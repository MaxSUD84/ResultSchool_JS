import React from "react";
import Qualitie from "./qualitie";
import BookMark from "./bookmark";

const User = ({ user, ...rest }) => {
  return (
    <tr>
      <td>{user.name}</td>
      <td>
        {user.qualities.map((ql) => (
          <Qualitie key={ql._id} _id={ql._id} color={ql.color} name={ql.name} />
        ))}
      </td>
      <td>{user.professions.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate}</td>
      <td>
        <BookMark
          status={user.status}
          {...user}
          onToggleBookMark={rest.onToggleBookMark}
        />
      </td>
      <td>
        <button
          className="btn m-2 bg-danger btn-sm"
          onClick={() => rest.onDelete(user._id)}
        >
          delete
        </button>
      </td>
    </tr>
  );
};

export default User;

/*
{users.map((user) => (
        <User key={users._id} {...user} onDelete={users.onDelete} />
      ))}
*/