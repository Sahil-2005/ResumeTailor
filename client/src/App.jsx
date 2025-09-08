// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import LandingPage from "./pages/LandingPage";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import "./App.css";

// function App() {
//   const [token, setToken] = useState(localStorage.getItem("token"));

//   // Keep token in sync with localStorage
//   useEffect(() => {
//     const handleStorageChange = () => {
//       setToken(localStorage.getItem("token"));
//     };
//     window.addEventListener("storage", handleStorageChange);
//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, []);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={token ? <LandingPage /> : <Navigate to="/login" />} />
//         <Route path="/login" element={<Login setToken={setToken} />} />
//         <Route path="/register" element={<Register />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // helper: validate token
  const isTokenValid = (tkn) => {
    try {
      const decoded = jwtDecode(tkn);
      if (!decoded.exp) return false;
      return decoded.exp * 1000 > Date.now();
    } catch (err) {
      return false;
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken || !isTokenValid(storedToken)) {
      localStorage.removeItem("token");
      setToken(null);
    } else {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedToken = localStorage.getItem("token");
      if (!storedToken || !isTokenValid(storedToken)) {
        localStorage.removeItem("token");
        setToken(null);
      } else {
        setToken(storedToken);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={token && isTokenValid(token) ? <LandingPage /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
