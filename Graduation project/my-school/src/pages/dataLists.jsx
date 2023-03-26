// import React from "react";
import MediumFooter from "../components/footer/mdFooter";

const DataLists = () => {
  return (
    <>
      <div>
        <button
          className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full 
      border border-purple-200 hover:text-white hover:bg-purple-600 
      hover:border-transparent focus:outline-none focus:ring-2 
      focus:ring-purple-600 focus:ring-offset-2"
          //   onClick={showTeachers}
        >
          TeachersList
        </button>
        <button
          className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full 
      border border-purple-200 hover:text-white hover:bg-purple-600 
      hover:border-transparent focus:outline-none focus:ring-2 
      focus:ring-purple-600 focus:ring-offset-2"
          //   onClick={showLearners}
        >
          LearnersList
        </button>
      </div>
      <div></div>
      <MediumFooter />
    </>
  );
};

export default DataLists;
