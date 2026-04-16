package fit.iuh.laptify_backend.media.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MediaUploadResponse {
    private String url;
    private String publicId;
    private Integer width;
    private Integer height;
    private String format;
}
