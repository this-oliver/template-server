import Mongoose from "mongoose";
import type { IUser } from "../types";

const GENERIC_PROJECTION = "-password -salt";

type UserDocument = IUser & Mongoose.Document;

const UserModel = Mongoose.model("user", new Mongoose.Schema<IUser>(
	{
		username: { type: String, required: true },
		password: { type: String, required: true },
		salt: { type: String }
	},
	{ timestamps: true }
));

async function createUser(username: string, password: string, config?: { secrets: boolean }): Promise<UserDocument> {
	const user = await UserModel.create(new UserModel({ username, password }));

	if(config?.secrets !== true) {
		user.password = "";
		user.salt = "";
	}

	return user;
}

async function getUserById(id: string, config?: { secrets: boolean}): Promise<UserDocument | null> {
	return config?.secrets 
		? await UserModel.findById(id).exec()
		: await UserModel.findById(id).select(GENERIC_PROJECTION).exec();
}

async function getUserByUsername(username: string, config?: { secrets: boolean}): Promise<UserDocument | null> {
	return config?.secrets
		? await UserModel.findOne({ username }).exec()
		: await UserModel.findOne({ username }).select(GENERIC_PROJECTION).exec();
}

async function indexUsers(config?: { secrets: boolean}): Promise<UserDocument[]> {
	return config?.secrets 
		? await UserModel.find().exec()
		: await UserModel.find().select(GENERIC_PROJECTION).exec();
}

async function updateUser(id: string, patch: Partial<IUser>, config?: { secrets: boolean}): Promise<UserDocument | null> {
	const user = await getUserById(id);

	if(!user){
		throw new Error(`User with id ${id} not found`);
	}

	user.username = patch.username || user.username;
	user.password = patch.password || user.password;

	const patchedUser = await user.save();

	if(!config?.secrets) {
		patchedUser.password = "";
		patchedUser.salt = "";
	}

	return patchedUser;
}

async function deleteUser (id: string): Promise<UserDocument | null> {
	const user = await getUserById(id);

	if(!user){
		throw new Error(`User with id ${id} not found`);
	}

	return await UserModel.findByIdAndDelete(user.id);
}

export { 
	UserDocument,
	UserModel,
	createUser,
	getUserById,
	getUserByUsername,
	indexUsers,
	updateUser,
	deleteUser
};
