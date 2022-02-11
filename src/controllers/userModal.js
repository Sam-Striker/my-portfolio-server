import userModal from "../modal/userModal";
import { errorMessage, successMessage } from "../helpers/messageHandler";
import { signToken, decryptPassword, encryptPassword } from "../utils/auth";

class UserController {
  static async userRegister(req, res, next) {
    try {
      const { email } = req.body;
      const existEmail = await userModal.findOne({ email });
      if (existEmail) {
        return errorMessage(res, 400, "user already registered");
      }
      const password = await encryptPassword(req.body.password);
      const user = await userModal.create({
        ...req.body,
        password,
      });
      const userr = {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      };
      return successMessage(res, 201, `successfully created account`,  userr);
    } catch (error) {
      return errorMessage(
        res,
        400,
        `they was an error while creating an account ${error.message}`
      );
    }
  }

  static async fetchingUsers(req, res) {
    try {
      const users = await userModal.find();

      return res.status(200).json({ success: true, data: users });
    } catch (error) {
      return res
        .status(400)
        .json({ success: false, message: `${error.message}` });
    }
  }

  static async userLogin(req, res, next) {
    try {
      const { email } = req.body;
      const user = await userModal.findOne({ email }).select("+password");
      
      if (!user) {
        return errorMessage(res, 401, `Invalid Email or Password`);
      }

      const pass = await decryptPassword(req.body.password, user.password);
      const token = signToken({
        id: user._id,
        email: user.email,
      });

      const userr = {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      };
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
