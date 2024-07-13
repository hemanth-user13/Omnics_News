import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/header";
import Headlines from "./components/headlines";
import DataFromApi from "./components/newsApi";
import Pagination from "./components/Paginations";
import PostalData from "./components/postaldata";
import CovidData from "./components/covid";
import Test from "./components/test";
import Task from "./components/practice";
import Task1 from "./components/practice_props";
import UserLogin from "./components/userLogin";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  return (
    <BrowserRouter>
      <div>
        {isAuthenticated && <Header username={username} />}
        <Routes>
          <Route
            path="/login"
            element={
              <UserLogin
                setIsAuthenticated={setIsAuthenticated}
                setUsername={setUsername}
              />
            }
          />
          <Route
            path="/"
            element={
              isAuthenticated ? <DataFromApi /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/headlines"
            element={isAuthenticated ? <Headlines /> : <Navigate to="/login" />}
          />
          <Route
            path="/pagination"
            element={
              isAuthenticated ? <Pagination /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/postaldata"
            element={
              isAuthenticated ? <PostalData /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/coviddata"
            element={isAuthenticated ? <CovidData /> : <Navigate to="/login" />}
          />
          <Route
            path="/testing"
            element={isAuthenticated ? <Test /> : <Navigate to="/login" />}
          />
          <Route
            path="/task1"
            element={isAuthenticated ? <Task /> : <Navigate to="/login" />}
          />
          <Route
            path="/task2"
            element={isAuthenticated ? <Task1 /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
