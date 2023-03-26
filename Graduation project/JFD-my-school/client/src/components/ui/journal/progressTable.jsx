/* eslint-disable multiline-ternary */
import PropTypes from "prop-types";
import _ from "lodash";
// import { nanoid } from "nanoid";

// Components
import Table from "../../common/table/table";
import Rating from "../../elems/rating";

const ProgressTable = ({ progressData, startPeriod, onSort, selectedSort }) => {
  // const classProgressData = [Object.assign({}, learnersData, progressData)];

  const startDate = new Date(startPeriod);

  const columns = {
    num: {
      path: "num",
      name: "№",
    },
    name: {
      path: "name",
      name: "Фамилия Имя",
    },
  };

  // создадим колонки таблицы на 14 дней и заполним их значениями
  const progressCol = _.fill(Array(14), { path: "day_", name: "date" }).map(
    (dayCol, ind) => {
      const dateCol = new Date(startDate).toLocaleDateString();
      startDate.setDate(startDate.getDate() + 1);
      const path = dayCol.path + (ind + 1);
      return {
        path: path,
        name: dateCol.slice(0, 6),
        component: (data) => {
          return (
            <>
              {data[path].mark !== "" ? (
                <Rating value={data[path].mark} />
              ) : (
                <p>-</p>
              )}
            </>
          );
        },
      };
    }
  );

  progressCol.forEach((col) => {
    columns[col.path] = col;
  });

  columns.progress_avg = {
    path: "progress_avg",
    name: "Cредняя оценка",
    component: (prgData) => <Rating value={prgData.progress_avg} />,
  };

  return (
    <Table
      onSort={onSort}
      selectedSort={selectedSort}
      columns={columns}
      data={progressData}
    />
  );
};

ProgressTable.propTypes = {
  progressData: PropTypes.array.isRequired,
  startPeriod: PropTypes.any,
  onSort: PropTypes.func,
  selectedSort: PropTypes.object,
};

export default ProgressTable;
