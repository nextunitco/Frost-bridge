export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  features: string[];
  iconName: string; // Dynamic icon mapper
}

export interface IndustryItem {
  id: string;
  name: string;
  description: string;
  image: string;
  iconName: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

export interface ForexRate {
  pair: string;
  buy: number;
  sell: number;
  change: number; // positive or negative percentage
  updated: string;
}

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  image?: string;
}

export interface ShipmentMilestone {
  status: string;
  date: string;
  location: string;
  description: string;
  completed: boolean;
}

export interface ShipmentDetails {
  trackingId: string;
  origin: string;
  destination: string;
  estimatedDelivery: string;
  weight: string;
  service: string;
  status: 'In Transit' | 'Delivered' | 'Pending' | 'Exception';
  milestones: ShipmentMilestone[];
}
