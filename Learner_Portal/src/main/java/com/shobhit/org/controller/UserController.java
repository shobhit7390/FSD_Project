package com.shobhit.org.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.shobhit.org.bean.Course;
import com.shobhit.org.bean.LoginRequest;
import com.shobhit.org.bean.User;
import com.shobhit.org.service.UserService;

@RestController
@CrossOrigin("http://127.0.0.1:5500")
public class UserController {
	
	@Autowired
	UserService service;
	
	@Autowired
	CourseController cc;
	
	@GetMapping("/users")
	public List<User> getAllUsers() {
		return service.getAllUsers();
	}
	
	@GetMapping("/users/{userId}")
	public Optional<User> getUserById(@PathVariable Integer userId) {
		return service.getUserById(userId);
	}
	
	@PostMapping("/users")
	public void createNewUser(@RequestBody User user) {
		System.out.println(user.getClass());
		service.createNewUser(user);
	}
	
	@PostMapping("/enroll/{userId}/{courseId}")
	public void enrollCourse(@PathVariable Integer userId, @PathVariable Integer courseId) {
		Course currentCourse = cc.getCourseById(courseId).get();
		User currentUser = getUserById(userId).get();
		currentUser.getCourses().add(currentCourse);
		service.enrollCourse(currentUser);
	}
	
	

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();
        String role = loginRequest.getRole();

        User user = service.authenticate(email, password, role);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
   
	
	@PutMapping("/users/{userId}")
	public void updateUser(@RequestBody User user, @PathVariable Integer userId) {
		service.updateUser(user);
	}
	
	@DeleteMapping("/users/{userId}")
	public void deleteUser(@PathVariable Integer userId) {
		service.deleteUser(userId);
	}
	
	
	@GetMapping("/signup.html")
	public String showSignUpPage() {
		return "signup";
	}
	
	@PostMapping("/register")
	public String registerUser(User user) {
			service.createNewUser(user);
			return "redirect:/http://127.0.0.1:5500/main.html";
	}
	
	@GetMapping("/login.html")
	public String showLoginPage() {
		return "login";
	}
	
	
}




