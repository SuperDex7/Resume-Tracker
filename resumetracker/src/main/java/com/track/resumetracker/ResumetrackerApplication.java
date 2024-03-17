package com.track.resumetracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class ResumetrackerApplication {

	public static void main(String[] args) {
		Resume r1 = new Resume("hello", "World");
		//SpringApplication.run(ResumetrackerApplication.class, args);
		
	}

}
