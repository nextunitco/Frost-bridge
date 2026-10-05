import { ShipmentDetails, ShipmentMilestone } from '../../types';

export interface AdminUser {
  email: string;
  role: 'Super Admin' | 'Operations Manager' | 'Shipment Officer' | 'Customer Support' | 'Finance' | 'Warehouse Manager';
  name: string;
}

export interface CustomExtendedShipment {
  trackingId: string;
  customerName: string;
  companyName: string;
  phone: string;
  email: string;
  originCountry: string;
  originCity: string;
  destinationCountry: string;
  destinationCity: string;
  freightType: 'Air Freight' | 'Sea Freight' | 'Road Freight';
  cargoDescription: string;
  weight: string;
  volume: string;
  quantity: number;
  containerNo?: string;
  billOfLading?: string;
  bookingNumber?: string;
  vehicleNumber?: string;
  driverName?: string;
  estimatedDelivery: string;
  status: 'Pending' | 'Cargo Received' | 'Customs Clearance' | 'Loading' | 'In Transit' | 'At Port' | 'Out for Delivery' | 'Delivered' | 'Delayed' | 'Cancelled';
  milestones: {
    status: string;
    date: string;
    location: string;
    description: string;
    completed: boolean;
    officer: string;
    remarks: string;
  }[];
  history: {
    date: string;
    location: string;
    status: string;
    updatedBy: string;
  }[];
  documents: {
    id: string;
    name: string;
    type: 'Bill of Lading' | 'Invoice' | 'Packing List' | 'Photos' | 'Insurance' | 'Delivery Receipt';
    uploadDate: string;
    fileSize: string;
    fileUrl: string;
  }[];
  notes?: string;
  createdDate: string;
  invoiceAmount: number;
  paymentStatus: 'Paid' | 'Unpaid' | 'Partial' | 'Overdue';
}

export interface CustomerRecord {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  address: string;
  country: string;
  outstandingPayment: number;
  totalShipmentsCount: number;
  password?: string;
}

export interface VehicleRecord {
  id: string;
  vehicleNumber: string;
  driverName: string;
  status: 'Active' | 'In Maintenance' | 'Idle' | 'Out of Service';
  fuelLevel: number; // percentage
  currentLocation: string;
  capacity: string;
  maintenanceDue: string;
}

export interface DriverRecord {
  id: string;
  name: string;
  phone: string;
  licenseNumber: string;
  assignedVehicle: string;
  status: 'On Duty' | 'Off Duty' | 'In Transit' | 'Suspended';
}

export interface WarehouseRecord {
  id: string;
  name: string;
  capacity: string; // e.g., "15,000 sqm"
  currentUtilization: number; // percentage
  managerName: string;
  location: string;
  incomingCargoCount: number;
  outgoingCargoCount: number;
}

export interface NotificationLog {
  id: string;
  trackingId: string;
  recipient: string;
  channel: 'Email' | 'SMS' | 'WhatsApp';
  type: string;
  content: string;
  timestamp: string;
  status: 'Sent' | 'Failed' | 'Pending';
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userEmail: string;
  role: string;
  action: string;
  details: string;
  ipAddress: string;
}

// Default mock seed data if localStorage is empty
export const SEED_CUSTOMERS: CustomerRecord[] = [
  { id: 'CUST-001', name: 'Aliko Dangote Jr', company: 'Dangote Industries Corp', phone: '+234 803 111 2222', email: 'logistics@dangote-group.com', address: 'Union Bank Building, Marina, Lagos', country: 'Nigeria', outstandingPayment: 24500, totalShipmentsCount: 18 },
  { id: 'CUST-002', name: 'Chima Nwachukwu', company: 'Afrimed Healthcare Group', phone: '+234 812 345 6789', email: 'chima@afrimed.com.ng', address: '78, Isolo-Apapa Expressway, Lagos', country: 'Nigeria', outstandingPayment: 0, totalShipmentsCount: 12 },
  { id: 'CUST-003', name: 'Sarah Jenkins', company: 'Sovereign Manufacturing Ltd', phone: '+44 20 7946 0958', email: 's.jenkins@sov-mfg.co.uk', address: '22 Bishopsgate, London', country: 'United Kingdom', outstandingPayment: 5400, totalShipmentsCount: 8 },
  { id: 'CUST-004', name: 'Koffi Mensah', company: 'West African Retail Distribution', phone: '+233 24 123 4567', email: 'mensah@westretail.com', address: 'Spintex Road, Accra', country: 'Ghana', outstandingPayment: 12800, totalShipmentsCount: 14 },
  { id: 'CUST-005', name: 'Nextunit Co', company: 'Nextunit Global Services', phone: '+234 810 123 4567', email: 'nextunitco@gmail.com', address: 'Plot 15, Admiralty Way, Lekki Phase 1, Lagos', country: 'Nigeria', outstandingPayment: 0, totalShipmentsCount: 0, password: 'Nexunit@2025' }
];

export const SEED_VEHICLES: VehicleRecord[] = [
  { id: 'VEH-001', vehicleNumber: 'FB-TRK-1020', driverName: 'Abubakar Ibrahim', status: 'Active', fuelLevel: 82, currentLocation: 'Seme Border Checkpoint', capacity: '25 Tons', maintenanceDue: 'Aug 15, 2026' },
  { id: 'VEH-002', vehicleNumber: 'FB-TRK-1120', driverName: 'Sunday Clement', status: 'Active', fuelLevel: 45, currentLocation: 'Badagry Expressway', capacity: '25 Tons', maintenanceDue: 'Jul 28, 2026' },
  { id: 'VEH-003', vehicleNumber: 'FB-RF-04', driverName: 'Emeka Okafor', status: 'Active', fuelLevel: 90, currentLocation: 'Isolo Cold Hub, Lagos', capacity: '10 Tons (Reefer)', maintenanceDue: 'Sep 02, 2026' },
  { id: 'VEH-004', vehicleNumber: 'FB-VAN-08', driverName: 'Yusuf Bello', status: 'In Maintenance', fuelLevel: 12, currentLocation: 'Oregun Maintenance Yard', capacity: '3.5 Tons', maintenanceDue: 'Overdue (Jul 04)' }
];

export const SEED_DRIVERS: DriverRecord[] = [
  { id: 'DRV-001', name: 'Abubakar Ibrahim', phone: '+234 806 777 8888', licenseNumber: 'LAG-998122-DL', assignedVehicle: 'FB-TRK-1020', status: 'In Transit' },
  { id: 'DRV-002', name: 'Sunday Clement', phone: '+234 802 555 4444', licenseNumber: 'Oyo-448102-DL', assignedVehicle: 'FB-TRK-1120', status: 'In Transit' },
  { id: 'DRV-003', name: 'Emeka Okafor', phone: '+234 813 111 0000', licenseNumber: 'EN-209411-DL', assignedVehicle: 'FB-RF-04', status: 'On Duty' },
  { id: 'DRV-004', name: 'Yusuf Bello', phone: '+234 811 000 2222', licenseNumber: 'KAD-110294-DL', assignedVehicle: 'FB-VAN-08', status: 'Off Duty' }
];

export const SEED_WAREHOUSES: WarehouseRecord[] = [
  { id: 'WH-001', name: 'Apapa Port Container Terminal Warehouse', capacity: '20,000 Tons', currentUtilization: 78, managerName: 'Tunde Adebayo', location: 'Commercial Road, Apapa, Lagos', incomingCargoCount: 14, outgoingCargoCount: 8 },
  { id: 'WH-002', name: 'Isolo Temperature-Controlled Cold Facility', capacity: '5,000 Tons (Pharma/Food)', currentUtilization: 55, managerName: 'Dr. Chima Nwachukwu', location: 'Isolo Industrial Zone, Lagos', incomingCargoCount: 3, outgoingCargoCount: 5 },
  { id: 'WH-003', name: 'Seme Border Transit Hub Depot', capacity: '10,000 Tons', currentUtilization: 32, managerName: 'Idris Diallo', location: 'ECOWAS Transit Plaza, Seme Border', incomingCargoCount: 8, outgoingCargoCount: 11 }
];

export const SEED_NOTIFICATIONS: NotificationLog[] = [
  { id: 'NTF-001', trackingId: 'FBGL-SEA-2026-000001', recipient: 'Dangote Group (+2348031112222)', channel: 'WhatsApp', type: 'Shipment Created', content: 'Frost Bridge Logistics: Shipment FBGL-SEA-2026-000001 has been booked from Beijing to Lagos.', timestamp: '2026-07-05 10:42 AM', status: 'Sent' },
  { id: 'NTF-002', trackingId: 'FBGL-SEA-2026-000001', recipient: 'logistics@dangote-group.com', channel: 'Email', type: 'Shipment Created', content: 'Subject: Booking Confirmation FBGL-SEA-2026-000001. Your container booking has been initialized...', timestamp: '2026-07-05 10:43 AM', status: 'Sent' },
  { id: 'NTF-003', trackingId: 'FBGL-2026-003489', recipient: 'chima@afrimed.com.ng', channel: 'Email', type: 'Shipment Delivered', content: 'Subject: Cold Chain Shipment FBGL-2026-003489 Delivered. Temperature log stable at +4.2°C.', timestamp: '2026-06-28 11:45 AM', status: 'Sent' }
];

export const SEED_AUDIT_LOGS: AuditLog[] = [
  { id: 'AUD-001', timestamp: '2026-07-06 01:22 AM', userEmail: 'admin@frostbridge.com', role: 'Super Admin', action: 'CREATE_SHIPMENT', details: 'Created shipment FBGL-SEA-2026-000001 for Dangote Group.', ipAddress: '197.210.42.128' },
  { id: 'AUD-002', timestamp: '2026-07-06 01:25 AM', userEmail: 'admin@frostbridge.com', role: 'Super Admin', action: 'UPDATE_STATUS', details: 'Updated tracking status for FBGL-2026-001245 to "In Transit".', ipAddress: '197.210.42.128' }
];
