"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@/config");
const HttpException_1 = require("@/exceptions/HttpException");
const mikro_orm_config_1 = require("@/mikro-orm.config");
const jsonwebtoken_1 = require("jsonwebtoken");
const authorize = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (token) {
            const secretKey = config_1.JWT_SECRET;
            const verificationResponse = (0, jsonwebtoken_1.verify)(token, secretKey);
            const userId = verificationResponse.id;
            const findUser = await mikro_orm_config_1.DI.userRepository.findOne({ id: userId });
            if (findUser) {
                req.user = findUser;
                next();
            }
            else {
                next(new HttpException_1.HttpException(401, 'Wrong authentication token'));
            }
        }
        else {
            next(new HttpException_1.HttpException(401, 'Authentication token missing'));
        }
    }
    catch (error) {
        next(new HttpException_1.HttpException(401, 'Authentication token missing'));
    }
};
exports.default = authorize;
//# sourceMappingURL=authorization.middleware.js.map