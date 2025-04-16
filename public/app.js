// Check if already authenticated (e.g., Firebase auth persistence)
// If not, prompt for additional authentication
function checkAuthentication() {
    const isAuthenticated = localStorage.getItem('isAuthenticated'); // Replace with actual Firebase auth check if available
  
    if (!isAuthenticated || isAuthenticated !== 'true') {
      promptAuthentication();
    } else {
      // User is authenticated, continue
      console.log("User is authenticated.");
    }
  }
  
  function promptAuthentication() {
    const password = prompt("Enter password to access this site:");
  
    if (password === "securePassword") { // Replace with a stronger mechanism in production. NEVER HARDCODE IN A REAL APP.
      localStorage.setItem('isAuthenticated', 'true');
      location.reload(); // Reload the page to reflect the authenticated state
    } else {
      alert("Incorrect password. Access denied.");
      promptAuthentication(); // Re-prompt until correct password is provided or user cancels
    }
  }

  function logout() {
    localStorage.removeItem('isAuthenticated');
    location.reload();
  }

  document.addEventListener('DOMContentLoaded', () => {
    checkAuthentication();

    const logoutButton = document.getElementById('logoutButton');
    logoutButton.addEventListener('click', logout);
  });