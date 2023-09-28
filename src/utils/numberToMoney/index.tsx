export const numberToMoney = (
  number: number | string | null | undefined
): string => {
  if (!Number.isSafeInteger(number)) {
    return `N/A`;
  }
  if (!number && number !== 0) return "N/A";

  if (typeof number === "string") {
    number = Number.parseFloat(number);
  }

  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  });

  const money = formatter.format(number);
  return money;
};
