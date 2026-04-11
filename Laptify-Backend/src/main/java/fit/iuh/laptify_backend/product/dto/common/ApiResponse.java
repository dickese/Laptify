package fit.iuh.laptify_backend.product.dto.common;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class ApiResponse<T> {
    private int code;
    private String message;
    private T data;
}
