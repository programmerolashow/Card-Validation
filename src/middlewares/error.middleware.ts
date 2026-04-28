import { Request, Response, NextFunction } from "express";

/**
 * Global error handling middleware.
 * Catches unhandled errors across the application and formats them into a standard JSON response.
 */
export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    // Only send the raw error message in development mode for security
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
};
