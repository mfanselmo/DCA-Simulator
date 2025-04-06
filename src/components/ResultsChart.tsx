import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import React from "react";
import { MonthPortfolio } from "@/lib/hooks";
import { formatPrice, formatTimestamp } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const chartConfig = {
  portfolioValue: {
    label: "Portfolio value",
    color: "#2563eb",
  },
  investedAmount: {
    label: "Total Invested amount",
    color: "#f97316",
  },
  timestamp: {
    label: "Date",
    color: "#000000",
  },
} satisfies ChartConfig;

type Props = {
  monthPortfolios: MonthPortfolio[];
};

const ResultsChart: React.FC<Props> = ({ monthPortfolios }) => {
  return (
    <Card className="grow">
      <CardHeader>
        <CardTitle>Investment over time</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <LineChart accessibilityLayer data={monthPortfolios}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" tickFormatter={formatTimestamp} />
            <YAxis tickFormatter={formatPrice} />

            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={formatTimestamp}
                  formatter={(value, name) =>
                    `${chartConfig[name as keyof typeof chartConfig].label}: ${formatPrice(value as number)}`
                  }
                />
              }
            />
            <ChartLegend content={<ChartLegendContent />} />

            <Line
              dataKey="portfolioValue"
              stroke="var(--color-portfolioValue)"
            />
            <Line
              dataKey="investedAmount"
              stroke="var(--color-investedAmount)"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ResultsChart;
