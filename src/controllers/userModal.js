import userModal from "../modal/userModal";
import { errorMessage, successMessage } from "../helpers/messageHandler";
import { signToken, decryptPassword, encryptPassword } from "../utils/auth";

class UserController {
  static async userRegister(req, res, next) {
    try {
      const { email } = req.body;
      if (!req.body.email || !req.body.password || !req.body.name) {
        return errorMessage(
          res,
          400,
          "please provide name, email and password"
        );
      }

      const existEmail = await userModal.findOne({ email });
      if (existEmail) {
        return errorMessage(res, 400, "user already registered");
      }

      const password = await encryptPassword(req.body.password);

      const user = await userModal.create({
        ...req.body,
        password,
      });

      return successMessage(res, 201, `successfully created account`, user);
    } catch (error) {
      return errorMessage(
        res,
        400,
        `they was an error while creating an account ${error.message}`
      );
    }
  }

  static async userLogin(req, res, next) {
    try {
      const { email } = req.body;
      const user = await userModal.findOne({ email }).select("+password");

      if (!email) {
        return errorMessage(res, 404, "Please provide email");
      }

      if (!user) {
        return errorMessage(res, 401, `Invalid Email or Password`);
      }

      const pass = await decryptPassword(req.body.password, user.password);

      if (!pass) {
        return errorMessage(res, 401, "Invalid Email or Passwor");
      }

      const token = signToken({
        id: user._id,
        email: user.email,
      });

      const userr = {id: user._id, name: user.name, email: user.email, v: user.__v, createdAt: user.createdAt,  }

      return successMessage(res, 200, `successfully logged in`, {
        userr,
        token,
      });
    } catch (error) {
      return errorMessage(res, 400, `there was error while login`);
    }
  }
}

export default UserController;
