import React, { useReducer, createContext } from "react";
import JwtDecode from "jwt-decode";

const initialState = {
  user: null
};

if (localStorage.getItem("JwtToken")) {
  const decodedToken = JwtDecode(localStorage.getItem("JwtToken"));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("JwtToken");
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {}
});
function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload
      };
    case "LOGOUT":
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(userData) {
    localStorage.setItem("JwtToken", userData);

    dispatch({
      type: "LOGIN",
      payload: userData
    });
  }

  function logout() {
    localStorage.removeItem("JwtToken");
    dispatch({ type: "LOGOUT" });
  }
  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}
export { AuthContext, AuthProvider };
