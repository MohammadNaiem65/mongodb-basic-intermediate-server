const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

// ! Middleware and App initialization
const app = express();
app.use(cors());
app.use(express.json());

// * Handling MongoDB
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mongodb.ysqbtff.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

async function run() {
	try {
		// Connect the client to the server	(optional starting in v4.7)
		await client.connect();

		const coffeeCollection = client.db('coffeeShop').collection('coffees');

		// * Routes Setup
		

		app.post('/coffee', async (req, res) => {
			const coffeeData = req.body;
			const result = await coffeeCollection.insertOne(coffeeData);
			res.send(result);
		});

		// Send a ping to confirm a successful connection
		await client.db('admin').command({ ping: 1 });
		console.log(
			'Pinged your deployment. You successfully connected to MongoDB!'
		);
	} catch (err) {
		console.log(err);
	}
}
run().catch(console.dir);

// listening the app
app.listen(port, () => console.log('Coffee is cooking'));
