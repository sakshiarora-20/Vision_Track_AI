from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd
from flask_cors import CORS

# Load the trained model
rf_model = joblib.load("RandomForest_EyePrescription_Model.pkl")

# Define valid Snellen Scores
valid_snellen_scores = ["20/20", "20/25", "20/30", "20/40", "20/50", "20/70", "20/100", "20/200"]

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

@app.route("/")
def home():
    return "🟢 Eye Prescription Predictor API is Running!"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Get JSON data from frontend request
        data = request.json

        # Extract user input
        age = data.get("age", 0)
        gender = data.get("gender", "")
        snellen_left = data.get("snellen_left", "")
        snellen_right = data.get("snellen_right", "")
        last_clear_left = data.get("last_clear_left", "No").lower()
        last_clear_right = data.get("last_clear_right", "No").lower()
        headaches = data.get("headaches", "No")
        blurry_vision = data.get("blurry_vision", "No")
        eye_strain = data.get("eye_strain", "No")
        distance_issue = data.get("distance_issue", "No")
        near_issue = data.get("near_issue", "No")
        light_sensitivity = data.get("light_sensitivity", "No")
        low_light_difficulty = data.get("low_light_difficulty", "No")

        # Load expected feature names from trained model
        expected_features = rf_model.feature_names_in_
        
        # Create an empty DataFrame with correct structure
        input_df = pd.DataFrame(columns=expected_features)
        input_df.loc[0] = 0  # Initialize all features to 0

        # Fill in numerical values
        input_df["Age"] = age

        # One-Hot Encoding (Set relevant columns to 1)
        if f"Gender_{gender}" in input_df.columns:
            input_df[f"Gender_{gender}"] = 1

        if f"Headaches_{headaches}" in input_df.columns:
            input_df[f"Headaches_{headaches}"] = 1

        if f"Blurred Vision_{blurry_vision}" in input_df.columns:
            input_df[f"Blurred Vision_{blurry_vision}"] = 1

        if f"Eye Strain_{eye_strain}" in input_df.columns:
            input_df[f"Eye Strain_{eye_strain}"] = 1

        if f"Distance Issue_{distance_issue}" in input_df.columns:
            input_df[f"Distance Issue_{distance_issue}"] = 1

        if f"Near Issue_{near_issue}" in input_df.columns:
            input_df[f"Near Issue_{near_issue}"] = 1

        if f"Light Sensitivity_{light_sensitivity}" in input_df.columns:
            input_df[f"Light Sensitivity_{light_sensitivity}"] = 1

        if f"Difficulty in Low Light_{low_light_difficulty}" in input_df.columns:
            input_df[f"Difficulty in Low Light_{low_light_difficulty}"] = 1

        if snellen_left in valid_snellen_scores and f"Snellen Score Left_{snellen_left}" in input_df.columns:
            input_df[f"Snellen Score Left_{snellen_left}"] = 1

        if snellen_right in valid_snellen_scores and f"Snellen Score Right_{snellen_right}" in input_df.columns:
            input_df[f"Snellen Score Right_{snellen_right}"] = 1

        # Ensure all missing columns are filled with 0
        input_df = input_df.fillna(0)

        # Predict using the trained model
        prediction = rf_model.predict(input_df)

        # ✅ Function to Determine Lens Type
        def recommend_lens_type(sph_left, sph_right, cyl_left, cyl_right, last_clear_left, last_clear_right):
            """
            Determines the lens type based on SPH, CYL values, and whether the user could read the last line.
            """
            if last_clear_left == "yes":
                cyl_left = 0
                axis_left = "Not Applicable"
            else:
                axis_left = prediction[0][4]

            if last_clear_right == "yes":
                cyl_right = 0
                axis_right = "Not Applicable"
            else:
                axis_right = prediction[0][5]

            if sph_left < -0.50 or sph_right < -0.50:
                lens_type = "Distance Glasses"
            elif sph_left > +1.50 or sph_right > +1.50:
                lens_type = "Reading Glasses"
            elif cyl_left < -1.00 or cyl_right < -1.00:
                lens_type = "Astigmatism Correction (Toric or Bifocals)"
            else:
                lens_type = "Mixed Prescription (Mild Correction)"

            return lens_type, cyl_left, cyl_right, axis_left, axis_right

        # Get recommended lens type based on predictions
        recommended_lens, cyl_left, cyl_right, axis_left, axis_right = recommend_lens_type(
            sph_left=prediction[0][0], 
            sph_right=prediction[0][1], 
            cyl_left=prediction[0][2], 
            cyl_right=prediction[0][3], 
            last_clear_left=last_clear_left,
            last_clear_right=last_clear_right
        )

        # Return API response
        response = {
            "SPH Left": round(prediction[0][0], 2),
            "SPH Right": round(prediction[0][1], 2),
            "CYL Left": round(cyl_left, 2),
            "CYL Right": round(cyl_right, 2),
            "Axis Left": axis_left,
            "Axis Right": axis_right,
            "Recommended Lens Type": recommended_lens
        }

        return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e)})

# Run Flask app
if __name__ == "__main__":
    app.run(debug=True)
