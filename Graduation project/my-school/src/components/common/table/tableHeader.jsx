import PropTypes from "prop-types";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

const TableHeader = ({ onSort, selectedSort, columns }) => {
  const handleSort = (item) => {
    if (selectedSort.path === item) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === "asc" ? "desc" : "asc",
      });
    } else {
      onSort({ path: item, order: "asc" });
    }
  };
  const rendeSortArrow = (selectedSort, currentPath) => {
    if (selectedSort.path === currentPath) {
      if (selectedSort.order === "asc") {
        return <FaCaretDown className="w-6 h-6" />;
      } else {
        return <FaCaretUp className="w-6 h-6" />;
      }
    }
    return null;
  };

  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            key={column}
            onClick={
              columns[column].path
                ? () => handleSort(columns[column].path)
                : undefined
            }
            {...{ role: columns[column].path && "button" }}
            scope="col"
            className={`
              border-t-2  border-b-2 border-primary-1 
              bg-primary-41 bg-opacity-40 hover:bg-opacity-70
              text-primary-1 font-semibold
            `}
          >
            <div className="flex flex-row justify-center items-center text-lg py-2">
              {rendeSortArrow(selectedSort, columns[column].path)}
              {columns[column].name}{" "}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};
TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired,
};

export default TableHeader;
