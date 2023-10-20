import config from "../config/config";

import { Client, Account, ID } from 'appwrite'

export class AuthService {
    client = new Client()
    account;
    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }
    //production grade-code
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique, email, password, name);
            if (userAccount) {
                return this.login({ email, password })
            }
            else {
                return userAccount
            }
        } catch (error) {
            throw error;
        }
    }
    async login({ email, password }) {
        try {
            await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser() {
        try {

            return await this.account.get()
        } catch (error) {
            //    throw error 
            console.log('getCurrentUser::', error)
        }
        return null;

    }
   async logout(){
    try {
        await this.account.deleteSessions();
    } catch (error) {
        console.log('appwrite::logout::',error);
    }
   }
}
const authService = new AuthService()


export default authService
