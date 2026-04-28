import { isValidCard } from "../utils/luhn";

export class CardService {
  validate(cardNumber: string) {
    return isValidCard(cardNumber);
  }
}