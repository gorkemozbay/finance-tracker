package com.gorkem.finance_tracker.controller;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gorkem.finance_tracker.dto.request.ExpenseRequest;
import com.gorkem.finance_tracker.dto.response.ExpenseResponse;
import com.gorkem.finance_tracker.entitiy.Expense;
import com.gorkem.finance_tracker.service.ExpenseService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/expenses")
public class ExpenseController {

	private final ExpenseService expenseService;

	public ExpenseController(ExpenseService expenseService) {
		this.expenseService = expenseService;
	}

	@GetMapping("/total")
	public BigDecimal calculateTotal(@RequestParam Long categoryId, @RequestParam LocalDateTime start,
			@RequestParam LocalDateTime end) {

		return expenseService.calculateTotal(categoryId, start, end);
	}

	@GetMapping("/total-between")
	public BigDecimal calculateTotalBetween(@RequestParam LocalDateTime start, @RequestParam LocalDateTime end) {

		return expenseService.calculateTotalBetween(start, end);
	}

	@PostMapping
	public ExpenseResponse createExpense(@Valid @RequestBody ExpenseRequest request) {

		return expenseService.createExpense(request);
	}

	@GetMapping
	public List<Expense> getExpenses() {
		return expenseService.getExpenses();
	}

	@GetMapping("/{id}")
	public Expense getExpense(@PathVariable Long id) {
		return expenseService.getExpense(id);
	}

	@PutMapping("/{id}")
	public Expense updateExpense(@PathVariable Long id, @RequestBody Expense expense) {
		return expenseService.updateExpense(id, expense);
	}

	@DeleteMapping("/{id}")
	public void deleteExpense(@PathVariable Long id) {
		expenseService.deleteExpense(id);
	}

	@GetMapping("/category/{categoryId}")
	public List<Expense> getExpensesByCategory(@PathVariable Long categoryId) {
		return expenseService.getExpensesByCategory(categoryId);
	}

	@GetMapping("/date-range")
	public List<Expense> getExpensesBetween(@RequestParam LocalDateTime start, @RequestParam LocalDateTime end) {

		return expenseService.getExpensesBetween(start, end);
	}

}