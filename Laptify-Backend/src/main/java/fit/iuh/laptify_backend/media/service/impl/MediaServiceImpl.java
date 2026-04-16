package fit.iuh.laptify_backend.media.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import fit.iuh.laptify_backend.media.dto.MediaUploadRequest;
import fit.iuh.laptify_backend.media.dto.MediaUploadResponse;
import fit.iuh.laptify_backend.media.service.MediaService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class MediaServiceImpl implements MediaService {
    private final Cloudinary cloudinary;

    @Override
    public MediaUploadResponse upload(MediaUploadRequest request) throws IOException {
        Map uploadResult = cloudinary.uploader().upload(request.getFile().getBytes(),
                                                        ObjectUtils.asMap(
                                                                "folder", request.getFilePath(),
                                                                "use_filename", true,
                                                                "unique_filename", true
                                                        ));

        return MediaUploadResponse.builder()
                .url((String) uploadResult.get("secure_url"))
                .publicId((String) uploadResult.get("public_id"))
                .width((Integer) uploadResult.get("width"))
                .height((Integer) uploadResult.get("height"))
                .format((String) uploadResult.get("format"))
                .build();
    }
}
