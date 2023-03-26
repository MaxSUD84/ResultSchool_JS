import {
  //   FaTripadvisor,
  FaReadme,
  FaWpforms,
  FaCalendarAlt,
  FaFutbol,
  FaUsers,
} from "react-icons/fa";

import SchoolPerformance from "../../components/ui/schoolPerformance";
import WeeklyHomeworks from "../../components/ui/weeklyHomeworks";
import WeerlyTimetable from "../../components/lists/weerlyTimetable";
import AdvEducation from "../../components/lists/advEducation";

export const learnerTabs = [
  {
    id: "403f24b0-ffef",
    t: {
      icon: <FaWpforms className="w-6 h-6 text-green-400" />,
      label: "Успеваемость",
    },
    s: {
      link: <SchoolPerformance />,
    },
  },
  {
    id: "d5618c65-d104",
    t: {
      icon: <FaReadme className="w-6 h-6 text-orange-400" />,
      label: "Домашнее задание",
    },
    s: {
      link: <WeeklyHomeworks />,
    },
  },
  {
    id: "c308bd98-e33f",
    t: {
      icon: <FaCalendarAlt className="w-6 h-6 text-zinc-600" />,
      label: "Расписание",
    },
    s: {
      link: <WeerlyTimetable />,
    },
  },
  {
    id: "a5516b18-2820",
    t: {
      icon: <FaFutbol className="w-6 h-6 text-purple-600" />,
      label: "Доп.образование",
    },
    s: {
      link: <AdvEducation />,
    },
  },
  {
    id: "5111b9ec-a918",
    t: {
      icon: <FaUsers className="w-6 h-6 text-primary-1" />,
      label: "Класс",
    },
    s: {
      link: "",
    },
  },
];
