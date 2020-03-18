import { MongoClient } from 'mongodb';

const connectToDB = async () => {
	const uri = process.env.MONGO_URI;
	const client = await MongoClient.connect(uri, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	});
	const db = client.db('gig-board-alpha');

	return [client, db];
};

export default connectToDB;
