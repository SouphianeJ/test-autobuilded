// clock.js

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  // Pad with leading zeros if necessary
  hours = String(hours).padStart(2, '0');
  minutes = String(minutes).padStart(2, '0');
  seconds = String(seconds).padStart(2, '0');

  const timeString = `${hours}:${minutes}:${seconds}`;
  console.log(timeString);
}

// Initial call to display the time immediately
updateClock();

// Update the clock every second
setInterval(updateClock, 1000);