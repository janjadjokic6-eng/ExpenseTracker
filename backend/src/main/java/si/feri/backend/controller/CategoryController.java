package si.feri.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import si.feri.backend.model.Category;
import si.feri.backend.service.CategoryService;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
@Tag(name="Kategorije", description="Upravljanje kategorij")

public class CategoryController {
    private final CategoryService categoryService;
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    @Operation(summary="Pridobi vse kategorije")
    public List<Category> getAll() {
        return categoryService.getAll();
    }
    @GetMapping("/{id}")
    @Operation(summary = "Pridobi kategorijo po ID")
    public Category getById(@PathVariable Long id) {
        return categoryService.getById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Dodaj novo kategorijo")
    public Category create(@Valid @RequestBody Category category) {
        return categoryService.create(category);
    }
}

