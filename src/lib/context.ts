import { createContext } from "react";

type UserContext = {
  amountToInvest: number;
  setAmountToInvest: (amount: number) => void;
  marketId: string;
  setMarketId: (marketId: string) => void;
  startDate: Date;
  setStartDate: (date: Date) => void;
  endDate: Date;
  setEndDate: (date: Date) => void;
};

export const UserContext = createContext<UserContext>({
  amountToInvest: 100000,
  setAmountToInvest: () => {},
  marketId: "btc-clp",
  setMarketId: () => {},
  startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
  setStartDate: () => {},
  endDate: new Date(),
  setEndDate: () => {},
});
