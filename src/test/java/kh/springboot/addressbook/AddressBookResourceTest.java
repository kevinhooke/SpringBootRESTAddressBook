package kh.springboot.addressbook;

import static org.junit.Assert.assertTrue;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;


@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = AddressBookApplication.class)
public class AddressBookResourceTest {

	@Autowired
	private AddressBookResource addressBook;
	
	@Test
	public void testGetNextSequence() throws Exception{
		int value = addressBook.getNextSequence();
		
		//TODO: code is inserting and updating, but not returning a value?
		
		assertTrue(value > 0);
	}
}
