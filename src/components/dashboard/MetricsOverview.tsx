import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BarChart3Icon,
  LineChartIcon,
  DropletIcon,
  SunIcon,
  LeafIcon,
  Wheat,
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  chartData?: React.ReactNode;
}

const MetricCard = ({
  title,
  value,
  change,
  icon,
  chartData,
}: MetricCardProps) => {
  const isPositive = change >= 0;

  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center pt-1 text-xs">
          {isPositive ? (
            <ArrowUpIcon className="mr-1 h-3 w-3 text-green-500" />
          ) : (
            <ArrowDownIcon className="mr-1 h-3 w-3 text-red-500" />
          )}
          <span className={isPositive ? "text-green-500" : "text-red-500"}>
            {Math.abs(change)}%
          </span>
          <span className="text-muted-foreground ml-1">from last month</span>
        </div>
        <div className="mt-3 h-10">{chartData}</div>
      </CardContent>
    </Card>
  );
};

const MetricsOverview = () => {
  // Mock data for the metrics
  const metrics = [
    {
      title: "Crop Yields",
      value: "4.2 tons/ha",
      change: 12.5,
      icon: <Wheat className="h-4 w-4" />,
      chartData: (
        <div className="h-full w-full bg-gradient-to-r from-green-100 to-green-300 rounded-sm"></div>
      ),
    },
    {
      title: "Livestock Health",
      value: "92%",
      change: -2.3,
      icon: <BarChart3Icon className="h-4 w-4" />,
      chartData: (
        <div className="h-full w-full bg-gradient-to-r from-blue-100 to-blue-300 rounded-sm"></div>
      ),
    },
    {
      title: "Market Prices",
      value: "$1,245",
      change: 8.1,
      icon: <LineChartIcon className="h-4 w-4" />,
      chartData: (
        <div className="h-full w-full bg-gradient-to-r from-purple-100 to-purple-300 rounded-sm"></div>
      ),
    },
    {
      title: "Water Resources",
      value: "78%",
      change: -5.2,
      icon: <DropletIcon className="h-4 w-4" />,
      chartData: (
        <div className="h-full w-full bg-gradient-to-r from-cyan-100 to-cyan-300 rounded-sm"></div>
      ),
    },
    {
      title: "Weather Conditions",
      value: "28°C",
      change: 3.7,
      icon: <SunIcon className="h-4 w-4" />,
      chartData: (
        <div className="h-full w-full bg-gradient-to-r from-yellow-100 to-yellow-300 rounded-sm"></div>
      ),
    },
    {
      title: "Pest Activity",
      value: "Low",
      change: -15.0,
      icon: <LeafIcon className="h-4 w-4" />,
      chartData: (
        <div className="h-full w-full bg-gradient-to-r from-red-100 to-red-300 rounded-sm"></div>
      ),
    },
  ];

  return (
    <div className="w-full bg-background p-4 rounded-lg">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-2xl font-bold">Key Metrics Overview</h2>
          <div className="flex space-x-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="north">Northern Region</SelectItem>
                <SelectItem value="central">Central Region</SelectItem>
                <SelectItem value="south">Southern Region</SelectItem>
                <SelectItem value="east">Eastern Region</SelectItem>
                <SelectItem value="west">Western Region</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="month">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Daily</SelectItem>
                <SelectItem value="week">Weekly</SelectItem>
                <SelectItem value="month">Monthly</SelectItem>
                <SelectItem value="quarter">Quarterly</SelectItem>
                <SelectItem value="year">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Metrics</TabsTrigger>
            <TabsTrigger value="crops">Crops</TabsTrigger>
            <TabsTrigger value="livestock">Livestock</TabsTrigger>
            <TabsTrigger value="market">Market</TabsTrigger>
            <TabsTrigger value="environment">Environment</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {metrics.map((metric, index) => (
                <MetricCard
                  key={index}
                  title={metric.title}
                  value={metric.value}
                  change={metric.change}
                  icon={metric.icon}
                  chartData={metric.chartData}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="crops" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {metrics.slice(0, 1).map((metric, index) => (
                <MetricCard
                  key={index}
                  title={metric.title}
                  value={metric.value}
                  change={metric.change}
                  icon={metric.icon}
                  chartData={metric.chartData}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="livestock" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {metrics.slice(1, 2).map((metric, index) => (
                <MetricCard
                  key={index}
                  title={metric.title}
                  value={metric.value}
                  change={metric.change}
                  icon={metric.icon}
                  chartData={metric.chartData}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="market" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {metrics.slice(2, 3).map((metric, index) => (
                <MetricCard
                  key={index}
                  title={metric.title}
                  value={metric.value}
                  change={metric.change}
                  icon={metric.icon}
                  chartData={metric.chartData}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="environment" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {metrics.slice(3, 6).map((metric, index) => (
                <MetricCard
                  key={index}
                  title={metric.title}
                  value={metric.value}
                  change={metric.change}
                  icon={metric.icon}
                  chartData={metric.chartData}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MetricsOverview;
