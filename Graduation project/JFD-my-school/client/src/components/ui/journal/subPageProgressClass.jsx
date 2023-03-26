/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { nanoid } from "nanoid";
import { useSelector, useDispatch } from "react-redux";

// Component
import Modal from "../../modals/modal";
import ProgressTable from "./progressTable";
import AddDeleteMark from "../../forms/addDeleteMark";

// Hooks
import { useProgress } from "../../../hooks/useProgress";

// Store
import {
  loadChoosenLearner,
  getChoosenLearner,
  getChLearnerLoaded,
  clearChoosenLearner,
} from "../../../store/chLearner";

const SubPageProgressClass = (props) => {
  const {
    progress,
    // getClassProgress,
    // setClassProgress,
    addOrEditMark,
    deleteMark,
  } = useProgress();

  const [modalActivate, setModalActivate] = useState(false);
  const [markEdit, setMarkEdit] = useState({});

  const [learnerProgres, setLearnerProgres] = useState();
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const addtitionalData = useSelector(getChoosenLearner());
  const isLearnerLoaded = useSelector(getChLearnerLoaded());
  const dispatch = useDispatch();

  const [data, setData] = useState({
    startDate: new Date("2023-03-13T03:00:00"),
  });

  useEffect(() => {
    if (progress.length) {
      const classProgressData = progress.map((learner, ind) => {
        // Empty array
        // const _date = new Date(data.startDate}T00:00:0.000`);
        const _date = new Date(data.startDate);
        let userProgressData = _.fill(Array(14), {
          path: "day_",
          name: "date",
        }).map((dayCol, ind) => {
          const dateCol = new Date(_date).toLocaleDateString();
          _date.setDate(_date.getDate() + 1);
          const dayId = nanoid();

          return {
            isMark: true,
            idDay: dayId,
            path: dayCol.path + (ind + 1),
            name: dateCol,
            mark: "",
            type: 0,
            task: "",
            handleClick: () => {
              return handleOpenModal({
                _id: dayId,
                date: dateCol,
                learnerData: learner,
              });
            },
          };
        });

        const progress_avg = learner.progress.avg;
        const corProg = learner.progress.values.map((el) => ({
          ...el,
          date: new Date(el.date).toLocaleDateString(),
        }));

        userProgressData = userProgressData.map((learData) => {
          const findDay = corProg.find((day) => day.date === learData.name);

          // console.log(corProg, learData, findDay);
          if (findDay) {
            return {
              isMark: true,
              idDay: findDay._id,
              path: learData.path,
              name: learData.name,
              mark: findDay.mark,
              type: findDay.type,
              task: findDay.task,
              handleClick: () => {
                return handleOpenModal({
                  _id: findDay._id,
                  date: learData.name,
                  mark: findDay.mark,
                  type: findDay.type,
                  task: findDay.task,
                  learnerData: learner,
                });
              },
            };
          }
          return learData;
        });

        const userProgressObj = {};
        userProgressData.forEach((day) => {
          userProgressObj[day.path] = day;
        });

        return Object.assign(
          {
            _id: learner._id,
            num: ind + 1,
            name: `${learner.last_name} ${learner.first_name}`,
          },
          userProgressObj,
          {
            progress_avg: progress_avg,
          }
        );
      });

      setLearnerProgres(classProgressData);
      return () => setLearnerProgres({});
    }
  }, [data.startDate, progress]); //

  useEffect(() => {
    const chId = markEdit.learnerData?.learnerId;
    if (chId) {
      dispatch(loadChoosenLearner(chId));
    }

    return () => {
      dispatch(clearChoosenLearner());
    };
  }, [markEdit]);

  const handleOpenModal = (obj) => {
    setMarkEdit(obj);
    setModalActivate((p) => !p);
  };

  const sortedProgressData = _.orderBy(
    learnerProgres,
    [sortBy.path],
    [sortBy.order]
  );

  const handleSort = (item) => {
    setSortBy(item);
  };

  const handleChange = ({ target }) => {
    // console.log(target, target.value);
    const newDate =
      target.type === "date" ? new Date(target.valueAsDate) : target.value;
    // console.log(target.type, target.valueAsDate);

    setData((prevState) => ({
      ...prevState,
      [target.name]: newDate,
    }));
  };

  const handleAddMark = (obj) => {
    // console.log(obj);
    addOrEditMark({
      ...obj,
      _id: obj.isEdit ? obj._id : "",
    });
    // location.reload();
  };

  const handleDeleteMark = (obj) => {
    // console.log(obj);
    deleteMark(obj);
  };

  const handlePickStartDate = (newStrDate) => {
    event.preventDefault();
  };

  return (
    <div className="mt-2">
      <ProgressTable
        progressData={sortedProgressData}
        startPeriod={data.startDate}
        // endPeriod={"2023-03-26T12:00:00.000+00:00"}
        onSort={handleSort}
        selectedSort={sortBy}
      />
      <form
        className="
          w-full h-fit px-4 
          border-t-2 border-b-2 border-black
          bg-blue-100
          "
        // onSubmit={handlePickStartDate}
      >
        <div>
          <label className="text-sm font-body" htmlFor="startDate">
            Введите дату начального периода:
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            className={`
              form-input px-2 py-1 my-1 mx-2 rounded-md
              hover:ring-purple-200 focus:ring-purple-200 focus:bg-blue-50
              `}
            // value={data.startDate}
            defaultValue={data.startDate.toISOString().slice(0, 10)} //
            onChange={handleChange}
          />
        </div>
      </form>
      <div>
        {markEdit && (
          <Modal active={modalActivate} setActive={setModalActivate}>
            <AddDeleteMark
              _id={markEdit._id}
              // date={homeworkEdit.date ? homeworkEdit.date.slice(0, 10) : ""}
              date={markEdit.date}
              mark={markEdit.mark}
              type={markEdit.type}
              task={markEdit.task}
              journalId={markEdit.learnerData?.journalId || ""}
              progressId={markEdit.learnerData?._id || ""}
              image={isLearnerLoaded ? "http://" + addtitionalData.image : ""}
              learnerName={
                isLearnerLoaded
                  ? addtitionalData.last_name + " " + addtitionalData.first_name
                  : ""
              }
              // onSubmit={handleSubmitHomework}
              onAdd={handleAddMark}
              onDelete={handleDeleteMark}
              onClose={() => setModalActivate(false)}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

SubPageProgressClass.propTypes = {};

export default SubPageProgressClass;
