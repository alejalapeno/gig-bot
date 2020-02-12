import connectToDB from '../shared-utilities/connectToDB';

const storeSubmission = async (
	{
		inputValues,
		user: {
			id,
			profile: { display_name, real_name },
		},
	},
	collectionName,
) => {
	const name = display_name ? display_name : real_name;

	const document = {
		inputValues,
		user: {
			id,
			name,
		},
	};

	const [client, db] = await connectToDB();

	const collection = db.collection(collectionName);

	await collection.insertOne(document);

	client.close();
};

export default storeSubmission;
