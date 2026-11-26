import { ReceiptText, Wallet } from "lucide-react";

import PageHeader from "@/components/dashboard/PageHeader";
import StatCard from "@/components/dashboard/StatCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { transactions } from "@/components/dashboard/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const successful = transactions.filter((item) => item.status === "Paid");
const collected = successful.reduce((total, item) => total + item.amount, 0);

export default function AdminTransactionsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Transactions"
        description="A read-only ledger of salon payments."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard
          label="Total Successful Payments"
          value={String(successful.length)}
          hint="Verified payments only"
          icon={Wallet}
        />
        <StatCard
          label="Amount collected"
          value={`$${collected.toFixed(2)}`}
          hint="Paid transactions only"
          icon={ReceiptText}
        />
      </div>

      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle>Payment history</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reference</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Appointment</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Session</TableHead>
                  <TableHead>Payment status</TableHead>
                  <TableHead>Transaction date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>
                      <p>{item.customer}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.customerEmail}
                      </p>
                    </TableCell>
                    <TableCell>{item.service}</TableCell>
                    <TableCell>{item.appointmentDate}</TableCell>
                    <TableCell>
                      {item.currency} ${item.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-xs" title={item.sessionId}>
                        {item.sessionId.slice(0, 12)}…
                      </span>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={item.status} />
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {item.date}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
