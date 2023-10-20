import { Client, Databases, ID, Query, Storage } from "appwrite";
import config from "../config/config";

export class Service {
    client = new Client()
    dtabase;
    bucket;

    constructor() {
        this.client.setEndpoint(config.appwriteUrl)
        this.client.setProject(config.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)

    }
    async createPost(
        { title, status, userId, slug, content, featuredImage, }
    ) {
        try {
            return await this.databases.createDocument(
                config.appwriteCollectionId,
                config.appwriteDatabaseId,
                slug, {
                title,
                content,
                featuredImage, status,
                userId,
            }
            )
        } catch (error) {
            console.log('error', error)
        }
    }
    async updatePost(slug, { title, content, featuredImage, status, }) {


        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status

                }
            )
        } catch (error) {
            console.log(error)
        }
    }
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,

            )
            return true
        } catch (error) {
            console.log('appwrite::delete', error)
            return false
        }
    }
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.appwriteCollectionId,
                config.appwriteDatabaseId,
                slug,
            )

        } catch (error) {
            console.log('getPost::error', error)
        }
    }
    async getPosts(queries = [Query.equal('status', 'active')]) {
        try {
            return await this.databases.listDocuments(
                config.appwriteCollectionId,
                config.appwriteDatabaseId,
                queries,
            )

        } catch (error) {
            console.log('getPosts::error', error)
            return false
        }
    }

    //fileupload in seprate file
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log('appwrite::', error)
            return false
        }
    }
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFileFile(
                config.appwriteBucketId,
                ID.unique(),
                fileId
            )
            return true
        } catch (error) {
            console.log('appwrite::deletefileId', error)
            return false
        }
    }
    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId
        )
    }
}
const service = new Service()
export default service