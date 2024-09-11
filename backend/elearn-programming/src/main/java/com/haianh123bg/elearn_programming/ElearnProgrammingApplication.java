package com.haianh123bg.elearn_programming;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients
@SpringBootApplication
public class ElearnProgrammingApplication {

	public static void main(String[] args) {
		SpringApplication.run(ElearnProgrammingApplication.class, args);
	}

}
