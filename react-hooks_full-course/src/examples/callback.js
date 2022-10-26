import React, { useState, useMemo, useCallback } from 'react';
import ItemsList from './itemsList';

function App() {
  // const [renderCount, setRenderCount] = useState(1);
  const [colored, setColored] = useState(false);
  const [count, setCount] = useState(1);

  // сохраняем (кэшируем) объект между вызовами рендера
  const styles = useMemo(
    () => ({
      color: colored ? 'darkred' : 'black'
    }),
    [colored]
  );

  // пересоздается при каждом рендоре экрана
  // const generateItemsFromAPI = () =>
  //   new Array(count).fill('').map((_, i) => `Элемент ${i + 1}`);

  // используем хук useCallback
  const generateItemsFromAPI = useCallback(
    () => new Array(count).fill('').map((_, i) => `Элемент ${i + 1}`),
    [count]
  );

  return (
    <div>
      <h1 style={styles}>Количество элементов: {count}</h1>
      <button
        type="button"
        className="btn btn-success"
        onClick={() => setCount((prev) => prev + 1)}
      >
        Добавить
      </button>
      <button
        type="button"
        className="btn btn-warning"
        onClick={() => setColored((prev) => !prev)}
      >
        Изменить
      </button>
      <ItemsList getItems={generateItemsFromAPI} />
    </div>
  );
}

export default App;
