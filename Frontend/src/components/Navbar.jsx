import React from 'react';
import logo1Logo from '../assets/logo1.svg';
import githubLogo from '../assets/github.svg';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <a href="/" className="navbar-brand">
          <div className="flex items-center">
            <img src={logo1Logo} alt="Voice Vista Logo" className="w-12 h-12 mr-3" />
            <span className="brand-text">Voice Vista</span>
          </div>
        </a>
        
        <a 
          href="https://github.com/Krishnachaitanya2408/Speech-Emotion-Recognizer" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="github-link"
        >
          <img src={githubLogo} alt="GitHub Profile" className="w-6 h-6" />
        </a>
      </div>
    </nav>
  );
};

export default NavBar;