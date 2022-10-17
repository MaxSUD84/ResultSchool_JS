import React, { useState } from 'react';

// Классовый подход к постоению компонентов
// this.setState({a: 1}) => this.render() // render и setState наследовались от базовых компонентов

function computeInitialCounter() {
  // eslint-disable-next-line
  console.log('Some calculation ...');
  return Math.trunc(Math.random() * 20);
}

function App() {
  // const [count, setCount] = useState(0);
  // const [count, setCount] = useState(computeInitialCounter()); // функция computeInitialCounter будет вызываться при любом изменении setCount
  const [count, setCount] = useState(() => computeInitialCounter());

  function increment() {
    setCount((pS) => pS + 1);
  }
  function decrement() {
    setCount((pS) => pS - 1);
  }

  const [state, setState] = useState({
    title: 'Счетчик',
    data: Date.now()
  });

  function updateTitle() {
    setState((prev) => ({
      ...prev,
      title: 'New value'
    }));
  }

  return (
    <div>
      <h1 className="fs-3">Счетчик: {count}</h1>
      <button
        type="button"
        onClick={increment}
        className="btn btn-outline-success"
      >
        Добавить
      </button>
      <button
        type="button"
        onClick={decrement}
        className="btn btn-outline-danger"
      >
        Убрать
      </button>
      <button type="button" onClick={updateTitle} className="btn btn-secondary">
        Убрать
      </button>

      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}

export default App;
