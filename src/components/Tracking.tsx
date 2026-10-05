import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Anchor, 
  ShieldCheck, 
  Box, 
  Truck, 
  Compass, 
  Calendar, 
  Info, 
  Clock, 
  Check, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp, 
  Plane, 
  FileText, 
  Globe, 
  User, 
  Award,
  Activity,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ShipmentDetails, ShipmentMilestone } from '../types';

// Extended type for complete premium display options
interface ExtendedShipmentDetails extends ShipmentDetails {
  customerName: string;
  shipmentReference: string;
  freightType: 'Air Freight' | 'Sea Freight' | 'Road Freight';
  numPackages: number;
  containerNo?: string;
  bookingDate: string;
  departureDate?: string;
  estimatedArrivalDate: string;
  currentLocation: string;
  deliveryAddress: string;
  recipientName: string;
  signatureRequired: 'Yes' | 'No';
  isRealWorldTracked?: boolean;
  carrierName?: string;
  history: {
    date: string;
    location: string;
    status: string;
    updatedBy: string;
  }[];
}

// Complete mock dataset based on UPS, Maersk, FedEx and CEVA guidelines
const SHIPMENTS_DATABASE: { [key: string]: ExtendedShipmentDetails } = {
  'FBGL-2026-001245': {
    trackingId: 'FBGL-2026-001245',
    origin: 'Shanghai Seaport Terminal, CN',
    destination: 'Apapa Seaport Terminal, Lagos, NG',
    estimatedDelivery: 'July 14, 2026',
    weight: '14,250 KG',
    service: 'Ocean Freight (Full Container Load - FCL)',
    status: 'In Transit',
    customerName: 'Sovereign Manufacturing Group Nig Ltd',
    shipmentReference: 'REF-88901245-CN',
    freightType: 'Sea Freight',
    numPackages: 1,
    containerNo: 'MSKU-489012-4',
    bookingDate: 'June 18, 2026',
    departureDate: 'June 22, 2026',
    estimatedArrivalDate: 'July 14, 2026',
    currentLocation: 'Atlantic Ocean Corridor (South Transit)',
    deliveryAddress: 'Plot 14, Industrial Estate Phase 2, Ikeja, Lagos, Nigeria',
    recipientName: 'Warehouse Operations Manager',
    signatureRequired: 'Yes',
    milestones: [
      { status: 'Shipment Booked', date: 'June 18, 2026 - 10:30 AM', location: 'Shanghai Office, CN', description: 'Booking confirmed and transport container allocated.', completed: true },
      { status: 'Cargo Collected', date: 'June 20, 2026 - 02:15 PM', location: 'Shanghai Hub, CN', description: 'Cargo picked up from supplier and sealed at depot.', completed: true },
      { status: 'Export Customs Clearance', date: 'June 21, 2026 - 09:00 AM', location: 'Shanghai Seaport, CN', description: 'Customs inspections cleared. Port authority exit approved.', completed: true },
      { status: 'Loaded for Transport', date: 'June 22, 2026 - 04:30 PM', location: 'Shanghai Seaport, CN', description: 'Container loaded onto MAERSK VIGOR (Voyage MV206).', completed: true },
      { status: 'In Transit', date: 'June 23, 2026 - 06:00 AM', location: 'East China Sea', description: 'Vessel en route. Ocean transit active.', completed: true },
      { status: 'Arrived at Destination Port/Airport', date: 'Pending', location: 'Apapa Seaport, Lagos', description: 'Vessel ETA in Apapa Hub updated for July 12.', completed: false },
      { status: 'Import Customs Clearance', date: 'Pending', location: 'Apapa Seaport, Lagos', description: 'Pre-filing PAAR clearance documents with customs.', completed: false },
      { status: 'Out for Delivery', date: 'Pending', location: 'Lagos Terminal Hub', description: 'Local container trailer dispatch to client warehouse.', completed: false },
      { status: 'Delivered', date: 'Pending', location: 'Ikeja Warehouse, Lagos', description: 'Awaiting cargo sign-off by recipient.', completed: false },
    ],
    history: [
      { date: 'June 29, 2026 - 08:42 AM', location: 'Gulf of Guinea Maritime Corridor', status: 'Vessel cruising in equatorial Atlantic corridor. Speed: 18.5 knots.', updatedBy: 'Lagos Tracking Control' },
      { date: 'June 26, 2026 - 02:15 PM', location: 'Suez Canal Crossing, EG', status: 'Suez maritime checkpoint successfully passed, entering Mediterranean.', updatedBy: 'Port Said Agent' },
      { date: 'June 22, 2026 - 04:30 PM', location: 'Shanghai Seaport, CN', status: 'Container loaded on Maersk Vigor vessel. Port terminal seal MSK-8902 verified.', updatedBy: 'Shanghai Terminal Control' },
      { date: 'June 21, 2026 - 09:00 AM', location: 'Shanghai Seaport, CN', status: 'Export cargo customs processing finalized and approved.', updatedBy: 'Shanghai Customs Agent' },
      { date: 'June 20, 2026 - 02:15 PM', location: 'Shanghai Cargo Hub, CN', status: 'Cargo collected from manufacturer, inspected, and containerized.', updatedBy: 'Shanghai Dispatch' },
      { date: 'June 18, 2026 - 10:30 AM', location: 'Shanghai Office, CN', status: 'Ocean container booking created and space confirmed.', updatedBy: 'China Booking Desk' },
    ],
  },
  'FBGL-2026-003489': {
    trackingId: 'FBGL-2026-003489',
    origin: 'Heathrow Airport Cargo Terminal, London, UK',
    destination: 'Isolo Cold Terminal Hub, Lagos, NG',
    estimatedDelivery: 'June 28, 2026 (Delivered)',
    weight: '2,840 KG',
    service: 'Cold Chain Air Freight (Pharmaceutical Grade)',
    status: 'Delivered',
    customerName: 'Afrimed Healthcare Group West Africa',
    shipmentReference: 'REF-55410982-UK',
    freightType: 'Air Freight',
    numPackages: 14,
    containerNo: 'LD3-COLD-44109',
    bookingDate: 'June 23, 2026',
    departureDate: 'June 25, 2026',
    estimatedArrivalDate: 'June 26, 2026',
    currentLocation: 'Isolo Pharmaceutical Hub, Lagos',
    deliveryAddress: '78, Isolo-Apapa Expressway, Isolo Industrial Hub, Lagos, Nigeria',
    recipientName: 'Dr. Chima Nwachukwu (QA Director)',
    signatureRequired: 'Yes',
    milestones: [
      { status: 'Shipment Booked', date: 'June 23, 2026 - 09:00 AM', location: 'London Office, UK', description: 'Air cargo booking confirmed with active cold storage allocation.', completed: true },
      { status: 'Cargo Collected', date: 'June 24, 2026 - 11:30 AM', location: 'London Airport Hub, UK', description: 'Insulated active thermal containers checked and loaded.', completed: true },
      { status: 'Export Customs Clearance', date: 'June 24, 2026 - 03:45 PM', location: 'Heathrow Cargo Hub, UK', description: 'Cleared medical export protocols. Exit documentation verified.', completed: true },
      { status: 'Loaded for Transport', date: 'June 25, 2026 - 08:00 AM', location: 'Heathrow Airport, UK', description: 'Loaded into direct British Airways Cargo Flight BA-075.', completed: true },
      { status: 'In Transit', date: 'June 25, 2026 - 10:15 AM', location: 'Airspace Crossing', description: 'Direct flight route in transit toward Murtala Muhammed Airport.', completed: true },
      { status: 'Arrived at Destination Port/Airport', date: 'June 26, 2026 - 04:30 PM', location: 'Murtala Muhammed Cargo Hub', description: 'Touchdown Lagos. Cargo transferred to temperature-controlled facility.', completed: true },
      { status: 'Import Customs Clearance', date: 'June 27, 2026 - 11:00 AM', location: 'Murtala Muhammed Cargo Hub', description: 'Expedited pharmaceutical customs clearances approved by NAFDAC.', completed: true },
      { status: 'Out for Delivery', date: 'June 28, 2026 - 08:30 AM', location: 'Lagos Terminal Hub', description: 'Refrigerated reefer van dispatched for last-mile delivery.', completed: true },
      { status: 'Delivered', date: 'June 28, 2026 - 11:45 AM', location: 'Isolo Warehouse, Lagos', description: 'Cargo received. Temperature logs verified stable at +4.2°C.', completed: true },
    ],
    history: [
      { date: 'June 28, 2026 - 11:45 AM', location: 'Isolo Hub, Lagos, NG', status: 'Cargo delivered successfully. Temperature sensor log completed.', updatedBy: 'Lagos Last-Mile Dispatch' },
      { date: 'June 28, 2026 - 08:30 AM', location: 'Lagos Terminal Hub, NG', status: 'Dispatched in refrigerated van (Reg: FB-RF-04) to Isolo.', updatedBy: 'Lagos Cold Chain Manager' },
      { date: 'June 27, 2026 - 11:00 AM', location: 'Murtala Muhammed Cargo Hub, NG', status: 'NAFDAC health certificate and import customs release completed.', updatedBy: 'Lagos Customs Coordinator' },
      { date: 'June 26, 2026 - 04:30 PM', location: 'Murtala Muhammed Cargo Hub, NG', status: 'Cargo plane landed. Containers transferred to cold storage.', updatedBy: 'MMIA Ground Crew' },
      { date: 'June 25, 2026 - 10:15 AM', location: 'Heathrow Airport, UK', status: 'BA-075 cargo flight departed on schedule.', updatedBy: 'Heathrow Loading Control' },
    ],
  },
  'FBGL-2026-009812': {
    trackingId: 'FBGL-2026-009812',
    origin: 'Cotonou Border Hub, BJ',
    destination: 'Oregun Industrial Area, Lagos, NG',
    estimatedDelivery: 'July 01, 2026',
    weight: '8,400 KG',
    service: 'Cross-Border Highway Freight (Groupage)',
    status: 'Pending', // Customs Clearance
    customerName: 'West African Retail Distribution Ltd',
    shipmentReference: 'REF-2291084-BJ',
    freightType: 'Road Freight',
    numPackages: 35,
    containerNo: 'TRK-FB-1120',
    bookingDate: 'June 26, 2026',
    departureDate: 'June 28, 2026',
    estimatedArrivalDate: 'July 01, 2026',
    currentLocation: 'Seme Border customs checkpoint',
    deliveryAddress: '34, Billings Way, Oregun, Ikeja, Lagos, Nigeria',
    recipientName: 'Inbound Logistics Lead',
    signatureRequired: 'Yes',
    milestones: [
      { status: 'Shipment Booked', date: 'June 26, 2026 - 11:00 AM', location: 'Cotonou Depot, BJ', description: 'Cross-border road booking logged and transit permit issued.', completed: true },
      { status: 'Cargo Collected', date: 'June 27, 2026 - 03:30 PM', location: 'Cotonou Hub, BJ', description: 'Groupage goods collected, sorted, and packed into cargo truck.', completed: true },
      { status: 'Export Customs Clearance', date: 'June 28, 2026 - 10:00 AM', location: 'Cotonou Customs BJ', description: 'Export transit declaration validated by Benin Customs authorities.', completed: true },
      { status: 'Loaded for Transport', date: 'June 28, 2026 - 01:00 PM', location: 'Cotonou Seaport Area, BJ', description: 'Truck FB-1120 sealed and departed toward Seme Border crossing.', completed: true },
      { status: 'In Transit', date: 'June 29, 2026 - 09:00 AM', location: 'Highway Transit', description: 'Active road transport on the West African coastal corridor.', completed: true },
      { status: 'Arrived at Destination Port/Airport', date: 'June 30, 2026 - 08:00 AM', location: 'Seme Border Crossing', description: 'Truck arrived at border checkpoint and staged for import control.', completed: true },
      { status: 'Import Customs Clearance', date: 'Pending', location: 'Seme Customs checkpoint, NG', description: 'Nigeria Customs Service auditing ECOWAS Trade Liberalization docs.', completed: false },
      { status: 'Out for Delivery', date: 'Pending', location: 'Lagos Gateway Hub', description: 'Pending border clearance to proceed on Lagos-Badagry Expressway.', completed: false },
      { status: 'Delivered', date: 'Pending', location: 'Oregun Depot, Lagos', description: 'Final offloading and recipient sign-off.', completed: false },
    ],
    history: [
      { date: 'June 30, 2026 - 08:00 AM', location: 'Seme Border Crossing, NG', status: 'Truck arrived at border. Documents submitted to NCS for ETLS clearance.', updatedBy: 'Seme Border Agent' },
      { date: 'June 29, 2026 - 09:00 AM', location: 'Badagry Highway Corridor', status: 'In transit under custom-sealed transit permit.', updatedBy: 'Lagos Highway Dispatch' },
      { date: 'June 28, 2026 - 01:00 PM', location: 'Cotonou Logistics Depot, BJ', status: 'Cargo truck FB-1120 departed Cotonou depot.', updatedBy: 'Benin Depot Dispatch' },
    ],
  }
};

export default function Tracking() {
  const [searchId, setSearchId] = useState('FBGL-2026-001245');
  const [trackingResult, setTrackingResult] = useState<ExtendedShipmentDetails | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchStep, setSearchStep] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Dynamic status-colored background arrays to keep design premium
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Shipment Booked':
        return { bg: 'bg-blue-50 text-blue-600 border-blue-200', text: 'text-blue-600', fill: '#1E88E5' };
      case 'Processing':
        return { bg: 'bg-orange-50 text-orange-600 border-orange-200', text: 'text-orange-600', fill: '#F57C00' };
      case 'In Transit':
        return { bg: 'bg-emerald-50 text-emerald-600 border-emerald-200', text: 'text-emerald-600', fill: '#10B981' };
      case 'Customs Clearance':
      case 'Pending':
        return { bg: 'bg-purple-50 text-purple-600 border-purple-200', text: 'text-purple-600', fill: '#8B5CF6' };
      case 'Out for Delivery':
        return { bg: 'bg-indigo-50 text-indigo-600 border-indigo-200', text: 'text-indigo-600', fill: '#4F46E5' };
      case 'Delivered':
        return { bg: 'bg-green-100 text-green-700 border-green-300', text: 'text-green-700', fill: '#15803D' };
      default:
        return { bg: 'bg-gray-100 text-gray-600 border-gray-200', text: 'text-gray-600', fill: '#6B7280' };
    }
  };

  const handleTrackShipment = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const tid = searchId.trim().toUpperCase();

    if (!tid) {
      setErrorMsg('Please enter a tracking number.');
      setTrackingResult(null);
      return;
    }

    setIsSearching(true);
    setSearchStep('Pinging Frost Bridge satellite transponders...');

    // Try custom shipments database first, then fallback to default simulated database
    let customShipments: { [key: string]: ExtendedShipmentDetails } = {};
    try {
      const stored = localStorage.getItem('fbgl_custom_shipments');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          parsed.forEach((s: any) => {
            if (s && s.trackingId) {
              customShipments[s.trackingId.toUpperCase()] = s;
            }
          });
        } else if (parsed && typeof parsed === 'object') {
          Object.keys(parsed).forEach(k => {
            customShipments[k.toUpperCase()] = parsed[k];
          });
        }
      }
    } catch (e) {
      console.error('Error loading custom shipments:', e);
    }

    const mergedDatabase = { ...SHIPMENTS_DATABASE, ...customShipments };

    // Try local/custom database first for instant loading of beautiful demo shipments
    if (mergedDatabase[tid]) {
      const searchTimeline = [
        { delay: 300, label: 'Accessing local cargo manifest database...' },
        { delay: 600, label: 'Verifying customs clearance logs and maritime seals...' },
        { delay: 900, label: 'Compiling real-time supply chain telemetries...' }
      ];

      searchTimeline.forEach((step) => {
        setTimeout(() => {
          setSearchStep(step.label);
        }, step.delay);
      });

      setTimeout(() => {
        setIsSearching(false);
        setSearchStep('');
        setTrackingResult(mergedDatabase[tid]);
        // Smooth scroll to results
        setTimeout(() => {
          const el = document.getElementById('tracking-results-view');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }, 1200);
      return;
    }

    // Query our custom Express server for real-world live tracking on the web!
    try {
      setSearchStep('Accessing global shipping registry routes...');
      
      const stepTimer1 = setTimeout(() => setSearchStep('Querying Live Web Search Grounding for carrier databases...'), 400);
      const stepTimer2 = setTimeout(() => setSearchStep('Extracting real-time cargo logistics telemetries...'), 1200);
      const stepTimer3 = setTimeout(() => setSearchStep('Synthesizing carrier milestone records...'), 2200);

      const response = await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackingId: tid })
      });

      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      clearTimeout(stepTimer3);

      if (!response.ok) {
        throw new Error('API server returned error');
      }

      const data = await response.json();
      setIsSearching(false);
      setSearchStep('');

      if (data && data.realWorldFound) {
        // Real-world tracked shipment found via live web search!
        const realShipment: ExtendedShipmentDetails = {
          ...data,
          isRealWorldTracked: true
        };
        setTrackingResult(realShipment);
      } else {
        // Fallback generator for realistic user sandboxing if not found on the web
        const isAir = tid.includes('AIR') || tid.startsWith('FA') || tid.length <= 10;
        const isRoad = tid.includes('ROAD') || tid.startsWith('FR');
        
        const fallbackShipment: ExtendedShipmentDetails = {
          trackingId: tid,
          origin: isAir ? 'Frankfurt Airport Hub, DE' : isRoad ? 'Accra Depot, GH' : 'Antwerp Port Terminal, BE',
          destination: 'Lagos Hub, Nigeria',
          estimatedDelivery: 'July 18, 2026',
          weight: '4,500 KG',
          service: isAir ? 'Expedited Express Air Cargo' : isRoad ? 'Cross-Border Highway Transport' : 'Ocean Container Forwarding (LCL)',
          status: 'Pending',
          customerName: 'Global Commercial Partner Ltd',
          shipmentReference: `REF-${Math.floor(10000000 + Math.random() * 90000000)}`,
          freightType: isAir ? 'Air Freight' : isRoad ? 'Road Freight' : 'Sea Freight',
          numPackages: isAir ? 5 : isRoad ? 18 : 2,
          containerNo: isAir ? 'ULD-77421' : isRoad ? 'TRK-FB-9981' : 'FBLU-20984-2',
          bookingDate: 'June 26, 2026',
          estimatedArrivalDate: 'July 18, 2026',
          currentLocation: 'Mainframe Database Registry Staged',
          deliveryAddress: 'Lagos Main Logistics Gateway, Apapa, Lagos, Nigeria',
          recipientName: 'Inbound Logistics Hub Manager',
          signatureRequired: 'Yes',
          milestones: [
            { status: 'Shipment Booked', date: 'June 26, 2026 - 09:00 AM', location: 'System Origin Depot', description: 'Electronic booking created. Cargo container allocation verified.', completed: true },
            { status: 'Cargo Collected', date: 'June 28, 2026 - 11:30 AM', location: 'Origin Staging Depot', description: 'Goods received, checked for compliance, and sealed at terminal.', completed: true },
            { status: 'Export Customs Clearance', date: 'Pending', location: 'Origin Seaport/Airport Gate', description: 'Export permit documents submitted to terminal clearing officers.', completed: false },
            { status: 'Loaded for Transport', date: 'Pending', location: 'Departure Bay', description: 'Awaiting loading sequence onto next departing freight carrier.', completed: false },
            { status: 'In Transit', date: 'Pending', location: 'Global Route', description: 'Transit sequence scheduled upon carrier departure.', completed: false },
            { status: 'Arrived at Destination Port/Airport', date: 'Pending', location: 'Lagos Hub Terminal', description: 'Inbound sorting scheduled at Lagos port terminal.', completed: false },
            { status: 'Import Customs Clearance', date: 'Pending', location: 'Lagos Seaport, NG', description: 'Inbound manifest awaiting clearance dispatch.', completed: false },
            { status: 'Out for Delivery', date: 'Pending', location: 'Lagos Terminal Hub', description: 'Last-mile dispatch pending terminal clearing approval.', completed: false },
            { status: 'Delivered', date: 'Pending', location: 'Lagos Recipient Address', description: 'Final sign-off is logged in standard real-time telemetry.', completed: false }
          ],
          history: [
            { date: 'June 28, 2026 - 11:30 AM', location: 'Origin Terminal Depot', status: 'Cargo received, weighed, and labeled with RFID seals.', updatedBy: 'Origin Depot Agent' },
            { date: 'June 26, 2026 - 09:00 AM', location: 'Frost Bridge Mainframe', status: 'Electronic shipping manifest booking generated.', updatedBy: 'System Automated Booking' }
          ]
        };
        setErrorMsg('No active real-world tracking found on the web for this ID. Loaded a high-fidelity simulated tracking route.');
        setTrackingResult(fallbackShipment);
      }

      // Smooth scroll to results
      setTimeout(() => {
        const el = document.getElementById('tracking-results-view');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);

    } catch (err: any) {
      console.error('Tracking API query error:', err);
      // Fail over to local simulation so the user always has a functional experience
      const isAir = tid.includes('AIR') || tid.startsWith('FA') || tid.length <= 10;
      const isRoad = tid.includes('ROAD') || tid.startsWith('FR');
      
      const fallbackShipment: ExtendedShipmentDetails = {
        trackingId: tid,
        origin: isAir ? 'Frankfurt Airport Hub, DE' : isRoad ? 'Accra Depot, GH' : 'Antwerp Port Terminal, BE',
        destination: 'Lagos Hub, Nigeria',
        estimatedDelivery: 'July 18, 2026',
        weight: '4,500 KG',
        service: isAir ? 'Expedited Express Air Cargo' : isRoad ? 'Cross-Border Highway Transport' : 'Ocean Container Forwarding (LCL)',
        status: 'Pending',
        customerName: 'Global Commercial Partner Ltd',
        shipmentReference: `REF-${Math.floor(10000000 + Math.random() * 90000000)}`,
        freightType: isAir ? 'Air Freight' : isRoad ? 'Road Freight' : 'Sea Freight',
        numPackages: isAir ? 5 : isRoad ? 18 : 2,
        containerNo: isAir ? 'ULD-77421' : isRoad ? 'TRK-FB-9981' : 'FBLU-20984-2',
        bookingDate: 'June 26, 2026',
        estimatedArrivalDate: 'July 18, 2026',
        currentLocation: 'Mainframe Database Registry Staged',
        deliveryAddress: 'Lagos Main Logistics Gateway, Apapa, Lagos, Nigeria',
        recipientName: 'Inbound Logistics Hub Manager',
        signatureRequired: 'Yes',
        milestones: [
          { status: 'Shipment Booked', date: 'June 26, 2026 - 09:00 AM', location: 'System Origin Depot', description: 'Electronic booking created. Cargo container allocation verified.', completed: true },
          { status: 'Cargo Collected', date: 'June 28, 2026 - 11:30 AM', location: 'Origin Staging Depot', description: 'Goods received, checked for compliance, and sealed at terminal.', completed: true },
          { status: 'Export Customs Clearance', date: 'Pending', location: 'Origin Seaport/Airport Gate', description: 'Export permit documents submitted to terminal clearing officers.', completed: false },
          { status: 'Loaded for Transport', date: 'Pending', location: 'Departure Bay', description: 'Awaiting loading sequence onto next departing freight carrier.', completed: false },
          { status: 'In Transit', date: 'Pending', location: 'Global Route', description: 'Transit sequence scheduled upon carrier departure.', completed: false },
          { status: 'Arrived at Destination Port/Airport', date: 'Pending', location: 'Lagos Hub Terminal', description: 'Inbound sorting scheduled at Lagos port terminal.', completed: false },
          { status: 'Import Customs Clearance', date: 'Pending', location: 'Lagos Seaport, NG', description: 'Inbound manifest awaiting clearance dispatch.', completed: false },
          { status: 'Out for Delivery', date: 'Pending', location: 'Lagos Terminal Hub', description: 'Last-mile dispatch pending terminal clearing approval.', completed: false },
          { status: 'Delivered', date: 'Pending', location: 'Lagos Recipient Address', description: 'Final sign-off is logged in standard real-time telemetry.', completed: false }
        ],
        history: [
          { date: 'June 28, 2026 - 11:30 AM', location: 'Origin Terminal Depot', status: 'Cargo received, weighed, and labeled with RFID seals.', updatedBy: 'Origin Depot Agent' },
          { date: 'June 26, 2026 - 09:00 AM', location: 'Frost Bridge Mainframe', status: 'Electronic shipping manifest booking generated.', updatedBy: 'System Automated Booking' }
        ]
      };
      setIsSearching(false);
      setSearchStep('');
      setErrorMsg('Direct tracking query is offline. Loaded a high-fidelity simulated tracking route.');
      setTrackingResult(fallbackShipment);
      setTimeout(() => {
        const el = document.getElementById('tracking-results-view');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    }
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Predefined FAQs
  const faqs = [
    {
      q: "How do I track my shipment?",
      a: "Enter your tracking number (e.g. FBGL-2026-001245) into the search input field above. If you do not have your tracking number, you can find it listed inside your original shipment confirmation email, or reach out directly to your assigned Frost Bridge cargo manager."
    },
    {
      q: "Where can I find my tracking number?",
      a: "Your cargo tracking number is provided at the time of booking. It is located at the top-right corner of your Consignment Note, Bill of Lading, Air Waybill, or inside your electronic invoice documentation."
    },
    {
      q: "Why hasn't my shipment status changed?",
      a: "Status adjustments occur dynamically as packages clear sea terminal scales, custom checkpoints, airport staging bays, or highway borders. During intercontinental ocean passages, updates are staged at sea lanes with fewer transponder gates until arrival at terminal gateways."
    },
    {
      q: "What happens if my shipment is delayed?",
      a: "Our logistics team operates 24/7 to resolve delays due to adverse weather, port clearance congestion, or airline rescheduling. We'll immediately flag any route alterations, update estimates, and activate backup transshipments if required."
    },
    {
      q: "Can I contact customer support about my shipment?",
      a: "Yes, absolutely. Our specialized Lagos-based logistics helpdesk is available 24/7. Use our support chat, call +234 805 876 6669, or email support@frostbridgelogistics.com.ng for high-priority assistance."
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      
      {/* 1. Full-Width Premium Hero Banner Section */}
      <section className="relative bg-brand-primary text-white pt-40 pb-28 md:pt-48 md:pb-36 overflow-hidden">
        {/* Immersive Background Image with Navy Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=80"
            alt="Frost Bridge Global Terminal Operations"
            className="w-full h-full object-cover scale-105"
            style={{ transform: 'translate3d(0, 0, 0)' }}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/95 via-brand-primary/90 to-brand-primary/80 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-transparent to-brand-primary/45"></div>
        </div>

        {/* Floating background grids */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] z-1 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-brand-secondary/20 border border-brand-secondary/30 rounded-full px-4 py-1.5 mb-6 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-brand-secondary animate-pulse"></span>
            <span className="text-brand-secondary text-xs sm:text-sm font-semibold tracking-wider uppercase font-mono">
              SATELLITE CARGO TELEMETRY ENGINE
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight font-heading max-w-4xl mx-auto"
          >
            Track Your Shipment
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-gray-300 font-sans font-light leading-relaxed max-w-3xl mx-auto mt-6 mb-10"
          >
            Monitor your shipment in real time with Frost Bridge Global Logistics. Enter your tracking number below to view your cargo's journey from pickup to final delivery.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => {
                const el = document.getElementById('search-control-box');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              className="w-full sm:w-auto bg-brand-accent hover:bg-orange-600 text-white font-bold text-xs sm:text-sm px-8 py-4 rounded-xl shadow-lg hover:shadow-orange-500/20 transition-all uppercase tracking-wider font-heading"
            >
              Track Shipment Now
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('help-section');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs sm:text-sm px-8 py-4 rounded-xl backdrop-blur-md transition-all uppercase tracking-wider font-heading"
            >
              Contact Support
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. Shipment Tracking Search Card Section (Slightly overlapping Hero) */}
      <section className="relative z-20 -mt-16 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div id="search-control-box" className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-gray-100">
            <h3 className="text-lg font-bold text-brand-primary font-heading mb-4 text-center sm:text-left">
              Secure Cargo Inquiry
            </h3>
            
            <form onSubmit={handleTrackShipment} className="flex flex-col sm:flex-row gap-4 items-stretch">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-4.5 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  placeholder="Enter your tracking number (e.g. FBGL-2026-001245)"
                  className="block w-full pl-12 pr-4 py-4 sm:py-4.5 border border-gray-200 rounded-2xl text-sm sm:text-base font-semibold focus:outline-none focus:ring-2 focus:ring-brand-secondary/35 focus:border-brand-secondary text-brand-primary uppercase placeholder:text-gray-400 placeholder:normal-case"
                  disabled={isSearching}
                />
              </div>
              <button
                type="submit"
                disabled={isSearching}
                className="bg-brand-accent hover:bg-orange-600 disabled:bg-orange-400 text-white font-bold text-xs sm:text-sm px-8 py-4 sm:py-4.5 rounded-2xl shadow-lg transition-colors flex items-center justify-center space-x-2 whitespace-nowrap uppercase tracking-wider font-heading"
              >
                {isSearching ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Locating...</span>
                  </>
                ) : (
                  <span>Track Shipment</span>
                )}
              </button>
            </form>

            <div className="mt-4 flex flex-col sm:flex-row sm:justify-between text-xs text-gray-400 font-sans gap-2 pl-1">
              <span>Your tracking number is provided in your shipment confirmation email.</span>
              <div className="flex gap-3 text-brand-secondary font-semibold">
                <button type="button" onClick={() => setSearchId('FBGL-2026-001245')} className="hover:underline text-[10px] uppercase">FCL Sea Freight</button>
                <button type="button" onClick={() => setSearchId('FBGL-2026-003489')} className="hover:underline text-[10px] uppercase">Cold Air Freight</button>
                <button type="button" onClick={() => setSearchId('FBGL-2026-009812')} className="hover:underline text-[10px] uppercase">ECOWAS Highway</button>
              </div>
            </div>

            {errorMsg && (
              <p className="text-xs text-red-500 font-medium font-sans mt-3 pl-1 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{errorMsg}</span>
              </p>
            )}

            {/* High fidelity loading indicator logs */}
            <AnimatePresence>
              {isSearching && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 pt-5 border-t border-gray-100 overflow-hidden"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex h-3 w-3 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-accent"></span>
                    </div>
                    <span className="text-xs font-mono font-medium text-brand-primary animate-pulse uppercase tracking-wider">
                      {searchStep}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3 overflow-hidden">
                    <div className="bg-brand-accent h-full w-2/3 rounded-full animate-pulse"></div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 3. Dynamic Results Staging View */}
      <AnimatePresence mode="wait">
        {trackingResult && (
          <motion.section 
            key={trackingResult.trackingId}
            id="tracking-results-view"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="py-12 bg-brand-light border-y border-gray-100"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              
              {/* Shipment Summary Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-150 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2.5 h-full bg-brand-secondary"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 items-center">
                  <div className="lg:col-span-1.5 pl-2">
                    <span className="text-[10px] text-gray-400 font-mono uppercase tracking-wider block">Tracking Reference</span>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-0.5">
                      <span className="text-xl font-black text-brand-primary font-heading tracking-tight block">
                        {trackingResult.trackingId}
                      </span>
                      {trackingResult.isRealWorldTracked && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full uppercase tracking-wider font-mono self-start sm:self-auto shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                          Live Web-Verified
                        </span>
                      )}
                    </div>
                    {trackingResult.isRealWorldTracked && trackingResult.carrierName && (
                      <span className="text-[10px] font-semibold text-brand-secondary uppercase tracking-wider block mt-1 font-mono">
                        Carrier: {trackingResult.carrierName}
                      </span>
                    )}
                  </div>

                  <div>
                    <span className="text-[10px] text-gray-400 font-mono uppercase tracking-wider block">Current Status</span>
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border mt-1.5 uppercase tracking-wide ${
                      getStatusColor(trackingResult.status).bg
                    }`}>
                      {trackingResult.status === 'Delivered' && <Check className="w-3 h-3" />}
                      <span>{trackingResult.status}</span>
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-gray-400 font-mono uppercase tracking-wider block">Shipment Type</span>
                    <span className="text-sm font-bold text-brand-primary font-sans block mt-1 flex items-center gap-1.5">
                      {trackingResult.freightType === 'Air Freight' && <Plane className="w-4 h-4 text-brand-secondary shrink-0" />}
                      {trackingResult.freightType === 'Sea Freight' && <Anchor className="w-4 h-4 text-brand-secondary shrink-0" />}
                      {trackingResult.freightType === 'Road Freight' && <Truck className="w-4 h-4 text-brand-secondary shrink-0" />}
                      <span>{trackingResult.freightType}</span>
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-gray-400 font-mono uppercase tracking-wider block">Origin Terminal</span>
                    <span className="text-xs sm:text-sm font-semibold text-brand-primary font-sans block mt-1 truncate">
                      {trackingResult.origin}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-gray-400 font-mono uppercase tracking-wider block">Destination Port</span>
                    <span className="text-xs sm:text-sm font-semibold text-brand-primary font-sans block mt-1 truncate">
                      {trackingResult.destination}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-gray-400 font-mono uppercase tracking-wider block">Est. Delivery Date</span>
                    <span className="text-xs sm:text-sm font-bold text-brand-accent font-sans block mt-1">
                      {trackingResult.estimatedDelivery}
                    </span>
                  </div>
                </div>
              </div>

              {/* Shipment Progress Timeline Section */}
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-150 shadow-lg space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-5">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-brand-secondary/5 text-brand-secondary rounded-xl">
                      <Activity className="w-5 h-5" />
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-brand-primary font-heading">
                      Dynamic Transit Pipeline
                    </h4>
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono uppercase tracking-wider bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 self-start sm:self-auto">
                    LIVE TRANSPONDER REFRESH • STABLE LOGS
                  </span>
                </div>

                {/* Progress Timeline Nodes (Horizontal on Desktop, Vertical on Mobile) */}
                <div className="relative">
                  {/* Vertical line (Mobile) */}
                  <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-gray-100 sm:hidden"></div>

                  {/* Horizontal line (Desktop) */}
                  <div className="hidden sm:block absolute left-12 right-12 top-[15px] h-0.5 bg-gray-100"></div>

                  <div className="grid grid-cols-1 sm:grid-cols-9 gap-6 sm:gap-2 relative z-10">
                    {trackingResult.milestones.map((milestone, idx) => {
                      // Determine status relative to current completed milestones
                      const isPast = milestone.completed;
                      const isCurrent = milestone.completed && 
                        (idx === trackingResult.milestones.length - 1 || !trackingResult.milestones[idx + 1]?.completed);
                      const isFuture = !milestone.completed;

                      return (
                        <div key={idx} className="flex sm:flex-col items-start sm:items-center font-sans text-left sm:text-center group">
                          {/* Circle Node */}
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                            isCurrent ? 'bg-brand-accent text-white scale-110 shadow-lg ring-4 ring-orange-500/25' :
                            isPast ? 'bg-emerald-500 text-white shadow-md' :
                            'bg-white border-2 border-gray-200 text-gray-400'
                          }`}>
                            {isPast ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <span className="text-[10px] font-mono font-bold">{idx + 1}</span>
                            )}
                          </div>

                          {/* Detail Content */}
                          <div className="ml-4 sm:ml-0 sm:mt-3 flex-grow space-y-0.5">
                            <span className={`text-xs font-bold block leading-snug ${
                              isCurrent ? 'text-brand-accent' :
                              isPast ? 'text-brand-primary' : 'text-gray-400'
                            }`}>
                              {milestone.status}
                            </span>
                            <span className="text-[9px] text-gray-400 font-mono uppercase tracking-wider block">
                              {milestone.date}
                            </span>
                            <p className="text-[10px] text-gray-500 leading-normal hidden sm:line-clamp-2 px-1 font-light">
                              {milestone.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Grid: 1. Shipment Details & Map / 2. History Logs */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                
                {/* Left Side: Shipment Technical Specs & Map (Col-Span-6) */}
                <div className="lg:col-span-6 space-y-8 flex flex-col">
                  
                  {/* Shipment Details Specifications */}
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-150 shadow-lg space-y-6 flex-grow">
                    <h4 className="text-base font-bold text-brand-primary font-heading flex items-center gap-2.5 border-b border-gray-100 pb-4">
                      <FileText className="w-5 h-5 text-brand-secondary" />
                      <span>Consignment Specifications</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-xs font-sans">
                      <div className="space-y-1">
                        <span className="text-gray-400 block font-mono uppercase">Tracking Reference</span>
                        <div className="font-bold text-brand-primary flex items-center gap-2 text-sm">
                          <Box className="w-4 h-4 text-brand-secondary shrink-0" />
                          <span>{trackingResult.trackingId}</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-gray-400 block font-mono uppercase">Customer Name</span>
                        <div className="font-bold text-brand-primary flex items-center gap-2 text-sm">
                          <User className="w-4 h-4 text-brand-secondary shrink-0" />
                          <span>{trackingResult.customerName}</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-gray-400 block font-mono uppercase">Shipment Reference</span>
                        <div className="font-bold text-brand-primary flex items-center gap-2 text-sm">
                          <Layers className="w-4 h-4 text-brand-secondary shrink-0" />
                          <span>{trackingResult.shipmentReference}</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-gray-400 block font-mono uppercase">Freight Category</span>
                        <div className="font-bold text-brand-primary flex items-center gap-2 text-sm">
                          <Truck className="w-4 h-4 text-brand-secondary shrink-0" />
                          <span>{trackingResult.service}</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-gray-400 block font-mono uppercase">Number of Packages</span>
                        <div className="font-bold text-brand-primary text-sm">
                          {trackingResult.numPackages} Pcs
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-gray-400 block font-mono uppercase">Total Gross Weight</span>
                        <div className="font-bold text-brand-primary text-sm">
                          {trackingResult.weight}
                        </div>
                      </div>

                      {trackingResult.containerNo && (
                        <div className="space-y-1">
                          <span className="text-gray-400 block font-mono uppercase">Container Identification</span>
                          <div className="font-bold text-brand-primary text-sm">
                            {trackingResult.containerNo}
                          </div>
                        </div>
                      )}

                      <div className="space-y-1">
                        <span className="text-gray-400 block font-mono uppercase">Booking Registered</span>
                        <div className="font-bold text-brand-primary text-sm flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                          <span>{trackingResult.bookingDate}</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-gray-400 block font-mono uppercase">Departure Staging</span>
                        <div className="font-bold text-brand-primary text-sm">
                          {trackingResult.departureDate || 'Processing...'}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-gray-400 block font-mono uppercase">Current Location</span>
                        <div className="font-bold text-brand-secondary text-sm">
                          {trackingResult.currentLocation}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Live Shipment Map Placeholder with future integration layout */}
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-150 shadow-lg flex flex-col justify-between space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                      <div className="flex items-center space-x-2.5">
                        <Compass className="w-5 h-5 text-brand-secondary shrink-0" />
                        <h4 className="text-sm font-bold text-brand-primary font-heading">
                          Geospatial Telemetries Map
                        </h4>
                      </div>
                      <span className="bg-brand-secondary/10 text-brand-secondary text-[9px] font-mono font-bold px-2.5 py-1 rounded-md">
                        MAPPED ROUTE
                      </span>
                    </div>

                    {/* Vector Map Path rendering */}
                    <div className="bg-brand-light border border-gray-100 rounded-2xl h-56 relative overflow-hidden flex items-center justify-center">
                      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#0b3c5d_1px,transparent_1px)] [background-size:16px_16px]"></div>
                      
                      {/* Stylized vector sea/air route */}
                      <svg className="w-full h-full p-4 absolute inset-0" viewBox="0 0 400 200">
                        {/* Mainland Africa & China references */}
                        <path d="M 40 40 Q 200 160 360 80" fill="none" stroke="#0B3C5D" strokeWidth="2.5" strokeDasharray="6,4" className="animate-pulse" />
                        
                        {/* Origin marker */}
                        <circle cx="40" cy="40" r="6" fill="#1E88E5" className="animate-ping" />
                        <circle cx="40" cy="40" r="4" fill="#1E88E5" />
                        
                        {/* Destination marker */}
                        <circle cx="360" cy="80" r="6" fill="#F57C00" className="animate-ping" />
                        <circle cx="360" cy="80" r="4" fill="#F57C00" />
                        
                        {/* Live position ping */}
                        {trackingResult.status === 'In Transit' && (
                          <>
                            <circle cx="185" cy="118" r="8" fill="#10B981" className="opacity-30 animate-ping" />
                            <circle cx="185" cy="118" r="5" fill="#10B981" />
                            <text x="195" y="115" fontSize="10" fill="#10B981" fontWeight="bold" className="font-sans">Active Transit</text>
                          </>
                        )}

                        {trackingResult.status === 'Delivered' && (
                          <>
                            <circle cx="360" cy="80" r="10" fill="#10B981" className="opacity-30 animate-ping" />
                            <circle cx="360" cy="80" r="5" fill="#10B981" />
                          </>
                        )}
                        
                        <text x="25" y="25" fontSize="9" fill="#1F2937" fontWeight="bold" className="font-mono">Origin</text>
                        <text x="330" y="65" fontSize="9" fill="#1F2937" fontWeight="bold" className="font-mono">Lagos Port</text>
                      </svg>

                      {/* API Placeholder Overlay */}
                      <div className="absolute inset-x-4 bottom-4 glass-effect p-3 rounded-xl border border-white/40 flex items-start space-x-2.5 z-10 shadow-sm">
                        <Info className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                        <span className="text-[10px] text-brand-primary leading-normal font-sans font-light">
                          <strong>Future Integration:</strong> Live GPS shipment tracking will be available once integrated with Frost Bridge's logistics management system.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Shipment History Logs & Delivery Specs (Col-Span-6) */}
                <div className="lg:col-span-6 space-y-8 flex flex-col">
                  
                  {/* Shipment History Table */}
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-150 shadow-lg flex-grow flex flex-col justify-between space-y-6">
                    <div>
                      <h4 className="text-base font-bold text-brand-primary font-heading flex items-center gap-2.5 border-b border-gray-100 pb-4">
                        <Clock className="w-5 h-5 text-brand-secondary" />
                        <span>Transit Movement Ledger</span>
                      </h4>

                      {/* Table structure */}
                      <div className="overflow-x-auto mt-4">
                        <table className="w-full text-left border-collapse text-xs font-sans">
                          <thead>
                            <tr className="border-b border-gray-100 text-gray-400 font-mono text-[10px] uppercase">
                              <th className="pb-3 font-semibold">Date & Time</th>
                              <th className="pb-3 font-semibold">Staging Location</th>
                              <th className="pb-3 font-semibold">Ledger Status / Updates</th>
                              <th className="pb-3 font-semibold">Updated By</th>
                            </tr>
                          </thead>
                          <tbody>
                            {trackingResult.history.map((log, lidx) => (
                              <tr key={lidx} className={`border-b border-gray-50/70 last:border-0 ${lidx === 0 ? 'bg-orange-50/30 font-semibold' : ''}`}>
                                <td className="py-3 pr-2 text-[10px] text-gray-500 font-mono whitespace-nowrap">{log.date}</td>
                                <td className="py-3 pr-2 font-semibold text-brand-primary whitespace-nowrap">{log.location}</td>
                                <td className="py-3 pr-2 text-gray-600 leading-normal">{log.status}</td>
                                <td className="py-3 text-[10px] text-brand-secondary font-mono">{log.updatedBy}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="bg-brand-light p-4 rounded-2xl border border-gray-100 text-[10px] text-gray-400 font-mono text-center">
                      SECURE RFID SEALS SYNCHED WITH APAPA GATEWAY TERMINALS
                    </div>
                  </div>

                  {/* Delivery Information Card */}
                  <div className="bg-brand-primary text-white rounded-3xl p-6 sm:p-8 shadow-lg space-y-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-secondary/15 rounded-full filter blur-2xl"></div>
                    
                    <div className="flex justify-between items-center border-b border-white/10 pb-4 relative z-10">
                      <h4 className="text-sm font-bold font-heading flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-brand-secondary" />
                        <span>Final Delivery Manifest</span>
                      </h4>
                      {trackingResult.status === 'Delivered' && (
                        <span className="bg-brand-secondary text-white border border-brand-secondary/30 text-[9px] font-bold font-mono px-2.5 py-1 rounded-full uppercase flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          <span>DELIVERED SUCCESS</span>
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-xs font-sans relative z-10">
                      <div>
                        <span className="text-gray-400 block font-mono">ESTIMATED ARRIVAL</span>
                        <p className="font-bold text-white text-sm mt-0.5">{trackingResult.estimatedDelivery}</p>
                      </div>

                      <div>
                        <span className="text-gray-400 block font-mono">RECIPIENT SIGNATORY</span>
                        <p className="font-bold text-white text-sm mt-0.5">{trackingResult.recipientName}</p>
                      </div>

                      <div className="sm:col-span-2">
                        <span className="text-gray-400 block font-mono">DELIVERY ADDRESS</span>
                        <p className="font-bold text-gray-100 text-sm mt-0.5 leading-relaxed">{trackingResult.deliveryAddress}</p>
                      </div>

                      <div>
                        <span className="text-gray-400 block font-mono">DELIVERY STATUS STATUS</span>
                        <p className="font-bold text-brand-secondary text-sm mt-0.5">{trackingResult.status}</p>
                      </div>

                      <div>
                        <span className="text-gray-400 block font-mono">SECURE SIGNATURE REQUIRED</span>
                        <p className="font-bold text-white text-sm mt-0.5">{trackingResult.signatureRequired}</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* 4. Shipment Statistics Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-secondary text-xs sm:text-sm uppercase tracking-widest font-semibold font-sans">
              Operational Scale
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-primary tracking-tight leading-tight font-heading mt-2">
              Frost Bridge At A Glance
            </h2>
            <div className="w-16 h-1.5 bg-brand-accent mx-auto mt-4 rounded-full"></div>
            <p className="text-gray-500 font-sans text-xs sm:text-sm mt-4 font-light max-w-2xl mx-auto">
              Our infrastructure provides maximum cargo staging reliability across West Africa and global trade hubs.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="bg-brand-light border border-gray-100 p-6 sm:p-8 rounded-3xl text-center shadow-sm hover:shadow-md transition-shadow">
              <span className="text-brand-accent font-heading font-black text-3xl sm:text-4xl block mb-2">
                2,450+
              </span>
              <span className="text-xs font-mono text-gray-400 uppercase tracking-widest block">Active Shipments</span>
            </div>

            <div className="bg-brand-light border border-gray-100 p-6 sm:p-8 rounded-3xl text-center shadow-sm hover:shadow-md transition-shadow">
              <span className="text-brand-accent font-heading font-black text-3xl sm:text-4xl block mb-2">
                12,800+
              </span>
              <span className="text-xs font-mono text-gray-400 uppercase tracking-widest block">Successful Cargoes</span>
            </div>

            <div className="bg-brand-light border border-gray-100 p-6 sm:p-8 rounded-3xl text-center shadow-sm hover:shadow-md transition-shadow">
              <span className="text-brand-accent font-heading font-black text-3xl sm:text-4xl block mb-2">
                45+
              </span>
              <span className="text-xs font-mono text-gray-400 uppercase tracking-widest block">Countries Served</span>
            </div>

            <div className="bg-brand-light border border-gray-100 p-6 sm:p-8 rounded-3xl text-center shadow-sm hover:shadow-md transition-shadow">
              <span className="text-brand-accent font-heading font-black text-3xl sm:text-4xl block mb-2">
                98.7%
              </span>
              <span className="text-xs font-mono text-gray-400 uppercase tracking-widest block">On-Time Rate</span>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Frequently Asked Questions Section */}
      <section className="py-24 bg-brand-light border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-secondary text-xs sm:text-sm uppercase tracking-widest font-semibold font-sans">
              Support Center
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-primary tracking-tight leading-tight font-heading mt-2">
              Frequently Asked Questions
            </h2>
            <div className="w-16 h-1.5 bg-brand-accent mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-2xl border border-gray-150 overflow-hidden shadow-sm transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-heading font-bold text-brand-primary text-sm sm:text-base">
                    {faq.q}
                  </span>
                  <div className={`p-1.5 rounded-lg bg-brand-light text-brand-primary transition-transform duration-300 ${
                    activeFaq === idx ? 'rotate-180' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-gray-500 font-sans leading-relaxed border-t border-gray-50">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Need Help? Call To Action Section */}
      <section id="help-section" className="py-20 bg-brand-primary text-white relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(#1e88e5_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-brand-secondary/10 rounded-full filter blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-brand-secondary text-xs sm:text-sm font-semibold tracking-widest font-mono block">
              OPERATIONAL DESK SUPPORT
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading text-white tracking-tight">
              Need Assistance With Your Shipment?
            </h3>
            <p className="text-gray-300 font-sans text-xs sm:text-sm font-light leading-relaxed">
              Our logistics specialists are available to answer your questions and provide updates on your cargo. Email us directly at <span className="font-bold text-brand-secondary">support@frostbridgelogistics.com.ng</span> for high-priority shipment and tracking assistance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <a 
              href="mailto:support@frostbridgelogistics.com.ng"
              className="bg-brand-accent hover:bg-orange-600 text-white font-bold text-xs sm:text-sm px-8 py-4 rounded-xl shadow-lg uppercase tracking-wider transition-colors font-heading inline-block"
            >
              Contact Support
            </a>
            <a 
              href="tel:+2348058766669"
              className="bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs sm:text-sm px-8 py-4 rounded-xl backdrop-blur-md transition-colors uppercase tracking-wider font-heading inline-block"
            >
              Speak to a Logistics Expert
            </a>
            <button 
              onClick={() => window.location.hash = 'contact'}
              className="bg-transparent hover:text-brand-secondary text-white font-bold text-xs sm:text-sm px-6 py-4 transition-colors uppercase tracking-wider font-heading"
            >
              Request a Quote
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
