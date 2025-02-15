import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../src/frontend/Home/Home";
import SnellenTest from "./frontend/SnellenTest/SnellenTest";
import Loader from "./frontend/Loader/Loader";
import SnellenLoader from "./frontend/SnellLoader/SnellenLoader";
import ContrastTest from "./frontend/ContrastTest/ContrastTest";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Loader />} />
          <Route path="/home" element={<Home />} />
          {/* <Route path="/snellLoader" element={<SnellenLoader />} /> */}
          <Route path="/snellen-test" element={<SnellenTest />} />
          <Route path="/contrast" element={<ContrastTest />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
