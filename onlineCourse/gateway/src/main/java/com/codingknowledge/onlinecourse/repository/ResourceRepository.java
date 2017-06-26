package com.codingknowledge.onlinecourse.repository;

import com.codingknowledge.onlinecourse.domain.Resource;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Resource entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ResourceRepository extends JpaRepository<Resource,Long> {
    
}
