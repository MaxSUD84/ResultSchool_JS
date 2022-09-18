import React from "react";

const Counter = (props) => {
  // console.log(props);
  // const [value, setValue] = useState(props.value);
  const { value } = props;

  const formatValue = () => (value === 0 ? "Empty" : value);
  //   const imageUrl = "https://picsum.photos/200";

  const getBadgeClasses = () => {
    let classes = "badge m-2 ";
    classes += value === 0 ? "bg-warning" : "bg-primary";
    return classes;
  };

  return (
    <div>
      {/* <img src={imageUrl} alt="image" /> */}
      <span>{props.name}</span>
      <span className={getBadgeClasses()}>{formatValue()}</span>
      <button
        className="badge m-2 bg-primary btn-sm"
        onClick={() => props.onIncrement(props.id)}
      >
        +
      </button>
      <button
        className="badge m-2 bg-secondary btn-sm"
        onClick={() => props.onDecrement(props.id)}
      >
        -
      </button>
      <button
        className="btn btn-danger btn-sm m-2"
        onClick={() => props.onDelete(props.id)}
      >
        delete
      </button>
    </div>
  );
};

export default Counter;
