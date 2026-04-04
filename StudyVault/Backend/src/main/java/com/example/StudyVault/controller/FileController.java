package com.example.StudyVault.controller;

import com.example.StudyVault.entity.FileEntity;
import com.example.StudyVault.service.FileService;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/files")
public class FileController {

    private final FileService fileService;

    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    @PostMapping("/upload")
    public String upload(@RequestParam("file") MultipartFile file, Authentication auth) throws Exception {
        return fileService.uploadFile(file, auth.getName());
    }

    @GetMapping
    public List<FileEntity> getFiles() {
        return fileService.getAllFiles();
    }

    @GetMapping("/my-files")
    public List<FileEntity> myFiles(Authentication auth) {
        return fileService.getMyFiles(auth.getName());
    }

    private ResponseEntity<Resource> buildFileResponse(Long id, String disposition) throws Exception {
        FileEntity fileEntity = fileService.getFileById(id);
        Resource resource = fileService.downloadFile(id);
        MediaType mediaType = MediaType.parseMediaType(
                fileEntity.getFileType() != null ? fileEntity.getFileType() : "application/octet-stream"
        );
        return ResponseEntity.ok()
                .contentType(mediaType)
                .header(HttpHeaders.CONTENT_DISPOSITION, disposition + "; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> download(@PathVariable Long id) throws Exception {
        return buildFileResponse(id, "attachment");
    }

    @GetMapping("/preview/{id}")
    public ResponseEntity<Resource> preview(@PathVariable Long id) throws Exception {
        return buildFileResponse(id, "inline");
    }

    @PutMapping("/update/{id}")
    public String update(@PathVariable Long id, @RequestParam("file") MultipartFile file, Authentication auth) throws Exception {
        return fileService.updateFile(id, file, auth.getName());
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id, Authentication auth) {
        return fileService.deleteFile(id, auth.getName());
    }
}
