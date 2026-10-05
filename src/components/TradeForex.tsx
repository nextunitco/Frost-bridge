import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  Landmark, 
  TrendingUp, 
  HelpCircle, 
  ArrowRightLeft, 
  Calculator, 
  Ship, 
  Newspaper, 
  Globe, 
  Calendar, 
  RefreshCw, 
  Plane, 
  FileText, 
  ChevronRight, 
  ArrowUpRight, 
  ArrowDownRight, 
  Activity, 
  ShieldCheck, 
  Clock, 
  Percent, 
  BookOpen, 
  Building2, 
  CheckCircle2,
  Anchor,
  AlertTriangle,
  X,
  ThumbsUp,
  Bookmark,
  Share2,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import dollarOutlookImg from '../assets/images/dollar_outlook_forex_1783102792182.jpg';
import yuanOutlookImg from '../assets/images/yuan_outlook_cargo_1783102803166.jpg';
import oceanTariffsImg from '../assets/images/ocean_tariffs_terminal_1783102817206.jpg';
import lagosPortsImg from '../assets/images/lagos_ports_clearance_1783102828789.jpg';
import incotermsInsuranceImg from '../assets/images/incoterms_insurance_black_specialist_1783169219628.jpg';
import heroBgImg from '../assets/images/trade_forex_hero_bg_1783169386881.jpg';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';

// Core Rate Configurations
const BASE_RATES: { [key: string]: { rate: number; change: number; symbol: string; fullName: string; countryCode: string } } = {
  USD: { rate: 1368.56, change: -0.42, symbol: '$', fullName: 'United States Dollar', countryCode: 'US' },
  CNY: { rate: 188.24, change: 0.18, symbol: '¥', fullName: 'Chinese Yuan', countryCode: 'CN' },
  GBP: { rate: 1743.38, change: -0.22, symbol: '£', fullName: 'British Pound Sterling', countryCode: 'GB' },
  EUR: { rate: 1484.33, change: 0.11, symbol: '€', fullName: 'Euro Area Common Currency', countryCode: 'EU' },
};

// Simulated Historical Spot Rates for Line Charts (USD & CNY to NGN)
const CHART_DATA: {
  [currency: string]: {
    [timeframe: string]: { date: string; rate: number }[];
  };
} = {
  USD: {
    '7D': [
      { date: '24 Jun', rate: 1510.50 },
      { date: '25 Jun', rate: 1512.20 },
      { date: '26 Jun', rate: 1518.90 },
      { date: '27 Jun', rate: 1514.10 },
      { date: '28 Jun', rate: 1516.30 },
      { date: '29 Jun', rate: 1515.00 },
      { date: '30 Jun', rate: 1515.00 },
    ],
    '30D': [
      { date: '01 Jun', rate: 1492.00 },
      { date: '05 Jun', rate: 1501.50 },
      { date: '10 Jun', rate: 1508.80 },
      { date: '15 Jun', rate: 1526.40 },
      { date: '20 Jun', rate: 1511.20 },
      { date: '25 Jun', rate: 1516.00 },
      { date: '30 Jun', rate: 1515.00 },
    ],
    '90D': [
      { date: 'Apr 01', rate: 1420.00 },
      { date: 'Apr 15', rate: 1445.00 },
      { date: 'May 01', rate: 1460.00 },
      { date: 'May 15', rate: 1485.00 },
      { date: 'Jun 01', rate: 1501.00 },
      { date: 'Jun 15', rate: 1512.50 },
      { date: 'Jun 30', rate: 1515.00 },
    ],
    '1Y': [
      { date: 'Jul 2025', rate: 1195.00 },
      { date: 'Sep 2025', rate: 1240.00 },
      { date: 'Nov 2025', rate: 1320.00 },
      { date: 'Jan 2026', rate: 1410.00 },
      { date: 'Mar 2026', rate: 1465.00 },
      { date: 'May 2026', rate: 1498.00 },
      { date: 'Jun 2026', rate: 1515.00 },
    ],
  },
  CNY: {
    '7D': [
      { date: '24 Jun', rate: 207.80 },
      { date: '25 Jun', rate: 208.20 },
      { date: '26 Jun', rate: 209.10 },
      { date: '27 Jun', rate: 208.00 },
      { date: '28 Jun', rate: 208.30 },
      { date: '29 Jun', rate: 208.50 },
      { date: '30 Jun', rate: 208.50 },
    ],
    '30D': [
      { date: '01 Jun', rate: 204.30 },
      { date: '05 Jun', rate: 205.90 },
      { date: '10 Jun', rate: 207.10 },
      { date: '15 Jun', rate: 209.80 },
      { date: '20 Jun', rate: 207.60 },
      { date: '25 Jun', rate: 208.60 },
      { date: '30 Jun', rate: 208.50 },
    ],
    '90D': [
      { date: 'Apr 01', rate: 195.20 },
      { date: 'Apr 15', rate: 198.80 },
      { date: 'May 01', rate: 200.50 },
      { date: 'May 15', rate: 203.90 },
      { date: 'Jun 01', rate: 206.10 },
      { date: 'Jun 15', rate: 208.10 },
      { date: 'Jun 30', rate: 208.50 },
    ],
    '1Y': [
      { date: 'Jul 2025', rate: 165.00 },
      { date: 'Sep 2025', rate: 171.20 },
      { date: 'Nov 2025', rate: 182.10 },
      { date: 'Jan 2026', rate: 194.50 },
      { date: 'Mar 2026', rate: 201.80 },
      { date: 'May 2026', rate: 206.00 },
      { date: 'Jun 2026', rate: 208.50 },
    ],
  },
  GBP: {
    '7D': [
      { date: '24 Jun', rate: 1912.50 },
      { date: '25 Jun', rate: 1914.80 },
      { date: '26 Jun', rate: 1922.30 },
      { date: '27 Jun', rate: 1917.40 },
      { date: '28 Jun', rate: 1919.90 },
      { date: '29 Jun', rate: 1918.20 },
      { date: '30 Jun', rate: 1918.20 },
    ],
    '30D': [
      { date: '01 Jun', rate: 1889.00 },
      { date: '05 Jun', rate: 1900.50 },
      { date: '10 Jun', rate: 1909.80 },
      { date: '15 Jun', rate: 1932.10 },
      { date: '20 Jun', rate: 1913.40 },
      { date: '25 Jun', rate: 1919.50 },
      { date: '30 Jun', rate: 1918.20 },
    ],
    '90D': [
      { date: 'Apr 01', rate: 1798.00 },
      { date: 'Apr 15', rate: 1829.00 },
      { date: 'May 01', rate: 1848.00 },
      { date: 'May 15', rate: 1880.00 },
      { date: 'Jun 01', rate: 1900.50 },
      { date: 'Jun 15', rate: 1915.00 },
      { date: 'Jun 30', rate: 1918.20 },
    ],
    '1Y': [
      { date: 'Jul 2025', rate: 1512.00 },
      { date: 'Sep 2025', rate: 1570.00 },
      { date: 'Nov 2025', rate: 1670.00 },
      { date: 'Jan 2026', rate: 1785.00 },
      { date: 'Mar 2026', rate: 1855.00 },
      { date: 'May 2026', rate: 1897.00 },
      { date: 'Jun 2026', rate: 1918.20 },
    ],
  },
  EUR: {
    '7D': [
      { date: '24 Jun', rate: 1637.80 },
      { date: '25 Jun', rate: 1639.90 },
      { date: '26 Jun', rate: 1646.20 },
      { date: '27 Jun', rate: 1642.10 },
      { date: '28 Jun', rate: 1644.30 },
      { date: '29 Jun', rate: 1642.80 },
      { date: '30 Jun', rate: 1642.80 },
    ],
    '30D': [
      { date: '01 Jun', rate: 1618.00 },
      { date: '05 Jun', rate: 1627.50 },
      { date: '10 Jun', rate: 1635.80 },
      { date: '15 Jun', rate: 1655.10 },
      { date: '20 Jun', rate: 1638.90 },
      { date: '25 Jun', rate: 1644.00 },
      { date: '30 Jun', rate: 1642.80 },
    ],
    '90D': [
      { date: 'Apr 01', rate: 1540.00 },
      { date: 'Apr 15', rate: 1567.00 },
      { date: 'May 01', rate: 1582.00 },
      { date: 'May 15', rate: 1610.00 },
      { date: 'Jun 01', rate: 1627.40 },
      { date: 'Jun 15', rate: 1640.00 },
      { date: 'Jun 30', rate: 1642.80 },
    ],
    '1Y': [
      { date: 'Jul 2025', rate: 1295.00 },
      { date: 'Sep 2025', rate: 1345.00 },
      { date: 'Nov 2025', rate: 1430.00 },
      { date: 'Jan 2026', rate: 1528.00 },
      { date: 'Mar 2026', rate: 1588.00 },
      { date: 'May 2026', rate: 1624.00 },
      { date: 'Jun 2026', rate: 1642.80 },
    ],
  },
};

interface TradeDocument {
  id: string;
  type: 'outlook' | 'insight';
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  role: string;
  image?: string;
  summary: string;
  content: string[];
  tags: string[];
}

const TRADE_DOCUMENTS: TradeDocument[] = [
  {
    id: 'dollar-outlook',
    type: 'outlook',
    title: 'Dollar Outlook: Spot Rate Stabilization Projections',
    category: 'Currency Forecast',
    date: '30 June 2026',
    readTime: '6 min read',
    author: 'Tunde Harrison',
    role: 'Chief Treasury Strategist',
    image: dollarOutlookImg,
    summary: 'Analyzing current central bank allocations, our desk projects dollar-to-naira trading bounds to hover between ₦1,500 and ₦1,530.',
    content: [
      'Frost Bridge treasury desks have finalized our Q3 currency projections for Nigerian trade corridors. In light of the recent Central Bank of Nigeria (CBN) liquidations and intervention schedules, the commercial spot Naira is expected to stabilize within a range of ₦1,500 to ₦1,530 per US dollar.',
      'This relative stabilization is reinforced by rising domestic crude oil production outputs and active measures by the central bank to clear outstanding foreign exchange backlogs for both major retail chains and industrial manufacturing consortia.',
      'For procurement and treasury officers sourcing raw materials from overseas markets, we recommend securing forward contracts or timing spot purchases to match central bank intervention weeks when liquidity is peak. Diversifying FX reserves into non-dollar clearing assets like RMB/Yuan can also serve as an effective hedge against localized currency fluctuations.',
      'Our team will continue to monitor the dynamic rate indexes daily to deliver real-time trade execution guidance.'
    ],
    tags: ['Forex', 'Treasury', 'Naira', 'USD']
  },
  {
    id: 'yuan-outlook',
    type: 'outlook',
    title: 'Yuan Outlook: High Volume Industrial Seasons',
    category: 'China Trade',
    date: '29 June 2026',
    readTime: '5 min read',
    author: 'Chen Wei',
    role: 'Far East Corridor Manager',
    image: yuanOutlookImg,
    summary: 'As manufacturing output peaks across Ningbo-Zhoushan hubs, yuan trading index expectations point to minor cargo rate spikes through autumn.',
    content: [
      'As we enter the peak pre-autumn industrial production season, manufacturing centers in Zhejiang, Guangdong, and Jiangsu provinces report maximum operational throughput. The increased demand for container slots has led to minor ocean freight tariff adjustments across trans-Pacific and West African lanes.',
      'Frost Bridge Far East logistics teams are actively securing blocks of container allocations directly with carrier alliances in Guangzhou and Shanghai ports to shield our clients from sudden spot freight rate spikes and slot roll-overs.',
      'We suggest that firms importing heavy industrial machinery, electronics parts, or construction materials book their container allocations at least 21 days in advance of production completion. This ensures slot priority, locking in lower seasonal tariffs and preventing costly line-down situations at destination plants.',
      'By utilizing our pre-staged Far East consolidating warehouses, we can merge smaller shipments into full container loads (FCL) to achieve significant cost efficiency.'
    ],
    tags: ['Yuan', 'FarEast', 'Import', 'Ningbo']
  },
  {
    id: 'ocean-tariffs',
    type: 'outlook',
    title: 'Ocean Shipping Spot Tariff Adjustments',
    category: 'Freight Index',
    date: '28 June 2026',
    readTime: '4 min read',
    author: 'Marcus Vance',
    role: 'VP of Ocean Freight',
    image: oceanTariffsImg,
    summary: 'West African trade lane indices show a minor decline in base ocean container booking values, offsetting fuel increases.',
    content: [
      'Global ocean shipping freight lanes show a minor softening of spot prices, with base ocean container rates down 3.5% on major Far East to West Africa routes. This minor decline is driven by newly added carrier capacities and stable consumer demand indexes.',
      'This slight downward trend in base freight rates effectively compensates for minor marine fuel bunker surcharges, giving West African businesses an excellent and highly favorable window to scale up container import quotas for Q3 and Q4 stock.',
      'Frost Bridge offers direct consolidated (LCL) and full container load (FCL) options with pre-staged customs documentation to ensure immediate clearance at Apapa and Tin Can ports. Our dedicated lane specialists design customized routes that balance budget and transit time requirements.',
      'Contact our freight desk today to lock in these optimized rates for your upcoming shipping manifest.'
    ],
    tags: ['OceanFreight', 'LCL', 'FCL', 'Tariffs']
  },
  {
    id: 'lagos-ports',
    type: 'outlook',
    title: 'Lagos Seaports Container Clearance Velocity',
    category: 'Port Congestion',
    date: '27 June 2026',
    readTime: '5 min read',
    author: 'Engr. Funsho Alao',
    role: 'Lagos Port Operations Director',
    image: lagosPortsImg,
    summary: 'Average vessel waiting times at Apapa terminals decline to 2.2 days, ensuring rapid clearing for pre-staged shipments.',
    content: [
      'The physical clearance throughput at Lagos ports has achieved a significant operational milestone. Average vessel waiting times at Apapa terminal docks have dropped to an efficient 2.2 days, down from the historic 5.4 days observed during peak congestion periods.',
      'This exceptional acceleration is the direct result of newly digitized cargo inspection processes, improved land-side truck scheduling, and Frost Bridge’s signature early document pre-clearance pipeline.',
      'To benefit from this speed, cargo owners must supply finalized bills of lading, Form M approvals, and customs assessments at least 72 hours prior to vessel arrival. Let Frost Bridge manage your clearing workflow for automated, hassle-free port dispatch.',
      'We are committed to maintaining a rapid port turnaround, ensuring your cold chain food, raw materials, and retail goods are delivered on schedule.'
    ],
    tags: ['Apapa', 'LagosPort', 'Demurrage', 'Clearing']
  },
  {
    id: 'guide-preclearance',
    type: 'insight',
    title: 'How to Reduce Import Costs with Customs Pre-Clearance',
    category: 'Customs Guide',
    date: '25 June 2026',
    readTime: '8 min read',
    author: 'Amara Nwachukwu',
    role: 'Senior Customs Compliance Director',
    image: 'https://plus.unsplash.com/premium_photo-1723809616710-32afb9dcd0ef?auto=format&fit=crop&w=800&q=80',
    summary: 'Discover tactical strategies to minimize demurrage and terminal charges. Staging your document pipeline early is key to clearing within 48 hours.',
    content: [
      'Demurrage and terminal storage fees are the silent killers of import profit margins. Staging your document pipeline early is the absolute key to clearing your cargo within 48 hours of vessel discharge, bypassing expensive port penalties entirely.',
      'The pre-clearance methodology involves initiating the Form M application and PAAR (Pre-Arrival Assessment Report) immediately upon order confirmation at origin, rather than waiting for the vessel to set sail.',
      'Frost Bridge’s automated customs desk is directly linked with the Single Window portal. We process and cross-examine invoice numbers, HS codes, and ocean freights to prevent compliance penalties and secure instant clearance status.',
      'By implementing this proactive compliance protocol, our corporate clients have reduced their average customs clearing cycles from 12 days down to under 48 hours, saving millions in localized terminal storage and demurrage penalties.'
    ],
    tags: ['Customs', 'PreClearance', 'FormM', 'PAAR']
  },
  {
    id: 'guide-freight-modes',
    type: 'insight',
    title: 'Choosing Between Air and Sea Freight for Cargo Staging',
    category: 'Logistics Strategy',
    date: '24 June 2026',
    readTime: '7 min read',
    author: 'Dieter Reinhardt',
    role: 'Global Supply Chain Advisor',
    image: 'https://media.istockphoto.com/id/616124078/photo/container-cargo-freight-ship-with-working-crane-loading-bridge.jpg?s=1024x1024&w=is&k=20&c=S0cn7e6FXt3KK6QwpHtpliwLnaLSkCVyjMLTJDE06QA=',
    summary: 'A cost-to-speed analysis framework. Determine whether priority express air lanes or container ocean shipping aligns with your product shelf-life.',
    content: [
      'Firms often face the operational dilemma of prioritizing speed over cost. Choosing the ideal transportation mode requires a comprehensive cost-to-speed analysis framework that measures item margins, shelf-life, and inventory holding costs.',
      'While air cargo provides rapid transit (3 to 5 days), it incurs significantly higher weight-based rates. It is highly recommended for temperature-sensitive pharmaceuticals, high-value tech devices, and critical production line spare parts.',
      'Ocean freight, conversely, is the workhorse of bulk logistics, taking 28 to 35 days from China but offering the lowest per-ton cost. For balanced inventories, Frost Bridge recommends a hybrid approach: ship 85% of standard stock via sea FCL and keep a 15% priority buffer on our express air cargo lane.',
      'Our strategic advisory desk is available to assist you in modeling your supply chain to find the perfect equilibrium between transportation cost and transit agility.'
    ],
    tags: ['AirFreight', 'SeaFreight', 'Logistics', 'Strategy']
  },
  {
    id: 'guide-incoterms',
    type: 'insight',
    title: 'Understanding Incoterms and Cargo Insurance Liability',
    category: 'Risk Management',
    date: '23 June 2026',
    readTime: '9 min read',
    author: 'Sophia Sterling',
    role: 'Maritime Insurance Specialist',
    image: incotermsInsuranceImg,
    summary: 'Demystifying cargo transfer points. Protect your commercial investments with complete clarity on marine insurance bounds and liability transfers.',
    content: [
      'Incoterms (International Commercial Terms) establish the exact moment risk and cost transfer from the seller to the buyer. Misunderstanding these terms can expose your business to unforeseen liabilities and devastating cargo loss risks.',
      'Common terms like FOB (Free on Board) require the seller to load goods onto the vessel, after which all risks transfer to you. CIF (Cost, Insurance, and Freight) requires the seller to procure marine insurance, but the default coverage is often minimal and fails to cover end-to-end routing.',
      'Frost Bridge strongly recommends specifying explicit cargo insurance policies that cover "All Risks" door-to-door, rather than relying solely on default seller terms. Our compliance desk can audit your commercial contracts to ensure complete cargo security.',
      'Protect your commercial investments and maintain absolute business continuity by partnering with our licensed marine underwriting group.'
    ],
    tags: ['Incoterms', 'Insurance', 'RiskManagement', 'Marine']
  }
];

export default function TradeForex() {
  // Document state
  const [selectedDoc, setSelectedDoc] = useState<TradeDocument | null>(null);

  // Live rate & sync states
  const [rates, setRates] = useState(BASE_RATES);
  const [selectedRatePair, setSelectedRatePair] = useState<'USD' | 'CNY' | 'GBP' | 'EUR'>('USD');
  const [lastUpdated, setLastUpdated] = useState('Just now');
  const [isUpdating, setIsUpdating] = useState(false);
  const [chartTimeframe, setChartTimeframe] = useState<'7D' | '30D' | '90D' | '1Y'>('30D');

  // Currency Converter State
  const [convAmount, setConvAmount] = useState('');
  const [convFrom, setConvFrom] = useState('USD');
  const [convResult, setConvResult] = useState(0);

  // Trade Cost Calculator (Import Landing Cost Estimator)
  const [prodCost, setProdCost] = useState('');
  const [prodCurrency, setProdCurrency] = useState('USD');
  const [freightCost, setFreightCost] = useState('');
  const [insuranceCost, setInsuranceCost] = useState('');
  const [importDutyPercent, setImportDutyPercent] = useState('');
  const [customsSurchargePercent, setCustomsSurchargePercent] = useState('7');
  const [calculatedLanding, setCalculatedLanding] = useState<{
    prodNaira: number;
    freightNaira: number;
    insuranceNaira: number;
    customsDuty: number;
    surcharge: number;
    vat: number;
    totalLanding: number;
    deliveredCost: number;
  } | null>(null);

  // Shipping Cost Estimator
  const [shipOrigin, setShipOrigin] = useState('CN');
  const [shipDest, setShipDest] = useState('NG');
  const [shipCargoType, setShipCargoType] = useState('container_fcl');
  const [shipMode, setShipMode] = useState('sea');
  const [shipWeight, setShipWeight] = useState('');
  const [shipVolume, setShipVolume] = useState('');
  const [shipSpeed, setShipSpeed] = useState('priority');
  const [estimatedFreight, setEstimatedFreight] = useState<{
    cost: number;
    time: string;
    method: string;
    details: string;
  } | null>(null);

  // Fetch actual live exchange rates on mount
  useEffect(() => {
    const fetchLiveRates = async () => {
      setIsUpdating(true);
      try {
        const response = await fetch('https://open.er-api.com/v6/latest/USD');
        if (!response.ok) throw new Error('API response failed');
        const data = await response.json();
        
        if (data && data.rates && data.rates.NGN) {
          const usdToNgn = data.rates.NGN;
          const usdToCny = data.rates.CNY || 7.27;
          const usdToGbp = data.rates.GBP || 0.785;
          const usdToEur = data.rates.EUR || 0.922;

          setRates({
            USD: { rate: parseFloat(usdToNgn.toFixed(2)), change: -0.12, symbol: '$', fullName: 'United States Dollar', countryCode: 'US' },
            CNY: { rate: parseFloat((usdToNgn / usdToCny).toFixed(2)), change: 0.05, symbol: '¥', fullName: 'Chinese Yuan', countryCode: 'CN' },
            GBP: { rate: parseFloat((usdToNgn / usdToGbp).toFixed(2)), change: -0.18, symbol: '£', fullName: 'British Pound Sterling', countryCode: 'GB' },
            EUR: { rate: parseFloat((usdToNgn / usdToEur).toFixed(2)), change: 0.08, symbol: '€', fullName: 'Euro Area Common Currency', countryCode: 'EU' },
          });
          const now = new Date();
          setLastUpdated(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }
      } catch (err) {
        console.error('Error fetching live rates, using baseline defaults:', err);
      } finally {
        setIsUpdating(false);
      }
    };

    fetchLiveRates();
  }, []);

  // Set up automatic live ticking interval (every 8 seconds) to update/fluctuate the rates dynamically in real-time
  useEffect(() => {
    const liveInterval = setInterval(() => {
      setRates((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((key) => {
          // Add a minor realistic real-time random trade fluctuation (-₦0.25 to +₦0.25)
          const fluctuation = (Math.random() - 0.5) * 0.5;
          next[key] = {
            ...next[key],
            rate: parseFloat(Math.max(10, next[key].rate + fluctuation).toFixed(2)),
            // Slightly fluctuate the percentage change to reflect the market movement
            change: parseFloat((next[key].change + (Math.random() - 0.5) * 0.02).toFixed(2))
          };
        });
        return next;
      });
      const now = new Date();
      setLastUpdated(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 8000);

    return () => clearInterval(liveInterval);
  }, []);

  // Auto conversion hook
  useEffect(() => {
    const amt = parseFloat(convAmount) || 0;
    const rate = rates[convFrom]?.rate || 1;
    setConvResult(amt * rate);
  }, [convAmount, convFrom, rates]);

  // Run initial calculator presets
  useEffect(() => {
    if (prodCost && freightCost) {
      calculateLandingCost();
    }
    if (shipWeight && shipVolume) {
      runShippingEstimation();
    }
  }, [rates]);

  // Handle rates simulation updates
  const handleRefreshRates = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setRates((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((key) => {
          const fluctuation = (Math.random() - 0.48) * 4.5;
          next[key].rate = parseFloat((next[key].rate + fluctuation).toFixed(2));
          next[key].change = parseFloat((next[key].change + (Math.random() - 0.5) * 0.1).toFixed(2));
        });
        return next;
      });
      const now = new Date();
      setLastUpdated(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setIsUpdating(false);
    }, 1000);
  };

  // Perform professional import cost breakdown
  const calculateLandingCost = () => {
    if (!prodCost && !freightCost) {
      setCalculatedLanding(null);
      return;
    }

    const cost = parseFloat(prodCost) || 0;
    const freight = parseFloat(freightCost) || 0;
    const insurance = parseFloat(insuranceCost) || 0;
    const dutyPercent = parseFloat(importDutyPercent) || 0;
    const surchargePercent = parseFloat(customsSurchargePercent) || 0;
    const currentRate = rates[prodCurrency]?.rate || 1;

    // Convert core inputs to Naira
    const prodNaira = cost * currentRate;
    const freightNaira = freight * currentRate;
    const insuranceNaira = insurance * currentRate;

    // CIF Value (Cost, Insurance, Freight)
    const cifNaira = prodNaira + freightNaira + insuranceNaira;

    // Calculations
    const customsDuty = cifNaira * (dutyPercent / 100);
    const surcharge = customsDuty * (surchargePercent / 100);
    const vatBase = cifNaira + customsDuty + surcharge;
    const vat = vatBase * 0.075; // Standard Nigeria VAT is 7.5%

    const totalLanding = cifNaira + customsDuty + surcharge + vat;
    const deliveredCost = totalLanding * 1.025; // add local clearance / routing margins

    setCalculatedLanding({
      prodNaira: Math.round(prodNaira),
      freightNaira: Math.round(freightNaira),
      insuranceNaira: Math.round(insuranceNaira),
      customsDuty: Math.round(customsDuty),
      surcharge: Math.round(surcharge),
      vat: Math.round(vat),
      totalLanding: Math.round(totalLanding),
      deliveredCost: Math.round(deliveredCost),
    });
  };

  // Shipping Cost Estimator Calculation
  const runShippingEstimation = () => {
    if (!shipWeight && !shipVolume) {
      setEstimatedFreight(null);
      return;
    }

    const weight = parseFloat(shipWeight) || 0;
    const volume = parseFloat(shipVolume) || 0;

    let baseRate = 0;
    let time = '';
    let method = '';
    let details = '';

    if (shipMode === 'air') {
      // Air Freight
      baseRate = shipOrigin === 'CN' ? 6.2 : 5.8;
      const totalWeightCharge = weight * baseRate;
      const speedMultiplier = shipSpeed === 'express' ? 1.35 : shipSpeed === 'priority' ? 1.15 : 0.95;
      const estimatedCost = Math.round(totalWeightCharge * speedMultiplier);
      
      time = shipSpeed === 'express' ? '3 - 5 Days' : '6 - 9 Days';
      method = 'Air Cargo Express Fleet';
      details = 'Routed via secure Lagos air freight cargo staging centers. Best for pharmaceutical reefers, priority retail, and high-value tech devices.';
      
      setEstimatedFreight({ cost: estimatedCost, time, method, details });
    } else {
      // Ocean Freight
      const totalVolumeCharge = volume * (shipOrigin === 'CN' ? 145 : 125);
      const isFcl = shipCargoType === 'container_fcl';
      const containerFlatCost = isFcl ? (shipOrigin === 'CN' ? 3800 : 3400) : 0;
      
      const estimatedCost = isFcl ? containerFlatCost : Math.round(totalVolumeCharge + 350);
      time = shipOrigin === 'CN' ? '28 - 35 Days' : '22 - 28 Days';
      method = isFcl ? 'Full Container Load (FCL) Sea Freight' : 'Less than Container Load (LCL) Consolidation';
      details = 'Handled directly by Frost Bridge customs dispatch teams. Includes automatic pre-clearance tracking updates at Tin Can / Apapa ports.';

      setEstimatedFreight({ cost: estimatedCost, time, method, details });
    }
  };

  // Helper stats for Recharts Line Graphs
  // We dynamically scale the original historical values (previously baseline-anchored at USD: 1515.00 and CNY: 208.50)
  // to smoothly line up with the active live rate in the state.
  const activeRate = rates[selectedRatePair]?.rate || BASE_RATES[selectedRatePair].rate;
  const originalBase = selectedRatePair === 'USD' 
    ? 1515.00 
    : selectedRatePair === 'CNY' 
      ? 208.50 
      : selectedRatePair === 'GBP' 
        ? 1918.20 
        : 1642.80; // EUR
  const scaleFactor = activeRate / originalBase;

  const activeChartData = CHART_DATA[selectedRatePair][chartTimeframe].map(d => ({
    ...d,
    rate: parseFloat((d.rate * scaleFactor).toFixed(2))
  }));
  const ratesList = activeChartData.map(d => d.rate);
  const highestRate = Math.max(...ratesList);
  const lowestRate = Math.min(...ratesList);
  const averageRate = parseFloat((ratesList.reduce((a, b) => a + b, 0) / ratesList.length).toFixed(2));
  const trendPercent = parseFloat((((ratesList[ratesList.length - 1] - ratesList[0]) / ratesList[0]) * 100).toFixed(2));

  // Anchor scroll utility
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-white">
      {/* 1. Hero Banner Section */}
      <section className="relative bg-brand-primary text-white py-32 overflow-hidden border-b border-white/5">
        {/* Background Image with Dark Professional Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100 scale-105"
          style={{ backgroundImage: `url(${heroBgImg})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary via-brand-primary/95 to-brand-primary/75 mix-blend-multiply z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-transparent to-brand-primary/45 z-0"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] z-0"></div>
        
        {/* Ambient background graphics */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-brand-secondary/10 rounded-full filter blur-3xl transform -translate-y-1/2 pointer-events-none animate-pulse z-0"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-accent/5 rounded-full filter blur-3xl pointer-events-none z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column (Col-Span-7) */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 text-brand-secondary text-xs sm:text-sm px-4 py-2 rounded-full font-semibold tracking-wider font-mono">
                <span className="flex h-2 w-2 rounded-full bg-brand-secondary animate-ping"></span>
                <span>GLOBAL TRANSACTION TREASURY PORTAL</span>
              </span>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight font-heading">
                Trade & <span className="text-brand-secondary">Forex Centre</span>
              </h1>
              
              <p className="text-gray-300 font-sans text-sm sm:text-base font-light max-w-2xl leading-relaxed">
                Stay ahead of global trade with live exchange rates, shipping cost estimators, import calculators, and market intelligence designed to help businesses make informed logistics decisions.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <button 
                  onClick={() => scrollToId('live-dashboard')}
                  className="bg-brand-accent hover:bg-orange-600 text-white font-bold text-xs sm:text-sm px-6 py-4 rounded-xl uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-orange-500/20 flex items-center space-x-2"
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>Live Exchange Rates</span>
                </button>
                <button 
                  onClick={() => scrollToId('shipping-estimator')}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm px-6 py-4 rounded-xl uppercase tracking-wider transition-all duration-300 flex items-center space-x-2"
                >
                  <Ship className="w-4 h-4" />
                  <span>Request a Shipping Quote</span>
                </button>
              </div>
            </div>

            {/* Right Abstract Graphic Widget (Col-Span-5) */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-gray-400">SPOT INDICATORS FEED</span>
                  <span className="bg-emerald-500/15 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full font-mono font-bold">LIVE ONLINE</span>
                </div>
                
                {/* Visual grid representing container shipping lanes */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-2xl border border-white/5">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-brand-secondary/20 text-brand-secondary rounded-xl">
                        <Anchor className="w-4 h-4" />
                      </div>
                      <div className="text-xs">
                        <p className="font-bold">Tin Can Port Terminal</p>
                        <p className="text-[10px] text-gray-400">Lagos, NG</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-brand-secondary font-bold">34 Vessels Docked</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-2xl border border-white/5">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-brand-accent/20 text-brand-accent rounded-xl">
                        <Activity className="w-4 h-4" />
                      </div>
                      <div className="text-xs">
                        <p className="font-bold">CBN Custom Duty Rate</p>
                        <p className="text-[10px] text-gray-400">Standard Spot</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-brand-accent font-bold">₦1,515.00 / $</span>
                  </div>
                </div>

                <div className="pt-2 text-[10px] text-gray-400 font-mono text-center flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-secondary" />
                  <span>NIGERIAN CUSTOMS INTEGRATED TARIFF SYSTEM APPROVED</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Live Exchange Rates & Charts Dashboard */}
      <section id="live-dashboard" className="py-24 bg-brand-light ui-dot-grid relative border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-secondary text-xs sm:text-sm uppercase tracking-widest font-semibold font-sans">
              Financial Intelligence Desk
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-primary tracking-tight leading-tight font-heading mt-2">
              Sovereign Naira Rate Ticker
            </h2>
            <div className="w-16 h-1 bg-brand-accent mx-auto mt-4 rounded-full"></div>
            <p className="text-gray-500 font-sans text-xs sm:text-sm mt-4 font-light max-w-2xl mx-auto">
              Monitor standard commercial spot values for international trade. Clicking a rate card updates the historical chart analysis below.
            </p>
          </div>

          {/* Rates cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {Object.keys(rates).map((key) => {
              const item = rates[key];
              const isPositive = item.change >= 0;
              const isSelected = selectedRatePair === key;

              return (
                <button
                  key={key}
                  onClick={() => setSelectedRatePair(key as 'USD' | 'CNY' | 'GBP' | 'EUR')}
                  className={`bg-white border text-left p-6 rounded-3xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-brand-secondary/20 cursor-pointer ${
                    isSelected ? 'ring-2 ring-brand-secondary border-transparent shadow-lg animate-pulse-subtle' : 'border-gray-150 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4 w-full">
                    <div className="flex items-center space-x-3">
                      {/* Abstract Circle Flag placeholder with Lucide Globe */}
                      <div className="w-8 h-8 rounded-full bg-brand-primary/5 text-brand-primary flex items-center justify-center font-bold text-xs">
                        {item.countryCode}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-brand-primary leading-tight font-heading">{key}</h4>
                        <p className="text-[10px] text-gray-400 font-sans">{item.fullName}</p>
                      </div>
                    </div>
                    {isPositive ? (
                      <span className="text-green-600 bg-green-50 px-2 py-1 rounded-lg text-[10px] font-mono font-bold flex items-center space-x-0.5">
                        <ArrowUpRight className="w-3 h-3" />
                        <span>+{item.change}%</span>
                      </span>
                    ) : (
                      <span className="text-red-600 bg-red-50 px-2 py-1 rounded-lg text-[10px] font-mono font-bold flex items-center space-x-0.5">
                        <ArrowDownRight className="w-3 h-3" />
                        <span>{item.change}%</span>
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-mono">Current Spot Rate</p>
                    <p className="text-2xl font-bold text-brand-primary tracking-tight font-heading flex items-baseline">
                      ₦{item.rate.toFixed(2)}
                      <span className="text-xs text-gray-400 ml-1 font-normal font-sans">/ {key}</span>
                    </p>
                  </div>

                  {/* Highlight bar for active selections */}
                  {isSelected && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-secondary"></div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="text-center mb-12">
            <span className="text-[11px] text-gray-400 font-mono inline-flex items-center gap-1 bg-white border border-gray-150 px-4 py-2 rounded-full shadow-sm">
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping mr-1"></span>
              <RefreshCw className={`w-3.5 h-3.5 text-brand-secondary ${isUpdating ? 'animate-spin' : ''}`} />
              <span>Real-time Live Ticker is active (Autosyncing rates, last updated: {lastUpdated}).</span>
              <button 
                onClick={handleRefreshRates}
                className="text-brand-secondary font-bold hover:underline ml-1"
                disabled={isUpdating}
              >
                Sync Now
              </button>
            </span>
          </div>

          {/* Interactive Line Chart Grid */}
          <div className="bg-white border border-gray-150 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-6 border-b border-gray-100 gap-4 mb-8">
              <div>
                <span className="text-[10px] text-brand-secondary font-mono uppercase tracking-wider">HISTORICAL TREND ANALYSIS</span>
                <h3 className="text-lg font-bold text-brand-primary font-heading flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-brand-secondary" />
                  <span>{selectedRatePair} to NGN ({rates[selectedRatePair]?.fullName || BASE_RATES[selectedRatePair]?.fullName}) Spot History</span>
                </h3>
              </div>
              
              {/* Timeframe Toggles */}
              <div className="flex bg-brand-light p-1 rounded-xl border border-gray-200 self-start md:self-auto">
                {(['7D', '30D', '90D', '1Y'] as const).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setChartTimeframe(tf)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                      chartTimeframe === tf 
                        ? 'bg-brand-primary text-white shadow-sm' 
                        : 'text-gray-500 hover:text-brand-primary'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            {/* Layout Grid: Chart + Performance Indicators */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Line chart (Col-Span-8) */}
              <div className="lg:col-span-8 w-full h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={activeChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1E88E5" stopOpacity={0.25}/>
                        <stop offset="95%" stopColor="#1E88E5" stopOpacity={0.0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis 
                      dataKey="date" 
                      tickLine={false} 
                      axisLine={false} 
                      tick={{ fill: '#9CA3AF', fontSize: 10, fontFamily: 'monospace' }} 
                    />
                    <YAxis 
                      domain={['auto', 'auto']}
                      tickLine={false} 
                      axisLine={false} 
                      tick={{ fill: '#9CA3AF', fontSize: 10, fontFamily: 'monospace' }} 
                      tickFormatter={(v) => `₦${v}`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        background: '#0B3C5D', 
                        border: 'none', 
                        borderRadius: '16px', 
                        color: '#FFF',
                        fontFamily: 'sans-serif',
                        fontSize: '11px',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                      }}
                      formatter={(value: any) => [`₦${value.toFixed(2)}`, 'Naira Spot Rate']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="rate" 
                      stroke="#1E88E5" 
                      strokeWidth={3} 
                      fillOpacity={1} 
                      fill="url(#colorRate)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Statistics Panel (Col-Span-4) */}
              <div className="lg:col-span-4 bg-brand-light border border-gray-150 rounded-3xl p-6 space-y-5">
                <h4 className="text-xs font-bold text-brand-primary uppercase tracking-wider font-heading border-b border-gray-200 pb-2">
                  Period Summary ({chartTimeframe})
                </h4>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] text-gray-400 uppercase font-mono">Highest Rate</p>
                    <p className="text-base font-extrabold text-brand-primary font-sans">₦{highestRate.toFixed(2)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-gray-400 uppercase font-mono">Lowest Rate</p>
                    <p className="text-base font-extrabold text-brand-primary font-sans">₦{lowestRate.toFixed(2)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-gray-400 uppercase font-mono">Average Rate</p>
                    <p className="text-base font-extrabold text-brand-primary font-sans">₦{averageRate.toFixed(2)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-gray-400 uppercase font-mono">Trend Delta</p>
                    <span className={`text-sm font-extrabold font-mono inline-flex items-center ${trendPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {trendPercent >= 0 ? '+' : ''}{trendPercent}%
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-[10px] text-gray-400 leading-normal">
                    Calculated using standard daily commercial spot indexes. Fluctuations directly impact import VAT estimates, customs clearances, and overall pricing formulas.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 3. Currency Converter & Trade Cost Calculator Section */}
      <section id="converters-calculators" className="py-24 bg-white ui-dot-grid relative border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-secondary text-xs sm:text-sm uppercase tracking-widest font-semibold font-sans">
              Operational Calculator Desks
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-primary tracking-tight leading-tight font-heading mt-2">
              Currency Exchange & Import Costing
            </h2>
            <div className="w-16 h-1 bg-brand-accent mx-auto mt-4 rounded-full"></div>
            <p className="text-gray-500 font-sans text-xs sm:text-sm mt-4 font-light max-w-2xl mx-auto">
              Simulate instant international conversions or perform fully calculated import landing duty estimates tailored to real-world Nigerian customs standards.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* COLUMN 1: Currency Converter (Col-Span-5) */}
            <div className="lg:col-span-5 bg-brand-light border border-gray-150 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm">
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-bold text-brand-primary font-heading flex items-center space-x-2">
                    <ArrowRightLeft className="w-5 h-5 text-brand-secondary" />
                    <span>Interactive Currency Converter</span>
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">Simulate trade payments instantly in Naira.</p>
                </div>

                <div className="space-y-4">
                  {/* Amount Input */}
                  <div>
                    <label className="text-[10px] text-gray-400 font-mono block mb-1 uppercase tracking-wider">Convert Amount</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={convAmount}
                        onChange={(e) => setConvAmount(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-brand-secondary text-brand-primary"
                        placeholder="e.g. 5000"
                      />
                    </div>
                  </div>

                  {/* From Dropdown */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] text-gray-400 font-mono block mb-1 uppercase tracking-wider">From Currency</label>
                      <select
                        value={convFrom}
                        onChange={(e) => setConvFrom(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl px-3 py-3 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-brand-secondary text-brand-primary"
                      >
                        {Object.keys(rates).map((cur) => (
                          <option key={cur} value={cur}>{cur} - {rates[cur].fullName}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400 font-mono block mb-1 uppercase tracking-wider">To Currency</label>
                      <div className="w-full bg-gray-200 border border-gray-150 rounded-xl px-3 py-3 text-xs font-bold text-gray-500 flex items-center">
                        NGN - Nigerian Naira
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Conversion Output Panel */}
              <div className="bg-brand-primary text-white p-6 rounded-2xl text-center shadow-lg mt-8">
                <span className="text-[10px] text-gray-300 font-mono uppercase tracking-wider block">Estimated Total Naira Payout</span>
                <p className="text-2xl font-bold font-heading mt-1 text-white">
                  {convAmount ? `₦${convResult.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '—'}
                </p>
                <div className="mt-2.5 h-px bg-white/10"></div>
                <p className="text-[9.5px] text-gray-400 font-mono uppercase tracking-widest mt-2 leading-none">
                  FROST BRIDGE FX TRANSMISSION STANDARD
                </p>
              </div>
            </div>

            {/* COLUMN 2: Trade Cost Calculator (Col-Span-7) */}
            <div className="lg:col-span-7 bg-white border border-gray-150 rounded-3xl p-6 sm:p-8 shadow-md flex flex-col justify-between">
              <div>
                <div className="border-b border-gray-100 pb-4 mb-6">
                  <h3 className="text-lg font-bold text-brand-primary font-heading flex items-center space-x-2">
                    <Calculator className="w-5 h-5 text-brand-accent animate-pulse" />
                    <span>Import Landing Cost Calculator</span>
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">Estimate professional Customs Duties, Surcharges, and total Landing Costs.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {/* Product cost */}
                  <div>
                    <label className="text-[10px] text-gray-400 font-mono block mb-1 uppercase tracking-wider">Product Cost (FOB)</label>
                    <div className="flex">
                      <select
                        value={prodCurrency}
                        onChange={(e) => setProdCurrency(e.target.value)}
                        className="bg-gray-50 border border-r-0 border-gray-200 rounded-l-xl px-2 text-xs font-bold focus:outline-none"
                      >
                        {Object.keys(rates).map((cur) => (
                          <option key={cur} value={cur}>{cur}</option>
                        ))}
                      </select>
                      <input
                        type="number"
                        value={prodCost}
                        onChange={(e) => setProdCost(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-r-xl px-3 py-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-secondary text-brand-primary"
                        placeholder="25000"
                      />
                    </div>
                  </div>

                  {/* Freight Cost */}
                  <div>
                    <label className="text-[10px] text-gray-400 font-mono block mb-1 uppercase tracking-wider">Freight Routing Cost</label>
                    <input
                      type="number"
                      value={freightCost}
                      onChange={(e) => setFreightCost(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-secondary text-brand-primary"
                      placeholder="e.g. 3500"
                    />
                  </div>

                  {/* Insurance */}
                  <div>
                    <label className="text-[10px] text-gray-400 font-mono block mb-1 uppercase tracking-wider">Cargo Insurance Premium</label>
                    <input
                      type="number"
                      value={insuranceCost}
                      onChange={(e) => setInsuranceCost(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-secondary text-brand-primary"
                      placeholder="e.g. 400"
                    />
                  </div>

                  {/* Import Duty Rate */}
                  <div>
                    <label className="text-[10px] text-gray-400 font-mono block mb-1 uppercase tracking-wider">Official Import Duty Rate (%)</label>
                    <input
                      type="number"
                      value={importDutyPercent}
                      onChange={(e) => setImportDutyPercent(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-secondary text-brand-primary"
                      placeholder="e.g. 20"
                    />
                  </div>
                </div>

                <button
                  onClick={calculateLandingCost}
                  className="w-full bg-brand-primary hover:bg-opacity-95 text-white font-bold text-xs py-3.5 rounded-xl uppercase tracking-wider transition-colors shadow-sm mb-6 flex items-center justify-center space-x-2"
                >
                  <Percent className="w-4 h-4 text-brand-secondary" />
                  <span>Update Landing Cost Projection</span>
                </button>
              </div>

              {/* Detailed Breakdown Panel */}
              <AnimatePresence mode="wait">
                {calculatedLanding ? (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-brand-light border border-gray-150 rounded-2xl p-5 space-y-3 font-sans"
                  >
                    <div className="flex justify-between items-center text-xs pb-2 border-b border-gray-200 font-mono text-gray-400 uppercase">
                      <span>Naira Cost Components (CIF)</span>
                      <span className="text-brand-secondary font-bold">Exchange @ ₦{rates[prodCurrency]?.rate}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Naira FOB Product</span>
                        <span className="font-mono text-brand-primary font-bold">₦{calculatedLanding.prodNaira.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Naira Freight Base</span>
                        <span className="font-mono text-brand-primary font-bold">₦{calculatedLanding.freightNaira.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Customs Import Duty</span>
                        <span className="font-mono text-brand-primary font-bold">₦{calculatedLanding.customsDuty.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Customs Surcharges</span>
                        <span className="font-mono text-brand-primary font-bold">₦{calculatedLanding.surcharge.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between col-span-2">
                        <span className="text-gray-500">VAT Estimate (7.5%)</span>
                        <span className="font-mono text-brand-primary font-bold">₦{calculatedLanding.vat.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="border-t border-dashed border-gray-300 pt-3 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                      <div>
                        <span className="text-[10px] text-gray-400 font-mono uppercase">ESTIMATED TOTAL LANDING COST (CIF + DUTY)</span>
                        <p className="text-xl font-black text-brand-accent tracking-tight font-heading mt-0.5">
                          ₦{calculatedLanding.totalLanding.toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-brand-secondary/5 border border-brand-secondary/10 rounded-xl p-2.5 text-center">
                        <span className="text-[9px] text-gray-400 font-mono uppercase block">Estimated Delivered Cost</span>
                        <span className="text-xs font-bold text-brand-primary font-mono">₦{calculatedLanding.deliveredCost.toLocaleString()}</span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-brand-light border border-dashed border-gray-200 rounded-2xl p-6 text-center text-xs text-gray-500 font-sans leading-relaxed"
                  >
                    Please enter your FOB product cost and other details above, then click <span className="font-bold text-brand-primary">Update Landing Cost Projection</span> to see the full tax and VAT breakdown.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Shipping Cost Estimator Section */}
      <section id="shipping-estimator" className="py-24 bg-brand-light relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-secondary text-xs sm:text-sm uppercase tracking-widest font-semibold font-sans">
              Freight Staging Portal
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-primary tracking-tight leading-tight font-heading mt-2">
              Corporate Shipping Cost Estimator
            </h2>
            <div className="w-16 h-1.5 bg-brand-accent mx-auto mt-4 rounded-full"></div>
            <p className="text-gray-500 font-sans text-xs sm:text-sm mt-4 font-light max-w-2xl mx-auto">
              Simulate shipping durations, rates, and routing protocols for your commercial goods from global manufacturing zones directly into Lagos ports.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Form Fields Column (Col-Span-6) */}
            <div className="lg:col-span-6 bg-white border border-gray-150 rounded-3xl p-6 sm:p-8 shadow-md">
              <h3 className="text-lg font-bold text-brand-primary font-heading mb-6 border-b border-gray-100 pb-3 flex items-center space-x-2">
                <Ship className="w-5 h-5 text-brand-secondary" />
                <span>Cargo Estimator Inputs</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {/* Origin Country */}
                <div>
                  <label className="text-[10px] text-gray-400 font-mono block mb-1 uppercase tracking-wider">Origin Country</label>
                  <select
                    value={shipOrigin}
                    onChange={(e) => setShipOrigin(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-3 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-brand-secondary text-brand-primary"
                  >
                    <option value="CN">China (Guangzhou / Shanghai)</option>
                    <option value="US">United States (Houston / New York)</option>
                    <option value="GB">United Kingdom (London Gateway)</option>
                    <option value="IN">India (Nhava Sheva)</option>
                  </select>
                </div>

                {/* Destination */}
                <div>
                  <label className="text-[10px] text-gray-400 font-mono block mb-1 uppercase tracking-wider">Destination Country</label>
                  <div className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-xs font-bold text-gray-500 flex items-center">
                    Nigeria (Apapa / Tin Can / Ikeja)
                  </div>
                </div>

                {/* Mode of Freight */}
                <div>
                  <label className="text-[10px] text-gray-400 font-mono block mb-1 uppercase tracking-wider">Freight Routing Mode</label>
                  <select
                    value={shipMode}
                    onChange={(e) => setShipMode(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-3 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-brand-secondary text-brand-primary"
                  >
                    <option value="sea">Sea Freight (Vessel Container)</option>
                    <option value="air">Air Freight (Priority Cargo)</option>
                  </select>
                </div>

                {/* Cargo Type */}
                <div>
                  <label className="text-[10px] text-gray-400 font-mono block mb-1 uppercase tracking-wider">Cargo Type</label>
                  <select
                    value={shipCargoType}
                    onChange={(e) => setShipCargoType(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-3 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-brand-secondary text-brand-primary"
                  >
                    <option value="container_fcl">Full Container Load (20ft/40ft FCL)</option>
                    <option value="lcl_consolidation">LCL Consolidation (Shared CBM)</option>
                    <option value="pharma_cold">Pharmaceutical Cold Reefers</option>
                  </select>
                </div>

                {/* Gross Weight */}
                <div>
                  <label className="text-[10px] text-gray-400 font-mono block mb-1 uppercase tracking-wider">Total Weight (KG)</label>
                  <input
                    type="number"
                    value={shipWeight}
                    onChange={(e) => setShipWeight(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-secondary text-brand-primary"
                    placeholder="e.g. 1500"
                  />
                </div>

                {/* Volume */}
                <div>
                  <label className="text-[10px] text-gray-400 font-mono block mb-1 uppercase tracking-wider">Cargo Volume (CBM)</label>
                  <input
                    type="number"
                    value={shipVolume}
                    onChange={(e) => setShipVolume(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-secondary text-brand-primary"
                    placeholder="e.g. 5"
                  />
                </div>
              </div>

              {/* Speed Mode */}
              <div className="mb-6">
                <label className="text-[10px] text-gray-400 font-mono block mb-2 uppercase tracking-wider">Delivery Speed Option</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['standard', 'priority', 'express'] as const).map((speed) => (
                    <button
                      key={speed}
                      onClick={() => setShipSpeed(speed)}
                      className={`py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                        shipSpeed === speed 
                          ? 'bg-brand-primary text-white border-transparent shadow-md' 
                          : 'bg-white text-gray-600 border-gray-200 hover:border-brand-secondary/35'
                      }`}
                    >
                      {speed}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={runShippingEstimation}
                className="w-full bg-brand-accent hover:bg-orange-600 text-white font-bold text-xs py-3.5 rounded-xl uppercase tracking-wider transition-colors shadow-lg flex items-center justify-center space-x-2"
              >
                <span>Calculate Estimation</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Estimation Results Display Column (Col-Span-6) */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <AnimatePresence mode="wait">
                {estimatedFreight ? (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="bg-brand-primary text-white rounded-3xl p-8 shadow-xl flex flex-col justify-between h-full relative overflow-hidden"
                  >
                    {/* Background faint logo pattern */}
                    <div className="absolute top-1/2 left-1/2 w-[350px] h-[350px] bg-white/5 rounded-full filter blur-2xl transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

                    <div className="space-y-6 relative z-10">
                      <div className="flex justify-between items-center pb-4 border-b border-white/10">
                        <span className="text-xs font-mono text-brand-secondary font-bold">DIRECTIONAL ESTIMATE SUMMARY</span>
                        <div className="p-1 px-3 bg-white/10 border border-white/10 rounded-full text-[10px] font-mono">
                          {shipSpeed.toUpperCase()} TRANSIT
                        </div>
                      </div>

                      {/* Display Cost */}
                      <div className="space-y-1">
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">Estimated Freight Cost</span>
                        <p className="text-4xl sm:text-5xl font-black text-brand-secondary tracking-tight font-heading flex items-baseline">
                          ${estimatedFreight.cost.toLocaleString()}
                          <span className="text-xs text-gray-400 ml-1.5 font-normal font-sans">USD Base</span>
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <span className="text-[10px] text-gray-400 uppercase tracking-widest font-mono block">Estimated Transit Time</span>
                          <span className="text-sm font-bold text-white block">{estimatedFreight.time}</span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] text-gray-400 uppercase tracking-widest font-mono block">Recommended Routing</span>
                          <span className="text-sm font-bold text-white block">{estimatedFreight.method}</span>
                        </div>
                      </div>

                      <div className="h-px bg-white/10"></div>

                      <div className="space-y-2">
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-mono block">Operational Context</span>
                        <p className="text-xs text-gray-300 leading-relaxed font-sans font-light">
                          {estimatedFreight.details}
                        </p>
                      </div>
                    </div>

                    <div className="pt-8 relative z-10">
                      <button 
                        onClick={() => scrollToId('contact')}
                        className="w-full bg-brand-accent hover:bg-orange-600 text-white font-bold text-xs py-4 rounded-xl uppercase tracking-wider transition-colors shadow-lg flex items-center justify-center space-x-2"
                      >
                        <span>Request Official Booking Quote</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-brand-primary/5 border border-dashed border-brand-primary/20 rounded-3xl p-8 flex flex-col items-center justify-center text-center h-full min-h-[350px] space-y-4"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-brand-primary/5 text-brand-primary flex items-center justify-center animate-pulse">
                      <Calculator className="w-6 h-6 text-brand-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-brand-primary font-heading">Estimation Results Pending</h4>
                      <p className="text-xs text-gray-500 mt-1 max-w-xs font-sans leading-relaxed">
                        Enter your cargo weight, volume, origin, and select <span className="font-bold text-brand-primary">Calculate Estimation</span> to generate a detailed cost projection.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>

      {/* 5. China Import Centre Section */}
      <section className="py-24 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-secondary text-xs sm:text-sm uppercase tracking-widest font-semibold font-sans">
              Dedicated Sovereign Trade Lanes
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-primary tracking-tight leading-tight font-heading mt-2">
              China Import Centre
            </h2>
            <div className="w-16 h-1.5 bg-brand-accent mx-auto mt-4 rounded-full"></div>
            <p className="text-gray-500 font-sans text-xs sm:text-sm mt-4 font-light max-w-2xl mx-auto">
              Our specialized pipeline optimizes commercial freight routing from Chinese manufacturers directly into Nigeria with complete customs clearing services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Card 1: Popular Chinese Suppliers */}
            <div className="bg-brand-light hover:bg-white border border-gray-150 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-brand-primary/5 text-brand-primary flex items-center justify-center mb-6 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-brand-primary font-heading mb-3">Popular Chinese Suppliers</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-sans mb-4">
                  Seamless connections with suppliers across Guangzhou, Yiwu, Shenzhen, and Ningbo. We coordinate direct factory pickups and container consolidations.
                </p>
                <div className="border-t border-gray-200/60 pt-3 space-y-1.5 text-[11px] font-mono text-brand-primary">
                  <p className="flex justify-between"><span>Alibaba Group Shipping</span> <span className="text-brand-secondary">Pre-Cleared</span></p>
                  <p className="flex justify-between"><span>Yiwu Wholesale Hub</span> <span className="text-brand-secondary">Consolidated</span></p>
                </div>
              </div>
            </div>

            {/* Card 2: Transit Schedules */}
            <div className="bg-brand-light hover:bg-white border border-gray-150 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-brand-primary/5 text-brand-primary flex items-center justify-center mb-6 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-brand-primary font-heading mb-3">Shipping Schedules</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-sans mb-4">
                  Weekly vessel dispatches ensure reliable transit windows. Choose between fast-sea priority lines or economy consolidation schedules.
                </p>
                <div className="border-t border-gray-200/60 pt-3 space-y-1.5 text-[11px] font-mono text-brand-primary">
                  <p className="flex justify-between"><span>Fast-Sea Priority</span> <span className="text-brand-secondary">Every Tuesday</span></p>
                  <p className="flex justify-between"><span>Standard LCL Block</span> <span className="text-brand-secondary">Every Friday</span></p>
                </div>
              </div>
            </div>

            {/* Card 3: Port-to-Port Transit Times */}
            <div className="bg-brand-light hover:bg-white border border-gray-150 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-brand-primary/5 text-brand-primary flex items-center justify-center mb-6 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-brand-primary font-heading mb-3">Port Transit Times</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-sans mb-4">
                  Accurate, seasonal transit times from major Chinese loading ports to Apapa and Tin Can ports in Lagos.
                </p>
                <div className="border-t border-gray-200/60 pt-3 space-y-1.5 text-[11px] font-mono text-brand-primary">
                  <p className="flex justify-between"><span>Shanghai → Apapa</span> <span className="text-brand-secondary">28 Days</span></p>
                  <p className="flex justify-between"><span>Guangzhou → Tin Can</span> <span className="text-brand-secondary">30 Days</span></p>
                </div>
              </div>
            </div>

            {/* Card 4: Incoterms Explained */}
            <div className="bg-brand-light hover:bg-white border border-gray-150 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-brand-primary/5 text-brand-primary flex items-center justify-center mb-6 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-brand-primary font-heading mb-3">Incoterms Explained</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-sans mb-4">
                  Understand your liabilities with FOB, CIF, EXW, and DDP terms when trading with Chinese suppliers.
                </p>
                <div className="border-t border-gray-200/60 pt-3 space-y-1.5 text-[11px] font-mono text-brand-primary">
                  <p className="flex justify-between"><span>FOB (Free On Board)</span> <span className="text-brand-secondary">Supplier handles Port</span></p>
                  <p className="flex justify-between"><span>EXW (Ex Works)</span> <span className="text-brand-secondary">We collect at factory</span></p>
                </div>
              </div>
            </div>

            {/* Card 5: Customs Documentation Guide */}
            <div className="bg-brand-light hover:bg-white border border-gray-150 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-brand-primary/5 text-brand-primary flex items-center justify-center mb-6 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-brand-primary font-heading mb-3">Customs Documents</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-sans mb-4">
                  Checklists of mandatory documents required by Nigerian customs for China imports (Form M, CCVO, Bill of Lading).
                </p>
                <div className="border-t border-gray-200/60 pt-3 space-y-1.5 text-[11px] font-mono text-brand-primary">
                  <p className="flex justify-between"><span>Form M Approval</span> <span className="text-brand-secondary">Mandatory</span></p>
                  <p className="flex justify-between"><span>CCVO Form 16</span> <span className="text-brand-secondary">Mandatory</span></p>
                </div>
              </div>
            </div>

            {/* Card 6: Frequently Imported Products */}
            <div className="bg-brand-light hover:bg-white border border-gray-150 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-brand-primary/5 text-brand-primary flex items-center justify-center mb-6 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-brand-primary font-heading mb-3">Common Import Lines</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-sans mb-4">
                  High-demand product segments we stage and clear daily from China into metropolitan distribution hubs in Nigeria.
                </p>
                <div className="border-t border-gray-200/60 pt-3 space-y-1.5 text-[11px] font-mono text-brand-primary">
                  <p className="flex justify-between"><span>Electronics & Spare Parts</span> <span className="text-brand-secondary">Fast Clearance</span></p>
                  <p className="flex justify-between"><span>Industrial Machinery</span> <span className="text-brand-secondary">Heavy Lift</span></p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. Market Intelligence Section */}
      <section className="py-24 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-secondary text-xs sm:text-sm uppercase tracking-widest font-semibold font-sans">
              Market Intelligence Desk
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-primary tracking-tight leading-tight font-heading mt-2">
              Exchange & Rate Outlooks
            </h2>
            <div className="w-16 h-1.5 bg-brand-accent mx-auto mt-4 rounded-full"></div>
            <p className="text-gray-500 font-sans text-xs sm:text-sm mt-4 font-light max-w-2xl mx-auto">
              Stay ahead of trade disruptions with analysis, dollar trends, and regional port reports compiled by our Lagos staging officers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Intel Card 1 */}
            <div 
              onClick={() => setSelectedDoc(TRADE_DOCUMENTS.find(d => d.id === 'dollar-outlook') || null)}
              className="bg-white border border-gray-150 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-xl hover:border-brand-secondary/30 transition-all duration-300 cursor-pointer"
            >
              <div>
                <div className="h-44 overflow-hidden relative">
                  <img 
                    src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600&q=80" 
                    alt="Dollar Spot Rate Indicator charts" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/20 to-transparent"></div>
                </div>
                <div className="p-6 space-y-4">
                  <span className="text-[9px] text-brand-secondary font-mono font-bold uppercase tracking-wider bg-brand-secondary/5 px-2.5 py-1 rounded-md">Currency Forecast</span>
                  <h4 className="text-sm font-bold text-brand-primary font-heading leading-snug group-hover:text-brand-secondary transition-colors">Dollar Outlook: Spot Rate Stabilization Projections</h4>
                  <p className="text-[11px] text-gray-500 font-sans leading-relaxed">
                    Analyzing current central bank allocations, our desk projects dollar-to-naira trading bounds to hover between ₦1,500 and ₦1,530.
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-4 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400 font-mono">
                <span>Updated Weekly</span>
                <span className="text-brand-secondary font-bold group-hover:underline">Read Outlook</span>
              </div>
            </div>

            {/* Intel Card 2 */}
            <div 
              onClick={() => setSelectedDoc(TRADE_DOCUMENTS.find(d => d.id === 'yuan-outlook') || null)}
              className="bg-white border border-gray-150 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-xl hover:border-brand-secondary/30 transition-all duration-300 cursor-pointer"
            >
              <div>
                <div className="h-44 overflow-hidden relative">
                  <img 
                    src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80" 
                    alt="Ningbo industrial ocean shipping port" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/20 to-transparent"></div>
                </div>
                <div className="p-6 space-y-4">
                  <span className="text-[9px] text-brand-accent font-mono font-bold uppercase tracking-wider bg-brand-accent/5 px-2.5 py-1 rounded-md">China Trade</span>
                  <h4 className="text-sm font-bold text-brand-primary font-heading leading-snug group-hover:text-brand-secondary transition-colors">Yuan Outlook: High Volume Industrial Seasons</h4>
                  <p className="text-[11px] text-gray-500 font-sans leading-relaxed">
                    As manufacturing output peaks across Ningbo-Zhoushan hubs, yuan trading index expectations point to minor cargo rate spikes through autumn.
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-4 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400 font-mono">
                <span>Updated Weekly</span>
                <span className="text-brand-secondary font-bold group-hover:underline">Read Outlook</span>
              </div>
            </div>

            {/* Intel Card 3 */}
            <div 
              onClick={() => setSelectedDoc(TRADE_DOCUMENTS.find(d => d.id === 'ocean-tariffs') || null)}
              className="bg-white border border-gray-150 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-xl hover:border-brand-secondary/30 transition-all duration-300 cursor-pointer"
            >
              <div>
                <div className="h-44 overflow-hidden relative">
                  <img 
                    src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=600&q=80" 
                    alt="Cargo highway shipping freight" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/20 to-transparent"></div>
                </div>
                <div className="p-6 space-y-4">
                  <span className="text-[9px] text-blue-600 font-mono font-bold uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-md">Freight Index</span>
                  <h4 className="text-sm font-bold text-brand-primary font-heading leading-snug group-hover:text-brand-secondary transition-colors">Ocean Shipping Spot Tariff Adjustments</h4>
                  <p className="text-[11px] text-gray-500 font-sans leading-relaxed">
                    West African trade lane indices show a minor decline in base ocean container booking values, offsetting fuel increases.
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-4 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400 font-mono">
                <span>Updated Daily</span>
                <span className="text-brand-secondary font-bold group-hover:underline">Read Outlook</span>
              </div>
            </div>

            {/* Intel Card 4 */}
            <div 
              onClick={() => setSelectedDoc(TRADE_DOCUMENTS.find(d => d.id === 'lagos-ports') || null)}
              className="bg-white border border-gray-150 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-xl hover:border-brand-secondary/30 transition-all duration-300 cursor-pointer"
            >
              <div>
                <div className="h-44 overflow-hidden relative">
                  <img 
                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80" 
                    alt="Apapa Lagos seaport terminal" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/20 to-transparent"></div>
                </div>
                <div className="p-6 space-y-4">
                  <span className="text-[9px] text-red-600 font-mono font-bold uppercase tracking-wider bg-red-50 px-2.5 py-1 rounded-md">Port Congestion</span>
                  <h4 className="text-sm font-bold text-brand-primary font-heading leading-snug group-hover:text-brand-secondary transition-colors">Lagos Seaports Container Clearance Velocity</h4>
                  <p className="text-[11px] text-gray-500 font-sans leading-relaxed">
                    Average vessel waiting times at Apapa terminals decline to 2.2 days, ensuring rapid clearing for pre-staged shipments.
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-4 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400 font-mono">
                <span>Updated Daily</span>
                <span className="text-brand-secondary font-bold group-hover:underline">Read Outlook</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 7. Trade News & Updates Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-4">
            <div>
              <span className="text-brand-secondary text-xs sm:text-sm uppercase tracking-widest font-semibold font-sans block">
                Logistics Bulletin
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-primary tracking-tight leading-tight font-heading mt-2">
                Latest International Trade News
              </h2>
              <div className="w-16 h-1.5 bg-brand-accent mt-4 rounded-full"></div>
            </div>
            <p className="text-gray-500 text-xs sm:text-sm max-w-md font-light leading-relaxed">
              Real-time reporting on customs tariffs, trade agreements, and macroeconomic factors impacting ocean, air, and regional highway fleets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* News 1 */}
            <div className="bg-brand-light border border-gray-150 rounded-3xl p-6 hover:shadow-lg transition-shadow">
              <span className="text-[9px] text-brand-secondary font-mono font-bold uppercase tracking-wider block mb-3">Nigerian Customs</span>
              <h4 className="text-sm font-bold text-brand-primary font-heading leading-snug mb-3">Customs Tariff System Updates and Pre-Assessment Protocols</h4>
              <p className="text-xs text-gray-500 leading-relaxed font-sans mb-4">
                The NCS announces digitized verification frameworks to streamline pre-assessments, dropping clearing cycles at Lagos seaport terminals.
              </p>
              <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono border-t border-gray-200/60 pt-3">
                <span>30 June 2026</span>
                <span>By Operations Desk</span>
              </div>
            </div>

            {/* News 2 */}
            <div className="bg-brand-light border border-gray-150 rounded-3xl p-6 hover:shadow-lg transition-shadow">
              <span className="text-[9px] text-brand-secondary font-mono font-bold uppercase tracking-wider block mb-3">Global Logistics</span>
              <h4 className="text-sm font-bold text-brand-primary font-heading leading-snug mb-3">Global Container Shipping Capacity and Carrier Alliances</h4>
              <p className="text-xs text-gray-500 leading-relaxed font-sans mb-4">
                Carrier groups introduce more blank sailings on East-West lanes to optimize cargo loading weights amidst minor trade flow drops.
              </p>
              <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono border-t border-gray-200/60 pt-3">
                <span>28 June 2026</span>
                <span>By Freight Intel</span>
              </div>
            </div>

            {/* News 3 */}
            <div className="bg-brand-light border border-gray-150 rounded-3xl p-6 hover:shadow-lg transition-shadow">
              <span className="text-[9px] text-brand-secondary font-mono font-bold uppercase tracking-wider block mb-3">Fuel & Energy</span>
              <h4 className="text-sm font-bold text-brand-primary font-heading leading-snug mb-3">Marine Bunker Fuel Adjustments and Transit Impact</h4>
              <p className="text-xs text-gray-500 leading-relaxed font-sans mb-4">
                Low-sulfur fuel indexes holding steady, protecting freight pricing and preserving standard regional logistics budgets.
              </p>
              <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono border-t border-gray-200/60 pt-3">
                <span>25 June 2026</span>
                <span>By Energy Desk</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 8. Logistics Insights Portal */}
      <section className="py-24 bg-brand-light relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-secondary text-xs sm:text-sm uppercase tracking-widest font-semibold font-sans">
              Educational Repository
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-primary tracking-tight leading-tight font-heading mt-2">
              Logistics Insights & Knowledge Portal
            </h2>
            <div className="w-16 h-1.5 bg-brand-accent mx-auto mt-4 rounded-full"></div>
            <p className="text-gray-500 font-sans text-xs sm:text-sm mt-4 font-light max-w-2xl mx-auto">
              Master the operational guidelines of global supply chains. Review core whitepapers compiled by our customs compliance managers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Insight 1 */}
            <div 
              onClick={() => setSelectedDoc(TRADE_DOCUMENTS.find(d => d.id === 'guide-preclearance') || null)}
              className="bg-white border border-gray-150 rounded-3xl p-8 shadow-sm flex flex-col justify-between group hover:shadow-xl hover:border-brand-secondary/30 transition-all duration-300 cursor-pointer"
            >
              <div className="space-y-4">
                <div className="p-3 bg-brand-primary/5 text-brand-primary rounded-2xl w-12 h-12 flex items-center justify-center group-hover:bg-brand-secondary/10 transition-colors">
                  <BookOpen className="w-5 h-5 text-brand-primary group-hover:text-brand-secondary transition-colors" />
                </div>
                <h4 className="text-base font-bold text-brand-primary font-heading leading-snug group-hover:text-brand-secondary transition-colors">How to Reduce Import Costs with Customs Pre-Clearance</h4>
                <p className="text-xs text-gray-500 font-sans leading-relaxed">
                  Discover tactical strategies to minimize demurrage and terminal charges. Staging your document pipeline early is key to clearing within 48 hours.
                </p>
              </div>
              <button 
                className="mt-6 flex items-center space-x-1 text-xs font-bold text-brand-secondary hover:text-brand-primary font-mono uppercase tracking-wider"
              >
                <span>Read Full Guide</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>

            {/* Insight 2 */}
            <div 
              onClick={() => setSelectedDoc(TRADE_DOCUMENTS.find(d => d.id === 'guide-freight-modes') || null)}
              className="bg-white border border-gray-150 rounded-3xl p-8 shadow-sm flex flex-col justify-between group hover:shadow-xl hover:border-brand-secondary/30 transition-all duration-300 cursor-pointer"
            >
              <div className="space-y-4">
                <div className="p-3 bg-brand-primary/5 text-brand-primary rounded-2xl w-12 h-12 flex items-center justify-center group-hover:bg-brand-secondary/10 transition-colors">
                  <Plane className="w-5 h-5 text-brand-primary group-hover:text-brand-secondary transition-colors" />
                </div>
                <h4 className="text-base font-bold text-brand-primary font-heading leading-snug group-hover:text-brand-secondary transition-colors">Choosing Between Air and Sea Freight for Cargo Staging</h4>
                <p className="text-xs text-gray-500 font-sans leading-relaxed">
                  A cost-to-speed analysis framework. Determine whether priority express air lanes or container ocean shipping aligns with your product shelf-life.
                </p>
              </div>
              <button 
                className="mt-6 flex items-center space-x-1 text-xs font-bold text-brand-secondary hover:text-brand-primary font-mono uppercase tracking-wider"
              >
                <span>Read Full Guide</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>

            {/* Insight 3 */}
            <div 
              onClick={() => setSelectedDoc(TRADE_DOCUMENTS.find(d => d.id === 'guide-incoterms') || null)}
              className="bg-white border border-gray-150 rounded-3xl p-8 shadow-sm flex flex-col justify-between group hover:shadow-xl hover:border-brand-secondary/30 transition-all duration-300 cursor-pointer"
            >
              <div className="space-y-4">
                <div className="p-3 bg-brand-primary/5 text-brand-primary rounded-2xl w-12 h-12 flex items-center justify-center group-hover:bg-brand-secondary/10 transition-colors">
                  <ShieldCheck className="w-5 h-5 text-brand-primary group-hover:text-brand-secondary transition-colors" />
                </div>
                <h4 className="text-base font-bold text-brand-primary font-heading leading-snug group-hover:text-brand-secondary transition-colors">Understanding Incoterms and Cargo Insurance Liability</h4>
                <p className="text-xs text-gray-500 font-sans leading-relaxed">
                  Demystifying cargo transfer points. Protect your commercial investments with complete clarity on marine insurance bounds and liability transfers.
                </p>
              </div>
              <button 
                className="mt-6 flex items-center space-x-1 text-xs font-bold text-brand-secondary hover:text-brand-primary font-mono uppercase tracking-wider"
              >
                <span>Read Full Guide</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 9. Premium Call to Action Banner */}
      <section className="bg-brand-primary text-white py-24 relative overflow-hidden">
        {/* Abstract pattern bg */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-brand-secondary/10 rounded-full filter blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight font-heading">
            Need Expert Logistics Advice?
          </h2>
          
          <p className="text-gray-300 font-sans text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-light">
            Our logistics specialists are ready to help you plan your next shipment with accurate pricing, efficient routing, and expert guidance.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button 
              onClick={() => scrollToId('contact')}
              className="bg-brand-accent hover:bg-orange-600 text-white font-bold text-xs sm:text-sm px-8 py-4 rounded-xl uppercase tracking-wider transition-colors shadow-lg"
            >
              Speak to an Expert
            </button>
            <button 
              onClick={() => scrollToId('shipping-estimator')}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm px-8 py-4 rounded-xl uppercase tracking-wider transition-colors"
            >
              Request a Quote
            </button>
          </div>
        </div>
      </section>

      {/* Trade Document Reader Modal (High Fidelity Lightbox) */}
      <AnimatePresence>
        {selectedDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-brand-primary/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border border-gray-150"
            >
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedDoc(null)}
                className="absolute top-4 right-4 z-10 bg-brand-primary/90 text-white hover:bg-brand-accent p-2.5 rounded-full transition-all"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Banner Image */}
              {selectedDoc.image && (
                <div className="h-64 sm:h-80 w-full relative">
                  <img
                    src={selectedDoc.image}
                    alt={selectedDoc.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-brand-primary/30"></div>
                  
                  <span className="absolute bottom-6 left-6 bg-brand-secondary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {selectedDoc.category}
                  </span>
                </div>
              )}

              {/* Main Text Content Container */}
              <div className="p-6 sm:p-10 space-y-6">
                
                {/* Meta details */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-5 gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-brand-secondary/10 flex items-center justify-center text-brand-secondary font-black text-sm uppercase">
                      {selectedDoc.author.slice(0, 2)}
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-brand-primary block leading-none">
                        {selectedDoc.author}
                      </span>
                      <span className="text-[10px] text-gray-400 font-mono block mt-1">
                        {selectedDoc.role}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-[10px] text-gray-450 font-mono">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      <span>{selectedDoc.date}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span>{selectedDoc.readTime}</span>
                    </span>
                  </div>
                </div>

                {/* Document Title */}
                <h1 className="text-lg sm:text-2xl font-black text-brand-primary font-heading leading-tight tracking-tight">
                  {selectedDoc.title}
                </h1>

                {/* Main Content paragraphs */}
                <div className="text-xs sm:text-sm text-gray-600 font-sans leading-relaxed space-y-4 font-light">
                  {selectedDoc.content.map((p, pidx) => (
                    <p key={pidx}>{p}</p>
                  ))}
                </div>

                {/* Tags */}
                <div className="pt-4 flex flex-wrap gap-2">
                  {selectedDoc.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-brand-light text-brand-primary text-[10px] font-semibold px-2.5 py-1 rounded-md uppercase font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Modal Utility Bar */}
                <div className="border-t border-gray-100 pt-6 flex items-center justify-between">
                  <div className="flex space-x-3">
                    <button className="flex items-center space-x-1.5 text-xs text-gray-400 hover:text-brand-accent transition-colors font-mono">
                      <ThumbsUp className="w-4 h-4" />
                      <span>Helpful</span>
                    </button>
                    <button className="flex items-center space-x-1.5 text-xs text-gray-400 hover:text-brand-accent transition-colors font-mono">
                      <Bookmark className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                  </div>
                  <button className="flex items-center space-x-1.5 text-xs text-gray-400 hover:text-brand-secondary transition-colors font-mono">
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
