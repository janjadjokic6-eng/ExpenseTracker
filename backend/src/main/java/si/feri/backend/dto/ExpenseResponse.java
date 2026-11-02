
package si.feri.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ExpenseResponse(

        Long id,
        String title,
        BigDecimal amount,
        Long categoryId,
        String categoryName,
        LocalDate date,
        String description

) {
}
