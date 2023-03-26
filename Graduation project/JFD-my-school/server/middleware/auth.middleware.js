import tokenServices from "../services/token.services.js";

export default function (req, res, next) {
    if (req.method === "OPTIONS") {
        return next();
    }

    try {
        // Bearer sadlalsdjhkdjzhdhfjdshfkeuwoehrjksdkgfks
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const data = tokenServices.validateAccess(token);

        if (!data) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.user = data;

        next();
    } catch (e) {
        res.status(401).json({ message: "Unauthorized" });
    }
}
