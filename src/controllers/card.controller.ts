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

    // Type validation
    if (typeof cardNumber !== "string") {
      res.status(400).json({
        success: false,
        message: "cardNumber must be a string",
      });
      return;
    }

    const sanitizedCardNumber = cardNumber.trim();

    // Content validation (digits only)
    if (!/^\d+$/.test(sanitizedCardNumber)) {
      res.status(400).json({
        success: false,
        message: "cardNumber must contain only digits",
      });
      return;
    }

    const isValid = cardService.validate(sanitizedCardNumber);

    return res.status(200).json({
      success: true,
      data: {
        cardNumber: sanitizedCardNumber,
        isValid,
      },
      message: isValid ? "Card number is valid" : "Card number is invalid",
    });
  } catch (error) {
    next(error);
  }
};