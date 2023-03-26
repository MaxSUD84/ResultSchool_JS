/* eslint-disable no-unused-vars */
/* eslint-disable multiline-ternary */
// eslint-disable no-unused-vars
import { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HomeworkProvider } from "../hooks/useHomework";

// Component
import SubTitleBar from "../components/elems/subTitleBar";
import Preloader from "../components/ui/preloader";
import JournalHeader from "../components/ui/journal/header";
import SubPageHomework from "../components/ui/journal/subPageHomework";
import SubPageProgressClass from "../components/ui/journal/subPageProgressClass";

// Store
import {
  loadSubjectJournal,
  getSubjectJournal,
  // isSubjectJournalLoading,
  isSubjectJournalLoaded,
  clearChoosenJournal,
} from "../store/chJournalSubject";

// Style
import style from "../styles/styles";
import { ProgressProvider } from "../hooks/useProgress";

const JournalSuject = () => {
  const { journalSubId } = useParams();
  const [activeTab, setActiveTab] = useState(false);
  const [activeHomeworkLesson, setActiveHomeworkLesson] = useState();
  const [activeLesson, setActiveLesson] = useState();
  //   console.log(journalSubId);
  const dispatch = useDispatch();
  const isSubJournalLoaded = useSelector(isSubjectJournalLoaded());
  const subJournal = useSelector(getSubjectJournal());

  useEffect(() => {
    if (!isSubJournalLoaded) {
      dispatch(loadSubjectJournal(journalSubId));
    }
    return () => dispatch(clearChoosenJournal());
  }, []);

  useEffect(() => {
    if (isSubJournalLoaded) {
      setActiveLesson(subJournal.topics[0].lesson_title._id);
    }
  }, [isSubJournalLoaded]);

  useEffect(() => {
    if (subJournal) {
      const curLesHomeworks = subJournal.topics.find(
        (les) => les.lesson_title._id === activeLesson
      );
      if (curLesHomeworks) {
        setActiveHomeworkLesson(curLesHomeworks.uuid_homeworks);
      }
    }
  }, [activeLesson, subJournal]);

  const handleChangeTab = () => setActiveTab((p) => !p);
  const handleChangeLesson = (lesson) => setActiveLesson(lesson);

  if (!isSubJournalLoaded || !subJournal) {
    return (
      <>
        <div className="w-full h-[400px]"></div>
        <Preloader />
      </>
    );
  }

  return (
    <>
      <section className={`${style.flexCol} items-center mb-6 min-h-[400px]`}>
        <div className={`${style.boxWidth}`}>
          <SubTitleBar
            userName={`Журнал по предмету ${subJournal.subject}`}
            classTextName={`${subJournal.class} класс`}
            classId={subJournal.uuid_class}
          />
          <hr className={`h-1 bg-blue-500 mt-3 mx-6`} />
          <div className={`${style.paddingX} ${style.flexCol}`}>
            <JournalHeader
              topics={subJournal.topics}
              activeLesson={activeLesson}
              changeTable={handleChangeTab}
              changeLesson={handleChangeLesson}
            />
            {activeTab ? (
              <HomeworkProvider uuid_hw={activeHomeworkLesson}>
                <SubPageHomework
                  classId={subJournal.uuid_class}
                  journalId={subJournal._id}
                  topicId={activeLesson}
                />
              </HomeworkProvider>
            ) : (
              <>
                {subJournal && activeLesson ? (
                  <ProgressProvider
                    journalId={subJournal._id}
                    lessonId={activeLesson}
                  >
                    <SubPageProgressClass />
                  </ProgressProvider>
                ) : (
                  <>
                    <div className="w-full h-[400px]"></div>
                    <Preloader />
                    {/* <h1>Нет Данных по журналу</h1> */}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

JournalSuject.propTypes = {};

export default JournalSuject;
