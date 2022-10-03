import React, { useState, useEffect } from "react";
import GroupList from "./groupList";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import SearchStatus from "./searchStatus";
import api from "../api/index";
import PropTypes from "prop-types";
import UserTable from "./userTable";

const Users = ({ users: allUsers, ...rest }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({iter:"name", order:"asc"});
    const pageSize = 6;

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    // При обновлении профессии сбрасываем текущию страницу на 1 стр.
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    // Сброс фильтра
    // useEffect(() => {
    //     api.professions.fetchAll().then((data) => setProfessions(
    //         Object.assign(data, { allProfession: { name: "Все профессии" } })));
    // }, []);

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
        // console.log(allUsers);
        // console.log(allUsers[0].profession, item, allUsers[0].profession._id === item._id);
    };

    const handlePageChange = (pageIndex) => {
        // console.log("page", pageIndex);
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        // console.log(item);
        if(sortBy.iter === item) {
            setSortBy((prevState) => ({...prevState, order: prevState.order === "asc" ? "desc":"asc"}));

        } else {
            setSortBy({iter:item, order: "asc"});
        }
    };

    const filteredUsers = selectedProf
        ? allUsers.filter((user) => user.profession._id === selectedProf._id)
        : allUsers;

    const count = filteredUsers.length;

    const sortedUsers = _.orderBy(filteredUsers,[sortBy.iter],[sortBy.order]);
    const userCrop = paginate(sortedUsers, currentPage, pageSize);
    const clearFilter = () => {
        setSelectedProf();
    };

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
                        onClick={clearFilter}
                    >
                        Очистить
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">
                <SearchStatus length={count} />
                {count > 0 && (
                    <UserTable users={userCrop} onSort={handleSort} {...rest} />
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
