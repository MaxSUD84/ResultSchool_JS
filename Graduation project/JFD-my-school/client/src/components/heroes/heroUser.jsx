/* eslint-disable multiline-ternary */
import { useState } from "react";
import PropTypes from "prop-types";

// Comtonent
import LabelWithDescription from "../elems/labelWithDescription";
import Preloader from "../ui/preloader";
import CheckBoxField from "../common/form/checkBoxField";

// Styles and Utils
import style, { layout } from "../../styles/styles";
import { getTextNameMonth } from "../../utils/dateCalculation";

const HeroUser = ({
  last_name,
  first_name,
  sex,
  birthday,
  phone,
  email,
  address,
  image,
  parents,
  academic_progress_sum,
  teacher_raiting,
}) => {
  const [parentShow, setParentShow] = useState(false);
  const handleCollapse = () => {
    setParentShow((prev) => !prev);
  };

  if (!last_name)
    return (
      <>
        <div className="w-full h-[400px]"></div>
        <Preloader />
      </>
    );

  return (
    <section className={`flex-col ${style.flexCenterCol} mb-6`}>
      <div className={`${style.boxWidth} flex-row flex-1 ${style.paddingX}`}>
        {/* <Title title_1="События" title_2="" styleType={2} /> */}
        <div className={`${layout.sectionReverse} gap-4`}>
          <div
            className={`${style.flexStartCol} basis-2/3 md:px-8 px-2 form-textarea rounded shadow shadow-primary-2`}
          >
            <h2
              className={`${style.heading0} underline underline-offset-2 mb-1`}
            >
              {last_name} {first_name}
            </h2>
            <LabelWithDescription label={"Дата рождения"}>
              {birthday.day} {getTextNameMonth(parseInt(birthday.month) - 1)}{" "}
              {birthday.year}
            </LabelWithDescription>
            <LabelWithDescription label={"Пол"}>
              {sex.toLocaleLowerCase() === "w" ? "Ж" : "М"}
            </LabelWithDescription>
            <LabelWithDescription label={"Телефон"}>
              {phone}
            </LabelWithDescription>
            <LabelWithDescription label={"Email"}>{email}</LabelWithDescription>
            <LabelWithDescription label={"Адрес"}>
              {address}
            </LabelWithDescription>
            <div className="form-input w-full mt-1 mb-3 rounded ring-1 ring-slate-200 shadow-md shadow-green-400">
              <CheckBoxField
                name="parent"
                value={parentShow}
                onChange={() => handleCollapse()}
              >
                <p
                  className={`${style.paragraph} mb-1 pr-2 underline underline-offset-1`}
                >
                  {"Родители:"}
                </p>
              </CheckBoxField>
              {parentShow ? (
                <>
                  <div className="px-3">
                    <LabelWithDescription title={"Отец"} label={"Имя, фамилия"}>
                      {parents.father.full_name}
                    </LabelWithDescription>
                    <LabelWithDescription label={"Телефон"}>
                      {parents.father.phone}
                    </LabelWithDescription>
                  </div>
                  <div className="px-3">
                    <LabelWithDescription title={"Мать"} label={"Имя, фамилия"}>
                      {parents.mother.full_name}
                    </LabelWithDescription>
                    <LabelWithDescription label={"Телефон"}>
                      {parents.mother.phone}
                    </LabelWithDescription>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
            <LabelWithDescription label={"Средний рейтинг успеваемости"}>
              {academic_progress_sum}
            </LabelWithDescription>
            <LabelWithDescription label={"Рейтинг ученика"}>
              {teacher_raiting}
            </LabelWithDescription>
          </div>
          <div className={`${style.flexCenterCol} space-y-1 basis-1/3`}>
            <img src={"http://" + image} className="rounded" />
          </div>
        </div>
      </div>
    </section>
  );
};

HeroUser.propTypes = {
  last_name: PropTypes.string,
  first_name: PropTypes.string,
  teacher_raiting: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  academic_progress_sum: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  sex: PropTypes.string,
  birthday: PropTypes.object,
  parents: PropTypes.object,
  phone: PropTypes.string,
  email: PropTypes.string,
  address: PropTypes.string,
  image: PropTypes.string,
};

export default HeroUser;
