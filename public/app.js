// THIS CODE IS FOR ILLUSTRATION ONLY. DO NOT USE IN PRODUCTION WITHOUT SERVER-SIDE VALIDATION.

// Simulate fetching an encrypted, salted hash (or TOTP secret) from a server
async function getAuthenticationData() {
    // In a real app, fetch this from a secure endpoint
    return {
      totpSecret: "ABCDEFGHIJKLMNOP", // Replace with a real secret
      maxAttempts: 3,
    };
  }


function checkAuthentication() {
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    if (!isAuthenticated || isAuthenticated !== 'true') {
        promptAuthentication();
    } else {
        console.log("User is authenticated.");
    }
}

async function promptAuthentication() {
    const authData = await getAuthenticationData();
    let attempts = 0;

    function tryAuthentication() {
      if (attempts >= authData.maxAttempts) {
          alert("Too many incorrect attempts. Access denied.");
          return; // Stop re-prompting
      }

        const password = prompt("Enter password to access this site:"); //  REPLACE WITH <input type="password">

        if (password) {

            //VERY SIMPLIFIED TOTP - DO NOT USE IN PRODUCTION
            const expectedCode = generateTotp(authData.totpSecret);
            if(password === expectedCode){
                localStorage.setItem('isAuthenticated', 'true');
                location.reload();
            }
            else {
                attempts++;
                alert("Incorrect password. Attempts remaining: " + (authData.maxAttempts - attempts));
                tryAuthentication(); // Re-prompt
            }

        } else {
            alert("Authentication cancelled.");
        }
    }

    tryAuthentication();

}

function generateTotp(secret){
    //Simplified TOTP - DO NOT USE IN PRODUCTION
    //In a real TOTP, this will be generated based on a time window and shared secret
    return secret.substring(0,6);
}



function logout() {
    localStorage.removeItem('isAuthenticated');
    location.reload();
}

document.addEventListener('DOMContentLoaded', () => {
    checkAuthentication();

    const logoutButton = document.getElementById('logoutButton');
    if(logoutButton){
         logoutButton.addEventListener('click', logout);
    }

});