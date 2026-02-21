const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

export default conf;

// This is a production grade approach to manage configuration using environment variables.
// It allows you to easily change configuration settings without modifying the codebase,
// making it suitable for different deployment environments (development, staging, production).
// Also sometimes the .env file is not directly accessible in the code, so this intermediary configuration file helps in such scenarios. And we wrap it with String() to ensure the values are treated as strings.