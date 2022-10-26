import React, { useState, useMemo, useEffect } from 'react';

function complexCompute(num) {
  let i = 0;
  while (i < 1000000000) {
    i += 1;
  }
  return num * 2;
}

function App() {
  // const [renderCount, setRenderCount] = useState(1);
  const [number, setNumber] = useState(42);
  const [colored, setColored] = useState(false);

  // при изменении colored происходит рендеренг компонента
  // и вызов обработки долгой функции complexCompute
  // выход использовать useMemo

  const computed = useMemo(() => complexCompute(number), [number]);

  // При рендеренге создает новый объект каждый раз
  // const styles = {
  //   color: colored ? 'darkred' : 'black'
  // };

  // сохраняем (кэшируем) объект между вызовами рендера
  const styles = useMemo(
    () => ({
      color: colored ? 'darkred' : 'black'
    }),
    [colored]
  );

  useEffect(() => {
    console.log('Styles changed!');
  }, [styles]);

  return (
    <div>
      <h1 style={styles}>Вычисляемое свойство: {computed}</h1>
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
      <button
        type="button"
        className="btn btn-warning"
        onClick={() => setColored((prev) => !prev)}
      >
        Убрать
      </button>
      {/* <pre>{JSON.stringify(type, null, 2)}</pre> */}
    </div>
  );
}

export default App;
