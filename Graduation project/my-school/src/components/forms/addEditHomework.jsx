/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";

// Component
import TextField from "../common/form/textField";
import TextArea from "../common/form/textArea";

import { FaTimes } from "react-icons/fa";

const AddEditHomework = ({ id, date, task, onSubmit, onClose }) => {
  const _id = nanoid();
  const [errors] = useState({}); // , setErrors
  const [data, setData] = useState({
    id: "",
    date: "",
    task: "",
  });

  useEffect(() => {
    const nowDate = new Date().toISOString().slice(0, 10);
    setData({
      id: id ? id : "",
      date: date || nowDate,
      task: task || "",
    });

    // console.log("mount");
    return () => {
      setData({});
    };
  }, [id]);

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = (obj) => {
    event.preventDefault();
    const newObj = {
      ...obj,
      date: obj.date + "T03:00:00.000Z",
    };
    const editOrAdd = newObj.id ? "edit" : "add";
    onSubmit(editOrAdd, newObj);
    onClose();
  };

  return (
    <form
      className="form-textarea w-[400px] rounded flex flex-col gap-2"
      onSubmit={() => handleSubmit(data)}
    >
      <h3 className="text-lg font-semibold text-primary-2 font-Roboto flex justify-center">
        {id ? "Изменить домашнее задание" : "Добавить домашнее задание"}
      </h3>
      <span className="absolute top-0 right-5 text-xs text-slate-200">
        id:{data.id}
      </span>
      <TextField
        label="Выполнить до"
        name="date"
        value={data.date}
        onChange={handleChange}
        error={errors.date}
        type={"date"}
      />
      <TextArea
        label={"Домашнее задание"}
        rows={3}
        cols={50}
        maxlength={255}
        placeholder={"Домашнее задание ... "}
        required={true}
        name={"task"}
        value={data.task}
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
          {id ? "Изменить" : "Добавить"}
        </button>
        <button className="" type="reset" onClick={onClose}>
          <FaTimes className="w-12 h-12 rounded bg-red-600 text-primary-1" />
        </button>
      </div>
    </form>
  );
};

AddEditHomework.default = {
  id: "",
  date: "",
  task: "",
};

AddEditHomework.propTypes = {
  id: PropTypes.string,
  date: PropTypes.string,
  task: PropTypes.string,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
};

export default AddEditHomework;
