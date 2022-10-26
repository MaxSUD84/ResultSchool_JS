import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function ItemsList({ getItems }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const newItems = getItems();
    setItems(newItems);
    console.log('Render');
  }, [getItems]);
  return (
    <ul>
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
}

ItemsList.propTypes = {
  getItems: PropTypes.func.isRequired
};

export default ItemsList;
