export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Trainer {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  image_url: string;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  plan_interest: string;
  message: string;
  status: string;
  created_at: string;
}
