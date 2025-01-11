package com.res.resumetracker.Controller;

import org.springframework.web.bind.annotation.*;
import com.res.resumetracker.Entity.Resume;
import com.res.resumetracker.Service.ResumeService;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/resumes")
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @GetMapping
    public List<Resume> getAllResumes() {
        return resumeService.getAllResumes();
    }

    @GetMapping("/{id}")
    public Optional<Resume> getResume(@PathVariable String id) {
        return resumeService.getResume(id);
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public Resume addResume(
            @RequestParam("company") String company,
            @RequestParam("jobTitle") String jobTitle,
            @RequestParam(value = "jobDescription", required = false) String jobDescription,
            @RequestParam("dateApplied") String dateApplied,
            @RequestParam("status") String status,
            @RequestParam(value = "resumeFile", required = false) MultipartFile resumeFile,
            @RequestParam(value = "coverLetterFile", required = false) MultipartFile coverLetterFile
    ) throws IOException {
        String resumePath = null;
        String coverLetterPath = null;

        if (resumeFile != null && !resumeFile.isEmpty()) {
            resumePath = "uploads/" + resumeFile.getOriginalFilename();
            Files.copy(resumeFile.getInputStream(), Paths.get(resumePath), StandardCopyOption.REPLACE_EXISTING);
        }

        if (coverLetterFile != null && !coverLetterFile.isEmpty()) {
            coverLetterPath = "uploads/" + coverLetterFile.getOriginalFilename();
            Files.copy(coverLetterFile.getInputStream(), Paths.get(coverLetterPath), StandardCopyOption.REPLACE_EXISTING);
        }

        Resume resume = new Resume(
                null,
                company,
                jobTitle,
                jobDescription != null ? jobDescription : "",
                LocalDate.parse(dateApplied),
                status,
                resumePath,
                coverLetterPath
        );

        return resumeService.addResume(resume);
    }


    @DeleteMapping("/{id}")
    public void removeResume(@PathVariable String id) {
        resumeService.removeResume(id);
    }
    @PutMapping("/{id}")
public Resume updateResume(
    @PathVariable String id,
    @RequestParam("company") String company,
    @RequestParam("jobTitle") String jobTitle,
    @RequestParam(value = "jobDescription", required = false) String jobDescription,
    @RequestParam("dateApplied") String dateApplied,
    @RequestParam("status") String status,
    @RequestParam(value = "resumeFile", required = false) MultipartFile resumeFile,
    @RequestParam(value = "coverLetterFile", required = false) MultipartFile coverLetterFile
) throws IOException {
    Resume existingResume = resumeService.getResume(id)
            .orElseThrow(() -> new RuntimeException("Resume not found with id: " + id));

    String resumePath = existingResume.resumeFilePath(); 
    String coverLetterPath = existingResume.coverFilePath(); 

    if (resumeFile != null && !resumeFile.isEmpty()) {
        resumePath = "uploads/" + resumeFile.getOriginalFilename();
        Files.copy(resumeFile.getInputStream(), Paths.get(resumePath), StandardCopyOption.REPLACE_EXISTING);
    }

    if (coverLetterFile != null && !coverLetterFile.isEmpty()) {
        coverLetterPath = "uploads/" + coverLetterFile.getOriginalFilename();
        Files.copy(coverLetterFile.getInputStream(), Paths.get(coverLetterPath), StandardCopyOption.REPLACE_EXISTING);
    }

    
    Resume updatedResume = new Resume(
        id,
        company,
        jobTitle,
        jobDescription != null ? jobDescription : existingResume.jobDescription(),
        LocalDate.parse(dateApplied),
        status,
        resumePath,
        coverLetterPath
    );

    return resumeService.updateResume(id, updatedResume);
}




@PatchMapping("/{id}")
public Resume partiallyUpdateResume(
    @PathVariable String id,
    @RequestParam Map<String, String> updates,
    @RequestParam(value = "resumeFile", required = false) MultipartFile resumeFile,
    @RequestParam(value = "coverLetterFile", required = false) MultipartFile coverLetterFile
) throws IOException {
    Resume existingResume = resumeService.getResume(id)
            .orElseThrow(() -> new RuntimeException("Resume not found with id: " + id));

    // Handle files
    String resumePath = existingResume.resumeFilePath();
    String coverLetterPath = existingResume.coverFilePath();

    if (resumeFile != null && !resumeFile.isEmpty()) {
        resumePath = "uploads/" + resumeFile.getOriginalFilename();
        Files.copy(resumeFile.getInputStream(), Paths.get(resumePath), StandardCopyOption.REPLACE_EXISTING);
    }

    if (coverLetterFile != null && !coverLetterFile.isEmpty()) {
        coverLetterPath = "uploads/" + coverLetterFile.getOriginalFilename();
        Files.copy(coverLetterFile.getInputStream(), Paths.get(coverLetterPath), StandardCopyOption.REPLACE_EXISTING);
    }

    // Update the Resume
    Resume updatedResume = new Resume(
        existingResume.id(),
        updates.getOrDefault("company", existingResume.company()),
        updates.getOrDefault("jobTitle", existingResume.jobTitle()),
        updates.getOrDefault("jobDescription", existingResume.jobDescription()),
        updates.containsKey("dateApplied")
            ? LocalDate.parse(updates.get("dateApplied"))
            : existingResume.dateApplied(),
        updates.getOrDefault("status", existingResume.status()),
        resumePath,
        coverLetterPath
    );

    return resumeService.updateResume(id, updatedResume);
}

}


