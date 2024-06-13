export const userState = {
  token: "",
};

//@ts-ignore
export function userReducer(state, action) {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload,
      };
      break;

    default:
      return { ...state };
      break;
  }
};
