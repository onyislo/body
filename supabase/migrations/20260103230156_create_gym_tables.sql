/*
  # Create Body Fuel Fitness Database Schema

  1. New Tables
    - pricing_plans: Membership plans with prices in KSH
    - trainers: Gym trainers with their specialties
    - inquiries: User inquiries for gym memberships

  2. Security
    - Enable RLS on all tables
    - Admin users can perform all operations
    - Public users can read pricing and trainers, insert inquiries
*/

CREATE TABLE IF NOT EXISTS pricing_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price integer NOT NULL,
  duration text NOT NULL,
  features text[] DEFAULT '{}',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS trainers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  specialty text NOT NULL,
  bio text DEFAULT '',
  image_url text DEFAULT '',
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  plan_interest text DEFAULT '',
  message text DEFAULT '',
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE trainers ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active pricing plans"
  ON pricing_plans FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage pricing plans"
  ON pricing_plans FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can view available trainers"
  ON trainers FOR SELECT
  USING (is_available = true);

CREATE POLICY "Authenticated users can manage trainers"
  ON trainers FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can submit inquiries"
  ON inquiries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all inquiries"
  ON inquiries FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update inquiries"
  ON inquiries FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

INSERT INTO pricing_plans (name, price, duration, features, is_active) VALUES
  ('Daily Pass', 500, '1 Day', ARRAY['Access to all equipment', 'Locker facility', 'Shower facilities'], true),
  ('Weekly Pass', 2000, '7 Days', ARRAY['Access to all equipment', 'Locker facility', 'Shower facilities', '1 Free trainer session'], true),
  ('Monthly Membership', 5000, '30 Days', ARRAY['Unlimited gym access', 'Locker facility', 'Shower facilities', '4 Free trainer sessions', 'Nutrition consultation'], true),
  ('Quarterly Membership', 13500, '90 Days', ARRAY['Unlimited gym access', 'Locker facility', 'Shower facilities', '12 Free trainer sessions', 'Monthly nutrition consultation', 'Free gym merchandise'], true),
  ('Annual Membership', 48000, '365 Days', ARRAY['Unlimited gym access', 'Premium locker', 'Shower facilities', 'Unlimited trainer sessions', 'Weekly nutrition consultation', 'Free gym merchandise', 'Priority class booking'], true);

INSERT INTO trainers (name, specialty, bio, is_available) VALUES
  ('Mike Johnson', 'Boxing', 'Certified boxing coach with 10+ years experience. Former national champion.', true),
  ('Sarah Williams', 'Bodybuilding', 'Professional bodybuilder and IFBB certified trainer. Specializes in muscle building and competition prep.', true),
  ('Grace Mwangi', 'Zumba', 'Energetic Zumba instructor bringing fun to fitness. Certified in multiple dance fitness programs.', true),
  ('James Omondi', 'CrossFit', 'CrossFit Level 2 trainer. Expert in functional fitness and high-intensity training.', true),
  ('Linda Achieng', 'Yoga', 'Certified yoga instructor specializing in strength and flexibility. Perfect for the ladies section.', true),
  ('David Kamau', 'Powerlifting', 'National powerlifting record holder. Specializes in strength training and proper lifting techniques.', true);
