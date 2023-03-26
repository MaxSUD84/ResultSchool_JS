import { useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import style from "../../styles/styles";

import { useSelector } from "react-redux";
import { getAllTeachers, getAllDataStatus } from "../../store/teachers";
import { nanoid } from "nanoid";

import Title from "./title";

const deskData = [
  {
    timestamp: new Date(2023, 0, 18),
    from: "a58d08d8-38f9-4b45-9422-a979d5b79d33",
    topic: "Натуральные числа",
    message:
      "Необходимо подтянуть знание наткральных чисел. Пересдать контрольную можно наследующем уроке.",
  },
  {
    timestamp: new Date(2023, 0, 23),
    from: "54a77b2b-4041-49fd-a8ef-8253092c6da3",
    topic: "Строение грибов",
    message:
      "Удели внимание структуре грибов. Планирую вызвать к доске и проверить усвоенный материал.",
  },
];
// { deskData }
const DeskUser = () => {
  const dataStatus = useSelector(getAllDataStatus());
  const teacherData = useSelector(getAllTeachers());
  const [fromData, setFromData] = useState([]);

  useEffect(() => {
    if (dataStatus && teacherData) {
      const resData = deskData.map((elem) => {
        const tData = teacherData.find((teacher) => teacher.uuid === elem.from);
        const el_id = nanoid();
        return {
          ...elem,
          from: tData.full_name,
          subject: tData.subject,
          id: el_id,
        };
      });
      setFromData(resData);
    }
  }, []);

  if (!dataStatus) return "Teachers Data loading ...";

  //   console.log(fromData);

  return (
    <div
      className={`
            flex flex-nowrap w-fit gap-3
        `}
    >
      <Title title_1={"Доска сообщений"} styleType={2} />
      {fromData.map((mark) => (
        <div
          key={mark.id}
          className={`
                bg-white
                ring-1 ring-purple-800 
                shadow-md shadow-purple-400
                rounded-b-2xl rounded-tr-2xl py-4 px-2
                flex flex-col w-[400px]
            `}
        >
          <div
            className={`
                flex flex-row justify-between items-start
                border-b-[1px] border-spacing-2 border-slate-400
                font-body font-semibold text-sm
            `}
          >
            <p
              className={`
                    font-body font-semibold text-lg
                `}
            >
              {mark.from}
            </p>
            <p>{mark.timestamp.toDateString()}</p>
          </div>
          <div
            className={`
                flex flex-row justify-start items-start
                border-b-[1px] border-spacing-2 border-slate-400
                font-sans font-semibold text-md my-2
            `}
          >
            <p>
              {mark.subject}
              {": "}
            </p>
            <p className="pl-2">{mark.topic}</p>
          </div>
          <div
            className={`
                p-2 italic font-semibold
            `}
          >
            <p>{mark.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

DeskUser.propTypes = {
  // deskData: PropTypes.array,
};

export default DeskUser;
