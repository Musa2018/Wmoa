import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Globe,
  BarChart2,
  AlertTriangle,
  Users,
  Leaf,
  MapPin,
  DollarSign,
  BookOpen,
} from "lucide-react";
import DashboardLayout from "./dashboard/DashboardLayout";
import MetricsOverview from "./dashboard/MetricsOverview";
import AlertsPanel from "./dashboard/AlertsPanel";
import DataVisualization from "./dashboard/DataVisualization";
import DatabaseConnectionStatus from "./DatabaseConnectionStatus";

const Home = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [language, setLanguage] = useState("en"); // 'en' for English, 'ar' for Arabic
  const navigate = useNavigate();

  // Mock data for quick access cards
  const quickAccessItems = [
    {
      id: "crops",
      title: "Crops Subsystem",
      icon: <Leaf className="h-6 w-6" />,
      description: "Manage crop data, planting schedules, and yields",
    },
    {
      id: "livestock",
      title: "Livestock Subsystem",
      icon: <Users className="h-6 w-6" />,
      description:
        "Track livestock health, veterinary programs, and production",
    },
    {
      id: "market",
      title: "Market Prices",
      icon: <DollarSign className="h-6 w-6" />,
      description: "Monitor real-time agricultural market prices",
    },
    {
      id: "gis",
      title: "GIS Maps",
      icon: <MapPin className="h-6 w-6" />,
      description: "View interactive agricultural maps and land use data",
    },
    {
      id: "regulations",
      title: "Regulations",
      icon: <BookOpen className="h-6 w-6" />,
      description: "Access agricultural laws, policies, and guidelines",
    },
  ];

  // Mock data for metrics
  const metricsData = [
    {
      id: "crop-yield",
      title: "Crop Yield",
      value: "4.2M",
      unit: "tons",
      change: "+5.3%",
      trend: "up",
    },
    {
      id: "livestock-health",
      title: "Livestock Health Index",
      value: "87",
      unit: "%",
      change: "+2.1%",
      trend: "up",
    },
    {
      id: "market-prices",
      title: "Avg. Market Price",
      value: "2.34",
      unit: "JOD/kg",
      change: "-1.2%",
      trend: "down",
    },
    {
      id: "water-resources",
      title: "Water Resources",
      value: "68",
      unit: "%",
      change: "-3.5%",
      trend: "down",
    },
    {
      id: "active-projects",
      title: "Active Projects",
      value: "142",
      unit: "",
      change: "+12",
      trend: "up",
    },
    {
      id: "registered-farmers",
      title: "Registered Farmers",
      value: "24.5K",
      unit: "",
      change: "+320",
      trend: "up",
    },
  ];

  // Mock data for alerts
  const alertsData = [
    {
      id: 1,
      type: "weather",
      severity: "high",
      title: "Drought Warning",
      message:
        "Potential drought conditions expected in Northern regions over the next 2 weeks",
      timestamp: "2023-06-15T09:30:00Z",
    },
    {
      id: 2,
      type: "pest",
      severity: "medium",
      title: "Locust Sightings",
      message: "Locust swarms reported in Eastern agricultural zones",
      timestamp: "2023-06-14T14:45:00Z",
    },
    {
      id: 3,
      type: "market",
      severity: "low",
      title: "Wheat Price Increase",
      message: "Wheat prices have increased by 8% in the last week",
      timestamp: "2023-06-13T11:20:00Z",
    },
    {
      id: 4,
      type: "weather",
      severity: "medium",
      title: "Heavy Rain Alert",
      message:
        "Heavy rainfall expected in Central regions - potential flooding risk",
      timestamp: "2023-06-12T16:10:00Z",
    },
    {
      id: 5,
      type: "pest",
      severity: "high",
      title: "Tomato Leaf Miner",
      message: "Outbreak of tomato leaf miner reported in Southern greenhouses",
      timestamp: "2023-06-11T08:15:00Z",
    },
  ];

  // Mock data for visualizations
  const visualizationData = {
    crops: [
      { month: "Jan", wheat: 4000, barley: 2400, vegetables: 2400 },
      { month: "Feb", wheat: 3000, barley: 1398, vegetables: 2210 },
      { month: "Mar", wheat: 2000, barley: 9800, vegetables: 2290 },
      { month: "Apr", wheat: 2780, barley: 3908, vegetables: 2000 },
      { month: "May", wheat: 1890, barley: 4800, vegetables: 2181 },
      { month: "Jun", wheat: 2390, barley: 3800, vegetables: 2500 },
    ],
    regions: [
      { name: "North", area: 4000, production: 2400 },
      { name: "Central", area: 3000, production: 1398 },
      { name: "South", area: 2000, production: 9800 },
      { name: "East", area: 2780, production: 3908 },
      { name: "West", area: 1890, production: 4800 },
    ],
  };

  return (
    <div
      className="min-h-screen bg-background"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <DashboardLayout
        language={language}
        onLanguageChange={setLanguage}
        userName="Ahmed Hassan"
        userRole="Agricultural Specialist"
      >
        <div className="p-6 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {language === "en"
                  ? "Agricultural Dashboard"
                  : "لوحة معلومات الزراعة"}
              </h1>
              <p className="text-muted-foreground mt-1">
                {language === "en"
                  ? "Welcome to the Integrated Agricultural Information System"
                  : "مرحبًا بك في نظام المعلومات الزراعية المتكامل"}
              </p>
            </div>

            <Tabs
              defaultValue="overview"
              className="w-full md:w-auto"
              onValueChange={setActiveTab}
            >
              <TabsList>
                <TabsTrigger value="overview">
                  <BarChart2 className="h-4 w-4 mr-2" />
                  {language === "en" ? "Overview" : "نظرة عامة"}
                </TabsTrigger>
                <TabsTrigger value="alerts">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  {language === "en" ? "Alerts" : "تنبيهات"}
                </TabsTrigger>
                <TabsTrigger value="data">
                  <Globe className="h-4 w-4 mr-2" />
                  {language === "en" ? "Data" : "بيانات"}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Database Connection Status */}
          <DatabaseConnectionStatus />

          {/* Metrics Overview Section */}
          <MetricsOverview metrics={metricsData} language={language} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-6">
              {activeTab === "overview" && (
                <>
                  <h2 className="text-2xl font-semibold">
                    {language === "en" ? "Quick Access" : "وصول سريع"}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {quickAccessItems.map((item) => (
                      <Card
                        key={item.id}
                        className="hover:shadow-md transition-shadow"
                      >
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-lg font-medium">
                            {language === "en"
                              ? item.title
                              : `نظام ${item.title}`}
                          </CardTitle>
                          <div className="p-2 bg-primary/10 rounded-full">
                            {item.icon}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            {language === "en"
                              ? item.description
                              : `وصف ${item.id}`}
                          </p>
                          <Button
                            variant="outline"
                            className="w-full mt-4"
                            onClick={() => navigate(`/${item.id}`)}
                          >
                            {language === "en" ? "Access" : "الوصول"}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              )}

              {activeTab === "data" && (
                <DataVisualization
                  data={visualizationData}
                  language={language}
                />
              )}

              {activeTab === "alerts" && (
                <div className="md:hidden">
                  {" "}
                  {/* Only show on mobile when alerts tab is active */}
                  <AlertsPanel alerts={alertsData} language={language} />
                </div>
              )}
            </div>

            {/* Alerts Panel - Always visible on desktop, conditionally on mobile */}
            <div
              className={`${activeTab !== "alerts" ? "hidden md:block" : ""}`}
            >
              <AlertsPanel alerts={alertsData} language={language} />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default Home;
