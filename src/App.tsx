import { useState } from "react";
import InputParams from "./components/InputParams";
import { UserContext } from "./lib/context";
import { useMonthlyPrices, usePortfolioValue } from "./lib/hooks";
import ResultsTable from "./components/ResultsTable";
import {} from "./lib/hooks";
import ResultsChart from "./components/ResultsChart";
import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert";
import { AlertCircle } from "lucide-react";

function App() {
  const { prices, isError } = useMonthlyPrices("btc-clp");
  const monthPortfolios = usePortfolioValue(prices);

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <h1 className="text-2xl mb-6">DCA Simulator</h1>
      <InputParams />
      {isError ? (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            The API call has failed. Do you have CORS set up correctly?? For
            this demo you can try this web extension:
            <br />
            <a
              href="https://chromewebstore.google.com/detail/moesif-origincors-changer/digfbfaphojjndkpccljibejjbppifbc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Moesif Origin & CORS Changer
            </a>
          </AlertDescription>
        </Alert>
      ) : (
        <div className="mt-4 flex lg:flex-row flex-col gap-4">
          <ResultsTable monthPortfolios={monthPortfolios} />
          <ResultsChart monthPortfolios={monthPortfolios} />
        </div>
      )}
    </div>
  );
}

const AppWithContext = () => {
  const [amountToInvest, setAmountToInvest] = useState(100000);
  const [marketId, setMarketId] = useState("btc-clp");
  const [startDate, setStartDate] = useState(
    new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
  );
  const [endDate, setEndDate] = useState(new Date());
  const [fixCors, setFixCors] = useState(false);

  return (
    <UserContext.Provider
      value={{
        amountToInvest,
        setAmountToInvest,
        marketId,
        setMarketId,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        fixCors,
        setFixCors,
      }}
    >
      <App />
    </UserContext.Provider>
  );
};

export default AppWithContext;
