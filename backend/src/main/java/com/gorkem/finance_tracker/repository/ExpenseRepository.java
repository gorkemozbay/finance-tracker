package com.gorkem.finance_tracker.repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.gorkem.finance_tracker.entitiy.Expense;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

	public List<Expense> findByCategoryId(Long categoryId);

	public List<Expense> findByDateTimeBetween(LocalDateTime start, LocalDateTime end);

	@Query("""
			    SELECT SUM(e.amount)
			    FROM Expense e
			    WHERE e.category.id = :categoryId
			    AND e.dateTime BETWEEN :start AND :end
			""")
	public BigDecimal calculateTotal(@Param("categoryId") Long categoryId, @Param("start") LocalDateTime start,
			@Param("end") LocalDateTime end);

	@Query("""
			    SELECT SUM(e.amount)
			    FROM Expense e
			    WHERE e.dateTime BETWEEN :start AND :end
			""")
	public BigDecimal calculateTotalBetween(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

}
