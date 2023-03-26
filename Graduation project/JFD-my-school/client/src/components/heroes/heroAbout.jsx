import styles from "./heroes.module.scss";
// Config
import cfg from "../../config.json";

const HeroAbout = () => {
  return (
    <section className={styles.flexCenterCol}>
      <div className={`${styles.boxWidth} ${styles.paddingX} flex-row flex-1`}>
        {/* <h1 className={`${style.heading2} items-start`}>Hero</h1> */}
        <div className={styles.block}>
          <div className={`grid grid-cols-2 gap-4 `}>
            <div className="w-fit justify-center">
              <img
                src={`${cfg.apiEndpoint}api/static/others/8qojnDoHItuZOvOydkVV3V3uv-N01r8K.jpg`}
              />
            </div>
            <div className="w-auto flex flex-col">
              <h3 className=" flex flex-row text-xl justify-center font-body mb-4">
                О школе
              </h3>
              <p>
                {`
                 Основной целью школы является поддержка одаренных детей в области математики, физики, информатики: создание условий, способствующих их оптимальному развитию. Большое значение администрация школы придает созданию единого информационного пространства и формированию в школе единой информационной среды с помощью информационных технологий, создания электронной базы данных, банка электронных программ, использования электронной почты и Интернет-ресурсов; использования электронного дневника школьника; создания внутришкольной локальной сети.
                 За последнее десятилетие школа стала одной из лучших в округе, участвует в городских и окружных мероприятиях, учащиеся школы неоднократно становились призерами олимпиад, интеллектуальных марафонов, соревнований. Среди выпускников школы много известных ученых, политиков, докторов и кандидатов наук, военных, врачей и учителей.
                `}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

HeroAbout.propTypes = {};

export default HeroAbout;
