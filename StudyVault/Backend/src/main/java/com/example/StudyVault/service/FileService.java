package com.example.StudyVault.service;

import com.example.StudyVault.entity.FileEntity;
import com.example.StudyVault.entity.User;
import com.example.StudyVault.repository.FileRepository;
import com.example.StudyVault.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
public class FileService {

    private final FileRepository fileRepository;
    private final UserRepository userRepository;

    @Value("${upload.dir}")
    private String uploadDir;

    public FileService(FileRepository fileRepository, UserRepository userRepository) {
        this.fileRepository = fileRepository;
        this.userRepository = userRepository;
    }

    private void ensureUploadDir() throws IOException {
        File dir = new File(uploadDir);
        if (!dir.exists() && !dir.mkdirs()) {
            throw new IOException("Failed to create upload directory: " + uploadDir);
        }
    }

    private File resolveSecurePath(String filename) throws IOException {
        String safeName = Paths.get(filename).getFileName().toString();
        Path resolved = Paths.get(uploadDir).resolve(safeName).normalize();
        if (!resolved.startsWith(Paths.get(uploadDir).normalize())) {
            throw new SecurityException("Path traversal attempt detected");
        }
        return resolved.toFile();
    }

    public String uploadFile(MultipartFile file, String email) throws IOException {
        if (file.isEmpty()) throw new RuntimeException("File is empty");
        if (file.getSize() > 5 * 1024 * 1024) throw new RuntimeException("File size exceeds 5MB");

        ensureUploadDir();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String uniqueName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        File dest = resolveSecurePath(uniqueName);
        file.transferTo(dest.getAbsoluteFile());

        FileEntity fileEntity = new FileEntity();
        fileEntity.setFileName(uniqueName);
        fileEntity.setFileType(file.getContentType());
        fileEntity.setFilePath(dest.getAbsolutePath());
        fileEntity.setUploadedBy(user);

        fileRepository.save(fileEntity);
        return "File uploaded successfully";
    }

    public List<FileEntity> getAllFiles() {
        return fileRepository.findAll();
    }

    public List<FileEntity> getMyFiles(String email) {
        return fileRepository.findByUploadedBy_Email(email);
    }

    public FileEntity getFileById(Long id) {
        return fileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("File not found"));
    }

    public Resource downloadFile(Long id) throws IOException {
        FileEntity file = fileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("File not found"));
        File target = new File(file.getFilePath()).getCanonicalFile();
        if (!target.getCanonicalPath().startsWith(new File(uploadDir).getCanonicalPath())) {
            throw new SecurityException("Access to file outside upload directory is not allowed");
        }
        return new UrlResource(target.toURI());
    }

    public String updateFile(Long id, MultipartFile newFile, String email) throws IOException {
        FileEntity file = fileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("File not found"));

        if (!file.getUploadedBy().getEmail().equals(email))
            throw new RuntimeException("You can only update your own files");

        new File(file.getFilePath()).delete();

        String uniqueName = UUID.randomUUID() + "_" + newFile.getOriginalFilename();
        File dest = resolveSecurePath(uniqueName);
        newFile.transferTo(dest.getAbsoluteFile());

        file.setFileName(uniqueName);
        file.setFileType(newFile.getContentType());
        file.setFilePath(dest.getAbsolutePath());
        fileRepository.save(file);

        return "File updated successfully";
    }

    public String deleteFile(Long id, String email) {
        FileEntity file = fileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("File not found"));

        if (!file.getUploadedBy().getEmail().equals(email))
            throw new RuntimeException("You can only delete your own files");

        new File(file.getFilePath()).delete();
        fileRepository.delete(file);
        return "File deleted successfully";
    }
}
