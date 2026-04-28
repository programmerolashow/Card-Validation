import { isValidCard } from "./luhn";

describe("Luhn Algorithm", () => {
  it("should validate a correct card number", () => {
    expect(isValidCard("4532015112830366")).toBe(true);
  });

  it("should invalidate a wrong card number", () => {
    expect(isValidCard("1234567890123456")).toBe(false);
  });
});
