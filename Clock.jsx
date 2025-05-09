// Clock.jsx
import React, { useState, useEffect } from 'react';
import './clock/clock.css';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();

  const hourDegrees = (hour % 12 + minute / 60) * 30;
  const minuteDegrees = (minute + second / 60) * 6;
  const secondDegrees = second * 6;

  return (
    <svg className="clock" width="200" height="200" viewBox="0 0 200 200">
      <circle className="clock-face" cx="100" cy="100" r="90" />

      {/* Hour Hand */}
      <line
        className="hour-hand"
        x1="100"
        y1="100"
        x2="100"
        y2="40"
        transform={`rotate(${hourDegrees} 100 100)`}
      />

      {/* Minute Hand */}
      <line
        className="minute-hand"
        x1="100"
        y1="100"
        x2="100"
        y2="30"
        transform={`rotate(${minuteDegrees} 100 100)`}
      />

      {/* Second Hand */}
      <line
        className="second-hand"
        x1="100"
        y1="100"
        x2="100"
        y2="20"
        transform={`rotate(${secondDegrees} 100 100)`}
      />

      <circle className="center-dot" cx="100" cy="100" r="3" />
    </svg>
  );
};

export default Clock;