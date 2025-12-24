import { describe, expect, it } from "vitest";
import { formatPrice } from "./format-price";

describe("formatPrice", () => {
  it("formats positive integers correctly", () => {
    expect(formatPrice(100)).toBe("€\u00A0100,00");
    expect(formatPrice(1000)).toBe("€\u00A01.000,00");
    expect(formatPrice(12345)).toBe("€\u00A012.345,00");
  });

  it("formats decimal numbers correctly", () => {
    expect(formatPrice(99.99)).toBe("€\u00A099,99");
    expect(formatPrice(10.5)).toBe("€\u00A010,50");
    expect(formatPrice(0.99)).toBe("€\u00A00,99");
  });

  it("formats zero correctly", () => {
    expect(formatPrice(0)).toBe("€\u00A00,00");
  });

  it("formats large numbers correctly", () => {
    expect(formatPrice(1000000)).toBe("€\u00A01.000.000,00");
    expect(formatPrice(1234567.89)).toBe("€\u00A01.234.567,89");
  });

  it("formats small decimal numbers correctly", () => {
    expect(formatPrice(0.01)).toBe("€\u00A00,01");
    expect(formatPrice(0.1)).toBe("€\u00A00,10");
  });

  it("handles numbers with many decimal places", () => {
    expect(formatPrice(123.456789)).toBe("€\u00A0123,46"); // Rounded to 2 decimals
  });
});
