import React from "react";
import PropTypes from "prop-types";
import BookMark from "../common/bookmark";
import { Qualities } from "../ui/qualities";
import Table from "../common/table";
import { Link } from "react-router-dom";
import Profession from "./profession";

const UserTable = ({ users, onSort, selectedSort, onToggleBookMark }) => {
    // console.log(users);
    const columns = {
        // name: { path: "name", name: "Имя" },
        name: {
            name: "Имя",
            path: "name",
            component: (user) => (
                <Link to={"/users/" + user._id}>{user.name}</Link>
            )
        },
        // qualities: {
        //     name: "Качества",
        //     component: (user) =>
        //         user.qualities.map((ql) => (
        //             <Qualities
        //                 key={ql._id}
        //                 _id={ql._id}
        //                 color={ql.color}
        //                 name={ql.name}
        //             />
        //         ))
        // },
        qualities: {
            name: "Качества",
            component: (user) => <Qualities qualities={user.qualities} />
        },
        // professions: { path: "profession.name", name: "Профессия" },
        professions: {
            name: "Профессия",
            component: (user) => <Profession id={user.profession} />
        },
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
        }
    };
    return (
        <Table {...{ onSort, selectedSort, columns, data: users }} />
        // или
        // <TableHeader {...{ onSort, selectedSort, columns }} />
        // <TableBody {...{ columns, data: users }}/>
    );
};

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookMark: PropTypes.func.isRequired
};

export default UserTable;
