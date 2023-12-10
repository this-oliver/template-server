import type { Request } from "express";
import type { UserDocument } from "../../data/user";

export interface AuthenticatedRequest extends Request {
  user: UserDocument
}
