import React, { useState, useEffect, useRef } from 'react';

function App() {
  // const [renderCount, setRenderCount] = useState(1);
  const [value, setValue] = useState('initial: ');
  const renderCount = useRef(1);
  const prevValue = useRef('');
  useEffect(() => {
    prevValue.current = value;
  }, [value]);

  const inputRef = useRef(null);

  useEffect(() => {
    renderCount.current += 1;
    console.log(inputRef.current.value);
  });

  const focus = () => inputRef.current.focus(); // фокусировка на элементе

  return (
    <div>
      <h1>Количество рендеров: {renderCount.current}</h1>
      <h1>Прошлое состояние: {prevValue.current}</h1>
      <input
        ref={inputRef}
        type="text"
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <button type="button" className="btn btn-success" onClick={focus}>
        Фокус
      </button>
      {/* <pre>{JSON.stringify(type, null, 2)}</pre> */}
    </div>
  );
}

export default App;
