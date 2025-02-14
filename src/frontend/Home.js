import React from "react";
// import { useNavigate } from "react-router-dom";
import "./style.css";
// import bg from "../frontend/Assets/bg.png";
const Home = () => {
//   const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="hero-section">
        {/* <img src={bg} alt="Eye Checkup" className="hero-image" /> */}
        <div className="hero-text">
          <h1 className="home-title">Struggling with Headaches? It Might Be Your Vision!</h1>
          <p className="home-text">
            Blurry vision and uncorrected eye power can lead to discomfort and headaches. 
            Take our quick vision test and get personalized insights!
          </p>
          <button className="cta-button" 
        //   onClick={() => navigate("/eye-test")}
          >
            Check Your Eye Power
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

