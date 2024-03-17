package com.track.resumetracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;


@SpringBootApplication
public class ResumetrackerApplication02 {

	public static void main(String[] args) {
		var context = new AnnotationConfigApplicationContext(SpringConfiguration.class);
	
		System.out.println(context.getBean("compName"));
		System.out.println(context.getBean("app"));
		System.out.println(context.getBean("data"));
	}

}
