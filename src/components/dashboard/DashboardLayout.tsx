import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BarChart3,
  Bell,
  Calendar,
  ChevronDown,
  Compass,
  FileText,
  Globe,
  Home,
  LayoutDashboard,
  Menu,
  MessageSquare,
  PieChart,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";

import MetricsOverview from "./MetricsOverview";
import AlertsPanel from "./AlertsPanel";
import DataVisualization from "./DataVisualization";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentTab, setCurrentTab] = useState("overview");
  const [language, setLanguage] = useState("en");
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
    // In a real app, this would trigger language context change
  };

  const sidebarItems = [
    { icon: <Home size={20} />, label: "Home", value: "home" },
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      value: "overview",
    },
    { icon: <PieChart size={20} />, label: "Crops", value: "crops" },
    { icon: <BarChart3 size={20} />, label: "Livestock", value: "livestock" },
    {
      icon: <ShoppingCart size={20} />,
      label: "Market Prices",
      value: "market",
    },
    { icon: <Globe size={20} />, label: "GIS Maps", value: "maps" },
    { icon: <Calendar size={20} />, label: "Weather", value: "weather" },
    { icon: <FileText size={20} />, label: "Reports", value: "reports" },
    { icon: <Users size={20} />, label: "Partners", value: "partners" },
    { icon: <MessageSquare size={20} />, label: "Messages", value: "messages" },
    { icon: <Compass size={20} />, label: "Resources", value: "resources" },
    { icon: <Settings size={20} />, label: "Settings", value: "settings" },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar for desktop */}
      <aside
        className={`hidden md:flex flex-col border-r bg-card transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-20"}`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div
            className={`flex items-center ${!isSidebarOpen && "justify-center w-full"}`}
          >
            {isSidebarOpen ? (
              <h1 className="text-xl font-bold">IAIS Dashboard</h1>
            ) : (
              <span className="text-xl font-bold">IAIS</span>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className={!isSidebarOpen ? "hidden" : ""}
          >
            <Menu size={20} />
          </Button>
        </div>

        <ScrollArea className="flex-1">
          <nav className="space-y-1 p-2">
            {sidebarItems.map((item) => (
              <Button
                key={item.value}
                variant={currentTab === item.value ? "secondary" : "ghost"}
                className={`w-full justify-start ${!isSidebarOpen ? "justify-center px-2" : "px-4"}`}
                onClick={() => setCurrentTab(item.value)}
              >
                {item.icon}
                {isSidebarOpen && <span className="ml-3">{item.label}</span>}
              </Button>
            ))}
          </nav>
        </ScrollArea>

        <div className="p-4 border-t">
          <div className="flex items-center">
            <Avatar>
              <AvatarImage
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                alt="User"
              />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            {isSidebarOpen && (
              <div className="ml-3">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-muted-foreground">
                  admin@agriculture.gov
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden absolute top-4 left-4 z-10"
          >
            <Menu size={20} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex items-center p-4 border-b">
            <h1 className="text-xl font-bold">IAIS Dashboard</h1>
          </div>
          <ScrollArea className="flex-1 h-[calc(100vh-8rem)]">
            <nav className="space-y-1 p-2">
              {sidebarItems.map((item) => (
                <Button
                  key={item.value}
                  variant={currentTab === item.value ? "secondary" : "ghost"}
                  className="w-full justify-start px-4"
                  onClick={() => {
                    setCurrentTab(item.value);
                  }}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </Button>
              ))}
            </nav>
          </ScrollArea>
          <div className="p-4 border-t">
            <div className="flex items-center">
              <Avatar>
                <AvatarImage
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                  alt="User"
                />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-muted-foreground">
                  admin@agriculture.gov
                </p>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="border-b bg-card">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center md:hidden">
              <h1 className="text-xl font-bold ml-10">IAIS Dashboard</h1>
            </div>
            <div className="flex items-center ml-auto space-x-4">
              <Button variant="outline" size="sm" onClick={toggleLanguage}>
                {language === "en" ? "العربية" : "English"}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="relative">
                    <Bell size={18} />
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      5
                    </Badge>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="flex items-center justify-between p-2 border-b">
                    <span className="font-medium">Notifications</span>
                    <Button variant="ghost" size="sm">
                      Mark all as read
                    </Button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <DropdownMenuItem key={i} className="p-3 cursor-pointer">
                        <div className="flex flex-col space-y-1">
                          <span className="font-medium">Weather Alert</span>
                          <span className="text-sm text-muted-foreground">
                            Heavy rainfall expected in Northern regions
                          </span>
                          <span className="text-xs text-muted-foreground">
                            2 hours ago
                          </span>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                        alt="User"
                      />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline-block">Admin User</span>
                    <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <Separator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main dashboard content */}
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-muted/30">
          <div className="grid gap-6">
            {/* Tabs for different views */}
            <Tabs
              defaultValue="overview"
              value={currentTab}
              onValueChange={setCurrentTab}
              className="space-y-4"
            >
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="crops">Crops</TabsTrigger>
                  <TabsTrigger value="livestock">Livestock</TabsTrigger>
                  <TabsTrigger value="market">Market</TabsTrigger>
                  <TabsTrigger value="maps">Maps</TabsTrigger>
                </TabsList>
              </div>

              {/* Overview Tab Content */}
              <TabsContent value="overview" className="space-y-4">
                <MetricsOverview />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <Card className="h-full">
                      <DataVisualization />
                    </Card>
                  </div>
                  <div>
                    <Card className="h-full">
                      <AlertsPanel />
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Crops Tab Content */}
              <TabsContent value="crops" className="space-y-4">
                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Crops Management</h2>
                  <p className="text-muted-foreground">
                    Detailed information about crops, planting seasons, and
                    yields.
                  </p>
                  <div className="h-[400px] flex items-center justify-center border rounded-md mt-4 bg-muted/50">
                    <p className="text-muted-foreground">
                      Crops data visualization will appear here
                    </p>
                  </div>
                </Card>
              </TabsContent>

              {/* Livestock Tab Content */}
              <TabsContent value="livestock" className="space-y-4">
                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-4">
                    Livestock Management
                  </h2>
                  <p className="text-muted-foreground">
                    Detailed information about livestock, health records, and
                    veterinary programs.
                  </p>
                  <div className="h-[400px] flex items-center justify-center border rounded-md mt-4 bg-muted/50">
                    <p className="text-muted-foreground">
                      Livestock data visualization will appear here
                    </p>
                  </div>
                </Card>
              </TabsContent>

              {/* Market Tab Content */}
              <TabsContent value="market" className="space-y-4">
                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Market Prices</h2>
                  <p className="text-muted-foreground">
                    Real-time market prices for agricultural products.
                  </p>
                  <div className="h-[400px] flex items-center justify-center border rounded-md mt-4 bg-muted/50">
                    <p className="text-muted-foreground">
                      Market price data visualization will appear here
                    </p>
                  </div>
                </Card>
              </TabsContent>

              {/* Maps Tab Content */}
              <TabsContent value="maps" className="space-y-4">
                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-4">GIS Maps</h2>
                  <p className="text-muted-foreground">
                    Interactive maps showing agricultural data, land use, and
                    resources.
                  </p>
                  <div className="h-[400px] flex items-center justify-center border rounded-md mt-4 bg-muted/50">
                    <p className="text-muted-foreground">
                      GIS map visualization will appear here
                    </p>
                  </div>
                </Card>
              </TabsContent>

              {/* Placeholder for other tabs */}
              {[
                "home",
                "weather",
                "reports",
                "partners",
                "messages",
                "resources",
                "settings",
              ].map((tab) => (
                <TabsContent key={tab} value={tab} className="space-y-4">
                  <Card className="p-6">
                    <h2 className="text-2xl font-bold mb-4">
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </h2>
                    <p className="text-muted-foreground">
                      This is the {tab} section of the dashboard.
                    </p>
                    <div className="h-[400px] flex items-center justify-center border rounded-md mt-4 bg-muted/50">
                      <p className="text-muted-foreground">
                        {tab.charAt(0).toUpperCase() + tab.slice(1)} content
                        will appear here
                      </p>
                    </div>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
