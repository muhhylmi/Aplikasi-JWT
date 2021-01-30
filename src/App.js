import { createContext, useReducer } from "react";
import { BrowserRouter, Redirect, Router, Switch } from "react-router-dom";
import HomeComp from "./component/HomeComp";
import LoginComp from "./component/LoginComp";
import MenuComp from "./component/MenuComp";
import RegisterComp from "./component/RegisterComp";

//context
export const AuthContext = createContext();

//inisilisasi State
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

//reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: action.payload.user,
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <BrowserRouter>
      <Switch>
        <AuthContext.Provider value={{ state, dispatch }}>
          <MenuComp />
          {!state.isAuthenticated ? (
            <Redirect to={{ pathname: "/" }} />
          ) : (
            <Redirect to={{ pathname: "/homepage" }} />
          )}
          <Router pathname="/" component={LoginComp} />
          <Router pathname="/homepage" component={HomeComp} />
          <Router pathname="/register" component={RegisterComp} />
        </AuthContext.Provider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
