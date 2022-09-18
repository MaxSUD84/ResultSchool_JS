import React, { useState } from "react";
import Counter from "./counter";

const CountersList = () => {
  const initialState = [
    { id: 0, value: 0, name: "Ненужная вещь" },
    { id: 1, value: 1, name: "Ложка" },
    { id: 2, value: 2, name: "Вилка" },
    { id: 3, value: 2, name: "Тарелка" },
    { id: 4, value: 2, name: "Набор минималиста" },
  ];
  const [counters, setCounters] = useState(initialState);

  const handleDelete = (id) => {
    // console.log("delete");
    setCounters((prevState) => prevState.filter((count) => count.id !== id));
  };

  const handleReset = () => {
    // console.log("first");
    setCounters(initialState);
  };

  const handleIncrement = (id) => {
    setCounters((prevState) =>
      prevState.map((count) => ({
        ...count,
        value: count.id === id ? count.value + 1 : count.value,
      }))
    );
    // console.log("Increment", id);
  };

  const handleDecrement = (id) => {
    setCounters((prevState) =>
      prevState.map((count) => ({
        ...count,
        value: count.id === id ? count.value && count.value - 1 : count.value,
      }))
    );
    // console.log("Decriment", id);
  };

  return (
    <>
      {counters.map((count) => (
        <Counter
          key={count.id}
          {...count}
          onDelete={handleDelete}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
        ></Counter>
      ))}
      <button className="btn btn-danger btn-sm m-2" onClick={handleReset}>
        Сброс
      </button>
    </>
  );
};

export default CountersList;
