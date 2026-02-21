import conf from '../conf/conf.js';

import { Client, Databases, ID, Query, TablesDB } from 'appwrite';

export class AppwriteService {
    client;
    database;
    storage;

    constructor(){
        this.client = new Client();

        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.database = new TablesDB(this.client);

        this.storage = new Storage(this.client);
    }

    async createPost({title, slug , content, featuredImageId, status, userId}) {
        try{
            return await this.database.createRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredImageId,
                    status,
                    userId
                }
            })
        }catch(error){
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async updatePost(slug, {title, content, featuredImageId, status}) {
        try{
            return await this.database.updateRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredImageId,
                    status
                }
            })
        }catch(error){
            console.log("Appwrite Serive :: updatePost :: error",error)
        }
    }

    async deletePost(slug) {
        try{
            await this.database.deleteRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug
            })
            return true;
        }catch(error){
            console.log("Appwrite Serive :: deletePost :: error",error)
        }

        return false;
    }

    async getPost(slug) {
        try{
            return await this.database.getRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug
            })
        }catch(error){
            console.log("Appwrite Serive :: getPost :: error",error)
        }

        return null;
    }

    async getPosts(queries = [Query.equal('status', 'active')]) {
        try{
            await this.database.listRows({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                queries,

            })
        }catch(error){
            console.log("Appwrite Serive :: getPosts :: error",error)
        }
        return false;
    }

    //file upload services 

    async uploadFile(file) {
        try{
            return await this.storage.createFile({
                bucketId: conf.appwriteBucketId,
                fileId: ID.unique(),
                file
            })
        }catch(error){
            console.log("Appwrite Service :: uploadFile :: error", error);

        }
        return false;
    }

    async deleteFile(fileId) {
        try{
            await this.storage.deleteFile({
                bucketId: conf.appwriteBucketId,
                fileId
            })
            return true;
        }catch(error){
            console.log("Appwrite Service :: deleteFile :: error", error);
        }

        return false;
    }

    getFilePreview(fileId) {
        return this.storage.getFilePreview({
            bucketId: conf.appwriteBucketId,
            fileId
        })
    }
}

const appwriteService = new AppwriteService();

export default appwriteService;