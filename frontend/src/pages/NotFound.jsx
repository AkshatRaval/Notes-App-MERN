import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

const NotFound = () => {
  const numberRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      numberRef.current,
      { y: -50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "bounce.out",
        repeat: 1,
        yoyo: true,
      }
    );
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 flex flex-col items-center justify-center text-white px-6">
      <div
        ref={numberRef}
        className="text-[10rem] font-extrabold tracking-wide select-none drop-shadow-lg"
      >
        404
      </div>
      <h1 className="text-4xl md:text-5xl font-semibold mb-4 drop-shadow-md">
        Ooops! Page Not Found
      </h1>
      <p className="text-lg max-w-md text-center mb-10 drop-shadow-sm">
        The page you're looking for doesn't exist or has been moved. Let’s get
        you back home.
      </p>
      <Link
        to="/"
        className="bg-white text-purple-700 font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-purple-100 transition"
      >
        Go to Home
      </Link>
    </section>
  );
};

export default NotFound;
