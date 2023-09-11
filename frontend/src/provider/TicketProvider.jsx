import { createContext, useState } from "react";

export const TicketContext = createContext({});

export const TicketProvider = (props) => {
  const [listTicketsToDo, setListTicketsToDo] = useState([]);
  const [listTicketsDoing, setListTicketsDoing] = useState([]);

  return (
    <TicketContext.Provider
      value={{
        listTicketsToDo,
        setListTicketsToDo,
        listTicketsDoing,
        setListTicketsDoing,
      }}
    >
      {props.children}
    </TicketContext.Provider>
  );
};
