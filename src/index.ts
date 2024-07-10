import { MongoClient } from "mongodb";

const express = require('express');
const body = require('body-parser');


/*  UNDERSTANDING THE CODE + Notes
------------------------------------------------------------------------------------------------

• Typescript allows us to set function types, example start() = ASYNCHRONOUS
• Start() = main application function 
    → use "try" and "catch" to correctly setup the execution of the server

• Why do we need a database for an API?
    → Data retrieval: They provide optimized ways to query, filter, and update information
    → Consistency: Databases offer mechanisms like transactions, constraints, and data validation to maintain data consistency and integrity
    → Security: Databases provide robust security features like access control, encryption, and user authentication
    → Concurrent access: handle multiple simultaneous connections and requests, which is crucial for APIs that may receive many concurrent calls

------------------------------------------------------------------------------------------------
*/

async function start() {

    try {

        // This creates and express application 
        // Express = web server
        const app = express();

        // Connects to database running on localhost:27017
        //const mongo = await MongoClient.connect("mongodb://localhost:27017/crm-api");
        const mongo = await MongoClient.connect("mongodb://localhost:27017/crm-api");

        // Establishes a connection
        await mongo.connect();

        // Attaches the database instance (MONGO) to the Express "app" for easy access throughout the application
        app.db = mongo.db();

        // body parse JSON request bodies, with a limit of 500kb
        app.use(body.json({
            limit: '500kb'
        }));

        // Routes → uses the router defined in './routes/customers' to handle requests to this path
        app.use('/customers', require('./routes/customers'));

        // Start Express server → Listening : port 300
        app.listen(3000, () => {
            // log a message when the server starts successfully
            console.log('Server is running on port 3000');
        })
        
    } catch (error) {
        console.log(error);
    }
    
}

start();


