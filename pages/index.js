import { useState, useEffect } from 'react';

export default function Home() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();

  const hourDegrees = ((hour / 12) * 360) + ((minute / 60) * 30) + 90;
  const minuteDegrees = ((minute / 60) * 360) + ((second / 60) * 6) + 90;
  const secondDegrees = ((second / 60) * 360) + 90;

  return (
    <div className="container">
      <div className="clock">
        <div className="center"></div>
        <div className="hand hour-hand" style={{ transform: `rotate(${hourDegrees}deg)` }}></div>
        <div className="hand minute-hand" style={{ transform: `rotate(${minuteDegrees}deg)` }}></div>
        <div className="hand second-hand" style={{ transform: `rotate(${secondDegrees}deg)` }}></div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f0f0f0;
        }

        .clock {
          width: 300px;
          height: 300px;
          background-color: white;
          border-radius: 50%;
          border: 5px solid #333;
          position: relative;
        }

        .center {
          width: 15px;
          height: 15px;
          background-color: black;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          z-index: 3;
        }

        .hand {
          position: absolute;
          transform-origin: 50% 50%;
          border-radius: 5px;
          z-index: 2;
        }

        .hour-hand {
          width: 6px;
          height: 80px;
          background-color: black;
          top: 70px;
          left: calc(50% - 3px);
        }

        .minute-hand {
          width: 4px;
          height: 120px;
          background-color: black;
          top: 30px;
          left: calc(50% - 2px);
        }

        .second-hand {
          width: 2px;
          height: 140px;
          background-color: red;
          top: 10px;
          left: calc(50% - 1px);
        }
      `}</style>
    </div>
  );
}