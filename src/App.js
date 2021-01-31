import { createContext, useReducer } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomeComp from "./component/HomeComp";
import LoginComp from "./component/LoginComp";
import MenuComp from "./component/MenuComp";
import RegisterComp from "./component/RegisterComp";
import "bootstrap/dist/css/bootstrap.min.css";
import Public from "./component/Public";
import Transaksi from "./component/Transaksi";
import ListMahasiswa from "./component/ListMahasiswa";

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
        user: null,
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
          <Route exact path="/" component={Public} />
          <Route exact path="/dashboard" component={HomeComp} />
          <Route exact path="/login" component={LoginComp} />
          <Route exact path="/transaksi" component={Transaksi} />
          <Route exact path="/register" component={RegisterComp} />
          <Route exact path="/mahasiswa" component={ListMahasiswa} />
        </AuthContext.Provider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
