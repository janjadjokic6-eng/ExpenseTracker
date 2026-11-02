
package si.feri.backend.service;

import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import si.feri.backend.model.Category;
import si.feri.backend.repository.CategoryRepository;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> getAll() {

        return categoryRepository.findAll(
                Sort.by("name")
        );
    }

    public Category getById(Long id) {

        return categoryRepository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Kategorija ne obstaja."
                        )
                );
    }

    public Category create(Category input) {

        String name = input.getName().trim();

        if (categoryRepository.existsByNameIgnoreCase(name)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Kategorija s tem imenom ze obstaja."
            );
        }

        Category category = new Category();

        category.setName(name);

        return categoryRepository.save(category);
    }
}
