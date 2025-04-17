// Clock.jsx
import React, { useState, useEffect } from 'react';

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
    <svg width="200" height="200" viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="90" fill="white" stroke="black" strokeWidth="2" />

      {/* Hour Hand */}
      <line
        x1="100"
        y1="100"
        x2="100"
        y2="40"
        stroke="black"
        strokeWidth="4"
        strokeLinecap="round"
        transform={`rotate(${hourDegrees} 100 100)`}
      />

      {/* Minute Hand */}
      <line
        x1="100"
        y1="100"
        x2="100"
        y2="30"
        stroke="black"
        strokeWidth="3"
        strokeLinecap="round"
        transform={`rotate(${minuteDegrees} 100 100)`}
      />

      {/* Second Hand */}
      <line
        x1="100"
        y1="100"
        x2="100"
        y2="20"
        stroke="red"
        strokeWidth="2"
        strokeLinecap="round"
        transform={`rotate(${secondDegrees} 100 100)`}
      />

      <circle cx="100" cy="100" r="3" fill="black" />
    </svg>
  );
};

export default Clock;