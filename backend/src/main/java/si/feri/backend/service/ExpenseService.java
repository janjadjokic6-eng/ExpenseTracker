
package si.feri.backend.service;

import org.springframework.http.HttpStatus;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import si.feri.backend.dto.ExpenseRequest;
import si.feri.backend.dto.ExpenseResponse;
import si.feri.backend.model.Category;
import si.feri.backend.model.Expense;
import si.feri.backend.repository.CategoryRepository;
import si.feri.backend.repository.ExpenseRepository;

import java.util.List;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final CategoryRepository categoryRepository;

    public ExpenseService(
            ExpenseRepository expenseRepository,
            CategoryRepository categoryRepository) {

        this.expenseRepository = expenseRepository;
        this.categoryRepository = categoryRepository;
    }


    public List<ExpenseResponse> getAll(
            String search,
            String sortBy,
            String direction) {

        String sortField = switch (sortBy) {
            case "amount" -> "amount";
            case "title" -> "title";
            default -> "date";
        };

        Sort.Direction sortDirection =
                direction.equalsIgnoreCase("asc")
                        ? Sort.Direction.ASC
                        : Sort.Direction.DESC;

        Sort sort = Sort.by(sortDirection, sortField)
                .and(Sort.by(Sort.Direction.DESC, "id"));

        List<Expense> result;

        if (search == null || search.isBlank()) {

            result = expenseRepository.findAll(sort);

        } else {

            result = expenseRepository
                    .findByTitleContainingIgnoreCase(
                            search.trim(),
                            sort
                    );
        }

        return result.stream()
                .map(this::toResponse)
                .toList();
    }


    public ExpenseResponse getById(Long id) {

        Expense expense = findExpense(id);

        return toResponse(expense);
    }

    public ExpenseResponse create(ExpenseRequest request) {

        Expense expense = new Expense();

        updateFields(expense, request);

        Expense saved = expenseRepository.save(expense);

        return toResponse(saved);
    }

    public ExpenseResponse update(
            Long id,
            ExpenseRequest request) {

        Expense expense = findExpense(id);

        updateFields(expense, request);

        Expense saved = expenseRepository.save(expense);

        return toResponse(saved);
    }

    public void delete(Long id) {

        Expense expense = findExpense(id);

        expenseRepository.delete(expense);
    }

    private Expense findExpense(Long id) {

        return expenseRepository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Strosek ne obstaja."
                        )
                );
    }

    private void updateFields(
            Expense expense,
            ExpenseRequest request) {

        Category category = categoryRepository
                .findById(request.categoryId())
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Kategorija ne obstaja."
                        )
                );

        expense.setTitle(request.title());
        expense.setAmount(request.amount());
        expense.setCategory(category);
        expense.setDate(request.date());
        expense.setDescription(request.description());
    }

    private ExpenseResponse toResponse(Expense expense) {

        Category category = expense.getCategory();

        return new ExpenseResponse(
                expense.getId(),
                expense.getTitle(),
                expense.getAmount(),
                category.getId(),
                category.getName(),
                expense.getDate(),
                expense.getDescription()
        );
    }
}
