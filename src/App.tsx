import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import MainWin from "./components/MainWin";
import SecWin from "./components/SecWin";

function App() {
  return (
    <Routes>
      <Route element={<MainWin />} path="/main" />
      <Route element={<SecWin />} path="/sec" />
    </Routes>
  );
}

export default App;
