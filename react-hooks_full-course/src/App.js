import React, { useState } from 'react';

function App() {
  // const [renderCount, setRenderCount] = useState(1);
  const [number, setNumber] = useState(42);

  return (
    <div>
      <h1>Вычисляемое свойство: {number}</h1>
      {/* <h1>Прошлое состояние: {prevValue.current}</h1> */}
      <button
        type="button"
        className="btn btn-success"
        onClick={() => setNumber((prev) => prev + 1)}
      >
        Добавить
      </button>
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => setNumber((prev) => prev - 1)}
      >
        Убрать
      </button>
      {/* <pre>{JSON.stringify(type, null, 2)}</pre> */}
    </div>
  );
}

export default App;
