import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Package, Users, Database, Truck, FileText, Download, 
  Settings, LogOut, Bell, Shield, MapPin, Search, Menu, X, ArrowUpRight, 
  CheckCircle, Award, Landmark, UserCheck, Layers, HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';
import { 
  AdminUser, CustomExtendedShipment, CustomerRecord, VehicleRecord, DriverRecord, 
  WarehouseRecord, NotificationLog, AuditLog,
  SEED_CUSTOMERS, SEED_VEHICLES, SEED_DRIVERS, SEED_WAREHOUSES, SEED_NOTIFICATIONS, SEED_AUDIT_LOGS
} from './admin/types';
import DashboardOverview from './admin/DashboardOverview';
import ShipmentModule from './admin/ShipmentModule';
import OtherModules from './admin/OtherModules';

export default function AdminDashboard() {
  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  
  // Dashboard Shell State
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<CustomExtendedShipment[]>([]);

  // Database States (loaded from localStorage or seeded)
  const [shipments, setShipments] = useState<CustomExtendedShipment[]>([]);
  const [customers, setCustomers] = useState<CustomerRecord[]>([]);
  const [vehicles, setVehicles] = useState<VehicleRecord[]>([]);
  const [drivers, setDrivers] = useState<DriverRecord[]>([]);
  const [warehouses, setWarehouses] = useState<WarehouseRecord[]>([]);
  const [notifications, setNotifications] = useState<NotificationLog[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  // Seed data & LocalStorage Synchronization
  useEffect(() => {
    // 1. Customers
    const storedCustomers = localStorage.getItem('fbgl_custom_customers');
    let parsedCustomers: CustomerRecord[] = [];
    if (storedCustomers) {
      parsedCustomers = JSON.parse(storedCustomers);
    } else {
      parsedCustomers = [...SEED_CUSTOMERS];
    }
    const targetEmail = 'nextunitco@gmail.com';
    const hasTarget = parsedCustomers.some(c => c.email.toLowerCase() === targetEmail);
    if (!hasTarget) {
      parsedCustomers.push({
        id: 'CUST-005',
        name: 'Nextunit Co',
        company: 'Nextunit Global Services',
        phone: '+234 810 123 4567',
        email: targetEmail,
        address: 'Plot 15, Admiralty Way, Lekki Phase 1, Lagos',
        country: 'Nigeria',
        outstandingPayment: 0,
        totalShipmentsCount: 0,
        password: 'Nexunit@2025'
      });
      localStorage.setItem('fbgl_custom_customers', JSON.stringify(parsedCustomers));
    }
    setCustomers(parsedCustomers);

    // 2. Vehicles
    const storedVehicles = localStorage.getItem('fbgl_custom_vehicles');
    if (storedVehicles) {
      setVehicles(JSON.parse(storedVehicles));
    } else {
      localStorage.setItem('fbgl_custom_vehicles', JSON.stringify(SEED_VEHICLES));
      setVehicles(SEED_VEHICLES);
    }

    // 3. Drivers
    const storedDrivers = localStorage.getItem('fbgl_custom_drivers');
    if (storedDrivers) {
      setDrivers(JSON.parse(storedDrivers));
    } else {
      localStorage.setItem('fbgl_custom_drivers', JSON.stringify(SEED_DRIVERS));
      setDrivers(SEED_DRIVERS);
    }

    // 4. Warehouses
    const storedWarehouses = localStorage.getItem('fbgl_custom_warehouses');
    if (storedWarehouses) {
      setWarehouses(JSON.parse(storedWarehouses));
    } else {
      localStorage.setItem('fbgl_custom_warehouses', JSON.stringify(SEED_WAREHOUSES));
      setWarehouses(SEED_WAREHOUSES);
    }

    // 5. Notifications
    const storedNotifications = localStorage.getItem('fbgl_custom_notifications');
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    } else {
      localStorage.setItem('fbgl_custom_notifications', JSON.stringify(SEED_NOTIFICATIONS));
      setNotifications(SEED_NOTIFICATIONS);
    }

    // 6. Audit Logs
    const storedAudits = localStorage.getItem('fbgl_custom_audit_logs');
    if (storedAudits) {
      setAuditLogs(JSON.parse(storedAudits));
    } else {
      localStorage.setItem('fbgl_custom_audit_logs', JSON.stringify(SEED_AUDIT_LOGS));
      setAuditLogs(SEED_AUDIT_LOGS);
    }

    // 7. Shipments (Seed initial premium shipments)
    const storedShipments = localStorage.getItem('fbgl_custom_shipments');
    let parsedShipments: CustomExtendedShipment[] = [];
    if (storedShipments) {
      parsedShipments = JSON.parse(storedShipments);
    } else {
      parsedShipments = [
        {
          trackingId: 'FBGL-SEA-2026-000001',
          customerName: 'Aliko Dangote Jr',
          companyName: 'Dangote Industries Corp',
          phone: '+234 803 111 2222',
          email: 'logistics@dangote-group.com',
          originCountry: 'CN',
          originCity: 'Beijing Seaport Terminal',
          destinationCountry: 'NG',
          destinationCity: 'Lagos Apapa Port',
          freightType: 'Sea Freight',
          cargoDescription: 'Heavy manufacturing steel polymers machinery parts',
          weight: '18,500 KG',
          volume: '42.5 CBM',
          quantity: 14,
          containerNo: 'MSKU-890412-2',
          billOfLading: 'BL-8890214-CN',
          bookingNumber: 'BKG-098412-BJ',
          vehicleNumber: 'FB-TRK-1020',
          driverName: 'Abubakar Ibrahim',
          estimatedDelivery: 'July 24, 2026',
          status: 'In Transit',
          createdDate: 'July 05, 2026',
          invoiceAmount: 345000,
          paymentStatus: 'Paid',
          documents: [
            { id: 'doc-1', name: 'Bill of Lading Copy', type: 'Bill of Lading', uploadDate: 'July 05, 2026', fileSize: '2.4 MB', fileUrl: '#' },
            { id: 'doc-2', name: 'Raw Material Packing List', type: 'Packing List', uploadDate: 'July 05, 2026', fileSize: '450 KB', fileUrl: '#' }
          ],
          milestones: [
            { status: 'Shipment Created', date: 'July 05, 2026 - 10:30 AM', location: 'Beijing, CN', description: 'Booking confirmed and transport container allocated.', completed: true, officer: 'Beijing Office', remarks: 'Sea Freight Active Space Approved.' },
            { status: 'Cargo Received', date: 'July 05, 2026 - 02:15 PM', location: 'Beijing Hub, CN', description: 'Cargo picked up from supplier and sealed at depot.', completed: true, officer: 'Sovereign Dispatcher', remarks: 'Consignment weight verified.' },
            { status: 'In Transit', date: 'July 06, 2026 - 01:22 AM', location: 'Beijing Port Terminal', description: 'Container loaded onto MSK vessel MV-CORRIDOR.', completed: true, officer: 'China Port Agent', remarks: 'Vessel sailing toward Singapore transit point.' }
          ],
          history: [
            { date: 'July 06, 2026 - 01:22 AM', location: 'Beijing Port Terminal', status: 'Loaded onto transport vessel MV-CORRIDOR', updatedBy: 'Operations Agent' }
          ]
        },
        {
          trackingId: 'FBGL-AIR-2026-000002',
          customerName: 'Chima Nwachukwu',
          companyName: 'Afrimed Healthcare Group',
          phone: '+234 812 345 6789',
          email: 'chima@afrimed.com.ng',
          originCountry: 'DE',
          originCity: 'Frankfurt Airport Cargo Terminal',
          destinationCountry: 'NG',
          destinationCity: 'Lagos MMIA Airport',
          freightType: 'Air Freight',
          cargoDescription: 'Refrigerated active healthcare vaccines vials',
          weight: '1,250 KG',
          volume: '3.8 CBM',
          quantity: 4,
          bookingNumber: 'BKG-AIR-098221',
          vehicleNumber: 'FB-RF-04',
          driverName: 'Emeka Okafor',
          estimatedDelivery: 'July 10, 2026',
          status: 'Pending',
          createdDate: 'July 05, 2026',
          invoiceAmount: 180000,
          paymentStatus: 'Paid',
          documents: [
            { id: 'doc-1', name: 'Cold-Chain Pharma Logistics Note', type: 'Insurance', uploadDate: 'July 05, 2026', fileSize: '1.2 MB', fileUrl: '#' }
          ],
          milestones: [
            { status: 'Shipment Created', date: 'July 05, 2026 - 11:30 AM', location: 'Frankfurt, DE', description: 'Active pharma storage room reserved on Frost Bridge Air Cargo flight.', completed: true, officer: 'Germany Ground Desk', remarks: 'Dry ice active monitoring active.' }
          ],
          history: [
            { date: 'July 05, 2026 - 11:30 AM', location: 'Frankfurt, DE', status: 'Active temperature-controlled space booked', updatedBy: 'Pharma Desk Agent' }
          ]
        }
      ];
    }

    const hasShipment1 = parsedShipments.some(s => s.trackingId === 'FBGL-AIR-2026-880912');
    const hasShipment2 = parsedShipments.some(s => s.trackingId === 'FBGL-SEA-2026-440213');
    let shipmentsUpdated = false;

    if (!hasShipment1) {
      parsedShipments.push({
        trackingId: 'FBGL-AIR-2026-880912',
        customerName: 'Nextunit Co',
        companyName: 'Nextunit Global Services',
        phone: '+234 810 123 4567',
        email: 'nextunitco@gmail.com',
        originCountry: 'GB',
        originCity: 'London Heathrow Airport (LHR)',
        destinationCountry: 'NG',
        destinationCity: 'Lagos MMIA Airport (LOS)',
        freightType: 'Air Freight',
        cargoDescription: 'Healthcare temperature-controlled insulin boxes',
        weight: '1,200 KG',
        volume: '4.8 CBM',
        quantity: 3,
        containerNo: 'AY-9012-LHR',
        estimatedDelivery: 'July 10, 2026',
        status: 'In Transit',
        createdDate: 'July 05, 2026',
        invoiceAmount: 312000,
        paymentStatus: 'Unpaid',
        documents: [
          { id: 'doc-3', name: 'Air Waybill Certified Copy', type: 'Packing List', uploadDate: 'July 05, 2026', fileSize: '1.8 MB', fileUrl: '#' }
        ],
        milestones: [
          { status: 'Shipment Created', date: 'July 05, 2026 - 10:00 AM', location: 'London, GB', description: 'Air consignment booking received and approved.', completed: true, officer: 'London Office', remarks: 'Space booked on BA075.' },
          { status: 'In Transit', date: 'July 06, 2026 - 02:00 AM', location: 'London Heathrow Terminal 4', description: 'Cargo inspected and loaded into aircraft.', completed: true, officer: 'BA Loading Officer', remarks: 'Temperature controlled reefer active.' }
        ],
        history: [
          { date: 'July 06, 2026 - 02:00 AM', location: 'London Heathrow Terminal 4', status: 'Loaded onto flight BA075', updatedBy: 'Air Dispatcher' }
        ]
      });
      shipmentsUpdated = true;
    }

    if (!hasShipment2) {
      parsedShipments.push({
        trackingId: 'FBGL-SEA-2026-440213',
        customerName: 'Nextunit Co',
        companyName: 'Nextunit Global Services',
        phone: '+234 810 123 4567',
        email: 'nextunitco@gmail.com',
        originCountry: 'CN',
        originCity: 'Guangzhou Port Terminal',
        destinationCountry: 'NG',
        destinationCity: 'Lagos Apapa Port',
        freightType: 'Sea Freight',
        cargoDescription: 'High-yield solar panel systems & lithium storage batteries',
        weight: '9,400 KG',
        volume: '28.0 CBM',
        quantity: 8,
        containerNo: 'COSU-981024-5',
        estimatedDelivery: 'June 30, 2026',
        status: 'Delivered',
        createdDate: 'June 10, 2026',
        invoiceAmount: 1850000,
        paymentStatus: 'Paid',
        documents: [
          { id: 'doc-4', name: 'Sovereign Customs Clearance Slip', type: 'Packing List', uploadDate: 'June 29, 2026', fileSize: '3.1 MB', fileUrl: '#' }
        ],
        milestones: [
          { status: 'Shipment Created', date: 'June 10, 2026 - 09:00 AM', location: 'Guangzhou, CN', description: 'Booking confirmed, 40ft container allocated.', completed: true, officer: 'Guangzhou Hub', remarks: 'Sea Freight Space verified.' },
          { status: 'In Transit', date: 'June 12, 2026 - 11:00 AM', location: 'Guangzhou Seaport', description: 'Container loaded onto COSCO Shipping vessel.', completed: true, officer: 'Port Agent', remarks: 'Estimated ocean transit time: 18 days.' },
          { status: 'Delivered', date: 'June 30, 2026 - 04:30 PM', location: 'Lagos Apapa Port', description: 'Customs cleared and delivered to consignee warehouse.', completed: true, officer: 'Lagos Depot', remarks: 'Consignment received in perfect condition.' }
        ],
        history: [
          { date: 'June 30, 2026 - 04:30 PM', location: 'Lagos Apapa Port', status: 'Delivered to Lekki warehouse', updatedBy: 'Delivery Driver' }
        ]
      });
      shipmentsUpdated = true;
    }

    if (shipmentsUpdated || !storedShipments) {
      localStorage.setItem('fbgl_custom_shipments', JSON.stringify(parsedShipments));
    }
    setShipments(parsedShipments);
    
    // Check for saved login state
    const savedUser = localStorage.getItem('fbgl_admin_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  // Save new or modified shipment to localStorage
  const handleSaveShipment = (updatedShipment: CustomExtendedShipment) => {
    let updatedList = [...shipments];
    const index = shipments.findIndex(s => s.trackingId === updatedShipment.trackingId);
    
    if (index >= 0) {
      updatedList[index] = updatedShipment;
    } else {
      updatedList.push(updatedShipment);
    }
    
    setShipments(updatedList);
    localStorage.setItem('fbgl_custom_shipments', JSON.stringify(updatedList));

    // Audit Log Entry
    const nowStr = new Date().toLocaleString();
    const newAudit: AuditLog = {
      id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: nowStr,
      userEmail: currentUser?.email || 'admin@frostbridge.com',
      role: currentUser?.role || 'Super Admin',
      action: index >= 0 ? 'UPDATE_SHIPMENT' : 'CREATE_SHIPMENT',
      details: `${index >= 0 ? 'Updated' : 'Created'} shipment ${updatedShipment.trackingId} in client registry.`,
      ipAddress: '197.210.42.128'
    };
    const newAudits = [newAudit, ...auditLogs];
    setAuditLogs(newAudits);
    localStorage.setItem('fbgl_custom_audit_logs', JSON.stringify(newAudits));
  };

  // Delete shipment from localStorage
  const handleDeleteShipment = (trackingId: string) => {
    const updatedList = shipments.filter(s => s.trackingId !== trackingId);
    setShipments(updatedList);
    localStorage.setItem('fbgl_custom_shipments', JSON.stringify(updatedList));

    const nowStr = new Date().toLocaleString();
    const newAudit: AuditLog = {
      id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: nowStr,
      userEmail: currentUser?.email || 'admin@frostbridge.com',
      role: currentUser?.role || 'Super Admin',
      action: 'DELETE_SHIPMENT',
      details: `Removed shipment ${trackingId} from active databases.`,
      ipAddress: '197.210.42.128'
    };
    const newAudits = [newAudit, ...auditLogs];
    setAuditLogs(newAudits);
    localStorage.setItem('fbgl_custom_audit_logs', JSON.stringify(newAudits));
  };

  // Clear all shipments for clean slate
  const handleClearAllShipments = () => {
    if (window.confirm('Are you sure you want to clear all shipments? This will give you a completely clean slate to start uploading your own shipments directly.')) {
      setShipments([]);
      localStorage.setItem('fbgl_custom_shipments', JSON.stringify([]));

      const nowStr = new Date().toLocaleString();
      const newAudit: AuditLog = {
        id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: nowStr,
        userEmail: currentUser?.email || 'admin@frostbridge.com',
        role: currentUser?.role || 'Super Admin',
        action: 'CLEAR_ALL_SHIPMENTS',
        details: 'Purged all shipments from active database to start clean.',
        ipAddress: '197.210.42.128'
      };
      const newAudits = [newAudit, ...auditLogs];
      setAuditLogs(newAudits);
      localStorage.setItem('fbgl_custom_audit_logs', JSON.stringify(newAudits));
    }
  };

  // Authentication Actions
  const handleRoleLogin = (role: AdminUser['role'], email: string) => {
    const isNextUnit = email.toLowerCase().trim() === 'nextunitco@gmail.com';
    const user: AdminUser = {
      email,
      role,
      name: isNextUnit ? 'Nextunit Admin' : (role === 'Super Admin' ? 'Director Adeniyi' : role.split(' ')[0] + ' Coordinator')
    };
    if (rememberMe) {
      localStorage.setItem('fbgl_admin_user', JSON.stringify(user));
    }
    
    // Proactively clear database for nextunitco@gmail.com's first login to ensure a perfectly clean dashboard to start fresh
    if (isNextUnit) {
      const isCleaned = localStorage.getItem('fbgl_cleaned_for_nextunit');
      if (!isCleaned) {
        localStorage.setItem('fbgl_custom_shipments', JSON.stringify([]));
        setShipments([]);
        localStorage.setItem('fbgl_cleaned_for_nextunit', 'true');
      }
    }

    setCurrentUser(user);
    setIsLoggedIn(true);

    // Audit log login
    const nowStr = new Date().toLocaleString();
    const newAudit: AuditLog = {
      id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: nowStr,
      userEmail: email,
      role: role,
      action: 'LOGIN_SUCCESS',
      details: isNextUnit 
        ? `Nextunit Administrator authenticated successfully with full Super Admin privileges. Database initialized clean.`
        : `Administrative user authenticated successfully with role [${role}].`,
      ipAddress: '197.210.42.128'
    };
    const newAudits = [newAudit, ...auditLogs];
    setAuditLogs(newAudits);
    localStorage.setItem('fbgl_custom_audit_logs', JSON.stringify(newAudits));
  };

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const emailLower = loginEmail.toLowerCase().trim();
    
    // Check user's specific requested credentials for full access
    if (emailLower === 'nextunitco@gmail.com' && loginPassword === 'Nexunit@2025') {
      handleRoleLogin('Super Admin', 'nextunitco@gmail.com');
      return;
    }

    // Default demo fallback as Super Admin
    if (emailLower === 'admin@frostbridge.com' && loginPassword === 'admin') {
      handleRoleLogin('Super Admin', 'admin@frostbridge.com');
      return;
    }

    // Allow other demo accounts with general Operations Manager fallback if format matches
    if (emailLower.includes('@') && loginPassword.length >= 4) {
      handleRoleLogin('Operations Manager', loginEmail);
      return;
    }

    alert('Invalid administrative credentials. Please use nextunitco@gmail.com with your authorized password.');
  };

  const handleLogout = () => {
    localStorage.removeItem('fbgl_admin_user');
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  // Global Search
  const handleGlobalSearch = (term: string) => {
    setGlobalSearchTerm(term);
    if (!term) {
      setSearchResults([]);
      return;
    }
    const results = shipments.filter(s => 
      s.trackingId.toLowerCase().includes(term.toLowerCase()) ||
      s.customerName.toLowerCase().includes(term.toLowerCase()) ||
      s.originCity.toLowerCase().includes(term.toLowerCase()) ||
      s.destinationCity.toLowerCase().includes(term.toLowerCase()) ||
      (s.containerNo && s.containerNo.toLowerCase().includes(term.toLowerCase())) ||
      (s.phone && s.phone.includes(term))
    );
    setSearchResults(results);
  };

  // Sidebar link items (Corrected line 315 from UserCheckIcon to UserCheck)
  const menuItems = [
    { label: 'Dashboard', id: 'dashboard', icon: LayoutDashboard, roles: ['Super Admin', 'Operations Manager', 'Shipment Officer', 'Customer Support', 'Finance', 'Warehouse Manager'] },
    { label: 'Shipments', id: 'shipments', icon: Package, roles: ['Super Admin', 'Operations Manager', 'Shipment Officer', 'Customer Support', 'Finance', 'Warehouse Manager'] },
    { label: 'Customers', id: 'customers', icon: Users, roles: ['Super Admin', 'Operations Manager', 'Customer Support', 'Finance'] },
    { label: 'Warehouses', id: 'warehouses', icon: Database, roles: ['Super Admin', 'Operations Manager', 'Warehouse Manager'] },
    { label: 'Vehicles', id: 'vehicles', icon: Truck, roles: ['Super Admin', 'Operations Manager', 'Warehouse Manager'] },
    { label: 'Drivers', id: 'drivers', icon: UserCheck, roles: ['Super Admin', 'Operations Manager'] },
    { label: 'Documents', id: 'documents', icon: FileText, roles: ['Super Admin', 'Operations Manager', 'Shipment Officer', 'Finance'] },
    { label: 'Reports', id: 'reports', icon: Download, roles: ['Super Admin', 'Operations Manager', 'Finance'] },
    { label: 'Notifications', id: 'notifications', icon: Bell, roles: ['Super Admin', 'Operations Manager', 'Customer Support'] },
    { label: 'Settings', id: 'settings', icon: Settings, roles: ['Super Admin'] }
  ];

  const filteredMenuItems = menuItems.filter(item => 
    currentUser ? item.roles.includes(currentUser.role) : false
  );

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-brand-primary flex items-center justify-center p-4 relative overflow-hidden font-sans pt-28 sm:pt-32">
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-brand-secondary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 -right-4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-700" />
        </div>

        <div className="bg-white/95 backdrop-blur-md rounded-3xl w-full max-w-lg p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 z-10 space-y-6">
          {/* Logo & Header */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-brand-primary rounded-2xl p-2 border border-blue-150 shadow-md">
              <Logo variant="icon" className="w-full h-full text-white" />
            </div>
            <h2 className="text-xl font-black text-gray-800 tracking-wider font-heading mt-4 uppercase leading-none">
              FROST BRIDGE LOGISTICS
            </h2>
            <p className="text-xs text-gray-400 mt-1 font-semibold uppercase tracking-wider">Enterprise Admin Gatehouse</p>
          </div>

          <form onSubmit={isForgotPassword ? (e) => { e.preventDefault(); alert('Standard reset link sent to registered email.'); setIsForgotPassword(false); } : handleCustomLogin} className="space-y-4">
            {isForgotPassword ? (
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-wide block mb-1">Registered Enterprise Email</label>
                  <input 
                    type="email" required
                    placeholder="e.g. info@fblogistics.com.ng"
                    className="w-full px-4 py-3 rounded-xl border border-gray-250 text-xs focus:outline-none focus:border-brand-primary text-gray-700 font-medium"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-brand-secondary hover:bg-orange-600 text-white font-bold text-xs py-3 rounded-xl transition-all cursor-pointer uppercase tracking-wider"
                >
                  Send Recovery Link
                </button>
                <div className="text-center">
                  <button type="button" onClick={() => setIsForgotPassword(false)} className="text-[11px] font-bold text-brand-primary hover:underline">
                    Back to Portal Login
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-wide block mb-1">Administrative Email</label>
                  <input 
                    type="email" required
                    value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="e.g. nextunitco@gmail.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-250 text-xs focus:outline-none focus:border-brand-primary text-gray-700 font-medium"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-wide">Security Password</label>
                    <button type="button" onClick={() => setIsForgotPassword(true)} className="text-[10px] font-bold text-brand-primary hover:underline">
                      Forgot Password?
                    </button>
                  </div>
                  <input 
                    type="password" required
                    value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl border border-gray-250 text-xs focus:outline-none focus:border-brand-primary text-gray-700"
                  />
                </div>

                <div className="flex items-center">
                  <input 
                    type="checkbox" id="remember" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 accent-brand-secondary rounded border-gray-300"
                  />
                  <label htmlFor="remember" className="text-xs text-gray-500 font-medium ml-2 cursor-pointer select-none">
                    Remember me on this workstation
                  </label>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-brand-secondary hover:bg-orange-600 text-white font-bold text-xs py-3.5 rounded-xl transition-all cursor-pointer uppercase tracking-wider shadow-lg hover:shadow-orange-500/10"
                >
                  Authorize Gatehouse Access
                </button>
              </div>
            )}
          </form>

          {/* Convenient 1-Click Evaluation presets */}
          {!isForgotPassword && (
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block text-center">1-Click Evaluation Presets</span>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => handleRoleLogin('Super Admin', 'nextunitco@gmail.com')}
                  className="p-2 border border-gray-150 hover:bg-blue-50/50 hover:border-brand-primary/30 rounded-xl text-left text-[11px] font-bold text-gray-600 flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Shield className="w-3.5 h-3.5 text-brand-primary" />
                  <div>
                    <span className="block leading-none">Super Admin</span>
                    <span className="text-[8px] text-gray-400 font-medium">nextunitco@gmail.com</span>
                  </div>
                </button>

                <button 
                  onClick={() => handleRoleLogin('Operations Manager', 'info@fblogistics.com.ng')}
                  className="p-2 border border-gray-150 hover:bg-orange-50/50 hover:border-brand-secondary/30 rounded-xl text-left text-[11px] font-bold text-gray-600 flex items-center gap-2 cursor-pointer transition-all"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-brand-secondary" />
                  <div>
                    <span className="block leading-none">Ops & Staff</span>
                    <span className="text-[8px] text-gray-400 font-medium">info@fblogistics.com.ng</span>
                  </div>
                </button>

                <button 
                  onClick={() => handleRoleLogin('Customer Support', 'support@fblogistics.com.ng')}
                  className="p-2 border border-gray-150 hover:bg-blue-50/50 hover:border-brand-primary/30 rounded-xl text-left text-[11px] font-bold text-gray-600 flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Package className="w-3.5 h-3.5 text-blue-500" />
                  <div>
                    <span className="block leading-none">Customer Service</span>
                    <span className="text-[8px] text-gray-400 font-medium">support@fblogistics.com.ng</span>
                  </div>
                </button>

                <button 
                  onClick={() => handleRoleLogin('Finance', 'finance@fblogistics.com.ng')}
                  className="p-2 border border-gray-150 hover:bg-purple-50/50 hover:border-purple-300 rounded-xl text-left text-[11px] font-bold text-gray-600 flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Landmark className="w-3.5 h-3.5 text-purple-500" />
                  <div>
                    <span className="block leading-none">Finance Desk</span>
                    <span className="text-[8px] text-gray-400 font-medium">finance@fblogistics.com.ng</span>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row text-gray-700 font-sans pt-16 lg:pt-0">
      
      {/* MOBILE HEADER TOPBAR */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-brand-primary text-white flex items-center justify-between px-4 z-30 shadow-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-lg p-1">
            <Logo variant="icon" className="w-full h-full text-brand-primary" />
          </div>
          <span className="font-black text-xs tracking-wider">FROST BRIDGE</span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* SIDEBAR NAVIGATION */}
      <aside className={`bg-brand-primary text-white shrink-0 transition-all duration-300 lg:w-64 flex flex-col justify-between z-20 fixed lg:static inset-y-0 left-0 top-16 lg:top-0 transform lg:transform-none ${
        isSidebarOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full lg:translate-x-0 lg:w-20'
      }`}>
        <div className="flex flex-col h-full justify-between">
          <div>
            {/* Sidebar Brand Header (Desktop) */}
            <div className="hidden lg:flex p-4 border-b border-white/10 items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center w-10 h-10 bg-white rounded-xl p-1.5 shadow-md">
                  <Logo variant="icon" className="w-full h-full text-brand-primary" />
                </div>
                {(!isSidebarOpen || isSidebarOpen) && (isSidebarOpen) && (
                  <div className="flex flex-col">
                    <span className="text-white font-black text-xs leading-none tracking-widest font-heading">FROST BRIDGE</span>
                    <span className="text-brand-accent text-[8px] tracking-widest uppercase font-bold mt-1">Admin Centre</span>
                  </div>
                )}
              </div>
              
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
                className="text-white/50 hover:text-white p-1 rounded bg-white/5 hover:bg-white/10 transition-colors"
              >
                {isSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>

            {/* Navigation Link Elements */}
            <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-180px)] lg:max-h-[calc(100vh-140px)]">
              {filteredMenuItems.map((item) => {
                const Icon = item.icon;
                const isSelected = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      if (window.innerWidth < 1024) {
                        setIsSidebarOpen(false);
                      }
                    }}
                    className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
                      isSelected 
                        ? 'bg-brand-secondary text-white shadow-md font-bold' 
                        : 'hover:bg-white/5 text-white/70 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {(isSidebarOpen || window.innerWidth < 1024) && (
                      <span className="truncate">{item.label}</span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Footer User Profiler */}
          {currentUser && (
            <div className="p-4 border-t border-white/10 bg-black/10 flex items-center justify-between">
              {(isSidebarOpen || window.innerWidth < 1024) ? (
                <>
                  <div className="flex items-center gap-2.5 truncate">
                    <div className="w-8 h-8 rounded-xl bg-brand-secondary/20 flex items-center justify-center text-xs font-black text-brand-secondary uppercase border border-brand-secondary/20 shrink-0">
                      {currentUser.name ? currentUser.name[0] : 'A'}
                    </div>
                    <div className="flex flex-col truncate">
                      <span className="text-[11px] font-bold leading-none truncate text-white">{currentUser.name}</span>
                      <span className="text-[9px] text-white/50 truncate mt-1 tracking-wider uppercase font-medium">{currentUser.role}</span>
                    </div>
                  </div>
                  <button 
                    onClick={handleLogout} 
                    className="text-white/40 hover:text-white p-1.5 hover:bg-white/5 rounded-lg transition-all"
                    title="Sign Out System"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <button 
                  onClick={handleLogout} 
                  className="w-full flex justify-center text-white/40 hover:text-white py-2"
                  title="Sign Out System"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </aside>

      {/* MAIN VIEW CONTENT SHELL */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* DESKTOP GLOBAL SUBHEADER INTERFACE */}
        <header className="hidden lg:flex h-16 bg-white border-b border-gray-200 items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4 w-96">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text"
                placeholder="Global tracking lookup (ID, Client, Port)..."
                value={globalSearchTerm}
                onChange={(e) => handleGlobalSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-brand-primary bg-gray-50/50"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              HQ Node Active
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all relative">
              <Bell className="w-4 h-4" />
              {notifications.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-brand-secondary rounded-full" />
              )}
            </button>
          </div>
        </header>

        {/* COMPONENT BODY AREA LAYOUT ROUTING */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-gray-50/50">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="h-full"
            >
              {activeTab === 'dashboard' && (
                <DashboardOverview 
                  shipments={shipments}
                  customers={customers}
                  vehicles={vehicles}
                  warehouses={warehouses}
                />
              )}

              {activeTab === 'shipments' && (
                <ShipmentModule 
                  shipments={globalSearchTerm ? searchResults : shipments}
                  customers={customers}
                  vehicles={vehicles}
                  drivers={drivers}
                  onSaveShipment={handleSaveShipment}
                  onDeleteShipment={handleDeleteShipment}
                  onClearAllShipments={handleClearAllShipments}
                  userRole={currentUser?.role || 'Super Admin'}
                />
              )}

              {activeTab !== 'dashboard' && activeTab !== 'shipments' && (
                <OtherModules 
                  activeTab={activeTab}
                  customers={customers}
                  vehicles={vehicles}
                  drivers={drivers}
                  warehouses={warehouses}
                  notifications={notifications}
                  auditLogs={auditLogs}
                  shipments={shipments}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}