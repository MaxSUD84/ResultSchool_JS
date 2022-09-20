import React from "react";

const BookMark = ({ status, ...rest }) => {
  return (
    <button onClick={() => rest.onToggleBookMark(rest._id)}>
      <svg className="bi">
        <image
          width="32"
          height="32"
          fill="currentColor"
          xlinkHref={"bootstrap-icons.svg#" + status ? "heart-fill" : "heart"}
        />
      </svg>
    </button>
  );
};

export default BookMark;

// <svg class="bi" width="32" height="32" fill="currentColor">
// <use xlink:href="bootstrap-icons.svg#heart-fill" />
// </svg>

// <svg class="bi" width="32" height="32" fill="currentColor">
// <use xlink:href="bootstrap-icons.svg#heart" />
// </svg>

{
  /* <use
xlinkHref={"bootstrap-icons.svg#" + status ? "heart-fill" : "heart"}
/> */
}
