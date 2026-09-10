package com.gorkem.finance_tracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gorkem.finance_tracker.entitiy.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}
