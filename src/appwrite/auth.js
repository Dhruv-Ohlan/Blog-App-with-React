import conf from '../conf/conf.js';

import { Client, Account, ID } from 'appwrite';

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}) {
        try{
            const userAccount = await this.account.create({
                userId: ID.unique(), 
                email, 
                password,
                name
            });
            if (userAccount && userAccount.$id) {
                // call another method to automatically login the user after successful account creation
                return await this.login({email, password});
            }else{
                return userAccount;
            }
        }catch(error){
            throw error;
        }
    }

    async login({email, password}) {
        try{
            return await this.account.createEmailPasswordSession({
                email, 
                password
            });
        }catch(error){
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
            // Logged in
        } catch (err) {
            // Not logged in
            console.log("Appwrite service :: getCurrentUser :: error ", error);
        }

        return null;
        //this is just to avoid undefined return type
    }

    async logout() {
        try{
            return await this.account.deleteSessions();
        }catch(error){
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;