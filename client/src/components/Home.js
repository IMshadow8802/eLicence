import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h2>ELM</h2>
        <p>Welcome to e-Licence Management.</p>
        <div className="home-buttons">
          <Link to="/editActive" className="btn">
            Active
          </Link>
          <Link to="/editLicence" className="btn">
            Licence
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
