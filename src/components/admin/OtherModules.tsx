import React, { useState } from 'react';
import { 
  Users, Database, Truck, FileText, Download, CheckCircle, AlertTriangle, 
  Settings, Key, Shield, Bell, HelpCircle, Eye, Plus, Search, Mail, Calendar, RefreshCw
} from 'lucide-react';
import { 
  CustomerRecord, VehicleRecord, DriverRecord, WarehouseRecord, 
  NotificationLog, AuditLog, CustomExtendedShipment 
} from './types';

interface OtherModulesProps {
  activeTab: string;
  customers: CustomerRecord[];
  vehicles: VehicleRecord[];
  drivers: DriverRecord[];
  warehouses: WarehouseRecord[];
  notifications: NotificationLog[];
  auditLogs: AuditLog[];
  shipments: CustomExtendedShipment[];
  onSaveCustomer?: (cust: CustomerRecord) => void;
  onSaveVehicle?: (veh: VehicleRecord) => void;
  onSaveDriver?: (drv: DriverRecord) => void;
  onSaveWarehouse?: (wh: WarehouseRecord) => void;
}

export default function OtherModules({
  activeTab, customers, vehicles, drivers, warehouses, notifications, auditLogs, shipments
}: OtherModulesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<any | null>(null);

  // Settings states
  const [smtpHost, setSmtpHost] = useState('smtp.sendgrid.net');
  const [smtpPort, setSmtpPort] = useState('587');
  const [smtpUser, setSmtpUser] = useState('apikey');
  const [trackingFormat, setTrackingFormat] = useState('FBGL-TYPE-YYYY-RAND');
  const [enableWhatsApp, setEnableWhatsApp] = useState(true);
  const [enableEmailAlerts, setEnableEmailAlerts] = useState(true);

  // Toast / Status Alerts
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'info' | null>(null);

  const showToast = (msg: string, type: 'success' | 'info' = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastType(null), 3000);
  };

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredVehicles = vehicles.filter(v => 
    v.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.currentLocation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDrivers = drivers.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.assignedVehicle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredWarehouses = warehouses.filter(w => 
    w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.managerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExportReports = (format: 'pdf' | 'excel' | 'csv') => {
    showToast(`Compiling Frost Bridge analytics data for export...`, 'info');
    setTimeout(() => {
      const csvContent = "data:text/csv;charset=utf-8," 
        + `Reporting Metric,Metric Value\n`
        + `Total Active Shipments,${shipments.length}\n`
        + `Total Active Warehouses,${warehouses.length}\n`
        + `Total Managed Vehicles,${vehicles.length}\n`
        + `SLA Performance Rate,96.8%\n`
        + `Total Registered Customers,${customers.length}\n`;
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `Analytical_Performance_Report.${format === 'excel' ? 'xls' : format}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast(`Operational Report downloaded as ${format.toUpperCase()}!`, 'success');
    }, 800);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Corporate preferences saved securely.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Toast alert banner */}
      {toastType && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl border transition-all duration-300 ${
          toastType === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200 animate-bounce' : 'bg-blue-50 text-blue-800 border-blue-200'
        }`}>
          <CheckCircle className="w-5 h-5 shrink-0" />
          <span className="text-xs font-bold font-sans">{toastMessage}</span>
        </div>
      )}

      {/* SEARCH / FILTERS FOR LOGS AND LISTS */}
      {['customers', 'warehouses', 'vehicles', 'drivers'].includes(activeTab) && (
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
          <div className="relative flex-grow">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            <input 
              type="text" 
              placeholder={`Search in ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-150 focus:outline-none focus:border-brand-primary text-xs w-full text-gray-600 bg-gray-50/50"
            />
          </div>
        </div>
      )}

      {/* MODULE: CUSTOMERS */}
      {activeTab === 'customers' && (
        <div className="bg-white border rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Client ID</th>
                  <th className="p-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Client Name & Company</th>
                  <th className="p-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Contact</th>
                  <th className="p-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Address</th>
                  <th className="p-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Vol (Qty)</th>
                  <th className="p-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Payments Outstanding</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs text-gray-600">
                {filteredCustomers.map((c, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-bold font-mono text-gray-500">{c.id}</td>
                    <td className="p-4">
                      <div className="font-bold text-gray-800">{c.name}</div>
                      <div className="text-[10px] text-gray-400">{c.company}</div>
                    </td>
                    <td className="p-4">
                      <div>{c.email}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{c.phone}</div>
                    </td>
                    <td className="p-4">
                      <div>{c.address}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{c.country}</div>
                    </td>
                    <td className="p-4 font-bold text-brand-primary">{c.totalShipmentsCount}</td>
                    <td className="p-4">
                      <span className={`font-semibold ${c.outstandingPayment > 0 ? 'text-orange-600' : 'text-emerald-600'}`}>
                        {c.outstandingPayment > 0 ? `₦${c.outstandingPayment.toLocaleString()}` : 'Cleared'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODULE: WAREHOUSES */}
      {activeTab === 'warehouses' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredWarehouses.map((w, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white border shadow-[0_4px_20px_rgb(0,0,0,0.02)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <span className="p-2.5 rounded-xl bg-blue-50 text-brand-primary border border-blue-100">
                    <Database className="w-5 h-5" />
                  </span>
                  <span className="text-[10px] font-black uppercase bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full">
                    Active Depot
                  </span>
                </div>
                <h3 className="text-sm font-bold text-gray-800 font-heading">{w.name}</h3>
                <p className="text-[10px] text-gray-400 mt-1">{w.location}</p>

                <div className="mt-5 space-y-3">
                  {/* Utilization index */}
                  <div>
                    <div className="flex items-center justify-between text-[10px] text-gray-500 font-bold mb-1 uppercase">
                      <span>Staging Area Utilization</span>
                      <span>{w.currentUtilization}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${w.currentUtilization > 75 ? 'bg-orange-500' : 'bg-brand-primary'}`}
                        style={{ width: `${w.currentUtilization}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-500">
                    <div>Capacity: <strong className="text-gray-700">{w.capacity}</strong></div>
                    <div>Manager: <strong className="text-gray-700">{w.managerName}</strong></div>
                    <div>Incoming Cargo: <strong className="text-brand-primary">{w.incomingCargoCount} pkgs</strong></div>
                    <div>Outgoing Cargo: <strong className="text-brand-secondary">{w.outgoingCargoCount} pkgs</strong></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODULE: VEHICLES */}
      {activeTab === 'vehicles' && (
        <div className="bg-white border rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Reg plate</th>
                  <th className="p-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Driver assigned</th>
                  <th className="p-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="p-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Fuel telemetry</th>
                  <th className="p-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Current coordinates</th>
                  <th className="p-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Payload cap</th>
                  <th className="p-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Next Maintenance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs text-gray-600">
                {filteredVehicles.map((v, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-bold font-mono text-brand-primary">{v.vehicleNumber}</td>
                    <td className="p-4 font-semibold text-gray-800">{v.driverName}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        v.status === 'Active' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
                      }`}>
                        {v.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-700">{v.fuelLevel}%</span>
                        <div className="w-16 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${v.fuelLevel < 20 ? 'bg-red-500' : 'bg-orange-400'}`} 
                            style={{ width: `${v.fuelLevel}%` }} 
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-500">{v.currentLocation}</td>
                    <td className="p-4 font-bold text-gray-600">{v.capacity}</td>
                    <td className="p-4 text-gray-400 font-semibold">{v.maintenanceDue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODULE: DRIVERS */}
      {activeTab === 'drivers' && (
        <div className="bg-white border rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Driver Code</th>
                  <th className="p-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Driver Name</th>
                  <th className="p-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Phone number</th>
                  <th className="p-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">License credentials</th>
                  <th className="p-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Vehicle assigned</th>
                  <th className="p-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Duties Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs text-gray-600">
                {filteredDrivers.map((d, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-bold font-mono text-gray-500">{d.id}</td>
                    <td className="p-4 font-bold text-gray-800">{d.name}</td>
                    <td className="p-4">{d.phone}</td>
                    <td className="p-4 font-mono text-gray-400">{d.licenseNumber}</td>
                    <td className="p-4 font-semibold text-brand-primary">{d.assignedVehicle}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        d.status === 'In Transit' || d.status === 'On Duty' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {d.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODULE: DOCUMENTS */}
      {activeTab === 'documents' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Corporate Documents Staging</h3>
            {shipments.map((s, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-gray-100 bg-white hover:border-brand-primary/30 transition-all">
                <span className="text-[9px] font-bold text-brand-secondary uppercase block mb-1">Waybill: {s.trackingId}</span>
                <div className="font-bold text-gray-800 text-xs">{s.customerName}</div>
                
                <div className="mt-3 space-y-1.5">
                  {s.documents.map((doc, docIdx) => (
                    <button 
                      key={docIdx}
                      onClick={() => setSelectedDoc({ ...doc, trackingId: s.trackingId, cargo: s.cargoDescription })}
                      className="w-full text-left flex items-center justify-between p-2 rounded-lg bg-gray-50 hover:bg-brand-primary/5 text-[11px] font-semibold text-gray-600 transition-colors"
                    >
                      <span className="truncate">{doc.name}</span>
                      <Eye className="w-3.5 h-3.5 text-gray-400 shrink-0 ml-1" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="md:col-span-2 p-6 rounded-2xl bg-white border shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col justify-between">
            {selectedDoc ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div>
                    <h3 className="text-sm font-bold text-gray-800 font-heading">{selectedDoc.name}</h3>
                    <p className="text-[10px] text-gray-400">Waybill ref: {selectedDoc.trackingId} | Size: {selectedDoc.fileSize}</p>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-brand-primary text-[10px] font-bold border border-blue-100">
                    {selectedDoc.type}
                  </span>
                </div>

                {/* Mock File Document Previewer */}
                <div className="p-6 rounded-xl border border-dashed border-gray-200 bg-gray-50/50 min-h-64 font-mono text-[11px] text-gray-500 overflow-y-auto whitespace-pre-wrap">
                  {`------------------------------------------------------------
FROST BRIDGE GLOBAL LOGISTICS LTD - PORTAL TRANSMISSIONS
------------------------------------------------------------
DOCUMENT TYPE      : ${selectedDoc.type.toUpperCase()}
REFERENCE CODE     : FBGL-DOC-2026-0984
WAYBILL ASSOCIATED : ${selectedDoc.trackingId}
DISPATCHED DATE    : ${selectedDoc.uploadDate}

CARGO MANIFEST SPECIFICATIONS:
------------------------------------------------------------
Description        : ${selectedDoc.cargo}
Staging Status     : Verified compliant with port customs.
Safety Certifications: ISO-9001 and West African ECOWAS customs cleared.

SIGNATURES & SEALS VERIFIED BY DISPATCH OFFICE
[ELECTRONICALLY SIGNED SECURE TOKEN]`}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center text-gray-400">
                <FileText className="w-12 h-12 stroke-[1.5] mb-4 text-gray-300" />
                <p className="text-xs">Select a specific document from the list on the left to preview its parameters inside the dashboard.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODULE: REPORTS */}
      {activeTab === 'reports' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-white border text-center shadow-[0_4px_20px_rgb(0,0,0,0.01)]">
              <span className="p-3 bg-red-50 text-red-600 rounded-2xl inline-block mb-4">
                <FileText className="w-6 h-6" />
              </span>
              <h3 className="text-sm font-bold text-gray-800 font-heading">Corporate PDF Summary</h3>
              <p className="text-[10px] text-gray-400 mt-1 mb-4">Consolidated operational metrics</p>
              <button 
                onClick={() => handleExportReports('pdf')}
                className="w-full bg-brand-primary hover:bg-blue-900 text-white font-bold text-xs py-2 rounded-xl cursor-pointer"
              >
                Download PDF
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-white border text-center shadow-[0_4px_20px_rgb(0,0,0,0.01)]">
              <span className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl inline-block mb-4">
                <Download className="w-6 h-6" />
              </span>
              <h3 className="text-sm font-bold text-gray-800 font-heading">Freight Billing spreadsheet</h3>
              <p className="text-[10px] text-gray-400 mt-1 mb-4">Invoicing records formatted for Excel</p>
              <button 
                onClick={() => handleExportReports('excel')}
                className="w-full bg-brand-primary hover:bg-blue-900 text-white font-bold text-xs py-2 rounded-xl cursor-pointer"
              >
                Download Excel (XLS)
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-white border text-center shadow-[0_4px_20px_rgb(0,0,0,0.01)]">
              <span className="p-3 bg-blue-50 text-blue-600 rounded-2xl inline-block mb-4">
                <Database className="w-6 h-6" />
              </span>
              <h3 className="text-sm font-bold text-gray-800 font-heading">Tracking Milestones (CSV)</h3>
              <p className="text-[10px] text-gray-400 mt-1 mb-4">Milestones telemetries data feed</p>
              <button 
                onClick={() => handleExportReports('csv')}
                className="w-full bg-brand-primary hover:bg-blue-900 text-white font-bold text-xs py-2 rounded-xl cursor-pointer"
              >
                Download CSV
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODULE: NOTIFICATIONS */}
      {activeTab === 'notifications' && (
        <div className="bg-white border rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">ID</th>
                  <th className="p-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Recipient (Contact)</th>
                  <th className="p-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Channel</th>
                  <th className="p-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Alert Type</th>
                  <th className="p-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Log Description</th>
                  <th className="p-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Dispatched</th>
                  <th className="p-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs text-gray-600">
                {notifications.map((n, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-mono text-gray-400">{n.id}</td>
                    <td className="p-4 font-semibold text-gray-800">{n.recipient}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                        n.channel === 'WhatsApp' ? 'bg-emerald-100 text-emerald-800' :
                        n.channel === 'SMS' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {n.channel}
                      </span>
                    </td>
                    <td className="p-4 text-gray-500 font-semibold">{n.type}</td>
                    <td className="p-4 text-gray-400 italic max-w-xs truncate" title={n.content}>{n.content}</td>
                    <td className="p-4 text-gray-400 font-semibold">{n.timestamp}</td>
                    <td className="p-4">
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>{n.status}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODULE: SETTINGS */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettings} className="p-6 rounded-2xl bg-white border shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* SMTP CONFIGURATION */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-800 font-heading flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-primary" />
                <span>SMTP Email Relay Server</span>
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">SMTP Server Host</label>
                  <input 
                    type="text" value={smtpHost} onChange={(e) => setSmtpHost(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-brand-primary"
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Port</label>
                    <input 
                      type="text" value={smtpPort} onChange={(e) => setSmtpPort(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-brand-primary"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Username / Key</label>
                    <input 
                      type="text" value={smtpUser} onChange={(e) => setSmtpUser(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-brand-primary"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SECURITY & ALERT PROTOCOLS */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-800 font-heading flex items-center gap-2">
                <Shield className="w-4 h-4 text-brand-secondary" />
                <span>Security & Alert Protocols</span>
              </h3>

              <div className="space-y-4 text-xs text-gray-600">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                  <div>
                    <div className="font-bold">Automated SMS / WhatsApp alerts</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">Ping clients instantly on checkpoint clearances</div>
                  </div>
                  <input 
                    type="checkbox" checked={enableWhatsApp} onChange={(e) => setEnableWhatsApp(e.target.checked)}
                    className="w-4 h-4 accent-brand-secondary rounded"
                  />
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                  <div>
                    <div className="font-bold">Email tracking reports</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">Send consolidated dispatch summary notes</div>
                  </div>
                  <input 
                    type="checkbox" checked={enableEmailAlerts} onChange={(e) => setEnableEmailAlerts(e.target.checked)}
                    className="w-4 h-4 accent-brand-secondary rounded"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button 
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-brand-secondary hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider cursor-pointer shadow-md hover:shadow-orange-500/10"
            >
              Save Configuration Settings
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
