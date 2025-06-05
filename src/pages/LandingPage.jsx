import React    from "react";

import { Link } from "react-router-dom";  // Import Link from react-router-dom
import "./Pages.css";

const LandingPage = () => {
  return (
    <div className="container">
      <div className="background"></div>
      <div class="l-nav">

      </div>

      <div className="hero">
        <h2>
          We deliver <span>delicious & healthy food</span>
        </h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut.
        </p>
        <button>BOOK A TABLE</button>
      </div>
    </div>
  );
};

export default LandingPage;
