import { Client, Databases, Query } from "appwrite";
import config from "../config/config";

export class Service {
  client = new Client();
  database;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appWriteUrl)
      .setProject(config.appWriteProjectID);

    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost(title, slug, content, featuredImage, status, userId) {
    try {
      const result = await database.createDocument({
        databaseId: config.appWriteDatabaseID,
        collectionId: config.appWriteCollectionID,
        documentId: slug,
        data: {
          title: title,
          content: content,
          featuredImage: featuredImage,
          status: status,
          userId: userId,
        },
      });

      return result;
    } catch (error) {
      console.log("Appwrite :: createPost ::", error);
    }
  }

  async updatePost(title, slug, content, featuredImage, status) {
    try {
      const result = await databases.updateDocument({
        databaseId: config.appWriteDatabaseID,
        collectionId: config.appWriteCollectionID,
        documentId: slug,
        data: {
          title: title,
          content: content,
          featuredImage: featuredImage,
          status: status,
        }, // optional
      });

      return result;
    } catch (error) {
      console.log("Appwrite :: updatePost ::", error);
    }
  }

  async deletePost(slug) {
    try {
      const result = await database.deleteDocument({
        databaseId: config.appWriteDatabaseID,
        collectionId: config.appWriteCollectionID,
        documentId: slug,
      });

      return true;
    } catch (error) {
      console.log("Appwrite :: deletePost ::", error);
    }

    return false;
  }

  async getPost(slug) {
    try {
      const result = await database.getDocument({
        databaseId: config.appWriteDatabaseID,
        collectionId: config.appWriteCollectionID,
        documentId: slug,
      });

      return result;
    } catch (error) {
      console.log("Appwrite :: getPost ::", error);
    }

    return false;
  }

  async listDocuments(queries = [Query.equal("status", "active")]) {
    try {
      const result = await database.listDocuments({
        databaseId: config.appWriteDatabaseID,
        collectionId: config.appWriteCollectionID,
        queries: queries, // optional
      });

      return result;
    } catch (error) {
      console.log("appwrite::listdocument::", error);
    }
  }

  //file uplode services

  async uplodeFile(file) {
    try {
      const result = await this.bucket.createFile({
        bucketId: config.appWriteBucketID,
        fileId: ID.unique(),
        file: file,
      });

      return result;
    } catch (error) {
      console.log("appwrite service:: uplodefile::", error);
    }
  }

  async deleteFile(fileId) {
    try {
      const result = await this.bucket.deleteFile({
        bucketId: config.appWriteBucketID,
        fileId: fileId,
      });

      return true;
    } catch (error) {
      console.log("appwrite services:: deletefile:: ", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    const result = storage.getFilePreview({
      bucketId: config.appWriteBucketID,
      fileId: fileId,
    });
    return result;
  }
}

const service = new Service();

export default service;
