import { isValidCard } from "../utils/luhn";

export class CardService {
  /**
   * Validates a given card number using the Luhn algorithm.
   * @param cardNumber - The card number string to validate.
   * @returns boolean indicating if the card is valid.
   */
  public validate(cardNumber: string): boolean {
    return isValidCard(cardNumber);
  }
}