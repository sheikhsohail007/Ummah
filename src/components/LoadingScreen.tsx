import React from 'react';

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-container">
        {/* Islamic Crescent and Star */}
        <div className="islamic-symbol">
          <div className="crescent">
            <div className="crescent-inner"></div>
          </div>
          <div className="star">
            <div className="star-point"></div>
            <div className="star-point"></div>
            <div className="star-point"></div>
            <div className="star-point"></div>
            <div className="star-point"></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="loading-text">
          <h1 className="brand-name">Islamic Pearls</h1>
          <p className="tagline">Discover wisdom, find peace, embrace faith</p>
        </div>

        {/* Loading Progress */}
        <div className="loading-progress">
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
          <p className="loading-message">Loading spiritual guidance...</p>
        </div>

        {/* Floating Particles */}
        <div className="particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;