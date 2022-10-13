import React from "react";
import PropTypes from "prop-types";
import BookMark from "./bookmark";
import Qualitie from "./qualitie";
import Table from "./table";
import { Link } from "react-router-dom";

const UserTable = ({ 
    users,
    onSort,
    selectedSort,
    onToggleBookMark,
    onDelete
}) => {
    const columns = {
        // name: { path: "name", name: "Имя" },
        name: { 
            name: "Имя",
            component: (user) => (
                <Link to={"/users/" + user._id}>{user.name}</Link>
            )
        },
        qualities: { 
            name: "Качества",
            component: (user) => (
                user.qualities.map((ql) => (
                    <Qualitie
                        key={ql._id}
                        _id={ql._id}
                        color={ql.color}
                        name={ql.name}
                    />)
                ))
        },
        professions: { path: "profession.name", name: "Профессия" },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: { path: "rate", name: "Оценка" },
        bookmark: { 
            path: "bookmark",
            name: "Избранное", 
            component: (user) => (
                <BookMark
                    status={user.bookmark}
                    onToggleBookMark={onToggleBookMark}
                    {...user}
                    // onClick={() => (onToggleBookMark(user._id))}
                />
            )
        },
        delete: { 
            component: (user) => (
                <button
                    className="btn m-2 bg-danger btn-sm"
                    onClick={() => onDelete(user._id)}
                >
                    delete
                </button>
            )
        }
    };
    return (
        <Table {...{ onSort, selectedSort, columns, data: users }}/>
        // или
        // <TableHeader {...{ onSort, selectedSort, columns }} />
        // <TableBody {...{ columns, data: users }}/>
    );
};

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default UserTable;
