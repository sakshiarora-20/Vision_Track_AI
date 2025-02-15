import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
// import Home from "./frontend/Home";
import SnellenTest from "./frontend/SnellenTest/SnellenTest";
// import LoadBalancer from "./frontend/Loader/Loader";
=======
import Home from "../src/frontend/Home/Home";
// import SnellenTest from "./frontend/SnellenTest/SnellenTest";
import Loader from "./frontend/Loader/Loader";
import SnellenLoader from "./frontend/SnellLoader/SnellenLoader";
>>>>>>> a7d14816ceb46eb47b46c69f4ac556a751b8de9c

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
<<<<<<< HEAD
          <Route path="/" element={<SnellenTest />} />
          {/* <Route path="/" element={<LoadBalancer />} />
          <Route path="/snellen-test" element={<SnellenTest />} /> */}
=======
          <Route path="/" element={<Loader />} />
          <Route path="/home" element={<Home />} />
          <Route path="/snellLoader" element={<SnellenLoader/>} />
          {/* <Route path="/snellen-test" element={<SnellenTest />} /> */}
>>>>>>> a7d14816ceb46eb47b46c69f4ac556a751b8de9c
        </Routes>
      </div>
    </Router>
  );
}

export default App;



// import Home from "./frontend/Home";
// import SnellenTest from "./frontend/SnellenTest/SnellenTest";


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//        {/* <Home /> */}
//        <SnellenTest />
//       </header>
//     </div>
//   );
// }

// export default App;
