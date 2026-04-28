import { Request, Response, NextFunction } from "express";
import { CardService } from "../services/card.service";

const cardService = new CardService();

export const validateCard = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { cardNumber } = req.body;

    // Missing input
    if (!cardNumber) {
      res.status(400).json({
        success: false,
        message: "cardNumber is required",
      });
      return;
    }

    // Type check
    if (typeof cardNumber !== "string") {
      res.status(400).json({
        success: false,
        message: "cardNumber must be a string",
      });
      return;
    }

    const sanitizedCardNumber = cardNumber.trim();

    // Format validation
    if (!/^\d+$/.test(sanitizedCardNumber)) {
      res.status(400).json({
        success: false,
        message: "cardNumber must contain only digits",
      });
      return;
    }

    const isValid = cardService.validate(sanitizedCardNumber);

    // Business response (IMPORTANT: use correct success flag)
    if (!isValid) {
      res.status(200).json({
        success: false,
        data: {
          cardNumber: sanitizedCardNumber,
          isValid: false,
        },
        message: "Invalid card number",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        cardNumber: sanitizedCardNumber,
        isValid: true,
      },
      message: "Valid card number",
    });
  } catch (error) {
    next(error);
  }
};