import jwt from "jsonwebtoken";
import config from "config";
import Token from "../models/Token.js";

class TokenService {
    // return: accessToken, refreshToken, expiresIn
    generate(payload) {
        const accessToken = jwt.sign(payload, config.get("accessSecret"), {
            expiresIn: "1h",
        });

        const refreshToken = jwt.sign(payload, config.get("refreshSecret"));

        return {
            accessToken,
            refreshToken,
            expiresIn: 3600,
        };
    }

    async save(user, refreshToken) {
        // userId
        const data = await Token.findOne({ user: user }); // userId

        if (data) {
            data.refreshToken = refreshToken;
            return data.save();
        }

        const token = await Token.create({ user, refreshToken }); // userId
        return token;
    }

    validateRefresh(refreshToken) {
        try {
            return jwt.verify(refreshToken, config.get("refreshSecret"));
        } catch (e) {
            return null;
        }
    }

    validateAccess(accessToken) {
        try {
            return jwt.verify(accessToken, config.get("accessSecret"));
        } catch (e) {
            return null;
        }
    }

    async findToken(refreshToken) {
        try {
            return await Token.findOne({ refreshToken });
        } catch (e) {
            return null;
        }
    }
}

export default new TokenService();
