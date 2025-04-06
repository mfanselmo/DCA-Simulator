import React, { useContext } from "react";
import { Input } from "./ui/input";
import { UserContext } from "@/lib/context";
import { Label } from "./ui/label";
import { DatePicker } from "./ui/datePicker";

const InputParams: React.FC = () => {
  const {
    amountToInvest,
    setAmountToInvest,
    startDate,
    setEndDate,
    endDate,
    setStartDate,
  } = useContext(UserContext);

  return (
    <div className="flex  flex-col md:flex-row gap-4">
      <div>
        <Label htmlFor="amount">Amount to invest each month (CLP)</Label>
        <Input
          name="amount"
          type="number"
          placeholder="Amount to invest"
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
    </div>
  );
};

export default InputParams;
