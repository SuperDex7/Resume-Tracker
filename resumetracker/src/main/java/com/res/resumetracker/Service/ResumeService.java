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
              Resume newResume = new Resume(
                  existingResume.id(),  
                  updatedResume.company(),
                  updatedResume.jobTitle(),
                  updatedResume.jobDescription(),
                  updatedResume.dateApplied(),
                  updatedResume.status()
              );
              return resumeRepository.save(newResume);
          })
          .orElseThrow(() -> new RuntimeException("Resume not found with id: " + id));
  }
  public Resume partiallyUpdateResume(String id, Map<String, Object> updates) {
    return resumeRepository.findById(id)
        .map(existingResume -> {
            // Extract existing fields
            String company = (String) updates.getOrDefault("company", existingResume.company());
            String jobTitle = (String) updates.getOrDefault("jobTitle", existingResume.jobTitle());
            String jobDescription = (String) updates.getOrDefault("jobDescription", existingResume.jobDescription());
            LocalDate dateApplied = updates.containsKey("dateApplied") 
                ? LocalDate.parse(updates.get("dateApplied").toString()) 
                : existingResume.dateApplied();
            String status = (String) updates.getOrDefault("status", existingResume.status());
            
            // Create a new Resume object with updated fields
            Resume updatedResume = new Resume(
                existingResume.id(),
                company,
                jobTitle,
                jobDescription,
                dateApplied,
                status
            );
            
            return resumeRepository.save(updatedResume);
        })
        .orElseThrow(() -> new RuntimeException("Resume not found with id: " + id));
}
}
