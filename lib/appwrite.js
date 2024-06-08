import {
	Account,
	Avatars,
	Client,
	Databases,
	ID,
	Query,
} from "react-native-appwrite";

export const config = {
	endpoint: "https://cloud.appwrite.io/v1",
	platform: "com.json.aora",
	projectId: "66616ed6001eaf9f4a5e",
	dataBaseId: "66617966002e4e48f9cd",
	userCollectionId: "666179a7000227a1c2c9",
	videosCollectionId: "666179e3002144ef416b",
	storageId: "66617c7f00273b71010a",
};

const client = new Client();
client
	.setEndpoint(config.endpoint)
	.setProject(config.projectId)
	.setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
	try {
		const newAccount = await account.create(
			ID.unique(),
			email,
			password,
			username
		);
		if (!newAccount) throw Error;
		const avatarUrl = avatars.getInitials(username);
		const newUser = await databases.createDocument(
			config.dataBaseId,
			config.userCollectionId,
			ID.unique(),
			{
				accountid: newAccount.$id,
				email,
				username,
				avatar: avatarUrl,
			}
		);
		return newUser;
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

export const signIn = async (email, password) => {
	try {
		await account.createEmailPasswordSession(email, password);
		return await account.get();
	} catch (error) {
		throw new Error(error);
	}
};

export const getCurrentUser = async () => {
	try {
		const currentAccount = account.get();
		if (!currentAccount) throw Error;
		const currentUser = await databases.listDocuments(
			config.dataBaseId,
			config.userCollectionId,
			[Query.equal("accountid", (await currentAccount).$id)]
		);
		if (!currentUser) throw Error;
		return currentUser.documents[0];
	} catch (error) {
		throw new Error(error);
	}
};

export const getAllPosts = async () => {
	try {
		const post = await databases.listDocuments(
			config.dataBaseId,
			config.videosCollectionId
		);
		return post.documents;
	} catch (error) {
		throw new Error(error);
	}
};
