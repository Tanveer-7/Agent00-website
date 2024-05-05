import React from 'react';
import './V.css'; // Import the CSS styles

const V = () => {
  const missions = [
    'Reached Alpha Centauri',
    'Discovered Alien Life Forms',
    'Rescued Stranded Astronauts',
    'Built Lunar Colony',
    'Conquered the Martian Surface'
  ];

  return (
    <div>
      <video autoPlay muted loop id="video-background">
        <source src="a.mp4" type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
      <div id="content">
        <h1>Mission Accomplishments</h1>
        <ul id="missions">
          {missions.map((mission, index) => (
            <li key={index}>{mission}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default V;
