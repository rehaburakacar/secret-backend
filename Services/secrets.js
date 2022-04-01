const { MongoClient, ServerApiVersion } = require('mongodb');
const md5 = require('md5')

async function addSecret(secretText, expireAfter, uri) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
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
        await collection.insert({ hash: hash, secretText: secretText, createdAt: createdAt.toLocaleString('en-GB'), expiresAt: expiresAt.toLocaleString('en-GB') })
        return await "200"
    } catch (err) {
        console.log(err)
        return await "405"
    } finally {
        await client.close()
    }
}

async function getSecrets(hash, uri) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    try {
        await client.connect();
        const collection = client.db("RAPID").collection("SECRETS");
        let items = []
        result = await collection.findOne({ hash: hash })
        if (result == null) {
            return "404"
        }
        return result
    } catch (err) {
        return "404"
    }
    finally {
        await client.close();
    }
}


module.exports = {
    addSecret,
    getSecrets
}