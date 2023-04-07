import {
    connectDB,
    getCommentsByEvent,
    insertDocument,
} from "@/helpers/db-util";
import type { NextApiRequest, NextApiResponse } from "next";

const commentHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    let client;

    try {
        client = await connectDB();
    } catch (error) {
        res.status(500).json({ message: "cannot connect to database" });
        client?.close();
        return;
    }

    if (req.method === "POST") {
        const eventId = req.query.eventId;
        const commentData = req.body.commentData;
        const data = { eventId, ...commentData };
        console.log("poseted comment ", eventId, data);

        try {
            await insertDocument(client, "comments", data);
            res.status(201).json({ message: "posted successfully" });
        } catch (error) {
            res.status(500).json({ message: "cannot post comment" });
            client?.close();
            return;
        }
    }

    if (req.method === "GET") {
        const eventId = req.query.eventId;

        try {
            const comments = await getCommentsByEvent(client, eventId, {
                _id: -1,
            });
            res.status(200).json(comments);
        } catch (error) {
            res.status(500).json({ message: "cannot fetch comment" });
            client?.close();
            return;
        }
    }
    client?.close();
};

export default commentHandler;
