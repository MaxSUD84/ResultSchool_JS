import React, { useState, useEffect } from "react";
import GroupList from "./groupList";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import SearchStatus from "./searchStatus";
import api from "../api/index";
import PropTypes from "prop-types";
import UserTable from "./usersTable";

const UsersList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({path:"name", order:"asc"});
    const pageSize = 6;

    const [users, setUsers] = useState(); // API.users.fetchAll()

    useEffect(() => {
        api.users.default.fetchAll()
            .then((data) => setUsers(data));
    }, []);

    const handleDelete = (id) => {
        setUsers((prevState) => prevState.filter((user) => user._id !== id));
    };

    const handleToggleBookMark = (id) => {
        setUsers((prevState) =>
            prevState.map((user) => ({
                ...user,
                bookmark: user._id === id ? !user.bookmark : user.bookmark
            }))
        );
    };

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
    };

    const handlePageChange = (pageIndex) => {
        // console.log("page", pageIndex);
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    if(users) {
        const filteredUsers = selectedProf
            ? users.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
            : users;
        // Моя реализация    
        // const filteredUsers = selectedProf
        //     ? users.filter((user) => user.profession._id === selectedProf._id)
        //     : users;

        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(filteredUsers,[sortBy.path],[sortBy.order]);
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
                        <UserTable 
                            users={userCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onToggleBookMark={handleToggleBookMark}
                            onDelete={handleDelete} 
                        />
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
    } 
    return <h1>Loading...</h1>;
};
UsersList.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object)
};

export default UsersList;
