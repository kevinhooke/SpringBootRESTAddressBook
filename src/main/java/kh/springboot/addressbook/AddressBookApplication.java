package kh.springboot.addressbook;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@SpringBootApplication
public class AddressBookApplication {

	private static final Logger LOGGER = LoggerFactory
			.getLogger(AddressBookApplication.class);
	
	public static void main(String[] args) {
		SpringApplication.run(AddressBookApplication.class, args);

	}
	
}
