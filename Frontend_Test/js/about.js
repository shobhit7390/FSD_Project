// ########################################

// Function to update navbar
function updateNavbar() {
    const userJson = localStorage.getItem('currentUser');
    const navbarActions = document.querySelector('.navbar-actions');
    
    if (userJson) {
      // User is logged in
      navbarActions.innerHTML = `
        <span id="welcomeUser"></span>
        <button class="btn" onclick="logout()">Logout</button>
      `;
      const user = JSON.parse(userJson);
      document.getElementById('welcomeUser').textContent = `Welcome, ${user.firstName || 'User'}!`;
    } else {
      // User is not logged in
      navbarActions.innerHTML = `
        <input type="text" placeholder="Search..." class="search-bar">
        <a href="login.html"><button class="btn sign-in">Sign In</button></a>
        <a href="register2.html"><button class="btn sign-up">Sign Up</button></a>
      `;
    }
}

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    updateNavbar();
    window.location.href = 'login.html';
}
// Call updateNavbar when the page loads
document.addEventListener('DOMContentLoaded', updateNavbar);