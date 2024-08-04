package com.shobhit.org.controller;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shobhit.org.bean.Course;
import com.shobhit.org.service.CourseService;

@RestController
@CrossOrigin("http://127.0.0.1:5500")
public class CourseController {

	@Autowired
	CourseService service;
	
	@GetMapping("/courses")
	public List<Course> getAllCourses() {
		return service.getAllCourses();
	}
	
	@GetMapping("/courses/{courseId}")
	public Optional<Course> getCourseById(@PathVariable Integer courseId) {
		return service.getCourseById(courseId);
	}
	
	@GetMapping("/courses/name/{courseName}")
	public List<Course> findCourseByName(@PathVariable String courseName){
		return service.findCourseByName(courseName);
	}
	
	@GetMapping("/courses/{courseId}/price")
    public ResponseEntity<Map<String, BigDecimal>> getCoursePrice(@PathVariable Integer courseId, @RequestParam(required = false) String couponCode) {
        Map<String, BigDecimal> priceInfo = service.getCoursePrice(courseId, couponCode);
        return ResponseEntity.ok(priceInfo);
    }
	
	@GetMapping("/courses/category/{category}")
	public List<Course> findCourseByCategory(@PathVariable String category){
		return service.findCourseByCategory(category);
	}

	@GetMapping("/courses/difficulty/{level}")
	public List<Course> getCoursesByDifficultyLevel(@PathVariable String level) {
		List<Course> courses = service.getCoursesByDifficultyLevel(level);
		return courses;
	}
	
	@GetMapping("/courses/keyword/{keyword}")
    public List<Course> searchCoursesByKeyword(@PathVariable String keyword) {
        return service.searchCoursesByKeyword(keyword);
    }

	@PostMapping("/courses/recommendations")
	public ResponseEntity<List<Course>> getRecommendations(@RequestBody Map<String, List<String>> preferences) {
		List<String> categories = preferences.get("categories");
		List<Course> recommendedCourses = service.findCoursesByCategories(categories);
		return ResponseEntity.ok(recommendedCourses);
	}

	@GetMapping("/courses/categories")
	public ResponseEntity<List<String>> getCategories() {
		List<String> categories = service.findAllCategories();
		return ResponseEntity.ok(categories);
	}
	
	@GetMapping("/sortedCourses")
    public List<Course> getSortedCourses(
            @RequestParam(defaultValue = "courseName") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDirection) {

        Sort.Direction direction = Sort.Direction.fromString(sortDirection.toUpperCase());
        Sort sort = Sort.by(direction, sortBy);

        return service.getSortedCourses(sort);
    }
	
	
	@PostMapping("/courses")
	public void createCourse(@RequestBody Course course) {
		service.createCourse(course);
	}
	
	@PutMapping("/courses/{courseId}")
	public void updateCourse(@RequestBody Course course, @PathVariable Integer courseId) {
		service.updateCourse(course);
	}
	
	@DeleteMapping("/courses/{courseId}")
	public void deleteCourse(@PathVariable Integer courseId) {
		service.deleteCourse(courseId);
	}
	
	
}
