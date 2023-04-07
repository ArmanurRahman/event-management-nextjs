import { connectDB, insertDocument } from "@/helpers/db-util";
import type { NextApiRequest, NextApiResponse } from "next";

const userRegistration = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const email = req.body.email;
        let client;
        try {
            client = await connectDB();
        } catch (error) {
            res.status(500).json({ message: "cannot connect to database" });
            client?.close();
            return;
        }

        try {
            await insertDocument(client, "newsletter", { email: email });
            res.status(201).json({ message: "Email registration success" });
        } catch {
            res.status(500).json({ message: "cannot register newsletter" });
            client?.close();
            return;
        }
        client?.close();
    }
};

export default userRegistration;
