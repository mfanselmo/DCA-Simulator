import { useQueries } from "@tanstack/react-query";
import { fetchLatestPrice } from "./api";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { UserContext } from "./context";
import { useContext } from "react";
dayjs.extend(utc);

export type MonthPortfolio = {
  timestamp: number;
  price: undefined | number;
  portfolioValue: number;
  investedAmount: number;
  change: number;
  changePercentage: number;
  bitcoinAmount: number;
};

export function useMonthlyPrices(marketId: string) {
  const { startDate, endDate, fixCors } = useContext(UserContext);

  const start = dayjs.utc(startDate).startOf("month").hour(12);
  const end = dayjs.utc(endDate).startOf("month").hour(12);

  const timestamps: number[] = [];
  let current = start;
  while (current.isBefore(end) || current.isSame(end, "month")) {
    timestamps.push(current.valueOf());
    current = current.add(1, "month");
  }

  const queries = useQueries({
    queries: timestamps.map((timestamp) => ({
      queryKey: ["price-at", marketId, timestamp, fixCors],
      queryFn: () => fetchLatestPrice(timestamp, marketId, fixCors),
    })),
  });

  const prices = queries.map((query, index) => {
    const timestamp = timestamps[index];
    return {
      timestamp,
      price: query.data,
    };
  });

  const isError = queries.some((query) => query.isError);

  return {
    prices,
    isError,
  };
}

export function usePortfolioValue(
  prices: { timestamp: number; price: undefined | number }[],
): MonthPortfolio[] {
  const { amountToInvest } = useContext(UserContext);
  const monthPortfolios: MonthPortfolio[] = [];

  prices.forEach((price, index) => {
    if (price.price === undefined || Number.isNaN(amountToInvest)) {
      monthPortfolios.push({
        ...price,
        portfolioValue: 0,
        change: 0,
        bitcoinAmount: 0,
        investedAmount: 0,
        changePercentage: 0,
      });
      return;
    }

    if (index === 0) {
      const bitcoinAmount = amountToInvest / price.price;
      const portfolioValue = bitcoinAmount * price.price;
      monthPortfolios.push({
        ...price,
        portfolioValue,
        change: 0,
        changePercentage: 0,
        bitcoinAmount,
        investedAmount: amountToInvest,
      });
      return;
    }

    const prevMonthData = monthPortfolios[index - 1];
    const investedAmount = amountToInvest * (index + 1);
    const bitcoinAmount =
      prevMonthData.bitcoinAmount + amountToInvest / price.price;
    const portfolioValue = bitcoinAmount * price.price;
    const change = portfolioValue - investedAmount;
    monthPortfolios.push({
      ...price,
      portfolioValue,
      change,
      investedAmount,
      bitcoinAmount,
      changePercentage: 100 * (portfolioValue / investedAmount - 1),
    });
  });
  return monthPortfolios;
}
