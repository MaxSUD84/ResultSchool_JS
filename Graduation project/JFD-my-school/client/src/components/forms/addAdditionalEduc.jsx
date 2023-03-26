import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";

// Component
import TextArea from "../common/form/textArea";
import { FaRegTrashAlt, FaPlus } from "react-icons/fa";

const AddAdditionalEduc = ({
  arrContentData,
  label,
  type,
  onClose,
  onSubmit,
}) => {
  const [arrData, setArrData] = useState([]);
  const [data, setData] = useState({});

  useEffect(() => {
    setArrData(arrContentData);

    return () => {
      setArrData([]);
    };
  }, []);

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleDeleteRow = (id) => {
    if (id) {
      setArrData((p) => p.filter((row) => row.id !== id));
    }
  };

  const handlePlus = (data) => {
    if (data) {
      const genId = nanoid();
      const newData = [
        ...arrData,
        {
          id: genId,
          content: data.content,
        },
      ];
      setArrData(newData);
      setData({ content: "" });
    }
  };

  const handleSubmit = (obj) => {
    event.preventDefault();
    onSubmit(type, obj);
    onClose();
  };

  return (
    <form
      className="form-textarea w-[400px] rounded flex flex-col gap-2"
      onSubmit={() => handleSubmit(arrData)}
    >
      <ul>
        {arrData.map((row) => {
          return (
            <li
              key={row.id}
              className="flex flex-row justify-start items-center w-full"
            >
              <p className="text-md font-body w-full">{row.content}</p>
              <FaRegTrashAlt
                className={`
                h-8 w-8 m-2 border-2 rounded-md 
                text-primary-2 ring-1 ring-primary-2 shadow-primary-300
                hover:ring-red-600 shadow-md hover:shadow-red-400
                hover:bg-orange-50 hover:text-red-800
                `}
                onClick={() => handleDeleteRow(row.id)}
              />
            </li>
          );
        })}
      </ul>
      <hr className="m-2 h-[2px] bg-primary-2" />
      <TextArea
        label={label}
        rows={3}
        cols={50}
        maxlength={255}
        placeholder={"Введите данные... "}
        name={"content"}
        value={data.content}
        onChange={handleChange}
      />
      <div
        className={`
            w-full flex flex-row justify-center items-center gap-3
        `}
      >
        <button className="" type="button" onClick={() => handlePlus(data)}>
          <FaPlus className="w-12 h-12 p-2 rounded bg-green-400 ring-1 ring-primary-2 text-primary-1" />
        </button>
        <button
          className={`
            rounded w-full h-12
            text-lg font-semibold text-primary-42 bg-primary-2
            hover:ring-2 hover:ring-primary-41 hover:shadow-md hover:shadow-purple-400
            hover:underline hover:text-primary-41 hover:underline-offset-2
            `}
          type="submit"
        >
          {"Применить"}
        </button>
      </div>
    </form>
  );
};

AddAdditionalEduc.propTypes = {
  arrContentData: PropTypes.array,
  type: PropTypes.string,
  label: PropTypes.string,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default AddAdditionalEduc;
