import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import React from "react";
import { formatPercentage, formatPrice, formatTimestamp } from "@/lib/utils";
import { MonthPortfolio } from "@/lib/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
type Props = {
  monthPortfolios: MonthPortfolio[];
};
const ResultsTable: React.FC<Props> = ({ monthPortfolios }) => {
  return (
    <Card className="grow">
      <CardHeader>
        <CardTitle>Investment over time</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Bitcoin Price</TableHead>
              <TableHead>Total Invested Amount</TableHead>
              <TableHead>Total portfolio worth</TableHead>
              <TableHead>Change</TableHead>
              <TableHead>Change Percentage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {monthPortfolios.map((month) => {
              if (month.price === undefined) {
                return (
                  <TableRow key={month.timestamp}>
                    <TableCell colSpan={6}>Loading...</TableCell>
                  </TableRow>
                );
              }

              const positiveChange = month.change >= 0;

              return (
                <TableRow key={month.timestamp}>
                  <TableCell>{formatTimestamp(month.timestamp)}</TableCell>
                  <TableCell>{formatPrice(month.price)}</TableCell>
                  <TableCell>{formatPrice(month.investedAmount)}</TableCell>
                  <TableCell>{formatPrice(month.portfolioValue)}</TableCell>
                  <TableCell
                    className={
                      positiveChange ? "text-green-500" : "text-red-500"
                    }
                  >
                    {formatPrice(month.change)}
                  </TableCell>
                  <TableCell
                    className={
                      positiveChange ? "text-green-500" : "text-red-500"
                    }
                  >
                    {formatPercentage(month.changePercentage)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ResultsTable;
