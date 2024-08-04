document.addEventListener("DOMContentLoaded", function () {
	// Get course ID from URL parameters
	const urlParams = new URLSearchParams(window.location.search);
	const courseId = urlParams.get("courseId");

	const applyCouponBtn = document.getElementById("applyCouponBtn");
	const couponCodeInput = document.getElementById("couponCode");
	const originalPriceSpan = document.getElementById("coursePrice");
	const finalPriceSpan = document.getElementById("finalPrice");
	const discountMessageP = document.getElementById("discountMessage");

	// const enrollBtn = document.querySelector('.course-header');
	// enrollBtn.innerHTML=`
	// <img id="courseImage" src="" alt="Course Image">
	// <a href="payment.html?courseId=${courseId}">
	// <button id="enrollButton" class="btn enroll-course">Buy Now</button>
	// <button id="startButton" class="btn start-course" style="display: none;">Start Course</button>
	// </a>`;

	if (!courseId) {
		// Handle missing course ID
		document.querySelector(".course_details").innerHTML =
			"<p>No course ID provided.</p>";
		return;
	}

	async function loadCourseDetails() {
		// Fetch course details from API
		fetch(`http://localhost:8090/courses/${courseId}`)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((course) => {
				// Update page with course details
				document.getElementById("courseImage").src = course.coursePic;
				document.getElementById("courseName").textContent =
					course.courseName;
				document.getElementById("courseInstructor").textContent =
					course.instructorName;
				document.getElementById("courseDescription").textContent =
					course.description;
				document.getElementById("courseCategory").textContent =
					course.category;
				document.getElementById("coursePrice").textContent =
					course.price;
				document.getElementById("courseRating").textContent =
					course.rating;
				document.getElementById("difficultyLevel").textContent =
					course.difficultyLevel;
				document.getElementById("courseDuration").textContent =
					course.duration;
				document.getElementById("finalPrice").textContent =
					course.price;
				localStorage.setItem("videoLink", course.videoUrl);
				if (course.couponCode != null) {
					document.getElementById(
						"displayDiscountMessage"
					).textContent = `Hurry up...Avail discount on this Course using coupan code:'${course.couponCode}' Offer valid till ${course.couponExpirationDate} only`;
				}
			})
			.catch((error) => {
				// Handle errors
				console.error(
					"There has been a problem with your fetch operation:",
					error
				);
				document.querySelector(".course-details").innerHTML =
					"<p>Course not found.</p>";
			});
	}
	loadCourseDetails();

	async function applyCoupon() {
		const couponCode = couponCodeInput.value;
		try {
			// const response = await fetch(`/courses/${courseId}/price?couponCode=${couponCode}`);
			// http://localhost:8090/courses/1/price?couponCode=WELCOME
			const response = await fetch(
				`http://localhost:8090/courses/${courseId}/price?couponCode=${couponCode}`
			);
			console.log(response);
			if (response.ok) {
				const data = await response.json();
				originalPriceSpan.textContent = data.originalPrice.toFixed(2);
				finalPriceSpan.textContent = data.discountedPrice.toFixed(2);
				localStorage.setItem("finalPrice", data.discountedPrice);

				if (data.originalPrice > data.discountedPrice) {
					const savingsPercentage = (
						((data.originalPrice - data.discountedPrice) /
							data.originalPrice) *
						100
					).toFixed(2);
					discountMessageP.textContent = `You save ${savingsPercentage}%!`;
					discountMessageP.style.color = "green";
				} else {
					discountMessageP.textContent =
						"Invalid or expired coupon code.";
					discountMessageP.style.color = "red";
				}
			} else {
				discountMessageP.textContent =
					"Error applying coupon. Please try again.";
				discountMessageP.style.color = "red";
			}
		} catch (error) {
			console.error("Error:", error);
			discountMessageP.textContent =
				"An error occurred. Please try again later.";
			discountMessageP.style.color = "red";
		}
	}

	applyCouponBtn.addEventListener("click", applyCoupon);
	loadCourseDetails();
});

// #################################

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

// ###################################################

const enrollButton = document.getElementById("enrollButton");
const startButton = document.getElementById("startButton");

const urlParams = new URLSearchParams(window.location.search);
const courseId = urlParams.get("courseId");
const payment_status = urlParams.get("complete");
console.log(payment_status);

function isUserLoggedIn() {
	return localStorage.getItem("currentUser") !== null;
}

function updateLocalStorage(newCourse) {
	let currentUser = JSON.parse(localStorage.getItem("currentUser"));
	if (!currentUser.courses) {
		currentUser.courses = [];
	}
	currentUser.courses.push(newCourse);
	localStorage.setItem("currentUser", JSON.stringify(currentUser));
}

enrollButton.addEventListener("click", async () => {
	if (!isUserLoggedIn()) {
		alert("Please log in to enroll in this course.");
		return;
	} else {
		window.location.href = `payment.html?courseId=${courseId}`;
	}
});

function sendRefundEmail() {
	const data = JSON.parse(localStorage.getItem("currentUser"));
	const templateParams = {
		to_name: data.firstName,
		to_email: "7as1910106@gmail.com", // Replace with the recipient's email address
		message: "Your refund has been processed successfully.",
		amount: localStorage.getItem("finalPrice"),
		from_name: "Shobhit Yadav",
	};

	emailjs
		.send("service_9xvxqwv", "template_u9v5mwn", templateParams)
		.then((response) => {
			console.log(
				"Email sent successfully",
				response.status,
				response.text
			);
		})
		.catch((error) => {
			console.error("Failed to send email", error);
		});
}

function sendEnrollmentEmail() {
	const data = JSON.parse(localStorage.getItem("currentUser"));
	const templateParams = {
		to_name: data.firstName,
		to_email: "7as1910106@gmail.com",
		message: "Congratulations!! You succesfully enrolled to our Course.",
		amount: localStorage.getItem("finalPrice"),
		from_name: "Shobhit Yadav",
	};

	emailjs
		.send("service_9xvxqwv", "template_rnzaqgg", templateParams)
		.then((response) => {
			console.log(
				"Email sent successfully",
				response.status,
				response.text
			);
		})
		.catch((error) => {
			console.error("Failed to send email", error);
		});
}

const refund_status = urlParams.get("refund");
if (refund_status == "true") {
	sendRefundEmail();
}

if (payment_status == "true") {
	enrollButton.textContent = "Enrolled";
	enrollButton.disabled = true;

	// Show Start Course button
	startButton.classList.remove("hidden");

	sendEnrollmentEmail();

	// Set the initial countdown time in seconds
	const initialCountdownTime = 15;

	// Retrieve the remaining time from local storage or set to initialCountdownTime if not available
	let countdownTime =
		parseInt(localStorage.getItem("countdownTime")) || initialCountdownTime;
	let endTime = localStorage.getItem("endTime")
		? new Date(localStorage.getItem("endTime"))
		: new Date(Date.now() + countdownTime * 1000);

	function updateContent() {
		var messageElement = document.getElementById("message");
		var buttonElement = document.getElementById("refundButton");

		// Change the message
		messageElement.innerHTML = "Refund request period has expired.";

		// Hide the button
		buttonElement.style.display = "none";
	}

	function updateTimer() {
		// Get the timer element
		var messageElement = document.getElementById("message");
		var timerElement = document.getElementById("timer");

		// Remove the 'hidden' class
		messageElement.classList.remove("hidden");
		timerElement.classList.remove("hidden");

		var timerElement = document.getElementById("timeRemaining");
		let now = new Date();

		// Calculate remaining time
		let remainingTime = Math.ceil((endTime - now) / 1000);

		if (remainingTime < 0) {
			// When time is up, update content and clear the interval
			updateContent();
			clearInterval(timerInterval);
			localStorage.removeItem("countdownTime");
			localStorage.removeItem("endTime");
		} else {
			// Update the timer display
			timerElement.textContent = remainingTime;
			localStorage.setItem("countdownTime", remainingTime);
		}
	}

	// Set endTime in local storage
	localStorage.setItem("endTime", endTime);

	// Update the timer every second
	var timerInterval = setInterval(updateTimer, 1000);
}

function handleRefundButtonClick() {
	window.location.href = `refund.html?courseId=${courseId}`;
}

// Add event listener to the button
document
	.getElementById("refundButton")
	.addEventListener("click", handleRefundButtonClick);

startButton.addEventListener("click", () => {
	if (!isUserLoggedIn()) {
		alert("Please log in to start this course.");
		return;
	}
	// Add functionality for starting the course
	startCourse();
});

// Listen for changes in login state
window.addEventListener("storage", (event) => {
	if (event.key === "currentUser") {
		updateButtonState();
	}
});

const modal = document.getElementById("videoModal");
const btn = document.getElementById("startButton");
const span = document.getElementsByClassName("close")[0];
const videoPlayer = document.getElementById("videoPlayer");
const videoLink = localStorage.getItem("videoLink");
console.log(videoLink);

btn.onclick = function () {
	modal.style.display = "block";
	videoPlayer.innerHTML = `<iframe width="560" height="315" src="${videoLink}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
};

span.onclick = function () {
	modal.style.display = "none";
	videoPlayer.innerHTML = ""; // Clear the video when closing the modal
};

window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
		videoPlayer.innerHTML = ""; // Clear the video when closing the modal
	}
};
