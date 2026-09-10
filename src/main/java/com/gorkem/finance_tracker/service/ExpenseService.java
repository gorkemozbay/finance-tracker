package com.gorkem.finance_tracker.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.gorkem.finance_tracker.dto.request.ExpenseRequest;
import com.gorkem.finance_tracker.dto.response.ExpenseResponse;
import com.gorkem.finance_tracker.entitiy.Category;
import com.gorkem.finance_tracker.entitiy.Expense;
import com.gorkem.finance_tracker.repository.CategoryRepository;
import com.gorkem.finance_tracker.repository.ExpenseRepository;

import jakarta.transaction.Transactional;

@Service
public class ExpenseService {

	private final ExpenseRepository expenseRepository;
	private final CategoryRepository categoryRepository;

	public ExpenseService(ExpenseRepository expenseRepository, CategoryRepository categoryRepository) {
		this.expenseRepository = expenseRepository;
		this.categoryRepository = categoryRepository;
	}

	@Transactional
	public ExpenseResponse createExpense(ExpenseRequest request) {

		Category category = categoryRepository.findById(request.getCategoryId())
				.orElseThrow(() -> new RuntimeException("Category not found"));

		Expense expense = new Expense();

		expense.setAmount(request.getAmount());
		expense.setDescription(request.getDescription());
		expense.setDateTime(request.getDateTime());
		expense.setCategory(category);

		Expense savedExpense = expenseRepository.save(expense);
		return new ExpenseResponse(savedExpense.getId(), savedExpense.getAmount(), savedExpense.getDescription(),
				savedExpense.getDateTime(), savedExpense.getCategory().getId(), savedExpense.getCategory().getName());
	}

	public List<Expense> getExpenses() {
		return expenseRepository.findAll();
	}

	public Expense getExpense(Long id) {
		return expenseRepository.findById(id).orElseThrow(() -> new RuntimeException("Expense not found"));
	}

	public Expense updateExpense(Long id, Expense updatedExpense) {
		Expense expense = getExpense(id);

		expense.setAmount(updatedExpense.getAmount());
		expense.setDescription(updatedExpense.getDescription());
		expense.setDateTime(updatedExpense.getDateTime());
		expense.setCategory(updatedExpense.getCategory());

		return expenseRepository.save(expense);
	}

	public void deleteExpense(Long id) {
		if (!expenseRepository.existsById(id)) {
			throw new RuntimeException("Expense not found");
		}

		expenseRepository.deleteById(id);
	}

	public List<Expense> getExpensesByCategory(Long categoryId) {
		return expenseRepository.findByCategoryId(categoryId);
	}

	public List<Expense> getExpensesBetween(LocalDateTime start, LocalDateTime end) {

		return expenseRepository.findByDateTimeBetween(start, end);
	}

	public BigDecimal calculateTotal(Long categoryId, LocalDateTime start, LocalDateTime end) {

		return expenseRepository.calculateTotal(categoryId, start, end);
	}

	public BigDecimal calculateTotalBetween(LocalDateTime start, LocalDateTime end) {

		return expenseRepository.calculateTotalBetween(start, end);
	}

}
