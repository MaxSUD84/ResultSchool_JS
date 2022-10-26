/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

const AlertContext = React.createContext();
//  контекст для работы toggle
// const AlertToggleContext = React.createContext();
// export const useAlertToggle = () => useContext(AlertToggleContext);

export const useAlert = () => useContext(AlertContext);

export function AlertProvider({ children }) {
  const [alert, setAlert] = useState(false);

  // const toggle = useMemo(() => setAlert((prev) => !prev), [children]);
  const toggle = setAlert((prev) => !prev);

  return (
    <AlertContext.Provider
      value={{
        myVisible: alert,
        toggle
      }}
    >
      {/* <AlertToggleContext value={toggle}>{children}</AlertToggleContext> */}
      {children}
    </AlertContext.Provider>
  );
}

AlertProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AlertProvider;
