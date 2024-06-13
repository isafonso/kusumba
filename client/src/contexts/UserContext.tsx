import { createContext, useReducer } from "react";
import { userReducer, userState } from "../reducers/UserReducer";

type TChildren = {
    children: JSX.Element;
}

export const UserContext = createContext(userState);
const [state, dispatch] = useReducer(userReducer, userState);

function UserContextProvider({ children }: TChildren) {
  return (
    //@ts-ignore
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
