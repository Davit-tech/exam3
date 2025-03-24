import moment from "moment";
import helpers from "./helpers.js";

export default {

    validatePasswordAndGenerateToken(existingUser, password) {

        if (existingUser.password === helpers.passwordHash(password)) {
            const expiresIn = moment().add(10, "minutes").toISOString();
            const token = helpers.encrypt({
                userId: existingUser.id,
                expiresIn,
            });

            return {
                success: true,
                token,
                expiresIn,
            };
        } else {
            return {
                success: false,
                message: "Wrong password",
            };
        }
    },
};
