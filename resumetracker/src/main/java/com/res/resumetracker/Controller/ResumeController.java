package com.res.resumetracker.Controller;

import org.springframework.web.bind.annotation.*;
import com.res.resumetracker.Entity.Resume;
import com.res.resumetracker.Service.ResumeService;

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

    @PostMapping
    public Resume addResume(@RequestBody Resume resume) {
        return resumeService.addResume(resume);
    }

    @DeleteMapping("/{id}")
    public void removeResume(@PathVariable String id) {
        resumeService.removeResume(id);
    }
    @PutMapping("/{id}")
public Resume updateResume(@PathVariable String id, @RequestBody Resume updatedResume) {
    return resumeService.updateResume(id, updatedResume);
}
@PatchMapping("/{id}")
public Resume partiallyUpdateResume(@PathVariable String id, @RequestBody Map<String, Object> updates) {
    return resumeService.partiallyUpdateResume(id, updates);
}

}
