package com.res.resumetracker.Controller;

import org.springframework.web.bind.annotation.RestController;

import com.res.resumetracker.Entity.Resume;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
public class ResumeController {
@GetMapping("/")
public Resume rez() {
    return new Resume("Microsoft", "Software Engineer", "Make code", "01/22/2024");
}

}
