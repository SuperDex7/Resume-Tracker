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
                    String resumeFilePath = updatedResume.resumeFilePath() != null
                            ? updatedResume.resumeFilePath()
                            : existingResume.resumeFilePath();
                    String coverFilePath = updatedResume.coverFilePath() != null
                            ? updatedResume.coverFilePath()
                            : existingResume.coverFilePath();

                    Resume finalResume = new Resume(
                            existingResume.id(),
                            updatedResume.company(),
                            updatedResume.jobTitle(),
                            updatedResume.jobDescription(),
                            updatedResume.dateApplied(),
                            updatedResume.status(),
                            resumeFilePath,
                            coverFilePath
                    );
    
                    return resumeRepository.save(finalResume);
                })
                .orElseThrow(() -> new RuntimeException("Resume not found with id: " + id));
    }
    
    public Resume partiallyUpdateResume(String id, Map<String, Object> updates) {
        return resumeRepository.findById(id)
                .map(existingResume -> {
                    // Extract and preserve fields from existingResume
                    String company = updates.containsKey("company") ? (String) updates.get("company") : existingResume.company();
                    String jobTitle = updates.containsKey("jobTitle") ? (String) updates.get("jobTitle") : existingResume.jobTitle();
                    String jobDescription = updates.containsKey("jobDescription") ? (String) updates.get("jobDescription") : existingResume.jobDescription();
                    LocalDate dateApplied = updates.containsKey("dateApplied")
                            ? LocalDate.parse((String) updates.get("dateApplied"))
                            : existingResume.dateApplied();
                    String status = updates.containsKey("status") ? (String) updates.get("status") : existingResume.status();
                    String resumeFilePath = updates.containsKey("resumeFilePath") ? (String) updates.get("resumeFilePath") : existingResume.resumeFilePath();
                    String coverFilePath = updates.containsKey("coverFilePath") ? (String) updates.get("coverFilePath") : existingResume.coverFilePath();
    
                    Resume finalResume = new Resume(
                            existingResume.id(),
                            company,
                            jobTitle,
                            jobDescription,
                            dateApplied,
                            status,
                            resumeFilePath,
                            coverFilePath
                    );
    
                    return resumeRepository.save(finalResume);
                })
                .orElseThrow(() -> new RuntimeException("Resume not found with id: " + id));
    }
    
}
