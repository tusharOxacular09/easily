import { users } from "../database/user.collection.js";
import { generateRandomAlphaNumeric } from "../helper/ubiqueid.helper.js";

export default class AuthModel {
  createUser(user) {
    // Creating unique Id for the Job
    const uniqueId = "user-" + generateRandomAlphaNumeric(4);
    users.push({
      id: uniqueId,
      ...user,
    });
  }

  validateUser(email, password) {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      return { id: user.id, name: user.name };
    }
    return false;
  }
}
