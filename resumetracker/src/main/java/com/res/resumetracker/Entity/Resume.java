package com.res.resumetracker.Entity;
import java.time.LocalDate;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "resumes")


public record Resume(
    @Id String id,
    String company,
    String jobTitle,
    String jobDescription,
    LocalDate dateApplied,
    String status
) {}
