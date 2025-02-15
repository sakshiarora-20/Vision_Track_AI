import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Loader.css";
import eyeLogo from "../Assets/eyelogo.png";

export default function EyeAnimation() {
  const [showHashtag, setShowHashtag] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setShowHashtag(true),2000); // Show hashtag after 3s
    setTimeout(() => navigate("/home"), 6000); // Redirect after 1 min
  }, [navigate]);

  return (
    <div className="container">
      <img src={eyeLogo} alt="Eye Logo" className="eye-logo" />
      {showHashtag && <div className="hashtag">#Revolutionizing Vision Care</div>}
    </div>
  );
}
