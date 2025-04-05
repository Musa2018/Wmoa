import React, { useState } from "react";
import {
  Bell,
  Filter,
  Check,
  AlertTriangle,
  TrendingDown,
  CloudRain,
  Bug,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface Alert {
  id: string;
  type: "weather" | "pest" | "market";
  severity: "low" | "medium" | "high";
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  region: string;
}

const AlertsPanel = ({ alerts = defaultAlerts }: { alerts?: Alert[] }) => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [filteredAlerts, setFilteredAlerts] = useState<Alert[]>(alerts);

  // Filter alerts based on active tab
  React.useEffect(() => {
    if (activeTab === "all") {
      setFilteredAlerts(alerts);
    } else {
      setFilteredAlerts(alerts.filter((alert) => alert.type === activeTab));
    }
  }, [activeTab, alerts]);

  const markAsRead = (id: string) => {
    // In a real app, this would update the state and possibly call an API
    console.log(`Marking alert ${id} as read`);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-destructive text-destructive-foreground";
      case "medium":
        return "bg-warning text-warning-foreground";
      case "low":
        return "bg-info text-info-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "weather":
        return <CloudRain className="h-4 w-4" />;
      case "pest":
        return <Bug className="h-4 w-4" />;
      case "market":
        return <TrendingDown className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <Card className="h-full bg-background">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Alert Notifications
        </CardTitle>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </CardHeader>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <div className="px-6">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="weather">Weather</TabsTrigger>
            <TabsTrigger value="pest">Pests</TabsTrigger>
            <TabsTrigger value="market">Market</TabsTrigger>
          </TabsList>
        </div>

        <CardContent className="pt-4">
          <TabsContent value="all" className="m-0">
            <AlertsList
              alerts={filteredAlerts}
              markAsRead={markAsRead}
              getSeverityColor={getSeverityColor}
              getAlertIcon={getAlertIcon}
            />
          </TabsContent>

          <TabsContent value="weather" className="m-0">
            <AlertsList
              alerts={filteredAlerts}
              markAsRead={markAsRead}
              getSeverityColor={getSeverityColor}
              getAlertIcon={getAlertIcon}
            />
          </TabsContent>

          <TabsContent value="pest" className="m-0">
            <AlertsList
              alerts={filteredAlerts}
              markAsRead={markAsRead}
              getSeverityColor={getSeverityColor}
              getAlertIcon={getAlertIcon}
            />
          </TabsContent>

          <TabsContent value="market" className="m-0">
            <AlertsList
              alerts={filteredAlerts}
              markAsRead={markAsRead}
              getSeverityColor={getSeverityColor}
              getAlertIcon={getAlertIcon}
            />
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};

interface AlertsListProps {
  alerts: Alert[];
  markAsRead: (id: string) => void;
  getSeverityColor: (severity: string) => string;
  getAlertIcon: (type: string) => React.ReactNode;
}

const AlertsList = ({
  alerts,
  markAsRead,
  getSeverityColor,
  getAlertIcon,
}: AlertsListProps) => {
  if (alerts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <Bell className="h-10 w-10 text-muted-foreground mb-2" />
        <p className="text-muted-foreground">No alerts in this category</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[500px] pr-4">
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="relative">
            <div
              className={`p-4 rounded-lg border ${!alert.read ? "bg-accent/20" : ""}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-full ${getSeverityColor(alert.severity)}`}
                  >
                    {getAlertIcon(alert.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{alert.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {alert.region}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {alert.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {alert.timestamp}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {!alert.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => markAsRead(alert.id)}
                    >
                      <Check className="h-4 w-4" />
                      <span className="sr-only">Mark as read</span>
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Dismiss</span>
                  </Button>
                </div>
              </div>
            </div>
            <Separator className="my-4" />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

// Mock data for alerts
const defaultAlerts: Alert[] = [
  {
    id: "1",
    type: "weather",
    severity: "high",
    title: "Heavy Rainfall Warning",
    description:
      "Expected heavy rainfall in Northern regions. Potential flooding risk for low-lying crop areas.",
    timestamp: "Today, 08:30 AM",
    read: false,
    region: "Northern Region",
  },
  {
    id: "2",
    type: "pest",
    severity: "high",
    title: "Locust Swarm Detected",
    description:
      "Large locust swarms reported moving toward Eastern agricultural zones. Immediate action required.",
    timestamp: "Yesterday, 04:15 PM",
    read: false,
    region: "Eastern Region",
  },
  {
    id: "3",
    type: "market",
    severity: "medium",
    title: "Wheat Price Fluctuation",
    description:
      "Wheat prices have dropped by 12% in the last 24 hours due to increased international imports.",
    timestamp: "2 days ago, 10:45 AM",
    read: true,
    region: "National",
  },
  {
    id: "4",
    type: "weather",
    severity: "medium",
    title: "Drought Conditions",
    description:
      "Persistent drought conditions expected to continue in Southern regions for the next 2 weeks.",
    timestamp: "3 days ago, 09:20 AM",
    read: true,
    region: "Southern Region",
  },
  {
    id: "5",
    type: "pest",
    severity: "low",
    title: "Aphid Infestation Alert",
    description:
      "Increasing aphid populations detected in citrus orchards. Early intervention recommended.",
    timestamp: "4 days ago, 02:30 PM",
    read: false,
    region: "Western Region",
  },
  {
    id: "6",
    type: "market",
    severity: "high",
    title: "Olive Oil Export Opportunity",
    description:
      "New trade agreement opens significant export opportunities for olive oil producers.",
    timestamp: "5 days ago, 11:00 AM",
    read: true,
    region: "National",
  },
  {
    id: "7",
    type: "weather",
    severity: "low",
    title: "Frost Advisory",
    description:
      "Light frost expected in highland areas. Protect sensitive crops.",
    timestamp: "6 days ago, 07:45 PM",
    read: false,
    region: "Highland Region",
  },
];

export default AlertsPanel;
