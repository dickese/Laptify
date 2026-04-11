package fit.iuh.laptify_backend.product.dto.common;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
public class PageRequest {
    private Integer page;
    private Integer size;
}
