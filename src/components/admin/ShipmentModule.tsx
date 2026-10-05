import React, { useState } from 'react';
import { 
  Plus, Search, Filter, Eye, Edit, Trash2, Printer, FileText, Mail, 
  X, Check, AlertTriangle, Calendar, MapPin, Truck, ChevronDown, RefreshCw, Send
} from 'lucide-react';
import { CustomExtendedShipment, CustomerRecord, VehicleRecord, DriverRecord } from './types';

interface ShipmentModuleProps {
  shipments: CustomExtendedShipment[];
  customers: CustomerRecord[];
  vehicles: VehicleRecord[];
  drivers: DriverRecord[];
  onSaveShipment: (shipment: CustomExtendedShipment) => void;
  onDeleteShipment: (trackingId: string) => void;
  onClearAllShipments?: () => void;
  userRole: string;
}

export default function ShipmentModule({ 
  shipments, customers, vehicles, drivers, onSaveShipment, onDeleteShipment, onClearAllShipments, userRole 
}: ShipmentModuleProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  
  // Modals / Detail View State
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<CustomExtendedShipment | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // New Shipment Form State
  const [freightType, setFreightType] = useState<'Air Freight' | 'Sea Freight' | 'Road Freight'>('Air Freight');
  const [customerName, setCustomerName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [originCountry, setOriginCountry] = useState('CN');
  const [originCity, setOriginCity] = useState('Beijing');
  const [destinationCountry, setDestinationCountry] = useState('NG');
  const [destinationCity, setDestinationCity] = useState('Lagos');
  const [cargoDescription, setCargoDescription] = useState('');
  const [weight, setWeight] = useState('1,250 KG');
  const [volume, setVolume] = useState('4.5 CBM');
  const [quantity, setQuantity] = useState(1);
  const [containerNo, setContainerNo] = useState('');
  const [billOfLading, setBillOfLading] = useState('');
  const [bookingNumber, setBookingNumber] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [driverName, setDriverName] = useState('');
  const [estDelivery, setEstDelivery] = useState('2026-07-20');
  const [initialStatus, setInitialStatus] = useState<CustomExtendedShipment['status']>('Pending');
  const [notes, setNotes] = useState('');

  // Update Shipment Tracking state
  const [trackingStatus, setTrackingStatus] = useState<CustomExtendedShipment['status']>('Pending');
  const [currentLocation, setCurrentLocation] = useState('');
  const [eta, setEta] = useState('');
  const [updateRemarks, setUpdateRemarks] = useState('');

  // Toast / Status Alerts
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'info' | 'error' | null>(null);

  const showToast = (msg: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastType(null), 3500);
  };

  // Generate dynamic tracking ID based on selected transport type
  const generateTrackingId = () => {
    const year = new Date().getFullYear();
    const rand = Math.floor(100000 + Math.random() * 900000);
    const typeCode = freightType === 'Air Freight' ? 'AIR' : freightType === 'Sea Freight' ? 'SEA' : 'ROAD';
    return `FBGL-${typeCode}-${year}-${rand}`;
  };

  const handleCreateShipment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !cargoDescription) {
      showToast('Please fill in all mandatory fields', 'error');
      return;
    }

    const newTrackingId = generateTrackingId();
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newShipment: CustomExtendedShipment = {
      trackingId: newTrackingId,
      customerName,
      companyName,
      phone,
      email,
      originCountry,
      originCity,
      destinationCountry,
      destinationCity,
      freightType,
      cargoDescription,
      weight,
      volume,
      quantity,
      containerNo: containerNo || undefined,
      billOfLading: billOfLading || undefined,
      bookingNumber: bookingNumber || undefined,
      vehicleNumber: vehicleNumber || undefined,
      driverName: driverName || undefined,
      estimatedDelivery: new Date(estDelivery).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      status: initialStatus,
      createdDate: dateStr,
      invoiceAmount: Math.floor(150000 + Math.random() * 850000),
      paymentStatus: 'Paid',
      notes,
      documents: [
        { id: 'doc-1', name: 'Standard Consignment Note', type: 'Packing List', uploadDate: dateStr, fileSize: '142 KB', fileUrl: '#' }
      ],
      milestones: [
        { 
          status: 'Shipment Booked', 
          date: `${dateStr} - ${timeStr}`, 
          location: `${originCity}, ${originCountry}`, 
          description: 'Shipment booking completed, customs files pre-logged.', 
          completed: true,
          officer: 'Operations Desk',
          remarks: 'System dispatch initialized.'
        }
      ],
      history: [
        { date: `${dateStr} - ${timeStr}`, location: `${originCity}, ${originCountry}`, status: 'Cargo booking received & validated', updatedBy: 'Lagos Hub Operations' }
      ]
    };

    // If initial status is not pending, add corresponding milestone automatically
    if (initialStatus !== 'Pending') {
      newShipment.milestones.push({
        status: initialStatus,
        date: `${dateStr} - ${timeStr}`,
        location: `${originCity}, ${originCountry}`,
        description: `Shipment advanced to: ${initialStatus}`,
        completed: true,
        officer: 'Assigned Officer',
        remarks: 'Bulk state updated'
      });
      newShipment.history.unshift({
        date: `${dateStr} - ${timeStr}`,
        location: `${originCity}, ${originCountry}`,
        status: `Status moved to: ${initialStatus}`,
        updatedBy: 'Terminal Controller'
      });
    }

    onSaveShipment(newShipment);
    setIsCreateOpen(false);
    resetForm();
    showToast(`Shipment ${newTrackingId} created successfully!`, 'success');
  };

  const resetForm = () => {
    setCustomerName('');
    setCompanyName('');
    setPhone('');
    setEmail('');
    setCargoDescription('');
    setContainerNo('');
    setBillOfLading('');
    setBookingNumber('');
    setVehicleNumber('');
    setDriverName('');
    setNotes('');
  };

  const handleOpenUpdate = (shipment: CustomExtendedShipment) => {
    setSelectedShipment(shipment);
    setTrackingStatus(shipment.status);
    setCurrentLocation(shipment.originCity);
    setUpdateRemarks('');
    setIsUpdateOpen(true);
  };

  const handleUpdateTracking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedShipment) return;

    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const updatedMilestones = [...selectedShipment.milestones];
    const updatedHistory = [...selectedShipment.history];

    // Mark previous milestones completed
    updatedMilestones.forEach(m => m.completed = true);

    // Add new milestone representing the current update
    updatedMilestones.push({
      status: trackingStatus,
      date: `${dateStr} - ${timeStr}`,
      location: currentLocation || selectedShipment.destinationCity,
      description: updateRemarks || `Cargo coordinates verified at ${currentLocation || 'Lagos Hub'}.`,
      completed: true,
      officer: 'Dispatch Supervisor',
      remarks: updateRemarks || 'Transit waypoint logs'
    });

    updatedHistory.unshift({
      date: `${dateStr} - ${timeStr}`,
      location: currentLocation || selectedShipment.destinationCity,
      status: `Advanced status: ${trackingStatus}`,
      updatedBy: 'Frost Bridge Hub Coordinator'
    });

    const updatedShipment: CustomExtendedShipment = {
      ...selectedShipment,
      status: trackingStatus,
      currentLocation: currentLocation || selectedShipment.originCity,
      estimatedDelivery: eta ? new Date(eta).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : selectedShipment.estimatedDelivery,
      milestones: updatedMilestones,
      history: updatedHistory
    };

    onSaveShipment(updatedShipment);
    setIsUpdateOpen(false);
    showToast(`Tracking status updated for ${selectedShipment.trackingId}!`, 'success');
  };

  const handleSendNotification = (shipment: CustomExtendedShipment) => {
    showToast(`SMS, WhatsApp & Email notifications triggered to customer for ${shipment.trackingId}!`, 'info');
  };

  const handlePrintManifest = (shipment: CustomExtendedShipment) => {
    showToast(`Generating printable dispatch invoice for ${shipment.trackingId}...`, 'info');
    setTimeout(() => {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Cargo Delivery Note - ${shipment.trackingId}</title>
              <style>
                body { font-family: sans-serif; padding: 40px; color: #333; }
                .header { border-bottom: 2px solid #0B4F7D; padding-bottom: 20px; margin-bottom: 30px; }
                .title { font-size: 24px; font-weight: bold; color: #0B4F7D; }
                .details { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 40px; }
                .section-title { font-weight: bold; border-bottom: 1px solid #ddd; padding-bottom: 5px; margin-bottom: 10px; }
              </style>
            </head>
            <body>
              <div class="header">
                <div class="title">FROST BRIDGE LOGISTICS LIMITED</div>
                <div>Enterprise Cargo Delivery Note & Dispatch Manifest</div>
              </div>
              <div class="details">
                <div>
                  <div class="section-title">SHIPMENT INFO</div>
                  <div>Tracking Number: <strong>${shipment.trackingId}</strong></div>
                  <div>Freight Type: ${shipment.freightType}</div>
                  <div>Cargo Description: ${shipment.cargoDescription}</div>
                  <div>Weight / Volume: ${shipment.weight} / ${shipment.volume}</div>
                </div>
                <div>
                  <div class="section-title">CLIENT DETAILS</div>
                  <div>Customer: ${shipment.customerName}</div>
                  <div>Company: ${shipment.companyName}</div>
                  <div>Email: ${shipment.email}</div>
                  <div>Route: ${shipment.originCity} (${shipment.originCountry}) &rarr; ${shipment.destinationCity} (${shipment.destinationCountry})</div>
                </div>
              </div>
              <div class="section-title">MILESTONES HISTORY</div>
              <ul>
                ${shipment.milestones.map(m => `<li><strong>${m.status}</strong> (${m.date}) - ${m.location}: ${m.description}</li>`).join('')}
              </ul>
              <div style="margin-top: 60px; text-align: center; font-size: 11px; color: #999;">
                Generated securely on Frost Bridge Enterprise Admin Portal.
              </div>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    }, 500);
  };

  const handleDownloadInvoiceCSV = (shipment: CustomExtendedShipment) => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + `Tracking ID,Customer,Company,Type,Origin,Destination,Weight,Amount,Status\n`
      + `"${shipment.trackingId}","${shipment.customerName}","${shipment.companyName}","${shipment.freightType}","${shipment.originCity}","${shipment.destinationCity}","${shipment.weight}",${shipment.invoiceAmount},"${shipment.status}"`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Invoice_${shipment.trackingId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Invoice CSV downloaded for ${shipment.trackingId}`, 'success');
  };

  // Filter shipments based on search, status, and type
  const filteredShipments = shipments.filter(s => {
    const matchesSearch = s.trackingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.originCity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.destinationCity.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
    const matchesType = typeFilter === 'All' || s.freightType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Toast alert banner */}
      {toastType && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl border transition-all duration-300 animate-bounce ${
          toastType === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
          toastType === 'error' ? 'bg-red-50 text-red-800 border-red-200' : 'bg-blue-50 text-blue-800 border-blue-200'
        }`}>
          <Check className="w-5 h-5 shrink-0" />
          <span className="text-xs font-bold font-sans">{toastMessage}</span>
        </div>
      )}

      {/* Action panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-white border shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            <input 
              type="text" 
              placeholder="Search ID, customer, route..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-150 focus:outline-none focus:border-brand-primary text-xs w-64 text-gray-600 bg-gray-50/50"
            />
          </div>

          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-gray-150 focus:outline-none focus:border-brand-primary text-xs text-gray-600 bg-white"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Cargo Received">Cargo Received</option>
            <option value="Customs Clearance">Customs Clearance</option>
            <option value="Loading">Loading</option>
            <option value="In Transit">In Transit</option>
            <option value="At Port">At Port</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Delayed">Delayed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <select 
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-gray-150 focus:outline-none focus:border-brand-primary text-xs text-gray-600 bg-white"
          >
            <option value="All">All Modes</option>
            <option value="Air Freight">Air Freight</option>
            <option value="Sea Freight">Sea Freight</option>
            <option value="Road Freight">Road Freight</option>
          </select>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {userRole === 'Super Admin' && onClearAllShipments && shipments.length > 0 && (
            <button 
              onClick={onClearAllShipments}
              className="bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 font-bold text-xs px-4 py-3 rounded-xl flex items-center gap-1.5 transition-all uppercase tracking-wide cursor-pointer shrink-0"
              title="Clear all seeded shipments to start fresh"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Shipments</span>
            </button>
          )}

          {['Super Admin', 'Operations Manager', 'Shipment Officer'].includes(userRole) && (
            <button 
              onClick={() => setIsCreateOpen(true)}
              className="bg-brand-secondary hover:bg-orange-600 text-white font-bold text-xs px-5 py-3 rounded-xl flex items-center gap-2 shadow-md hover:shadow-orange-500/20 cursor-pointer transition-all uppercase tracking-wide shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>New Shipment</span>
            </button>
          )}
        </div>
      </div>

      {/* Shipment Table */}
      <div className="bg-white border shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tracking Number</th>
                <th className="p-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Customer</th>
                <th className="p-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Route</th>
                <th className="p-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Type</th>
                <th className="p-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="p-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">ETA</th>
                <th className="p-4 text-right text-[10px] font-bold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs text-gray-600">
              {filteredShipments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-400">
                    No shipments found matching selected criteria.
                  </td>
                </tr>
              ) : (
                filteredShipments.map((s, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-bold font-mono text-brand-primary">{s.trackingId}</td>
                    <td className="p-4">
                      <div className="font-semibold text-gray-800">{s.customerName}</div>
                      <div className="text-[10px] text-gray-400">{s.companyName || 'Private Client'}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-gray-700">{s.originCity}</span>
                        <span className="text-gray-300">&rarr;</span>
                        <span className="font-semibold text-gray-700">{s.destinationCity}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                        s.freightType === 'Air Freight' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                        s.freightType === 'Sea Freight' ? 'bg-cyan-50 text-cyan-600 border-cyan-100' : 'bg-orange-50 text-orange-600 border-orange-100'
                      }`}>
                        {s.freightType}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                        s.status === 'Delivered' ? 'bg-green-100 text-green-700 border border-green-200' :
                        s.status === 'In Transit' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                        s.status === 'Delayed' ? 'bg-red-100 text-red-700 border border-red-200' :
                        s.status === 'Pending' ? 'bg-orange-100 text-orange-700 border border-orange-200' :
                        'bg-gray-100 text-gray-700 border border-gray-200'
                      }`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-gray-500">{s.estimatedDelivery}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => { setSelectedShipment(s); setIsDetailOpen(true); }}
                          title="View Details"
                          className="p-1.5 rounded-lg border border-gray-100 hover:bg-gray-100 text-gray-500 cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        
                        {['Super Admin', 'Operations Manager', 'Shipment Officer'].includes(userRole) && (
                          <button 
                            onClick={() => handleOpenUpdate(s)}
                            title="Update Tracking Status"
                            className="p-1.5 rounded-lg border border-gray-100 hover:bg-gray-100 text-brand-primary cursor-pointer"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        )}

                        <button 
                          onClick={() => handlePrintManifest(s)}
                          title="Print Shipping note"
                          className="p-1.5 rounded-lg border border-gray-100 hover:bg-gray-100 text-gray-600 cursor-pointer"
                        >
                          <Printer className="w-4 h-4" />
                        </button>

                        <button 
                          onClick={() => handleDownloadInvoiceCSV(s)}
                          title="Download Invoice CSV"
                          className="p-1.5 rounded-lg border border-gray-100 hover:bg-gray-100 text-blue-600 cursor-pointer"
                        >
                          <FileText className="w-4 h-4" />
                        </button>

                        {['Super Admin'].includes(userRole) && (
                          <button 
                            onClick={() => {
                              if(confirm(`Are you sure you want to delete shipment ${s.trackingId}?`)) {
                                onDeleteShipment(s.trackingId);
                                showToast(`Shipment ${s.trackingId} deleted`, 'info');
                              }
                            }}
                            title="Delete Shipment"
                            className="p-1.5 rounded-lg border border-red-50 hover:bg-red-50 text-red-500 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: Create New Shipment */}
      {isCreateOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl border border-gray-100 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="bg-brand-primary px-6 py-4 flex items-center justify-between text-white">
              <div>
                <h3 className="text-base font-bold font-heading">Register New Cargo Shipment</h3>
                <p className="text-[10px] text-blue-200">Frost Bridge Automatic Waybill Issuing Engine</p>
              </div>
              <button onClick={() => setIsCreateOpen(false)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateShipment} className="p-6 overflow-y-auto space-y-6 flex-grow">
              {/* First Section: Client Detail */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">1. Importer / Consignee Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Customer Name *</label>
                    <input 
                      type="text" required
                      value={customerName} onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Aliko Dangote Jr"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-brand-primary"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Company/Entity</label>
                    <input 
                      type="text"
                      value={companyName} onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Dangote Group Ltd"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-brand-primary"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Contact Phone</label>
                    <input 
                      type="text"
                      value={phone} onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +234 803..."
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-brand-primary"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Contact Email</label>
                    <input 
                      type="email"
                      value={email} onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. logistics@dangote.com"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-brand-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Second Section: Cargo Details */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">2. Cargo Specs & Transport Mode</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Freight Mode</label>
                    <select 
                      value={freightType} 
                      onChange={(e) => setFreightType(e.target.value as any)}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-brand-primary"
                    >
                      <option value="Air Freight">Air Freight</option>
                      <option value="Sea Freight">Sea Freight</option>
                      <option value="Road Freight">Road Freight</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Cargo Description *</label>
                    <input 
                      type="text" required
                      value={cargoDescription} onChange={(e) => setCargoDescription(e.target.value)}
                      placeholder="e.g. Industrial polymer raw material resins bags"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-brand-primary"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Weight</label>
                    <input 
                      type="text"
                      value={weight} onChange={(e) => setWeight(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-brand-primary"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Volume</label>
                    <input 
                      type="text"
                      value={volume} onChange={(e) => setVolume(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-brand-primary"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Quantity (Packages)</label>
                    <input 
                      type="number"
                      value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-brand-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Third Section: Logistics Routing & Fleet assignment */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">3. Origin & Destination Routing</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Origin City</label>
                    <input 
                      type="text" value={originCity} onChange={(e) => setOriginCity(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-brand-primary"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Origin Country Code</label>
                    <input 
                      type="text" value={originCountry} onChange={(e) => setOriginCountry(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-brand-primary"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Destination City</label>
                    <input 
                      type="text" value={destinationCity} onChange={(e) => setDestinationCity(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-brand-primary"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Destination Country Code</label>
                    <input 
                      type="text" value={destinationCountry} onChange={(e) => setDestinationCountry(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-brand-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Advanced Tracking Reference Numbers */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">4. Custom References (Bills of Lading, Fleet Selections)</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Container Number</label>
                    <input 
                      type="text" value={containerNo} onChange={(e) => setContainerNo(e.target.value)}
                      placeholder="e.g. MSKU-90812-4"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-brand-primary"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Bill of Lading</label>
                    <input 
                      type="text" value={billOfLading} onChange={(e) => setBillOfLading(e.target.value)}
                      placeholder="e.g. BL-SEA-2026-99"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-brand-primary"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Assigned Vehicle</label>
                    <select 
                      value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-brand-primary"
                    >
                      <option value="">Select Company Fleet</option>
                      {vehicles.map((v, i) => <option key={i} value={v.vehicleNumber}>{v.vehicleNumber} ({v.driverName})</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Est. Delivery Date</label>
                    <input 
                      type="date" value={estDelivery} onChange={(e) => setEstDelivery(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-brand-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsCreateOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-xs font-semibold text-gray-500 cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand-secondary hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-orange-500/10 cursor-pointer"
                >
                  Save Shipment Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Update Tracking Timeline & Milestones */}
      {isUpdateOpen && selectedShipment && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-gray-100 overflow-hidden">
            <div className="bg-brand-primary px-6 py-4 flex items-center justify-between text-white">
              <div>
                <h3 className="text-sm font-bold font-heading">Update Live Tracking: {selectedShipment.trackingId}</h3>
                <p className="text-[10px] text-blue-200">Milestone updates sync immediately to public tracking page</p>
              </div>
              <button onClick={() => setIsUpdateOpen(false)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateTracking} className="p-6 space-y-4">
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Current Shipment Status</label>
                <select 
                  value={trackingStatus}
                  onChange={(e) => setTrackingStatus(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-brand-primary font-semibold"
                >
                  <option value="Pending">Pending</option>
                  <option value="Cargo Received">Cargo Received</option>
                  <option value="Customs Clearance">Customs Clearance</option>
                  <option value="Loading">Loading</option>
                  <option value="In Transit">In Transit</option>
                  <option value="At Port">At Port</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Delayed">Delayed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Current Physical Location</label>
                <input 
                  type="text"
                  value={currentLocation}
                  onChange={(e) => setCurrentLocation(e.target.value)}
                  placeholder="e.g. Seme Customs Outpost, Nigeria"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Adjust ETA / Delivery Target</label>
                <input 
                  type="date"
                  value={eta}
                  onChange={(e) => setEta(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Timeline remarks / log details</label>
                <textarea 
                  rows={3}
                  value={updateRemarks}
                  onChange={(e) => setUpdateRemarks(e.target.value)}
                  placeholder="e.g. Vessel cleared border post successfully. Transferred to final transport trailer."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-brand-primary resize-none"
                />
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsUpdateOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-xs text-gray-500 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-brand-secondary hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Push Tracking Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: High-fidelity Shipment Detail Page */}
      {isDetailOpen && selectedShipment && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl border border-gray-100 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="bg-brand-primary px-6 py-4 flex items-center justify-between text-white">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-base font-bold font-heading">{selectedShipment.trackingId}</span>
                  <span className="text-[10px] font-black uppercase bg-white/10 px-2.5 py-0.5 rounded-full border border-white/20">
                    {selectedShipment.freightType}
                  </span>
                </div>
                <p className="text-[10px] text-blue-200 mt-1">Staging Route: {selectedShipment.originCity} &rarr; {selectedShipment.destinationCity}</p>
              </div>
              <button onClick={() => setIsDetailOpen(false)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 flex-grow">
              {/* Top Summary Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Importer Consignee</span>
                  <div className="font-bold text-gray-800 text-sm">{selectedShipment.customerName}</div>
                  <div className="text-xs text-gray-500 mt-1">{selectedShipment.companyName || 'Private Client'}</div>
                  <div className="text-[10px] text-gray-400 mt-2 font-mono">{selectedShipment.email} | {selectedShipment.phone}</div>
                </div>

                <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Cargo Metrics</span>
                  <div className="font-bold text-gray-800 text-sm">{selectedShipment.cargoDescription}</div>
                  <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-gray-500">
                    <div>Weight: <strong>{selectedShipment.weight}</strong></div>
                    <div>Volume: <strong>{selectedShipment.volume}</strong></div>
                    <div>Packages: <strong>{selectedShipment.quantity}</strong></div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Consignment Codes</span>
                  <div className="space-y-1.5 text-xs text-gray-600">
                    <div>Status: <span className="font-bold text-orange-600">{selectedShipment.status}</span></div>
                    <div>Booking Number: <strong className="font-mono">{selectedShipment.bookingNumber || 'FB-BKG-N/A'}</strong></div>
                    <div>Bill of Lading: <strong className="font-mono">{selectedShipment.billOfLading || 'FB-BL-N/A'}</strong></div>
                    <div>Assigned Vehicle: <strong className="font-mono text-brand-primary">{selectedShipment.vehicleNumber || 'Unassigned'}</strong></div>
                  </div>
                </div>
              </div>

              {/* Animated Timeline View */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Logistics Timeline Milestones</h4>
                <div className="relative border-l-2 border-gray-100 ml-4 pl-6 space-y-6">
                  {selectedShipment.milestones.map((m, i) => (
                    <div key={i} className="relative">
                      {/* Circle Indicator */}
                      <span className={`absolute -left-[31px] top-1.5 flex h-4 w-4 rounded-full border-2 ${
                        m.completed ? 'bg-emerald-500 border-emerald-500' : 'bg-white border-gray-300'
                      }`} />
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div>
                          <div className="text-xs font-bold text-gray-800">{m.status}</div>
                          <p className="text-xs text-gray-500 mt-0.5">{m.description}</p>
                          {m.remarks && <p className="text-[10px] text-gray-400 italic mt-1">&quot;{m.remarks}&quot;</p>}
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-bold text-gray-400 block">{m.date}</span>
                          <span className="text-[9px] text-brand-secondary font-mono block mt-0.5">{m.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Functional Notification Trigger inside details */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[10px] text-gray-400 font-semibold uppercase">Action Centre</span>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => handleSendNotification(selectedShipment)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-50 text-brand-secondary border border-orange-100 hover:bg-orange-100 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Resend Customer Alert</span>
                  </button>
                  <button 
                    onClick={() => handlePrintManifest(selectedShipment)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 text-brand-primary border border-blue-100 hover:bg-blue-100 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Cargo manifest</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
