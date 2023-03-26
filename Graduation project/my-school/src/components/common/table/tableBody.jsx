/* eslint-disable indent */
import PropTypes from "prop-types";
import _ from "lodash";

const TableBody = ({ data, columns }) => {
  const renderContent = (item, column) => {
    if (columns[column].component) {
      const component = columns[column].component;
      if (typeof component === "function") {
        return component(item);
      }
      return component;
    }
    return _.get(item, columns[column].path);
  };
  const handleMarkClick = (item, column, isMark = 0) => {
    if (isMark) {
      const handleClick = _.get(item, columns[column].path).handleClick;
      handleClick();
    }
  };

  return (
    <tbody>
      {data.map((item) => (
        <tr
          className={` 
                border-b-2 border-spacing-1
                ring-slate-400 hover:bg-green-100
            `}
          key={item._id}
        >
          {Object.keys(columns).map((column, ind) => {
            const isMark = !!_.get(item, columns[column].path).isMark;
            return (
              <td
                className={`
                  px-3 py-2 min-w-12 
                  ${
                    isMark
                      ? "hover:ring-2 ring-red-600 hover:border-2 hover:bg-yellow-100"
                      : ""
                  }
                  `}
                // ${ind % 2 === 0 ? "bg-purple-50" : ""}
                key={column}
                onClick={() => handleMarkClick(item, column, isMark)}
              >
                <div
                  className={`
                flex
                ${ind !== 1 ? "justify-center" : "justify-start pl-4"}
                `}
                >
                  {renderContent(item, column)}
                </div>
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};

TableBody.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.object.isRequired,
};

export default TableBody;
