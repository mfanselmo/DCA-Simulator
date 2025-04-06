// src/hooks/usePortfolioValue.test.ts

import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import React, { ReactNode } from "react";
import { UserContext } from "@/lib/context";
import { usePortfolioValue } from "@/lib/hooks";

const mockPrices = [
  { timestamp: 1, price: 100 }, // Buys 1
  { timestamp: 2, price: 200 }, // Buys 0.5
  { timestamp: 3, price: 50 }, // Buys 2
  { timestamp: 4, price: 400 }, // Buys 0.25
];

const expectedPortfolios = [
  {
    timestamp: 1,
    price: 100,
    portfolioValue: 100,
    change: 0,
    changePercentage: 0,
    bitcoinAmount: 1,
    investedAmount: 100,
  },
  {
    timestamp: 2,
    price: 200,
    portfolioValue: 300,
    change: 100,
    changePercentage: 50,
    bitcoinAmount: 1.5,
    investedAmount: 200,
  },
  {
    timestamp: 3,
    price: 50,
    portfolioValue: 175,
    change: -125,
    changePercentage: -41.666666666666664,
    bitcoinAmount: 3.5,
    investedAmount: 300,
  },
  {
    timestamp: 4,
    price: 400,
    portfolioValue: 1500,
    change: 1100,
    changePercentage: 275,
    bitcoinAmount: 3.75,
    investedAmount: 400,
  },
];

const mockAmountToInvest = 100;

const createWrapper = (
  amountToInvest: number,
): React.FC<{ children: ReactNode }> => {
  return ({ children }) => (
    <UserContext.Provider value={{ amountToInvest } as any}>
      {children}
    </UserContext.Provider>
  );
};

// --- Tests ---

describe("usePortfolioValue Hook", () => {
  it("should return an empty array if prices array is empty", () => {
    const wrapper = createWrapper(mockAmountToInvest);
    const { result } = renderHook(() => usePortfolioValue([]), { wrapper });
    expect(result.current).toEqual([]);
  });

  it("should calculate portfolio values correctly for given prices", () => {
    const wrapper = createWrapper(mockAmountToInvest);
    const { result } = renderHook(() => usePortfolioValue(mockPrices), {
      wrapper,
    });

    const portfolios = result.current;

    expect(portfolios).toHaveLength(mockPrices.length);

    portfolios.forEach((portfolio, index) => {
      expect(portfolio).toEqual(expectedPortfolios[index]);
    });
  });

  it("should handle undefined prices correctly", () => {
    const wrapper = createWrapper(mockAmountToInvest);
    const pricesWithUndefined = [
      ...mockPrices,
      { timestamp: 5, price: undefined }, // Price is loading
    ];
    const { result } = renderHook(
      () => usePortfolioValue(pricesWithUndefined),
      { wrapper },
    );

    const portfolios = result.current;

    expect(portfolios).toHaveLength(pricesWithUndefined.length);

    portfolios.forEach((portfolio, index) => {
      if (index < pricesWithUndefined.length - 1) {
        expect(portfolio).toEqual(expectedPortfolios[index]);
      } else {
        expect(portfolio).toEqual({
          timestamp: 5,
          price: undefined,
          portfolioValue: 0,
          change: 0,
          changePercentage: 0,
          bitcoinAmount: 0,
          investedAmount: 0,
        });
      }
    });
  });
});
