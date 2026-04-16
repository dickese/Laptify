package fit.iuh.laptify_backend.media.service;


import fit.iuh.laptify_backend.media.dto.MediaUploadRequest;
import fit.iuh.laptify_backend.media.dto.MediaUploadResponse;

import java.io.IOException;

public interface MediaService {
    MediaUploadResponse upload(MediaUploadRequest request) throws IOException;
}
