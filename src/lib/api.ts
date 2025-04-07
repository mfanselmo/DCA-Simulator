const getBaseUrl = (marketId: string) =>
  process.env.NODE_ENV === "development"
    ? `http://localhost:8010/proxy/api/v2/markets/${marketId}/trades`
    : `https://api.cors.lol/?url=https://www.buda.com/api/v2/markets/${marketId}/trades`; // Temporary fix for CORS issue in production

type TradeResponse = {
  trades: {
    market_id: string;
    timestamp: number;
    last_timestamp: number;
    entries: [string, string, string, string][];
  };
};

/** GET latest price up until a given timestamp */
export const fetchLatestPrice = async (
  timestamp: number,
  marketId = "btc-clp",
) => {
  const result = await fetch(
    `${getBaseUrl(marketId)}?timestamp=${timestamp}&limit=1`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  );
  if (!result.ok) {
    throw new Error(`Error fetching trades: ${result.statusText}`);
  }
  const data = (await result.json()) as TradeResponse;

  if (!data.trades.entries) {
    throw new Error("No entries found in response");
  }

  const entries = data.trades.entries.map((trade) => ({
    timestamp: parseInt(trade[0]),
    amount: parseFloat(trade[1]),
    price: parseInt(trade[2]),
    direction: trade[3],
  }));

  return entries[0].price;
};
