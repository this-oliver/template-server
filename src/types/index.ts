import { Types } from 'mongoose';

interface BaseError {
  message: string;
  status: number;
}

interface IUser {
  username: string;
  password: string;
}

interface ITodo {
  author: string | Types.ObjectId;
  title: string;
  description: string;
  completed: boolean;
}

export { BaseError, IUser, ITodo };