// Function to update navbar
function updateNavbar() {
	const userJson = localStorage.getItem("currentUser");
	const navbarActions = document.querySelector(".navbar-actions");

	if (userJson) {
		// User is logged in
		navbarActions.innerHTML = `
        <span id="welcomeUser"></span>
        <button class="btn" onclick="logout()">Logout</button>
      `;
		const user = JSON.parse(userJson);
		document.getElementById("welcomeUser").textContent = `Welcome, ${
			user.firstName || "User"
		}!`;
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
	localStorage.removeItem("currentUser");
	updateNavbar();
	window.location.href = "login.html";
}
// Call updateNavbar when the page loads
document.addEventListener("DOMContentLoaded", updateNavbar);

// ##################################

document.addEventListener("DOMContentLoaded", function () {
	// Retrieve user data from localStorage
	const userJson = localStorage.getItem("currentUser");

	if (userJson) {
		const user = JSON.parse(userJson);

		// Update profile information
		document.getElementById("userName").textContent =
			user.firstName + " " + user.lastName || "User's Name";
		document.getElementById("userEmail").textContent =
			"Email: " + (user.email || "N/A");
		document.getElementById("userPhone").textContent =
			"Phone: " + (user.phone || "N/A");
		document.getElementById("userBio").textContent =
			user.bio || "No bio available.";

		// Update profile picture if available
		if (user.profilePic) {
			document.getElementById("profilePic").src = user.profilePic;
		}

		console.log(user);

		const cardContainer = document.querySelector(".card-container");
		cardContainer.innerHTML = "";

		if (user.courses && user.courses.length > 0) {
			user.courses.forEach((course) => {
				const card = document.createElement("div");
				card.className = "card";
				card.innerHTML = `
                        <a id="a_cardId" href="course_details.html?courseId=${course.courseId}">
                        <img src="${course.coursePic}" alt="${course.courseName}" class="card-img">
                        <div class="card-content">
                            <h2 class="card-title">${course.courseName}</h2>
                            <p class="card-description">${course.description}</p>
                        </div>
                        <div class="card-footer">
                            <span class="card-price">$${course.price}</span>
                            <span class="card-rating">${course.rating}</span>
                        </div>
                        </a>
                    `;
				cardContainer.appendChild(card);
			});
		} else {
			const li = document.createElement("li");
			li.textContent = "No courses enrolled";
			// coursesList.appendChild(li);
		}
	} else {
		// Handle case when user is not logged in
		document.querySelector(".profile-card").innerHTML =
			"<p>Please log in to view your profile.</p>";
	}
});
