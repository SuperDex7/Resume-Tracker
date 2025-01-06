package com.res.resumetracker.Repository;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.res.resumetracker.Entity.Resume;
public interface ResumeRepository extends MongoRepository<Resume, String> {
    List<Resume> findByCompany(String company);
    List<Resume> findByStatus(String status);
}
