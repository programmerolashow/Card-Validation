import { Request, Response, NextFunction } from "express";
import { CardService } from "../services/card.service";

const cardService = new CardService();

export const validateCard = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { cardNumber } = req.body;

    // Validate presence
    if (!cardNumber) {
      res.status(400).json({
        success: false,
        message: "cardNumber is required",
      });
      return;
    }

    // Validate type
    if (typeof cardNumber !== "string") {
      res.status(400).json({
        success: false,
        message: "cardNumber must be a string",
      });
      return;
    }

    // Sanitize and validate content
    const sanitizedCardNumber = cardNumber.trim();
    if (!/^\d+$/.test(sanitizedCardNumber)) {
      res.status(400).json({
        success: false,
        message: "cardNumber must contain only digits",
      });
      return;
    }

    const isValid = cardService.validate(sanitizedCardNumber);

    res.status(200).json({
      success: true,
      data: {
        cardNumber: sanitizedCardNumber,
        isValid,
      },
      message: isValid ? "Valid card number" : "Invalid card number",
    });
  } catch (error) {
    next(error);
  }
};
