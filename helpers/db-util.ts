import { MongoClient } from "mongodb";

export const connectDB = async () => {
    const client = MongoClient.connect();
    return client;
};

export const insertDocument = async (client, collection, document) => {
    const db = await client.db("events");
    await db.collection(collection).insertOne(document);
};

export const getCommentsByEvent = async (client, eventId, sort) => {
    const db = await client.db("events");
    const result = await db
        .collection("comments")
        .find({ eventId: eventId })
        .sort(sort)
        .toArray();
    return result;
};
