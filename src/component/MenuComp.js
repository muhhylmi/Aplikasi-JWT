import React, { useContext } from "react";
import { AuthContext } from "../App";
import MenuAdmin from "./menu/MenuAdmin";
import MenuMember from "./menu/MenuMember";
import MenuPublik from "./menu/MenuPublik";
import MenuStaff from "./menu/MenuStaff";

function MenuComp() {
  const { state } = useContext(AuthContext);

  if (!state.isAuthenticated) {
    return <MenuPublik />;
  }
  if (state.role === 2) {
    return <MenuAdmin />;
  } else if (state.role === 3) {
    return <MenuStaff />;
  }
  return <MenuMember />;
}

export default MenuComp;
