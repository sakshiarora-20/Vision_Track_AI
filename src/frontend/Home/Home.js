// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./style.css";
// import bg from "../frontend/Assets/bg.png";
// const Home = () => {
  // const navigate = useNavigate();

  // return (
    // <div className="home-container">
    //   <div className="hero-section">
    //     <div className="hero-text">
    //       <h1 className="home-title">Struggling with Headaches? It Might Be Your Vision!</h1>
    //       <p className="home-text">
    //         Blurry vision and uncorrected eye power can lead to discomfort and headaches. 
    //         Take our quick vision test and get personalized insights!
    //       </p>
    //       <button className="cta-button" 
    //       onClick={() => navigate("/snellLoader")}>
    //         Check Your Eye Power
    //       </button>
    //     </div>
    //   </div>
    // </div>
// );
// };

// export default Home;
import React from "react";
import { useState } from "react";
import "../Home/Home.css";
import snellen from "../Assets/snellenimage.png";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [startAnimation, setStartAnimation] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    setStartAnimation(true);

    // Show the image after 1.5 seconds
    setTimeout(() => {
      setShowImage(true);
    }, 1000);

    // Show the buttons after 3 seconds
    setTimeout(() => {
      setShowButtons(true);
    }, 3000);
  };

  return (
    <div className="container">
      {!startAnimation ? (
        <div className="content">
          <h1>Struggling with Headaches? It Might Be Your Vision!</h1>
          <button className="action-button" onClick={handleClick}>
            Check Your Eye Power
          </button>
        </div>
      ) : (

        <div className="animation-container">
        <div className="image-container">
          {showImage && (
            <img
              src={snellen}
              alt="Rotating Image"
              className="rotating-image"
            />
          )}
</div>
          {showButtons && (

            <div className="button-container">
              <button className="action-button" onClick={ navigate("/snellen-test")}>Take SnellenTest</button>
              <button className="action-button" onClick={navigate("/contrast")}>Take Contrast Test</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};


