import { format, parseISO } from "date-fns";

export const formatDate = (date: Date | string) => {
  const _date = typeof date === "string" ? parseISO(date) : date;

  return format(_date, "dd-MM-yyyy");
};

export const toCurrency = (number: number) => {
  const formatter = new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  });

  return formatter.format((number || 0) / 100);
};

export const toPercent = (number: number) => `${number.toFixed(2)}%`;
