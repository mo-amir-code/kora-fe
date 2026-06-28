export const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  INR: "₹",
  EUR: "€",
  GBP: "£",
  CAD: "C$",
  AUD: "A$",
};

export function getCurrencySymbol(code?: string): string {
  if (!code) return "$";
  return CURRENCY_SYMBOLS[code.toUpperCase()] || code;
}

export function formatCurrencyAmount(amount: number | string, currencyCode: string = "USD"): string {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  if (isNaN(num)) return `${getCurrencySymbol(currencyCode)}0`;
  const symbol = getCurrencySymbol(currencyCode);
  const locale = currencyCode === "INR" ? "en-IN" : "en-US";
  return `${symbol}${num.toLocaleString(locale, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}
