package si.feri.backend.repository;

import org.springframework.data.domain.Sort;
import si.feri.backend.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long>
{
    List<Expense> findByTitleContainingIgnoreCase(
            String title,
            Sort sort
    );
}
