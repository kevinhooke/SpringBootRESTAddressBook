package kh.springboot.addressbook;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import org.springframework.stereotype.Component;

import com.mongodb.BasicDBObject;
import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import com.mongodb.WriteResult;

import kh.mongo.MongoConnection;
import kh.springboot.addressbook.domain.Contact;

@Component
@Path("/address")
public class AddressBookResource {

	public Long getNextSequence() throws Exception {
		DB db = MongoConnection.getMongoDB();

		DBCollection sequences = db.getCollection("sequences");

		// TODO: this find is not needed because you can upsert instead
		// DBObject addressSequence = sequences.findOne(new BasicDBObject("_id",
		// "addressId"));
		// if(addressSequence == null){
		// DBObject sequence = BasicDBObjectBuilder.start()
		// .append("_id", "addressId")
		// .append("value", 0).get();
		// sequences.insert(addressSequence);
		// }

		// if sequence value already exists increment it, otherwise insert it (upsert)
		// sort: new BasicDBObject("sort", new BasicDBObject("_id", 1))

		// fields to return
		DBObject fields = BasicDBObjectBuilder.start()
				.append("_id", 1)
				.append("value", 1).get();
		
		DBObject result = sequences.findAndModify(
				new BasicDBObject("_id", "addressId"), //query 
				fields, // what fields to return
				null, //sort
				false, //don't remove selected document
				new BasicDBObject("$inc", new BasicDBObject("value", 1)), //increment value
				true, //true = return modified document
				true); //true = upsert, insert if no matching document

		return (Long) result.get("value");
	}

	@GET
	@Path("{id}")
	@Produces("application/json")
	public Contact getAddress(@PathParam("id") Long id) throws Exception {

		DB db = MongoConnection.getMongoDB();
		Contact c = new Contact();

		DBObject query = new BasicDBObject("contact", new BasicDBObject("contactId", id));
		db.getCollection("addressdb").find(query);

		return c;
	}

	@POST
	public Contact insertAddress() {
		Contact c = new Contact();

		return c;
	}
}
