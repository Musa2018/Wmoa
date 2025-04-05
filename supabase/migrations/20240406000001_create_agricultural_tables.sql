-- Create crops table
CREATE TABLE IF NOT EXISTS crops (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  growing_season VARCHAR(100),
  planting_guide TEXT,
  harvest_time VARCHAR(100),
  water_requirements VARCHAR(100),
  soil_type VARCHAR(100),
  region VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create livestock table
CREATE TABLE IF NOT EXISTS livestock (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type VARCHAR(100) NOT NULL,
  breed VARCHAR(100),
  care_instructions TEXT,
  feeding_requirements TEXT,
  health_indicators TEXT,
  region VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create market_prices table
CREATE TABLE IF NOT EXISTS market_prices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  item_id UUID NOT NULL,
  item_type VARCHAR(50) NOT NULL, -- 'crop' or 'livestock'
  price DECIMAL(10, 2) NOT NULL,
  unit VARCHAR(50) NOT NULL,
  market_location VARCHAR(255),
  price_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create weather_alerts table
CREATE TABLE IF NOT EXISTS weather_alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  alert_type VARCHAR(100) NOT NULL,
  severity VARCHAR(50) NOT NULL, -- 'low', 'medium', 'high', 'critical'
  region VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create pest_alerts table
CREATE TABLE IF NOT EXISTS pest_alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pest_name VARCHAR(255) NOT NULL,
  affected_crops TEXT,
  severity VARCHAR(50) NOT NULL, -- 'low', 'medium', 'high', 'critical'
  region VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  recommendations TEXT,
  alert_date TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create gis_data table for geographical information
CREATE TABLE IF NOT EXISTS gis_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  data_type VARCHAR(100) NOT NULL, -- 'soil', 'water', 'climate', etc.
  region VARCHAR(255) NOT NULL,
  coordinates JSONB,
  properties JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  language VARCHAR(10) DEFAULT 'en',
  regions TEXT[], -- Array of regions the user is interested in
  alert_preferences JSONB, -- JSON object with alert preferences
  dashboard_layout JSONB, -- JSON object with dashboard layout preferences
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE crops ENABLE ROW LEVEL SECURITY;
ALTER TABLE livestock ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE weather_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE pest_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE gis_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Public read access for crops" ON crops;
CREATE POLICY "Public read access for crops" ON crops FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read access for livestock" ON livestock;
CREATE POLICY "Public read access for livestock" ON livestock FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read access for market_prices" ON market_prices;
CREATE POLICY "Public read access for market_prices" ON market_prices FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read access for weather_alerts" ON weather_alerts;
CREATE POLICY "Public read access for weather_alerts" ON weather_alerts FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read access for pest_alerts" ON pest_alerts;
CREATE POLICY "Public read access for pest_alerts" ON pest_alerts FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read access for gis_data" ON gis_data;
CREATE POLICY "Public read access for gis_data" ON gis_data FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can only access their own preferences" ON user_preferences;
CREATE POLICY "Users can only access their own preferences" ON user_preferences 
FOR ALL USING (auth.uid() = user_id);

-- Enable realtime for all tables
alter publication supabase_realtime add table crops;
alter publication supabase_realtime add table livestock;
alter publication supabase_realtime add table market_prices;
alter publication supabase_realtime add table weather_alerts;
alter publication supabase_realtime add table pest_alerts;
alter publication supabase_realtime add table gis_data;
alter publication supabase_realtime add table user_preferences;