/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import TextArea from "../common/form/textArea";

import { FaTrash } from "react-icons/fa";

const markType = (num) => {
  const mt = [
    { label: "Домашнее Задание", value: 0 },
    { label: "Классная Работа", value: 1 },
    { label: "Лабораторная работа", value: 2 },
    { label: "Контрольная работа", value: 3 },
    { label: "ВПР всеросийская ПР", value: 4 },
  ];

  return mt[num < mt.length ? num : mt.length];
};

const AddDeleteMark = ({
  journalId,
  progressId,
  _id,
  date,
  mark,
  type,
  task,
  image,
  learnerName,
  onClose,
  onAdd,
  onDelete,
}) => {
  const [errors] = useState({}); // , setErrors
  const [data, setData] = useState({
    _id: "",
    date: "",
    type: 0,
    task: "",
    mark: 0,
    isEdit: false,
  });

  useEffect(() => {
    setData({
      _id: _id,
      date: date,
      type: type,
      task: task,
      mark: mark,
      isEdit: !!mark,
    });

    // console.log("mount");
    return () => {
      setData({});
    };
  }, [_id]);

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = (obj) => {
    event.preventDefault();
    const _date = obj.date.split(".").reverse().join("-") + "T03:00:00.000";
    const newObj = {
      ...obj,
      date: new Date(_date),
      type: +obj.type,
      mark: +obj.mark,
      journalId,
      progressId,
    };
    onAdd(newObj);
    setData({});
    onClose();
  };

  return (
    <div>
      <form
        id="MarkForm"
        className="form-textarea w-[420px] rounded flex flex-col gap-2"
        onSubmit={() => handleSubmit(data)}
      >
        <div className="flex flex-row">
          <img src={image} alt="" className="w-24 h-24 ring-1 rounded-md" />
          <div className="flex flex-col w-full justify-center items-center gap-2 bg-slate-100 rounded-md">
            <p className="text-start font-semibold text-2xl">{learnerName}</p>
            <h3 className="text-lg font-bold text-primary-2 font-Roboto">
              {mark
                ? `Изменить оценку за ${data.date}`
                : `Добавить оценку за ${data.date}`}
            </h3>
          </div>
        </div>

        <span className="absolute top-0 right-5 text-xs text-slate-200">
          id:{data._id}
        </span>
        <TextField
          label="Оценка"
          name="mark"
          value={data.mark || ""}
          onChange={handleChange}
          error={errors.date}
          type={"number"}
        />
        <SelectField
          label="Тип работы"
          name="type"
          value={data.type || ""}
          onChange={handleChange}
          defaultOption="Выберите тип работы..."
          options={[0, 1, 2, 3, 4].map((t) => markType(t))}
          error={errors.date}
        />
        <TextArea
          label="Комментарий"
          rows={3}
          cols={50}
          maxlength={255}
          placeholder="Оценка за ... "
          name="task"
          value={data.task || ""}
          onChange={handleChange}
          error={errors.task}
        />
        <div
          className={`
          w-full flex flex-row justify-center items-center gap-3
          `}
        >
          <button
            className={`
            rounded w-full h-12
            text-lg font-semibold text-primary-42 bg-primary-2
            hover:ring-2 hover:ring-primary-41 hover:shadow-md hover:shadow-purple-400
            hover:underline hover:text-primary-41 hover:underline-offset-2
          `}
            type="submit"
          >
            {mark ? "Изменить" : "Добавить"}
          </button>
          <button
            className=""
            type="reset"
            onClick={() => {
              onDelete({
                deleteMarkId: data._id,
                journalId,
                progressId,
              });
              onClose();
            }}
          >
            <FaTrash className="w-12 h-12 p-2 rounded bg-red-600 text-primary-1" />
          </button>
        </div>
      </form>
    </div>
  );
};

AddDeleteMark.default = {
  _id: "",
  date: "",
  mark: 0,
  type: 0,
  task: "",
};

AddDeleteMark.propTypes = {
  journalId: PropTypes.string,
  progressId: PropTypes.string,
  _id: PropTypes.string,
  date: PropTypes.string,
  mark: PropTypes.number,
  type: PropTypes.number,
  task: PropTypes.string,
  image: PropTypes.string,
  learnerName: PropTypes.string,
  onClose: PropTypes.func,
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
};

export default AddDeleteMark;
