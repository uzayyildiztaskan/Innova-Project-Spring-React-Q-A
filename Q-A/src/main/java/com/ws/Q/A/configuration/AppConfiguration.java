package com.ws.Q.A.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Data;

@Data
@Configuration
@ConfigurationProperties(prefix = "askify")
public class AppConfiguration {
	
	private String uploadPath;
}
