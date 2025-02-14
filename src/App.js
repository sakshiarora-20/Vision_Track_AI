import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./frontend/Home";
import SnellenTest from "./frontend/SnellenTest/SnellenTest";
import LoadBalancer from "./frontend/Loader/Loader";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoadBalancer />} />
          <Route path="/snellen-test" element={<SnellenTest />} />
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
