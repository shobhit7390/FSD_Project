package com.shobhit.org.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.shobhit.org.bean.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course, Integer> {
	
//	Optional<Course> findByCourseId(Integer courseId);

	List<Course> findByCourseName(String courseName);
	
	@Query(nativeQuery = true, value="select * from Course where category like %:category%")
	List<Course> findByCategory(String category);
	
	@Query("SELECT c FROM Course c WHERE " +
	           "LOWER(c.courseName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
	           "LOWER(c.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
	           "LOWER(c.instructorName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
	           "LOWER(c.category) LIKE LOWER(CONCAT('%', :keyword, '%'))")
	    List<Course> searchCoursesByKeyword(String keyword);

	List<Course> findByCategoryIn(List<String> categories);

	@Query("SELECT DISTINCT c.category FROM Course c")
	List<String> findAllCategories();

	List<Course> findByDifficultyLevel(String difficultyLevel);
}
