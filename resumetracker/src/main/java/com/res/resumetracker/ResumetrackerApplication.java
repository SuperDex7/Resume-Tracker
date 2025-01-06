package com.res.resumetracker;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;





@SpringBootApplication

public class ResumetrackerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ResumetrackerApplication.class, args);
	
	}
}
/*
 * curl -X POST http://localhost:8080/api/resumes \  -H "Content-Type: application/json" \  -d '{  "company": "TechCorp",  "jobTitle": "Software Engineer", "jobDescription": "Develop and maintain web applications",  "dateApplied": "2025-01-06",  "status": "Pending" }' 
 */