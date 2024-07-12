import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import "./App.css";
import LoginPage from './components/userLogin';
import Header from "./components/header";
import Headlines from "./components/headlines";
import DataFromApi from "./components/newsApi";
import Pagination from "./components/Paginations";
import Postaldata from "./components/postaldata";
import Coviddata from "./components/covid";
import Test from './components/test';
import Task from './components/practice';
import Task1 from './components/practice_props';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  return (
    <BrowserRouter>
      <div>
        {isAuthenticated && <Header username={username} />}
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <DataFromApi /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} setUsername={setUsername} />} />
          <Route path="/headlines" element={<Headlines />} />
          <Route path="/pagination" element={<Pagination />} />
          <Route path="/postaldata" element={<Postaldata />} />
          <Route path="/Coviddata" element={<Coviddata />} />
          <Route path="/testing" element={<Test />} />
          <Route path="/task1" element={<Task />} />
          <Route path="/task2" element={<Task1 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
