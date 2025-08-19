/* eslint-disable react/react-in-jsx-scope */
import { BrowserRouter, Route, Routes } from "react-router-dom";

import WelcomePage from "./components/WelcomePage.jsx";
import AdminPage from "./components/admin/AdminPage.jsx";
import Employeepage from "./components/employee/Employeepage.jsx";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />}></Route>
        <Route path="/employee" element={<Employeepage />}></Route>
        <Route path="/admin" element={<AdminPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
