import React from 'react';

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-container">
        {/* Islamic Geometric Pattern Animation */}
        <div className="islamic-loader">
          <div className="geometric-pattern">
            <div className="octagon">
              <div className="inner-star">
                <div className="star-ray"></div>
                <div className="star-ray"></div>
                <div className="star-ray"></div>
                <div className="star-ray"></div>
                <div className="star-ray"></div>
                <div className="star-ray"></div>
                <div className="star-ray"></div>
                <div className="star-ray"></div>
              </div>
            </div>
            <div className="rotating-ring"></div>
            <div className="outer-ring"></div>
          </div>
          
          {/* Pulsing Dots */}
          <div className="pulse-dots">
            <div className="dot dot-1"></div>
            <div className="dot dot-2"></div>
            <div className="dot dot-3"></div>
            <div className="dot dot-4"></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="loading-text">
          <h1 className="brand-name">Qalam Verse</h1>
          <p className="tagline">Discover wisdom, find peace, embrace faith</p>
        </div>

        {/* Progress Indicator */}
        <div className="loading-progress">
          <div className="progress-container">
            <div className="progress-wave"></div>
          </div>
          <p className="loading-message">Preparing your spiritual journey...</p>
        </div>

        {/* Floating Islamic Calligraphy */}
        <div className="floating-elements">
          <div className="calligraphy-element element-1">﷽</div>
          <div className="calligraphy-element element-2">☪</div>
          <div className="calligraphy-element element-3">✦</div>
          <div className="calligraphy-element element-4">❋</div>
          <div className="calligraphy-element element-5">✧</div>
          <div className="calligraphy-element element-6">◈</div>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;