package fit.iuh.laptify_backend.product.dto.common;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class PageResponse<T> {
    private Integer page;
    private Integer size;
    private Long totalElements;
    private Integer totalPages;
    private T data;
}
