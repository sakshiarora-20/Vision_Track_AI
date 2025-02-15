// import { useEffect, useState } from "react";
// import "./SnellenLoader.css";
// import FanChart from "../Assets/snellenimage.png";

// export default function AnimatedSequence() {
//   const [showMessage, setShowMessage] = useState(false);
//   const [showButtons, setShowButtons] = useState(false);

//   useEffect(() => {
//     setTimeout(() => {
//       setShowMessage(true);
//     }, 2000); // Show message after 2 seconds

//     setTimeout(() => {
//       setShowButtons(true);
//     }, 4000); // Show buttons after 4 seconds
//   }, []);

//   return (
//     <div className="container">
//       {/* Image Appears Rotating from Right */}
//       <img src={FanChart} alt="Rotating Image" className="rotating-image" />

//       {/* Message Appears After 2 Seconds */}
//       {showMessage && <div className="message">Welcome to VisionAI!</div>}

//       {/* Buttons Appear After 4 Seconds */}
//       {showButtons && (
//         <div className="button-container">
//           <button className="action-button">Explore</button>
//           <button className="action-button">Learn More</button>
//           <button className="action-button">Get Started</button>
//         </div>
//       )}
//     </div>
//   );
// }

const SnellenLoader = () =>
{
  return(
    <h2>Hello</h2>
  );
}

export default SnellenLoader;