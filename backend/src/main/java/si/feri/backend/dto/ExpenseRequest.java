package si.feri.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ExpenseRequest (

    @NotBlank
    String title,

    @NotNull
    @DecimalMin("0.01")
    BigDecimal amount,

    @NotNull
    @Positive
    Long categoryId,

    @NotNull
    LocalDate date,

    String description
            )

{}
