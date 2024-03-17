package com.track.resumetracker;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
record Application (String compName, String jobTitle) { };
record Data (int appNum, String datePost) {};
@Configuration
public class SpringConfiguration {
    @Bean
    public String compName(){
        return "companyyy";
    }
    @Bean
    public String jobTitle(){
        return "tite";
    }
    @Bean
    public int appNum(){
        return 1;
    }
    @Bean
    public Application app(){
        return new Application("micro", "worker");
        
    }
    @Bean
    public Data data(){
        return new Data(11,"01/30/2003");
    }
}
