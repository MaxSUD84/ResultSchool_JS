import React, { useState } from 'react';

// Классовый подход к постоению компонентов
// this.setState({a: 1}) => this.render() // render и setState наследовались от базовых компонентов

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1 className="font-semibold text-3xl">Счетчик</h1>
      <button
        type="button"
        className="rounded-full text-blue-100 bg-green-500 p-2.5 m-2 hover:bg-green-800 dark:bg-white dark:hover:bg-green-50"
      >
        Добавить
      </button>
      <button
        type="button"
        className="rounded-full text-blue-100 bg-gray-500 p-2.5 m-2 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-50"
      >
        Убрать
      </button>
    </div>
  );
}

export default App;
