import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  LineChart,
  PieChart,
  Download,
  Filter,
  Map,
  Table as TableIcon,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataVisualizationProps {
  title?: string;
  description?: string;
  dataType?: "crops" | "livestock" | "market" | "weather";
  data?: any;
}

const DataVisualization = ({
  title = "Agricultural Data Visualization",
  description = "Interactive visualization of agricultural data",
  dataType = "crops",
  data = null,
}: DataVisualizationProps) => {
  const [visualizationType, setVisualizationType] = useState("chart");
  const [chartType, setChartType] = useState("bar");
  const [timeRange, setTimeRange] = useState("month");
  const [region, setRegion] = useState("all");

  // Mock data for demonstration
  const mockCropData = [
    { crop: "Wheat", yield: 4.2, area: 1200, month: "Jan", region: "North" },
    { crop: "Rice", yield: 3.8, area: 980, month: "Jan", region: "Central" },
    { crop: "Corn", yield: 5.1, area: 1450, month: "Jan", region: "South" },
    { crop: "Barley", yield: 3.5, area: 850, month: "Jan", region: "East" },
    { crop: "Wheat", yield: 4.5, area: 1250, month: "Feb", region: "North" },
    { crop: "Rice", yield: 4.0, area: 1000, month: "Feb", region: "Central" },
    { crop: "Corn", yield: 5.3, area: 1500, month: "Feb", region: "South" },
    { crop: "Barley", yield: 3.7, area: 900, month: "Feb", region: "East" },
  ];

  const mockLivestockData = [
    { type: "Cattle", count: 12500, health: 92, region: "North" },
    { type: "Sheep", count: 28000, health: 88, region: "Central" },
    { type: "Goats", count: 15000, health: 90, region: "South" },
    { type: "Poultry", count: 85000, health: 85, region: "East" },
  ];

  const mockMarketData = [
    { product: "Wheat (ton)", price: 320, change: +5.2, volume: 1200 },
    { product: "Rice (ton)", price: 450, change: -2.1, volume: 980 },
    { product: "Corn (ton)", price: 280, change: +1.8, volume: 1450 },
    { product: "Cattle (head)", price: 1200, change: +0.5, volume: 350 },
    { product: "Sheep (head)", price: 180, change: -1.2, volume: 780 },
    { product: "Chicken (kg)", price: 3.5, change: +0.2, volume: 5200 },
  ];

  const mockWeatherData = [
    { region: "North", rainfall: 25, temperature: 22, humidity: 65 },
    { region: "Central", rainfall: 18, temperature: 26, humidity: 55 },
    { region: "South", rainfall: 12, temperature: 30, humidity: 45 },
    { region: "East", rainfall: 30, temperature: 20, humidity: 70 },
    { region: "West", rainfall: 22, temperature: 24, humidity: 60 },
  ];

  // Select the appropriate data based on dataType
  const getActiveData = () => {
    switch (dataType) {
      case "crops":
        return mockCropData;
      case "livestock":
        return mockLivestockData;
      case "market":
        return mockMarketData;
      case "weather":
        return mockWeatherData;
      default:
        return mockCropData;
    }
  };

  const activeData = data || getActiveData();

  // Render chart placeholder
  const renderChartPlaceholder = () => {
    return (
      <div className="flex flex-col items-center justify-center h-80 bg-muted/20 rounded-md border border-dashed border-muted">
        {chartType === "bar" && (
          <div className="flex items-end h-40 space-x-2 mb-4">
            {[0.4, 0.6, 0.8, 0.5, 0.7, 0.9, 0.6].map((height, i) => (
              <div
                key={i}
                className="w-10 bg-primary rounded-t"
                style={{ height: `${height * 100}%` }}
              />
            ))}
          </div>
        )}
        {chartType === "line" && (
          <div className="relative h-40 w-full max-w-md mb-4">
            <svg viewBox="0 0 100 50" className="w-full h-full">
              <path
                d="M0,40 L10,35 L20,30 L30,20 L40,25 L50,15 L60,20 L70,10 L80,15 L90,5 L100,10"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
              />
            </svg>
          </div>
        )}
        {chartType === "pie" && (
          <div className="h-40 w-40 rounded-full mb-4 overflow-hidden relative">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "conic-gradient(hsl(var(--primary)) 0% 25%, hsl(var(--secondary)) 25% 55%, hsl(var(--accent)) 55% 80%, hsl(var(--muted)) 80% 100%)",
              }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-16 w-16 rounded-full bg-background"></div>
            </div>
          </div>
        )}
        <p className="text-muted-foreground text-sm">
          {chartType.charAt(0).toUpperCase() + chartType.slice(1)} chart
          visualization for {dataType} data
        </p>
      </div>
    );
  };

  // Render map placeholder
  const renderMapPlaceholder = () => {
    return (
      <div className="flex flex-col items-center justify-center h-80 bg-muted/20 rounded-md border border-dashed border-muted">
        <div className="relative w-64 h-48 mb-4">
          <svg viewBox="0 0 100 60" className="w-full h-full">
            {/* Simplified country/region map outline */}
            <path
              d="M10,10 L30,5 L50,8 L70,12 L90,10 L95,30 L85,45 L70,50 L50,55 L30,45 L15,40 L10,25 Z"
              fill="hsl(var(--muted))"
              stroke="hsl(var(--border))"
              strokeWidth="1"
            />
            {/* Region markers */}
            <circle cx="25" cy="20" r="3" fill="hsl(var(--primary))" />
            <circle cx="45" cy="25" r="3" fill="hsl(var(--primary))" />
            <circle cx="65" cy="30" r="3" fill="hsl(var(--primary))" />
            <circle cx="75" cy="20" r="3" fill="hsl(var(--primary))" />
          </svg>
        </div>
        <p className="text-muted-foreground text-sm">
          Geographic visualization of {dataType} data by region
        </p>
      </div>
    );
  };

  // Render table with data
  const renderTable = () => {
    // Dynamically get headers from the first item in the data
    const headers = activeData.length > 0 ? Object.keys(activeData[0]) : [];

    return (
      <div className="h-80 overflow-auto border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header) => (
                <TableHead key={header}>
                  {header.charAt(0).toUpperCase() + header.slice(1)}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {activeData.map((item, index) => (
              <TableRow key={index}>
                {headers.map((header) => (
                  <TableCell key={`${index}-${header}`}>
                    {typeof item[header] === "number" && header === "change" ? (
                      <span
                        className={
                          item[header] > 0 ? "text-green-600" : "text-red-600"
                        }
                      >
                        {item[header] > 0 ? "+" : ""}
                        {item[header]}
                      </span>
                    ) : (
                      item[header]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  return (
    <Card className="w-full bg-background">
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>{title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Visualization controls */}
          <div className="flex flex-col sm:flex-row gap-4 pb-4">
            <Tabs
              defaultValue="chart"
              value={visualizationType}
              onValueChange={setVisualizationType}
              className="w-full sm:w-auto"
            >
              <TabsList className="grid grid-cols-3 w-full sm:w-[300px]">
                <TabsTrigger value="chart" className="flex items-center">
                  <BarChart className="h-4 w-4 mr-2" />
                  Chart
                </TabsTrigger>
                <TabsTrigger value="map" className="flex items-center">
                  <Map className="h-4 w-4 mr-2" />
                  Map
                </TabsTrigger>
                <TabsTrigger value="table" className="flex items-center">
                  <TableIcon className="h-4 w-4 mr-2" />
                  Table
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex flex-wrap gap-2">
              {visualizationType === "chart" && (
                <Select value={chartType} onValueChange={setChartType}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Chart Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bar">Bar Chart</SelectItem>
                    <SelectItem value="line">Line Chart</SelectItem>
                    <SelectItem value="pie">Pie Chart</SelectItem>
                  </SelectContent>
                </Select>
              )}

              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Daily</SelectItem>
                  <SelectItem value="week">Weekly</SelectItem>
                  <SelectItem value="month">Monthly</SelectItem>
                  <SelectItem value="year">Yearly</SelectItem>
                </SelectContent>
              </Select>

              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="north">North</SelectItem>
                  <SelectItem value="central">Central</SelectItem>
                  <SelectItem value="south">South</SelectItem>
                  <SelectItem value="east">East</SelectItem>
                  <SelectItem value="west">West</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Visualization content */}
          <div className="mt-4">
            {visualizationType === "chart" && renderChartPlaceholder()}
            {visualizationType === "map" && renderMapPlaceholder()}
            {visualizationType === "table" && renderTable()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataVisualization;
