
package si.feri.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import si.feri.backend.dto.ExpenseRequest;
import si.feri.backend.dto.ExpenseResponse;
import si.feri.backend.service.ExpenseService;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
@Tag(name = "Stroski", description = "Upravljanje stroskov")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }


    @GetMapping
    @Operation(summary = "Iskanje in razvrscanje stroskov")
    public List<ExpenseResponse> getAll(
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "date") String sortBy,
            @RequestParam(defaultValue = "desc") String direction) {

        return expenseService.getAll(
                search,
                sortBy,
                direction
        );
    }


    @GetMapping("/{id}")
    @Operation(summary = "Pridobi strosek po ID")
    public ExpenseResponse getById(@PathVariable Long id) {
        return expenseService.getById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Dodaj nov strosek")
    public ExpenseResponse create(
            @Valid @RequestBody ExpenseRequest request) {

        return expenseService.create(request);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Posodobi strosek")
    public ExpenseResponse update(
            @PathVariable Long id,
            @Valid @RequestBody ExpenseRequest request) {

        return expenseService.update(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Izbrisi strosek")
    public void delete(@PathVariable Long id) {

        expenseService.delete(id);
    }
}
