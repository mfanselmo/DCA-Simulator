import React, { useContext } from "react";
import { Input } from "./ui/input";
import { UserContext } from "@/lib/context";
import { Label } from "./ui/label";
import { DatePicker } from "./ui/datePicker";
import { Switch } from "./ui/switch";

const InputParams: React.FC = () => {
  const {
    amountToInvest,
    setAmountToInvest,
    startDate,
    setEndDate,
    endDate,
    setStartDate,
    fixCors,
    setFixCors,
    marketId,
    setMarketId,
  } = useContext(UserContext);

  return (
    <div className="flex flex-col md:flex-row gap-4 items-end">
      <div>
        <Label htmlFor="market">Market</Label>
        <select
          id="market"
          value={marketId}
          onChange={e => setMarketId(e.target.value)}
          className="block w-full border rounded px-2 py-1 mt-1"
        >
          <option value="btc-clp">BTC-CLP</option>
          <option value="eth-clp">ETH-CLP</option>
        </select>
      </div>
      <div>
        <Label htmlFor="amount">Amount to invest each month ({marketId.split('-')[1].toUpperCase()})</Label>
        <Input
          id="amount"
          type="number"
          placeholder="Amount to invest"
      <div>
        <Label htmlFor="market">Market</Label>
        <select
          id="market"
          value={marketId}
          onChange={e => setMarketId(e.target.value)}
          className="block w-full border rounded px-2 py-1 mt-1"
        >
          <option value="btc-clp">BTC-CLP</option>
          <option value="eth-clp">ETH-CLP</option>
        </select>
      </div>
          value={amountToInvest}
          onChange={(e) => setAmountToInvest(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <Label>Start date</Label>
        <DatePicker date={startDate} setDate={setStartDate} />
      </div>
      <div>
        <Label>End date</Label>
        <DatePicker date={endDate} setDate={setEndDate} />
      </div>
      <div>
        <Label htmlFor="fix-cors">Fix CORS</Label>
        <Switch id="fix-cors" checked={fixCors} onCheckedChange={setFixCors} />
      </div>
    </div>
  );
};

export default InputParams;
