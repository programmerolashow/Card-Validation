import { Request, Response } from "express";
import { CardService } from "../services/card.service";

const cardService = new CardService();

export const validateCard = (req: Request, res: Response): Response => {
  const { cardNumber } = req.body;

  // Validate presence
  if (!cardNumber) {
    return res.status(400).json({
      success: false,
      message: "cardNumber is required",
    });
  }

  // Validate type
  if (typeof cardNumber !== "string") {
    return res.status(400).json({
      success: false,
      message: "cardNumber must be a string",
    });
  }

  // Optional: basic sanitization (helps in real-world usage)
  const sanitizedCardNumber = cardNumber.trim();

  const isValid = cardService.validate(sanitizedCardNumber);

  return res.status(200).json({
    success: true,
    data: {
      cardNumber: sanitizedCardNumber,
      isValid,
    },
    message: isValid ? "Valid card number" : "Invalid card number",
  });
};
