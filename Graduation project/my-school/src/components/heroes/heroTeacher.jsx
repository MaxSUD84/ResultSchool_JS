/* eslint-disable multiline-ternary */
import PropTypes from "prop-types";

// Comtonent
import LabelWithDescription from "../elems/labelWithDescription";
import Preloader from "../ui/preloader";

// Styles and Utils
import style, { layout } from "../../styles/styles";

const HeroTeacher = ({
  full_name,
  experience_education,
  subject,
  email,
  image,
  name_class,
  name_mentor,
  education_rating,
  learner_rating,
}) => {
  if (!full_name)
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
              {full_name}
            </h2>
            <LabelWithDescription label={"Пол"}>
              {full_name.split(" ")[0].slice(-1) === "а" ? "Ж" : "М"}
            </LabelWithDescription>
            <LabelWithDescription label={"Email: "}>
              {email}
            </LabelWithDescription>
            <LabelWithDescription label={"Профильный предмет"}>
              {subject}
            </LabelWithDescription>
            {name_mentor ? (
              <LabelWithDescription label={"Классный руководитель"}>
                {`${name_mentor} класса`}
              </LabelWithDescription>
            ) : (
              ""
            )}
            {name_class ? (
              <LabelWithDescription label={"Прикрепленные классы"}>
                {`${
                  name_class.length === 1
                    ? name_class[0]
                    : name_class.join(", ")
                } класс`}
              </LabelWithDescription>
            ) : (
              ""
            )}
            <LabelWithDescription label={"Опыт"}>
              {experience_education}
            </LabelWithDescription>
            <LabelWithDescription label={"Рейтинг успеваемости по предмету"}>
              {education_rating}
            </LabelWithDescription>
            <LabelWithDescription label={"Рейтинг у учеников"}>
              {learner_rating}
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

HeroTeacher.propTypes = {
  full_name: PropTypes.string,
  experience_education: PropTypes.string,
  subject: PropTypes.string,
  email: PropTypes.string,
  image: PropTypes.string,
  name_class: PropTypes.arrayOf(PropTypes.string),
  name_mentor: PropTypes.string,
  education_rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  learner_rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default HeroTeacher;
