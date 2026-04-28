import { Request, Response, NextFunction } from "express";

/**
 * Professional request logger middleware.
 * Logs the HTTP method, the URL path, and the timestamp of every incoming request.
 */
export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  
  // Pass control to the next middleware or route handler
  next();
};
