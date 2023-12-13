/**
 * Types and interfaces for application logic (i.e. users, posts, etc.)
 */

import { Types } from 'mongoose';

export interface IUser {
  username: string;
  password: string;
}

export interface ITodo {
  author: string | Types.ObjectId;
  title: string;
  description: string;
  completed: boolean;
}
