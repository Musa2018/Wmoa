export interface Crop {
  id: string;
  name: string;
  category?: string;
  growing_season?: string;
  planting_guide?: string;
  harvest_time?: string;
  water_requirements?: string;
  soil_type?: string;
  region?: string;
  created_at: string;
  updated_at: string;
}

export interface Livestock {
  id: string;
  type: string;
  breed?: string;
  care_instructions?: string;
  feeding_requirements?: string;
  health_indicators?: string;
  region?: string;
  created_at: string;
  updated_at: string;
}

export interface MarketPrice {
  id: string;
  item_id: string;
  item_type: "crop" | "livestock";
  price: number;
  unit: string;
  market_location?: string;
  price_date: string;
  created_at: string;
  updated_at: string;
}

export interface WeatherAlert {
  id: string;
  alert_type: string;
  severity: "low" | "medium" | "high" | "critical";
  region: string;
  description: string;
  start_date: string;
  end_date?: string;
  created_at: string;
  updated_at: string;
}

export interface PestAlert {
  id: string;
  pest_name: string;
  affected_crops?: string;
  severity: "low" | "medium" | "high" | "critical";
  region: string;
  description: string;
  recommendations?: string;
  alert_date: string;
  created_at: string;
  updated_at: string;
}

export interface GisData {
  id: string;
  data_type: string;
  region: string;
  coordinates?: Record<string, any>;
  properties?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface UserPreference {
  id: string;
  user_id: string;
  language: string;
  regions?: string[];
  alert_preferences?: Record<string, any>;
  dashboard_layout?: Record<string, any>;
  created_at: string;
  updated_at: string;
}
