// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import LandingPage from "./pages/LandingPage";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import './App.css'


// function App() {
//   const token = localStorage.getItem("token");

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={token ? <LandingPage /> : <Navigate to="/login" />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;



import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Keep token in sync with localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <LandingPage /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
