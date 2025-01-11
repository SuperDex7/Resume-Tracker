package com.res.resumetracker.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.res.resumetracker.Entity.Resume;
import com.res.resumetracker.Repository.ResumeRepository;

@Service
public class ResumeService {

    private final ResumeRepository resumeRepository;
    public ResumeService(ResumeRepository resumeRepository){
        this.resumeRepository = resumeRepository;
    }
    public Resume addResume(Resume resume) {
      return resumeRepository.save(resume);
  }
    public void updateResume(){
    
    }
    public List<Resume> getAllResumes(){
    return resumeRepository.findAll();
    }
    public Optional<Resume> getResume(String id){
    return resumeRepository.findById(id);
    }
    public void removeResume(String id){
    resumeRepository.deleteById(id);
    }
    public Resume updateResume(String id, Resume updatedResume) {
        return resumeRepository.findById(id)
                .map(existingResume -> {
                    return resumeRepository.save(updatedResume);
                })
                .orElseThrow(() -> new RuntimeException("Resume not found with id: " + id));
    }
    
    
    public Resume partiallyUpdateResume(String id, Map<String, String> updates) {
        return resumeRepository.findById(id)
                .map(existingResume -> {
                    // Apply updates and save
                    Resume updatedResume = new Resume(
                        existingResume.id(),
                        updates.getOrDefault("company", existingResume.company()),
                        updates.getOrDefault("jobTitle", existingResume.jobTitle()),
                        updates.getOrDefault("jobDescription", existingResume.jobDescription()),
                        updates.containsKey("dateApplied")
                            ? LocalDate.parse(updates.get("dateApplied"))
                            : existingResume.dateApplied(),
                        updates.getOrDefault("status", existingResume.status()),
                        existingResume.resumeFilePath(),
                        existingResume.coverFilePath()
                    );
    
                    return resumeRepository.save(updatedResume);
                })
                .orElseThrow(() -> new RuntimeException("Resume not found with id: " + id));
    }
    
    
}
