import React, { useState } from "react";
import "../../frontend/SnellenTest/SnellenTest.css";

const letters = ["E", "F P", "T O Z", "L P E D", "P E C F D", "E D F C Z P"];
const fontSizes = [40, 32, 24, 20, 16, 12];

const SnellenTest = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState([]);
  const [testComplete, setTestComplete] = useState(false);

  const handleResponse = (canRead) => {
    setResponses([...responses, canRead]);
    if (currentStep < letters.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setTestComplete(true);
    }
  };

  const getResult = () => {
    const passedLevels = responses.filter((r) => r).length;
    if (passedLevels >= 5) return "Your distance vision is good!";
    if (passedLevels >= 3) return "You may have mild vision issues. Consider an eye test.";
    return "You may need glasses. Consult an eye specialist.";
  };

  return (
    <div className="snellen-container">
      <h2>Snellen Eye Test</h2>
      <p>Stand 10 feet (3 meters) away from your screen. Read the letters below and select whether you can see them clearly.</p>
      
      {!testComplete ? (
        <div className="test-area">
          <p className="snellen-letter" style={{ fontSize: fontSizes[currentStep] }}>{letters[currentStep]}</p>
          <div className="buttons">
            <button onClick={() => handleResponse(true)}>I Can Read</button>
            <button onClick={() => handleResponse(false)}>I Can't Read</button>
          </div>
        </div>
      ) : (
        <div className="result">
          <h3>Test Result:</h3>
          <p>{getResult()}</p>
        </div>
      )}
    </div>
  );
};

export default SnellenTest;
