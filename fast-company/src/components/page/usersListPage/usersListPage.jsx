import React, { useState, useEffect } from "react";
import GroupList from "../../common/groupList";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import SearchStatus from "../../ui/searchStatus";
import api from "../../../api";
import PropTypes from "prop-types";
import UserTable from "../../ui/usersTable";
import { useUser } from "../../../hooks/useUsers";
import { useProfessions } from "../../../hooks/useProfessions";
import { useQualities } from "../../../hooks/useQualitys";

const UsersListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [searchField, setSearchField] = useState("");
    const pageSize = 6;

    const { qualities } = useQualities();
    const { professions } = useProfessions();
    const { users } = useUser();
    console.log(users);
    // console.log("UserListPage: ", qualities);
    // console.log("QualityCustom: ", getQuality("637b2a842e4e5e3500a8afea"));
    // console.log(selectedProf);
    // console.log(professions);

    // useEffect(() => {
    //     //  api.users.default.fetchAll().then((data) => setUsers(data));
    //     api.professions.fetchAll().then((data) => setProfessions(data));
    // }, []);

    const handleDelete = (userId) => {
        // setUsers((prevState) => prevState.filter((user) => user._id !== id));
        console.log(userId);
    };

    const handleToggleBookMark = (id) => {
        const newArray = users.map((user) => ({
            ...user,
            bookmark: user._id === id ? !user.bookmark : user.bookmark
        }));
        // setUsers(newArray);
        console.log(newArray);
    };

    // При обновлении профессии сбрасываем текущию страницу на 1 стр.
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    // Сброс фильтра
    // useEffect(() => {
    //     api.professions.fetchAll().then((data) => setProfessions(
    //         Object.assign(data, { allProfession: { name: "Все профессии" } })));
    // }, []);

    const handleChange = ({ target }) => {
        setSelectedProf();
        setSearchField(target.value);
    };

    const handleProfessionSelect = (item) => {
        setSelectedProf(item); //
        setSearchField("");
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    if (users) {
        const searchMatches = searchField
            ? users.filter((user) =>
                  new RegExp(searchField.toLowerCase()).test(
                      user.name.toLowerCase()
                  )
              )
            : users;
        // const searchMatches = searchField
        //     ? users.filter((user) =>
        //           user.name.toLowerCase().includes(searchField.toLowerCase())
        //       )
        //     : users;

        const filteredUsers = selectedProf
            ? searchMatches.filter(
                  (user) =>
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf._id)
              )
            : searchMatches;

        //  Моя реализация
        //  const filteredUsers = selectedProf
        //       ? users.filter((user) => user.profession._id === selectedProf._id)
        //       : users;

        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const userCrop = paginate(sortedUsers, currentPage, pageSize);

        const count = userCrop.length;
        // const count = filteredUsers.length;
        const clearFilter = () => {
            setSelectedProf();
        };

        return (
            <div className="d-flex">
                {/* {professions && ( */}
                {
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
                }
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <div className="d-flex w-100 mx-auto">
                        <div className="input-group">
                            <input
                                type="search"
                                id="table-search"
                                placeholder="Search..."
                                name="q"
                                value={searchField}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                    </div>
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
UsersListPage.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object)
};

export default UsersListPage;
