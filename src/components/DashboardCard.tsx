// src/components/DashboardCard.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { type LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  count: number;
  Icon: LucideIcon;
  className?: string;
}

export default function DashboardCard({ title, count, Icon, className }: DashboardCardProps) {
  return (
    <Card className={`transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{count}</div>
      </CardContent>
    </Card>
  );
}