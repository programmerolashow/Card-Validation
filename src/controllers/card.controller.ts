import { Request, Response } from "express";
import { CardService } from "../services/card.service";

const service = new CardService();

export const validateCard = (req: Request, res: Response) => {
  const { cardNumber } = req.body;

  if (!cardNumber) {
    return res.status(400).json({
      valid: false,
      message: "cardNumber is required"
    });
  }

  if (typeof cardNumber !== "string") {
    return res.status(400).json({
      valid: false,
      message: "cardNumber must be a string"
    });
  }

  const isValid = service.validate(cardNumber);

  return res.status(200).json({
    valid: isValid,
    message: isValid ? "Valid card number" : "Invalid card number"
  });
};