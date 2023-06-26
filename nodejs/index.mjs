 import fetch from 'node-fetch';
//const {fetch} = require('node-fetch')
// const {MongoClient} = require('mongodb');
 const apikey = "9bb9485e113f7f8e07520d9f65878e19";

import {MongoClient} from 'mongodb';

async function main(){
	const uri = 'mongodb+srv://rishav83:ogiVMdcnM4Y82kdQ@mausam.cxbamxl.mongodb.net/?retryWrites=true&w=majority';
	const client = new MongoClient(uri);

	try{
		await client.connect();
		const data1 = await fetch("http://api.openweathermap.org/data/3.0/onecall?lat="
				+22.4
				+"&lon="
				+88.6
				+"&units=metric&appid="
				+apikey);
		const response  = await data1.json();
		//await listDatabases(client);
		console.log(value);
		// await createListing(client,
        // {
            
        // });
	}
	catch(e){
		console.error(e);
	}
	finally{
		await client.close();
	}
}

main().catch(console.error); //call the main function

// async function listDatabases(client){		//to list my databases
// 	dataBasesList = await client.db().admin().listDatabases();
// 	console.log("Databases:");

// 	dataBasesList.databases.forEach(db => console.log(` - ${db.name}`));
// }

async function createListing(client,newlisting){
	const result = await client.db("Cities").collection("").insertOne(newlisting);
	console.log(`New listing created with the following id: ${result.insertedId}`);
}
