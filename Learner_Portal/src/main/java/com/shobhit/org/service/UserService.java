package com.shobhit.org.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shobhit.org.bean.User;
import com.shobhit.org.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	UserRepository repo;
	
	public List<User> getAllUsers() {
		return repo.findAll();
	}
	
	public Optional<User> getUserById(Integer userId) {
		return repo.findById(userId);
	}
	
	public void createNewUser(User user) {
		repo.save(user);
	}
	
	public void enrollCourse(User user) {
		repo.save(user);
	}
	
	public User authenticate(String email, String password, String role) {
		Optional<User> userOptional = repo.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (user.getPassword().equals(password) && user.getRoles().equals(role)) { 
                return user;
            }
        }
        return null;
	}
	
	public void updateUser(User user) {
		repo.save(user);
	}
	
	public void deleteUser(Integer userId) {
		repo.deleteById(userId);
	}
}
