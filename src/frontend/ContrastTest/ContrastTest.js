import React, { useState, useEffect } from "react";
import  "../ContrastTest/Constrastest.css";
const contrastLevels = ["100%", "75%", "50%", "25%", "13%", "8%", "7%", "6%"];
const letters = ["S", "D", "Z", "C", "V", "R", "O", "K", "D", "N", "C", "Z", "N", "K", "O", "Z", "V", "N", "K", "S", "H", "C", "N"];

const ContrastTest = () => {
    const [responses, setResponses] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [testComplete, setTestComplete] = useState(false);
    const [brightness, setBrightness] = useState(100); // Default brightness
    const [impairmentCategory, setImpairmentCategory] = useState("");

    useEffect(() => {
        document.body.style.filter = `brightness(${brightness}%)`;
    }, [brightness]);

    const handleBrightnessChange = (event) => {
        setBrightness(event.target.value);
    };

    const handleResponse = (canSee) => {
        setResponses([...responses, { contrast: contrastLevels[currentIndex], canSee }]);

        if (currentIndex < contrastLevels.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setTestComplete(true);
            classifyImpairment();
        }
    };

    const calculateLogCS = () => {
        const lastVisible = responses.filter(r => r.canSee).length;
        return lastVisible > 0 ? (1.92 - 0.3 * (5 - lastVisible)) : 0;
    };

    const classifyImpairment = () => {
        const logCS = calculateLogCS();
        let category = "";

        if (logCS >= 1.8) {
            category = "Excellent \n You have no Eye Condition";
        } else if (logCS >= 1.5) {
            category = "Normal \n You may have power! get it checked out";
        } else if (logCS >= 1.3) {
            category = "Mild Impairment \n You may have power! get it checked out";
        } else if (logCS >= 1.0) {
            category = "Moderate Impairment \n You should consult a doctor and you may have chances of having cataract";
        } else {
            category = "Severe Impairment \n You must Consult a Doctor soon!!";
        }

        setImpairmentCategory(category);
    };

    return (
        <div style={{ backgroundColor: "lightgrey", minHeight: "100vh", padding: "20px" }}>
            <h2>Contrast Sensitivity Test</h2>

            {/* Brightness Slider */}
            <div style={{ marginBottom: "20px" }}>
                <h3>Adjust Brightness</h3>
                <input
                    type="range"
                    min="10"
                    max="100"
                    value={brightness}
                    onChange={handleBrightnessChange}
                />
                <p>Current Brightness: {brightness}%</p>
            </div>

            {/* Contrast Sensitivity Test */}
            {!testComplete ? (
                <div>
                    <p>Can you see the letters at {contrastLevels[currentIndex]} contrast?</p>
                    <h1 style={{ opacity: parseFloat(contrastLevels[currentIndex]) / 100 }}>{letters[currentIndex]}</h1>
                    <button onClick={() => handleResponse(true)}>Yes</button>
                    <button onClick={() => handleResponse(false)}>No</button>
                </div>
            ) : (
                <div>
                    <h3>Test Complete!</h3>
                    <p>Your Log Contrast Sensitivity Score: {calculateLogCS().toFixed(2)}</p>
                    <p><strong>Your Contrast Sensitivity Level:</strong> {impairmentCategory}</p>
                </div>
            )}
        </div>
    );
};

export default ContrastTest;
