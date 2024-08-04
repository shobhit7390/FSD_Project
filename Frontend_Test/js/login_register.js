// Login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "Login successful") {
            sessionStorage.setItem('userRole', data.role);
            if (data.role.toUpperCase() === 'LEARNER') {
                window.location.href = '/learner-dashboard';
            } else if (data.role.toUpperCase() === 'INSTRUCTOR') {
                window.location.href = '/instructor-dashboard';
            }
        } else {
            alert('Login failed: ' + data);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during login');
    });
});

// Registration
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const role = document.getElementById('role').value;

    fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }),
    })
    .then(response => response.json())
    .then(data => {
        if (data === "User registered successfully") {
            alert('Registration successful. Please login.');
            // Redirect to login page or show login form
            window.location.href='/login.html';
        } else {
            alert('Registration failed: ' + data);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during registration');
    });
});