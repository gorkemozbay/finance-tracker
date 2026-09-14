package com.gorkem.finance_tracker.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class ExpenseResponse {

	private Long id;
	private BigDecimal amount;
	private String description;
	private LocalDateTime dateTime;
	private Long categoryId;
	private String categoryName;

	public ExpenseResponse(Long id, BigDecimal amount, String description, LocalDateTime dateTime, Long categoryId,
			String categoryName) {

		this.id = id;
		this.amount = amount;
		this.description = description;
		this.dateTime = dateTime;
		this.categoryId = categoryId;
		this.categoryName = categoryName;
	}

	public Long getId() {
		return id;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public String getDescription() {
		return description;
	}

	public LocalDateTime getDateTime() {
		return dateTime;
	}

	public Long getCategoryId() {
		return categoryId;
	}

	public String getCategoryName() {
		return categoryName;
	}
}