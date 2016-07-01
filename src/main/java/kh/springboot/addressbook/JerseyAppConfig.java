package kh.springboot.addressbook;

import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.stereotype.Component;

@Component
public class JerseyAppConfig extends ResourceConfig {

	public JerseyAppConfig() {
		register(AddressBookResource.class);
	}

}
