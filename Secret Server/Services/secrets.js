const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://RAPID:AiLRCaV0fIxjyjzQ@cluster0.2ul84.mongodb.net/RAPID?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const md5 = require('md5')

async function addSecret(secretText, expireAfter) {
    console.log("ALL SECRETS ARE DEFINED PROPERLY NOW" + secretText)
    console.log("ALL SECRETS ARE DEFINED PROPERLY NOW" + expireAfter)
    let createdAt = new Date(), expiresAt = new Date()
    if (expireAfter != 0) {
        expiresAt.setSeconds(createdAt.getSeconds() + expireAfter);
    } else {
        expiresAt = 0
    }
    try {
        await client.connect();
        const collection = await client.db("RAPID").collection("SECRETS");
        hash = md5(secretText);
        await collection.insert({ hash: hash, secretText: secretText, createdAt: createdAt.toLocaleString(), expiresAt: expiresAt.toLocaleString() })
        //var cursor = collection.find({ state: true })
        //var cursor = await collection.find()

        //console.log(cursor.id)
        //console.log(collection.find())
        // perform actions on the collection object
        //client.close();


        //await collection.find({}).toArray(function (err, result) {
        //    if (err) throw err;
        //    console.log(result);
        //});
        
        return await "200"
    } catch (err) {
        console.log(err)
        return await "405"
    } finally {
        await client.close()
    }
}

async function getSecrets(hash) {
    try {
        await client.connect();
        const collection = client.db("RAPID").collection("SECRETS");
        let items = []
        result = await collection.findOne({ hash: hash })
        console.log(result)
        if (result == null) {
            return "404"
        }
        //if (!items.length) {
        //    return 404
        //}
        //collection.find({hash: hash}).toArray(function (err, result) {
        //    if (err) throw err;
        //    console.log(result);
        //});
        return result
    } catch (err) {
        return "404"
    }
    finally {
        await client.close();
    }
}

/*//https://www.w3schools.com/nodejs/nodejs_mongodb_find.asp*/










//////const { MongoClient, ServerApiVersion } = require('mongodb');
////var MongoClient = require('mongodb').MongoClient;
////const { sqlConfig } = require('../Helpers/configurationParameters')
////const uri = sqlConfig.uri;
//////const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
////function getPrinted() {
////    console.log(sqlConfig.uri)
////}


////MongoClient.connect(uri, function (err, db) {

////    var cursor = db.collection('SECRETS').find();

////    cursor.each(function (err, doc) {

////        console.log(doc);

////    });
////});




//////client.connect(err => {


//////    const RAPIDDB = client.db("RAPID");
//////    const SECRETCOLLECTION = RAPIDDB.collection("SECRETS");
//////    const query = { state: true };

//////    const cc = SECRETCOLLECTION.find(query);
//////    cc.each(function (err, doc) {

//////        console.log(doc);

//////    });

//////    //console.log("LENGTH" + SECRETCOLLECTION.find())
//////    /*console.log(client)//*/
//////    //for (var i = 0; i < collections.length; i++) {
//////    //    console.log('Collection: ' + collections[i]); // print the name of each collection
//////    //    client.getCollection(collections[i]).find().forEach(printjson); //and then print the json of each of its elements
//////    //}
//////    //console.log("BA?LANDI.")
//////    //const collection = client.db("RAPID").collection("SECRETS");
//////    //let aa = collection.find()
//////    //console.log("LENGTH" + aa.length)

//////    //for (let i = 0; i < aa.length; i++) {
//////    //    console.log("Row: " + aa[i]);
//////    //}

//////    //console.log(collection.find())
//////    // perform actions on the collection object
//////    client.close();
//////});

module.exports = {
    addSecret,
    getSecrets
}