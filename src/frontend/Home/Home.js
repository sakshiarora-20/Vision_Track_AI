
import React from "react";
import { useState, useEffect } from "react";
import "../Home/Home.css";
import snellen from "../Assets/snellenimage.png";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [startAnimation, setStartAnimation] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const navigate = useNavigate();
  // Effect to handle timed animations
  useEffect(() => {
    if (startAnimation) {
      setTimeout(() => {
        setShowImage(true);
      }, 1000);

      setTimeout(() => {
        setShowButtons(true);
      }, 3000);
    }
  }, [startAnimation]); // Runs only when startAnimation changes

  const handleClick = () => {
    setStartAnimation(true);
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
              <button className="action-button" onClick={() => navigate("/snellen-test")}>Take SnellenTest</button>
              <button className="action-button" onClick={() => navigate("/contrast")}>Take Contrast Test</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};


