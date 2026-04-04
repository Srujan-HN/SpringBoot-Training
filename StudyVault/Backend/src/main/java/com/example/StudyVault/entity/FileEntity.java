package com.example.StudyVault.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "files")
public class FileEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;
    private String fileType;
    @JsonIgnore
    private String filePath;

    @ManyToOne
    @JoinColumn(name = "uploaded_by")
    private User uploadedBy;

    public FileEntity() {}

    public FileEntity(Long id, String fileName, String fileType, String filePath, User uploadedBy) {
        this.id = id;
        this.fileName = fileName;
        this.fileType = fileType;
        this.filePath = filePath;
        this.uploadedBy = uploadedBy;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }
    public String getFileType() { return fileType; }
    public void setFileType(String fileType) { this.fileType = fileType; }
    public String getFilePath() { return filePath; }
    public void setFilePath(String filePath) { this.filePath = filePath; }
    public User getUploadedBy() { return uploadedBy; }
    public void setUploadedBy(User uploadedBy) { this.uploadedBy = uploadedBy; }
}
