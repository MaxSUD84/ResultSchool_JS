import React from "react";
import PropTypes from "prop-types";
import User from "./user";

const UserTable = ({ users, onSort, ...rest }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th onClick={() => onSort("name")} scope="col">
                        Имя
                    </th>
                    <th scope="col">Качества</th>
                    <th onClick={() => onSort("profession.name")} scope="col">
                        Профессия
                    </th>
                    <th onClick={() => onSort("completedMeetings")} scope="col">
                        Встретился, раз
                    </th>
                    <th onClick={() => onSort("rate")} scope="col">
                        Оценка
                    </th>
                    <th onClick={() => onSort("bookmark")} scope="col">
                        Избранное
                    </th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody className="table-group-divider">
                {users.map((user) => (
                    <User
                        key={user._id}
                        user={user}
                        {...rest} // добавил согласно рекомендациям от 21.09.22
                        // onDelete={rest.onDelete}                   // убрал согласно рекомендациям от 21.09.22
                        // onToggleBookMark={rest.onToggleBookMark}   // убрал согласно рекомендациям от 21.09.22
                    />
                ))}
            </tbody>
        </table>
    );
};

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired
};

export default UserTable;
