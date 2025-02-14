import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Typed from "typed.js";
import { useNavigate } from "react-router-dom";
import "./Loader.css";

import logo from "../Assets/ebgfrg.png";
import snellenimage from "../Assets/snellenimage.png";

const LoadBalancer = () => {
    const textRef = useRef(null);
    const navigate = useNavigate();
    const [showSnellenImage, setShowSnellenImage] = useState(false);

    useEffect(() => {
        // Initialize typed.js for tagline animation
        const typed = new Typed(textRef.current, {
            strings: ["Revolutionizing Vision Care"],
            typeSpeed: 45,
            backSpeed: 45,
            showCursor: false,
            onComplete: () => {
                setTimeout(() => {
                    setShowSnellenImage(true); // Show the Snellen image after tagline animation
                }, 1000);
            },
        });

        return () => {
            typed.destroy();
        };
    }, []);

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-white relative overflow-hidden">
            {/* Center Black Line */}
            <div className="absolute top-1/2 left-0 w-full h-[3px] bg-black"></div>

            {/* Rolling Logo Animation */}
            {!showSnellenImage && (
                <motion.img
                    src={logo} // Replace with actual logo path
                    alt="Logo"
                    className="w-32 absolute"
                    initial={{ x: "-100vw", rotate: 0 }}
                    animate={{ x: 0, rotate: 360 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    onAnimationComplete={() => setShowSnellenImage(true)} // Exit to right
                />
            )}

            {/* Tagline with Typing Effect */}
            {!showSnellenImage && (
                <motion.p
                    className="absolute bottom-20 text-lg font-bold text-black"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.2, duration: 1 }}
                >
                    <span ref={textRef}></span>
                </motion.p>
            )}

            {/* Snellen Test Image Animation */}
            {showSnellenImage && (
                <motion.div
                    className="flex flex-col items-center"
                    initial={{ x: "-100vw", rotate: -180 }}
                    animate={{ x: 0, rotate: 0 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                >
                    <img
                        src={snellenimage} // Replace with actual Snellen image path
                        alt="Snellen Test"
                        className="w-60"
                    />
                    <p className="text-lg font-semibold text-black mt-4">
                        If you see the lines greyer, then definitely you have to take a test.
                    </p>
                    {/* Navigation Buttons */}
                    <div className="mt-4 flex gap-4">
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                            onClick={() => navigate("/test1")}
                        >
                            Take Test 1
                        </button>
                        <button
                            className="px-4 py-2 bg-green-500 text-white rounded"
                            onClick={() => navigate("/test2")}
                        >
                            Take Test 2
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default LoadBalancer;
