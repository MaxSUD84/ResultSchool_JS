import React, { useState, useEffect } from "react";
import GroupList from "./groupList";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import SearchStatus from "./searchStatus";
import User from "./user";
import api from "../api/index";
import PropTypes from "prop-types";

const Users = ({ users: allUsers, ...rest }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const pageSize = 4;

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    // При обновлении профессии сбрасываем текущию страницу на 1 стр.
    useEffect(() => { setCurrentPage(1); }, [selectedProf]);

    // Сброс фильтра
    // useEffect(() => {
    //     api.professions.fetchAll().then((data) => setProfessions(
    //         Object.assign(data, { allProfession: { name: "Все профессии" } })));
    // }, []);

    const handleProfessionSelect = item => {
        setSelectedProf(item);
        // console.log(allUsers);
        // console.log(allUsers[0].profession, item, allUsers[0].profession._id === item._id);
    };

    const handlePageChange = (pageIndex) => {
        // console.log("page", pageIndex);
        setCurrentPage(pageIndex);
    };

    // Проверка на наличие свойства _id
    // const filteredUsers = selectedProf && selectedProf._id
    //     ? allUsers.filter((user) => user.profession === selectedProf)
    //     : allUsers;

    const filteredUsers = selectedProf
        ? allUsers.filter((user) => user.profession._id === selectedProf._id)
        : allUsers;

    const count = filteredUsers.length;
    const userCrop = paginate(filteredUsers, currentPage, pageSize);
    const clearFilter = () => { setSelectedProf(); };

    return (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={clearFilter}>
                        Очистить
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">
                <SearchStatus length={count} />
                {count > 0 && (
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
                )}
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};
Users.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Users;
