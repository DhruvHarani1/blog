import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appWriteUrl)
      .setProject(config.appWriteProjectID);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const newUser = await account.create({
        userId: ID.unique(),
        email: email,
        password: password,
      });
      if (newUser) {
        return this.login(email, password);
      } else {
        return newUser;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      const user = await this.account.createEmailPasswordSession({
        email: email,
        password: password,
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite error:: getCurrentAccount");
    }
    return null;
  }

  async logout(){
    try {
        await this.account.deleteSession({sessionId: 'current'})
    } catch (error) {
        console.log("Appwrite error:: logout");
    }
  }
}

const authService = new AuthService();

export default authService;
