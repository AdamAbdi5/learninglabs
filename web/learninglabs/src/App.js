import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home";
import Student from "./Pages/Student"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/studentlogin" element={<Student />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
