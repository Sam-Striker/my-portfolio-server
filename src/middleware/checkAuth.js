import { errorMessage } from "../helpers/messageHandler";
import { verifyToken } from "../utils/auth";

class Authorisation {
  static async admin(req, res, next) {
    try {
      const token = req.headers.auth.split(" ")[1];

      if (!token) {
        return errorMessage(res, 403, `auth token is missing`);
      }

      console.log("token", token);

      const userId = verifyToken(token);

      if (!userId) {
        return errorMessage(res, 403, `Invalid auth token`);
      }

      if (userId.email === "mupagasi@gmail.com") {
        req.user = userId;
      } else {
        return errorMessage(
          res,
          401,
          `unauthorised only Admin can do this task`
        );
      }

      return next();
    } catch (error) {
      return errorMessage(res, 403, "Token not valid");
    }
  }
  static async user(req, res, next) {
    try {
      const token = req.headers.auth.split(" ")[1];

      if (!token) {
        return errorMessage(res, 403, `auth token is missing`);
      }

      console.log("token", token);
      const userId = verifyToken(token);

      if (!userId) {
        return errorMessage(res, 403, `Invalid auth token`);
      }

      return next();
    } catch (error) {
      return errorMessage(res, 403, "Token not valid");
    }
  }
}

export default Authorisation;
