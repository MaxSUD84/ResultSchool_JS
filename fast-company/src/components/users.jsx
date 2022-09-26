import React, { useState, useEffect } from "react";
import GroupList from "./groupList";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import User from "./user";
import api from "../api/index";
import PropTypes from "prop-types";

const Users = ({ users, ...rest }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const count = users.length;
    const pageSize = 5;
    useEffect(() => {
        // console.log("send request");
        api.professions.fetchAll().then((data) => setProfessions(data));
        // console.log("Change Current Page");
        // return () => console.log("Unmount");
    }, []);

    // useEffect(() => {
    //     console.log(professions);
    // }, [professions]);

    const handleProfessionSelect = (params) => {
        console.log(params);
    };

    // console.log(professions);

    const handlePageChange = (pageIndex) => {
        // console.log("page", pageIndex);
        setCurrentPage(pageIndex);
    };

    const userCrop = paginate(users, currentPage, pageSize);
    // console.log(userCrop);

    return (
        <>
            <GroupList items={professions} onItemSelect={handleProfessionSelect}/>
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
                    {userCrop.map((user) => (
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
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </>
    );
};
Users.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Users;
