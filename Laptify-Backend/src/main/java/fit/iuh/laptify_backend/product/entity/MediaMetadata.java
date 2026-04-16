package fit.iuh.laptify_backend.product.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MediaMetadata {
    private String url;
    private String publicId;
    private Integer width;
    private Integer height;
    private String format;
}
