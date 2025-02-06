import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "@/features/HomePage/HomePage";
import PassengerPage from "@/features/Passenger/PassengerPage/PassengerPage";
import TripsPage from "@/features/Driver/TripsPage/TripsPage";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/passenger" element={<PassengerPage />} />
          <Route path="/driver/trips/:regionName" element={<TripsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
