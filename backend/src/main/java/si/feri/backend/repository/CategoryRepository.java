package si.feri.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import si.feri.backend.model.Category;

public interface CategoryRepository extends JpaRepository<Category,Long >
{
    boolean existsByNameIgnoreCase(String name);
}
