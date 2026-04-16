package fit.iuh.laptify_backend.media.controller;

import fit.iuh.laptify_backend.media.dto.MediaUploadRequest;
import fit.iuh.laptify_backend.media.dto.MediaUploadResponse;
import fit.iuh.laptify_backend.media.service.MediaService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/media")
@RequiredArgsConstructor
@Slf4j
public class MediaController {

    private final MediaService mediaService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(@ModelAttribute MediaUploadRequest request) {
        try {
            if (request.getFile().isEmpty()) {
                return ResponseEntity.badRequest().body("File is empty");
            }
            return ResponseEntity.ok(mediaService.upload(request));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Upload failed: " + e.getMessage());
        }
    }
}