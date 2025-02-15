import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from xgboost import XGBRegressor
from sklearn.ensemble import RandomForestRegressor
import joblib

# Outlier visualization function
def outliers(x):
    x.plot(kind='box')
    plt.show()
    
data = pd.read_csv("../dataset/Lens_power_data.csv")

# Encode categorical variables using one-hot encoding
categorical_columns = ['Gender', 'Blurred Vision', 'Eye Strain', 'Headaches', 'Distance Issue', 
                        'Near Issue', 'Light Sensitivity', 'Difficulty in Low Light', 
                        'Recommended Lens Type', 'Snellen Score Left', 'Snellen Score Right']

data_encoded = pd.get_dummies(data, columns=categorical_columns)

# Correlation matrix
correlation_matrix = data_encoded.corr()

# Plot heatmap
plt.figure(figsize=(12, 10))
sns.heatmap(correlation_matrix, cmap='coolwarm', annot=True, fmt=".2f", vmin=-1, vmax=1)
plt.title('Correlation Heatmap')
plt.show()

# Outlier handling function
def cap_outliers(series):
    lower_bound = series.quantile(0.01)
    upper_bound = series.quantile(0.99)
    return series.clip(lower_bound, upper_bound)

# Apply outlier capping
for col in ['SPH Left', 'SPH Right', 'CYL Left', 'CYL Right']:
    data_encoded[col] = cap_outliers(data_encoded[col])

# Split dataset
X = data_encoded.drop(columns=['SPH Left', 'SPH Right', 'CYL Left', 'CYL Right', 'Axis Left', 'Axis Right'])
y = data_encoded[['SPH Left', 'SPH Right', 'CYL Left', 'CYL Right', 'Axis Left', 'Axis Right']]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train XGBoost model
xgb_model = XGBRegressor(objective='reg:squarederror', n_estimators=100)
xgb_model.fit(X_train, y_train)

# Train Random Forest model
rf_model = RandomForestRegressor(n_estimators=100, max_depth=10, random_state=42)
rf_model.fit(X_train, y_train)

# Make predictions
y_pred_xgb = xgb_model.predict(X_test)
y_pred_rf = rf_model.predict(X_test)

# Evaluate XGBoost
mae_xgb = mean_absolute_error(y_test, y_pred_xgb)
rmse_xgb = np.sqrt(mean_squared_error(y_test, y_pred_xgb))
r2_xgb = r2_score(y_test, y_pred_xgb)

print("\nXGBoost Model:")
print(f'Mean Absolute Error: {mae_xgb}')
print(f'Root Mean Squared Error: {rmse_xgb}')
print(f'R-squared Score: {r2_xgb}')

# Evaluate Random Forest
mae_rf = mean_absolute_error(y_test, y_pred_rf)
rmse_rf = np.sqrt(mean_squared_error(y_test, y_pred_rf))
r2_rf = r2_score(y_test, y_pred_rf)

print("\nRandom Forest Model:")
print(f'Mean Absolute Error: {mae_rf}')
print(f'Root Mean Squared Error: {rmse_rf}')
print(f'R-squared Score: {r2_rf}')

# Save models
joblib.dump(rf_model, "RandomForest_EyePrescription_Model.pkl")
joblib.dump(xgb_model, "XGBoost_EyePrescription_Model.pkl")
print("Models saved successfully!")
