import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import snellenC from "../Assets/Snellen_chart.png";
function App() {
    const [formData, setFormData] = useState({
        age: "",
        gender: "",
        snellen_left: "",
        snellen_right: "",
        last_clear_left: "",
        last_clear_right: "",
        headaches: "",
        blurry_vision: "",
        eye_strain: "",
        distance_issue: "",
        near_issue: "",
        light_sensitivity: "",
        low_light_difficulty: "",
    });

    const [prediction, setPrediction] = useState(null);
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);

    // Handle form changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Send data to Flask API
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://127.0.0.1:5000/predict", formData);
            console.log("API Response:", response.data);
            setPrediction(response.data);
        } catch (error) {
            console.error("Error fetching prediction:", error);
        }
    };

    return (
        <div style={{
            maxWidth: "700px", margin: "auto", padding: "20px", maxHeight: "500px",
            overflowY: "auto", fontFamily: "Arial, sans-serif", overflow: "auto"
        }}>
            <h2>Eye Prescription Predictor</h2>
            <img src={snellenC} style={{ width: "600px", marginBottom: "10px" }} alt="snelles-chart" />
            <div>
                <form onSubmit={handleSubmit}>
                    <label>Age:</label>
                    <input type="number" name="age" value={formData.age} onChange={handleChange} required /><br />

                    <label>Gender:</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} required>
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select><br />

                    <label>Snellen Score Left Eye:</label>
                    <input type="text" name="snellen_left" value={formData.snellen_left} onChange={handleChange} required /><br />

                    <label>Snellen Score Right Eye:</label>
                    <input type="text" name="snellen_right" value={formData.snellen_right} onChange={handleChange} required /><br />

                    <label>Did you see the last line clearly for Left Eye?</label>
                    <select name="last_clear_left" value={formData.last_clear_left} onChange={handleChange} required>
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select><br />

                    <label>Did you see the last line clearly for Right Eye?</label>
                    <select name="last_clear_right" value={formData.last_clear_right} onChange={handleChange} required>
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select><br />

                    <label>Do you have headaches?</label>
                    <select name="headaches" value={formData.headaches} onChange={handleChange} required>
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select><br />

                    <label>Do you have blurry vision?</label>
                    <select name="blurry_vision" value={formData.blurry_vision} onChange={handleChange} required>
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select><br />

                    <label>Do you have eye strain?</label>
                    <select name="eye_strain" value={formData.eye_strain} onChange={handleChange} required>
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select><br />

                    <label>Do you have distance vision issues?</label>
                    <select name="distance_issue" value={formData.distance_issue} onChange={handleChange} required>
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select><br />

                    <label>Do you have near vision issues?</label>
                    <select name="near_issue" value={formData.near_issue} onChange={handleChange} required>
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select><br />

                    <label>Are you sensitive to light?</label>
                    <select name="light_sensitivity" value={formData.light_sensitivity} onChange={handleChange} required>
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select><br />

                    <label>Do you have difficulty seeing in low light?</label>
                    <select name="low_light_difficulty" value={formData.low_light_difficulty} onChange={handleChange} required>
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select><br />

                    <button type="submit">Get Prediction</button>
                </form>
            </div>

            {prediction && (
                <div style={{ marginTop: "20px", padding: "10px", border: "1px solid black" }}>
                    <h3> Predicted Eye Prescription:</h3>
                    <p>SPH Left: {prediction["SPH Left"]}</p>
                    <p>SPH Right: {prediction["SPH Right"]}</p>
                    <p>CYL Left: {prediction["CYL Left"]}</p>
                    <p>CYL Right: {prediction["CYL Right"]}</p>
                    <p>Axis Left: {prediction["Axis Left"]}</p>
                    <p>Axis Right: {prediction["Axis Right"]}</p>
                    <p> Recommended Lens Type: {prediction["Recommended Lens Type"]}</p>
                    {prediction["Recommended Lens Type"] === "Mixed Prescription (Mild Correction)" ? (
                        <div style={{ marginTop: "10px" }}>
                            <h4> Eye Exercises to Improve Vision:</h4>
                            <p>Consider incorporating regular eye exercises to support your vision health. Learn more from this reliable source:</p>
                            <a href="https://www.health.com/how-to-improve-eyesight-8777347" target="_blank" rel="noopener noreferrer">
                                How To Improve Your Eyesight: 10 Effective Techniques
                            </a>
                        </div>
                    ) : (
                        <div style={{ marginTop: "10px", color: "red" }}>
                            <h4>⚠ Visit an Optometrist:</h4>
                            <p>Your vision condition requires professional assessment. Please visit an optometrist for a comprehensive check-up.</p>
                        </div>
                    )}

                </div>
            )}
            <div>
                <button onClick={() => setCurrentIndex(0)}>Restart Test</button>
                <button onClick={() => navigate("/contrast")}>Move to Contrast Test</button>
            </div>
        </div>
    );
}

export default App;

// import React, { useState } from "react";
// import axios from "axios";
// // const CORS = require("cors");

// // CORS(app, resources = { r"/*": { "origins": "*" } })


// function App() {
//     const [formData, setFormData] = useState({
//         age: "",
//         gender: "",
//         snellen_left: "",
//         snellen_right: "",
//         last_clear_left: "",
//         last_clear_right: "",
//         headaches: "",
//         blurry_vision: "",
//         eye_strain: "",
//         distance_issue: "",
//         near_issue: "",
//         light_sensitivity: "",
//         low_light_difficulty: "",
//     });

//     const [prediction, setPrediction] = useState(null);

//     // Handle form changes
//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     // Send data to Flask API
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post("http://127.0.0.1:5000/predict", formData);
//             console.log("API Response:", response.data); // ✅ Log the response
//             setPrediction(response.data);
//         } catch (error) {
//             console.error("Error fetching prediction:", error);
//         }
//     };

//     return (
//         <div style={{ maxWidth: "500px", margin: "auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
//             <h2>Eye Prescription Predictor</h2>
//             <form onSubmit={handleSubmit}>
//                 <label>Age:</label>
//                 <input type="number" name="age" value={formData.age} onChange={handleChange} required /><br />

//                 <label>Gender:</label>
//                 <select name="gender" value={formData.gender} onChange={handleChange} required>
//                     <option value="">Select</option>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                 </select><br />

//                 <label>Snellen Score Left Eye:</label>
//                 <input type="text" name="snellen_left" value={formData.snellen_left} onChange={handleChange} required /><br />

//                 <label>Snellen Score Right Eye:</label>
//                 <input type="text" name="snellen_right" value={formData.snellen_right} onChange={handleChange} required /><br />

//                 <label>Did you see the last line clearly for Left Eye?</label>
//                 <select name="last_clear_left" value={formData.last_clear_left} onChange={handleChange} required>
//                     <option value="">Select</option>
//                     <option value="Yes">Yes</option>
//                     <option value="No">No</option>
//                 </select><br />

//                 <label>Did you see the last line clearly for Right Eye?</label>
//                 <select name="last_clear_right" value={formData.last_clear_right} onChange={handleChange} required>
//                     <option value="">Select</option>
//                     <option value="Yes">Yes</option>
//                     <option value="No">No</option>
//                 </select><br />

//                 <label>Do you have headaches?</label>
//                 <select name="headaches" value={formData.headaches} onChange={handleChange} required>
//                     <option value="">Select</option>
//                     <option value="Yes">Yes</option>
//                     <option value="No">No</option>
//                 </select><br />

//                 <label>Do you have blurry vision?</label>
//                 <select name="blurry_vision" value={formData.blurry_vision} onChange={handleChange} required>
//                     <option value="">Select</option>
//                     <option value="Yes">Yes</option>
//                     <option value="No">No</option>
//                 </select><br />

//                 <label>Do you have eye strain?</label>
//                 <select name="eye_strain" value={formData.eye_strain} onChange={handleChange} required>
//                     <option value="">Select</option>
//                     <option value="Yes">Yes</option>
//                     <option value="No">No</option>
//                 </select><br />

//                 <label>Do you have distance vision issues?</label>
//                 <select name="distance_issue" value={formData.distance_issue} onChange={handleChange} required>
//                     <option value="">Select</option>
//                     <option value="Yes">Yes</option>
//                     <option value="No">No</option>
//                 </select><br />

//                 <label>Do you have near vision issues?</label>
//                 <select name="near_issue" value={formData.near_issue} onChange={handleChange} required>
//                     <option value="">Select</option>
//                     <option value="Yes">Yes</option>
//                     <option value="No">No</option>
//                 </select><br />

//                 <label>Are you sensitive to light?</label>
//                 <select name="light_sensitivity" value={formData.light_sensitivity} onChange={handleChange} required>
//                     <option value="">Select</option>
//                     <option value="Yes">Yes</option>
//                     <option value="No">No</option>
//                 </select><br />

//                 <label>Do you have difficulty seeing in low light?</label>
//                 <select name="low_light_difficulty" value={formData.low_light_difficulty} onChange={handleChange} required>
//                     <option value="">Select</option>
//                     <option value="Yes">Yes</option>
//                     <option value="No">No</option>
//                 </select><br />

//                 <button type="submit">Get Prediction</button>
//             </form>

//             {prediction && (
//                 <div style={{ marginTop: "20px", padding: "10px", border: "1px solid black" }}>
//                     <h3>🔍 Predicted Eye Prescription:</h3>
//                     <p>SPH Left: {prediction["SPH Left"]}</p>
//                     <p>SPH Right: {prediction["SPH Right"]}</p>
//                     <p>CYL Left: {prediction["CYL Left"]}</p>
//                     <p>CYL Right: {prediction["CYL Right"]}</p>
//                     <p>Axis Left: {prediction["Axis Left"]}</p>
//                     <p>Axis Right: {prediction["Axis Right"]}</p>
//                     <p>🕶 Recommended Lens Type: {prediction["Recommended Lens Type"]}</p>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default App;