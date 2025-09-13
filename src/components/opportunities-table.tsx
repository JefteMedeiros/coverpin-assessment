import { useLeads } from "@/store/LeadsContext";
import type { Opportunity } from "@/types/opportunity";
import { nameFormatter } from "@/utils/nameFormatter";
import { getStageColor } from "@/utils/stage-colors";
import { Badge } from "./ui/badge";
import { ErrorCard } from "./ui/error-card";
import { Skeleton } from "./ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

export function OpportunitiesTable() {
  const { data: leads, error, isLoading } = useLeads();

  const opportunities = leads.filter((lead) => lead.status === "Converted") as unknown as Opportunity[];

  if (error) {
    return (
      <ErrorCard
        title="Failed to load opportunities"
        message="There was an error loading the opportunities data. Please try again later."
      />
    );
  }

  if (!isLoading && opportunities.length === 0) {
    return (
      <div className="p-4 bg-zinc-800 space-y-4 rounded-lg">
        <p className="text-center py-8 text-muted-foreground">No opportunities found. Convert some leads to see them here.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-zinc-800 space-y-4 rounded-lg">
      <div className="rounded-md border border-zinc-500 bg-zinc-800 overflow-auto max-h-[500px] md:max-h-none">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Account Name</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead className="hidden md:table-cell">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <Loading />
            ) : (
              opportunities.map((opportunity) => (
                <TableRow
                  key={opportunity.id}
                  className="hover:bg-muted/20 transition-colors"
                >
                  <TableCell title={opportunity.name}>
                    {nameFormatter(opportunity.name)}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {opportunity.accountName}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={getStageColor[opportunity.stage]} 
                      variant="default"
                    >
                      {opportunity.stage}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {opportunity.amount 
                      ? new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD'
                        }).format(opportunity.amount)
                      : '—'
                    }
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function Loading() {
  return Array.from({ length: 5 }, () => (
    <TableRow key={`skeleton-${Math.random()}`}>
      <TableCell>
        <Skeleton className="h-4 w-32" />
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Skeleton className="h-4 w-24" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-6 w-20 rounded-full" />
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Skeleton className="h-4 w-16" />
      </TableCell>
    </TableRow>
  ));
}