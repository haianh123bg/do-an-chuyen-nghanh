package com.haianh123bg.elearn_programming.entity_manager;

import com.haianh123bg.elearn_programming.entity.Course;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CouseManager {

    @PersistenceContext
    private EntityManager entityManager;

    public List<Object[]> fetchCourseDetails(Specification<Course> specification) {
        // Obtain the CriteriaBuilder from EntityManager
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        // Create a CriteriaQuery
        CriteriaQuery<Object[]> criteriaQuery = criteriaBuilder.createQuery(Object[].class);
        // Define the root for the Course entity
        Root<Course> root = criteriaQuery.from(Course.class);

        // Apply the specification to the query
        var predicate = specification.toPredicate(root, criteriaQuery, criteriaBuilder);
        if (predicate != null) {
            criteriaQuery.where(predicate);
        }

        // Execute the query using EntityManager
        return entityManager.createQuery(criteriaQuery).getResultList();
    }
}
