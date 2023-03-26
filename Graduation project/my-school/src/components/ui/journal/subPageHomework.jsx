/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { useHomework } from "../../../hooks/useHomework";

// Component
import Modal from "../../modals/modal";
import AddEditHomework from "../../forms/addEditHomework";

// Icons
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";

// RowComponent
const RowHomework = ({
  id,
  num,
  date,
  shortData,
  longData,
  editHomework,
  deleteHomework,
}) => {
  return (
    <div
      className={`
      flex flex-row  justify-between items-center
      h-18 w-full py-2 px-2
      border-1 ring-primary rounded ring-1 
      hover:bg-primary-42 hover:bg-opacity-25
      hover:ring-orange-400 hover:ring-2

      text-primary-2 font-semibold
      `}
    >
      <div className="w-fit">
        <span className="text-lg px-4">{num}</span>
        <span className="text-lg px-4">{date}</span>
      </div>
      <span className="w-auto">{longData}</span>
      <div className="w-fit flex flex-row">
        <FaPencilAlt
          className={`
            w-10 h-10 p-2 mx-2 rounded-md 
            ring-1 ring-primary-1 shadow-md shadow-purple-400
            hover:shadow-green-400 hover:ring-green-700 hover:ring-1 hover:bg-green-100
          `}
          onClick={editHomework}
        />
        <FaTrashAlt
          className={`
            w-10 h-10 p-2 mx-2 rounded-md 
            ring-1 ring-primary-1 shadow-md shadow-purple-400
            hover:shadow-green-400 hover:ring-green-700 hover:ring-1 hover:bg-green-100
          `}
          onClick={deleteHomework}
        />
      </div>
    </div>
  );
};

const SubPageHomework = ({ classId, journalId, topicId }) => {
  const { homeworks, putNewHomework, postEditHomework, deleteHomework } =
    useHomework();

  const [modalActivate, setModalActivate] = useState(false);
  const [homeworkEdit, setHomeworkEdit] = useState({});

  const handleOpenModal = (obj) => {
    setHomeworkEdit(obj);
    setModalActivate((p) => !p);
  };

  // ****************************************
  const handleSubmitHomework = (editOrAdd, objNewHomework) => {
    const advObj = {
      ...objNewHomework,
      _id: objNewHomework.id,
      classId: classId,
      journalId: journalId,
      topicId: topicId,
    };

    // console.log(advObj);

    if (editOrAdd === "edit") {
      postEditHomework(advObj);
    } else if (editOrAdd === "add") {
      putNewHomework(advObj);
    }
    setModalActivate(false);
  };

  const handleDeleteHomework = (uuid_homework) => {
    deleteHomework(uuid_homework);
    setModalActivate(false);
  };

  return (
    <>
      <div
        className={`
          my-2 h-12
          flex flex-row justify-center items-center
          break-words leading-tight text-center
          select-none font-semibold
          font-body text-md text-primary-2
          bg-slate-300
          border-b-2 border-t-2 border-slate-700
        `}
      >
        <span className="px-3 basis-6">№</span>
        <span className="px-3 basis-100 leading-tight">Дата окончания</span>
        <span className="px-3 grow">Домашнее задание</span>
        <span className="px-3 basis-100">Действия</span>
      </div>
      <div className="flex flex-col gap-2">
        {homeworks &&
          _.sortBy(homeworks, ["date"]).map((hw, ind) => {
            return (
              <RowHomework
                key={hw._id}
                id={hw._id}
                num={ind + 1}
                date={new Date(hw.date).toLocaleDateString()}
                shortData={""}
                longData={hw.task}
                editHomework={() => handleOpenModal(hw)}
                deleteHomework={() => handleDeleteHomework(hw._id)}
              />
            );
          })}
      </div>
      <div
        className={`
          flex flex-block  justify-center items-center
            h-18 w-full py-2 mt-2
          border-1 ring-green-400 rounded ring-1 
          hover:bg-green-100 hover:ring-2 hover:ring-green-500
          hover:shadow-md hover:shadow-green-400
          `}
        onClick={() => handleOpenModal({})}
      >
        <FiPlusCircle className="h-10 w-10 px-2 inline-block text-green-600" />
        <span className="text-xl inline-block text-green-600">
          Добавить Домашнее задание
        </span>
      </div>
      <div>
        {homeworkEdit && (
          <Modal active={modalActivate} setActive={setModalActivate}>
            <AddEditHomework
              id={homeworkEdit._id}
              date={homeworkEdit.date ? homeworkEdit.date.slice(0, 10) : ""}
              task={homeworkEdit.task}
              onSubmit={handleSubmitHomework}
              onClose={() => setModalActivate(false)}
            />
          </Modal>
        )}
      </div>
    </>
  );
};

SubPageHomework.propTypes = {
  uuid_homeworks: PropTypes.array,
  classId: PropTypes.string,
  journalId: PropTypes.string,
  topicId: PropTypes.string,
};

RowHomework.propTypes = {
  id: PropTypes.string.isRequired,
  num: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  date: PropTypes.string,
  shortData: PropTypes.string,
  longData: PropTypes.string,
  editHomework: PropTypes.func,
  deleteHomework: PropTypes.func,
};

export default SubPageHomework;
