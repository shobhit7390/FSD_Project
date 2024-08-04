package com.shobhit.org.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.shobhit.org.bean.Course;
import com.shobhit.org.repository.CourseRepository;

@Service
public class CourseService {

	@Autowired
	CourseRepository repo;
	
	public List<Course> getAllCourses() {
		return repo.findAll();
	}
	
	public Optional<Course> getCourseById(Integer courseId) {
		return repo.findById(courseId);
	}

	public void createCourse(Course course) {
		repo.save(course);
	}
	
	public void updateCourse(Course course) {
		repo.save(course);
	}
	
	public void deleteCourse(Integer courseId) {
		repo.deleteById(courseId);
	}
	
	public List<Course> findCourseByName(String courseName) {
		return repo.findByCourseName(courseName);
	}
	
	public List<Course> findCourseByCategory(String category) {
		return repo.findByCategory(category);
	}
	
	public List<Course> getSortedCourses(Sort sort) {
        return repo.findAll(sort);
    }
	
	public List<Course> searchCoursesByKeyword(String keyword) {
        return repo.searchCoursesByKeyword(keyword);
    }
	
	
	public BigDecimal applyDiscount(Integer courseId, String couponCode) {
        Course course = repo.findById(courseId).get();
        System.out.println("Test 4");
        if (course.getCouponCode() != null && 
            course.getCouponCode().equals(couponCode) && 
            (course.getCouponExpirationDate() == null || course.getCouponExpirationDate().isAfter(LocalDate.now()))) {
            
            BigDecimal discountAmount = course.getPrice().multiply(course.getDiscountPercentage().divide(new BigDecimal(100)));
            return course.getPrice().subtract(discountAmount);
        }
        
        return course.getPrice();
    }

    public Map<String, BigDecimal> getCoursePrice(Integer courseId, String couponCode) {
    	Course course = repo.findById(courseId).get();
        System.out.println("Test 1");
        BigDecimal originalPrice = course.getPrice();
        BigDecimal discountedPrice = applyDiscount(courseId, couponCode);
        System.out.println("Test 2");
        Map<String, BigDecimal> priceInfo = new HashMap<>();
        priceInfo.put("originalPrice", originalPrice);
        priceInfo.put("discountedPrice", discountedPrice);
        System.out.println("Test 3");
        return priceInfo;
    }


	public List<Course> findCoursesByCategories(List<String> categories) {
		return repo.findByCategoryIn(categories);
	}

	public List<String> findAllCategories() {
		return repo.findAllCategories();
	}

	public List<Course> getCoursesByDifficultyLevel(String difficultyLevel) {
		return repo.findByDifficultyLevel(difficultyLevel);
	}
	
}
