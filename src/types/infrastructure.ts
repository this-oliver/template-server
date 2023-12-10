/**
 * Types and interfaces that define the infrastructure of the application (i.e. routes, database, API, etc.)
 * or extend libraries and frameworks
 */

import type { Request, RequestHandler } from "express";
import type { UserDocument } from "../data/user";

export interface BaseError {
  message: string;
  status: number;
}

export interface Route {
  /**
   * The HTTP method of the route
   */
  method: "get" | "post" | "patch" | "delete";
  
  /**
   * The path of the route
   */
  path: string;
  
  /**
   * The handler of the route
   */
  handler: RequestHandler | RequestHandler[];

  /**
   * Parse the request body as JSON
   */
  json?: boolean;

  /**
   * Whether or not the route requires authentication
   */
  protected?: boolean;

  /**
   * Configures the file-upload middleware for the route
   */
  upload?: {
    /**
     * The name of the field to be uploaded
     */
    field: string;
    /**
     * The maximum number of files to be uploaded
     */
    maxCount: number;
  };
}

export interface AuthenticatedRequest extends Request {
  user: UserDocument
}
