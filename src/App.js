import "./App.css";
import Header from "./components/header";
// import Features from './components/features';
import Headlines from "./components/headlines";
// import Main from './components/main';
import DataFromApi from "./components/newsApi";
import Pagination from "./components/Paginations";
import Postaldata from "./components/postaldata";
import Coviddata from "./components/covid";
import Test from './components/test';

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route exact path="/" element={<DataFromApi />} />
          <Route exact path="/headlines" element={<Headlines />} />
          <Route exact path="/pagination" element={<Pagination />} />
          <Route exact path="/postaldata" element={<Postaldata />} />
          <Route exact path="/Coviddata" element={<Coviddata />} />
          <Route exact path="/testing" element={<Test />} />


        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;