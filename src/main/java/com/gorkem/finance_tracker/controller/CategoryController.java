package com.gorkem.finance_tracker.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gorkem.finance_tracker.entitiy.Category;
import com.gorkem.finance_tracker.repository.CategoryRepository;

@RestController
@RequestMapping("/categories")
public class CategoryController {

	private final CategoryRepository categoryRepository;

	public CategoryController(CategoryRepository categoryRepository) {
		this.categoryRepository = categoryRepository;
	}

	@PostMapping
	public Category createCategory(@RequestBody Category category) {
		System.err.println("createCategory: " + category.toString());
		return categoryRepository.save(category);
	}
}