import React, { useState, useRef } from 'react';
import {
  Globe,
  Ship,
  CheckCircle2,
  ShieldCheck,
  Maximize2,
  Download,
  ArrowRight,
  ExternalLink,
  Layers,
  FileCheck,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Package,
  TrendingUp,
  MapPin,
  Sparkles,
  Search,
  Scale,
  Award,
  Calendar,
  X,
  ZoomIn,
  Truck,
  Building2,
  Phone,
  Mail
} from 'lucide-react';

export interface CommodityItem {
  id: string;
  name: string;
  botanicalName?: string;
  category: 'oilseeds' | 'botanicals' | 'legumes' | 'grains' | 'warehousing';
  categoryLabel: string;
  primaryImage: string;
  galleryImages: string[];
  grade: string;
  specs: {
    label: string;
    value: string;
  }[];
  packaging: string;
  origin: string;
  annualVolume: string;
  description: string;
  exportHighlights: string[];
}

export const COMMODITIES_DATA: CommodityItem[] = [
  {
    id: 'sesame-seeds',
    name: 'Natural White Sesame Seeds (Beniseed)',
    botanicalName: 'Sesamum indicum',
    category: 'oilseeds',
    categoryLabel: 'Premium Oilseeds',
    primaryImage: 'assets/aistudio/IMG-20261024-WA0010_abe96735.jpg',
    galleryImages: [
      'assets/aistudio/IMG-20261024-WA0010_abe96735.jpg',
      'assets/aistudio/IMG-20261024-WA0006_5c448b9d.jpg',
      'assets/aistudio/IMG-20261024-WA0007_914cca3f.jpg',
      'assets/aistudio/IMG-20261024-WA0010_1__abe96735.jpg'
    ],
    grade: 'Export Grade A (Machine Cleaned)',
    specs: [
      { label: 'Purity Level', value: '99.0% Min (Cleaned)' },
      { label: 'Oil Content', value: '51.0% – 53.0% Min' },
      { label: 'Moisture Content', value: '6.0% Max' },
      { label: 'FFA (Free Fatty Acid)', value: '< 1.5% Max' },
      { label: 'Admixture', value: '< 1.0% Max' },
      { label: 'Color', value: 'Natural Whitish / Cream' }
    ],
    packaging: '50kg New Woven Polypropylene (PP) or Jute Bags with inner liner',
    origin: 'Kano, Jigawa & Nasarawa Agricultural Belts, Northern Nigeria',
    annualVolume: '3,000+ Metric Tonnes per Season',
    description: 'Fuldej supplies premium, export-grade natural white sesame seeds harvested from high-yield Northern Nigerian agrarian clusters. Carefully sorted, laboratory-tested, and machine-cleaned to satisfy stringent Japanese, European, and Middle Eastern import specifications.',
    exportHighlights: [
      'High natural oil yield ideal for cold-press tahini & edible culinary oils',
      'Zero chemical fumigant residues, phytosanitary certified by NAQS',
      'Hermetically packaged export sample batches verified in clear laboratory ziplocks'
    ]
  },
  {
    id: 'hibiscus-flowers',
    name: 'Dried Hibiscus Flower Calyces (Zobo / Roselle)',
    botanicalName: 'Hibiscus sabdariffa',
    category: 'botanicals',
    categoryLabel: 'Herbal & Beverage Botanicals',
    primaryImage: 'assets/aistudio/IMG-20261024-WA0005_5adbed91.jpg',
    galleryImages: [
      'assets/aistudio/IMG-20261024-WA0005_5adbed91.jpg',
      'assets/aistudio/IMG-20261024-WA0016_09529ea7.jpg'
    ],
    grade: 'Whole Flower Deep Crimson Cut (Selected)',
    specs: [
      { label: 'Color & Hue', value: 'Deep Dark Crimson / Purple-Red' },
      { label: 'Moisture Content', value: '< 12.0% Max' },
      { label: 'Total Ash Content', value: '< 10.0% Max' },
      { label: 'Acid Insoluble Ash', value: '< 1.5% Max' },
      { label: 'Foreign Matter', value: '< 1.0% (Zero Stone / Sand)' },
      { label: 'Flavor Profile', value: 'Tart, Rich Anthocyanin Punch' }
    ],
    packaging: '25kg / 40kg Compressed Bales or 20kg Food-Grade Multi-wall Craft Poly Bags',
    origin: 'Katsina & Kano Semi-Arid Belt, Nigeria',
    annualVolume: '1,500+ Metric Tonnes',
    description: 'Renowned worldwide for its intensely vivid ruby extraction and natural anthocyanin content. Sourced directly from local farmer cooperatives, sun-dried on hygienic tarpaulins under intense natural Sahelian sunlight, and thoroughly sifted to eliminate dust and seeds.',
    exportHighlights: [
      'High demand for herbal tea infusions, culinary extracts, and natural beverage dyes in Germany, USA & Mexico',
      'Massive sun-drying and sorting facility managed by experienced agricultural workers',
      'Consistent rich pigmentation yielding vibrant red tea infusions'
    ]
  },
  {
    id: 'cowpeas-beans',
    name: 'Nigerian Honey Beans & Export White Cowpeas',
    botanicalName: 'Vigna unguiculata',
    category: 'legumes',
    categoryLabel: 'High-Protein Legumes',
    primaryImage: 'assets/aistudio/IMG-20261024-WA0017_794e190c.jpg',
    galleryImages: [
      'assets/aistudio/IMG-20261024-WA0017_794e190c.jpg',
      'assets/aistudio/IMG-20261024-WA0014_f2137951.jpg'
    ],
    grade: 'Grade A Commercial Selected',
    specs: [
      { label: 'Purity Level', value: '98.5% – 99.0% Min' },
      { label: 'Varieties', value: 'Brown Honey (Oloyin) & Large White' },
      { label: 'Moisture Content', value: '< 10.5% Max' },
      { label: 'Weevil / Insect Damage', value: '< 0.5% Strictly Inspected' },
      { label: 'Broken / Split Grains', value: '< 1.5% Max' },
      { label: 'Protein Content', value: '23.0% – 25.0%' }
    ],
    packaging: '50kg / 100kg Reinforced Woven Jute or Breathable Poly Sacks',
    origin: 'Borno, Yobe, and Kano Agrarian Corridors, Nigeria',
    annualVolume: '4,000+ Metric Tonnes',
    description: 'Nigeria is the world’s leading producer of cowpeas. Fuldej aggregates both the celebrated naturally sweet Brown Honey Cowpeas (Oloyin) and spotless White Cowpeas, stored in controlled moisture silos and treated to prevent insect infestation for domestic commercial distribution and diaspora exports.',
    exportHighlights: [
      'Authentic sweet Nigerian Oloyin variety in high demand across African retail hubs worldwide',
      'Strict quality grading guaranteeing minimal split beans and clean grain consistency',
      'Natural whole protein staple packed under certified hygienic warehouse conditions'
    ]
  },
  {
    id: 'sorghum-millet',
    name: 'Cleaned White Sorghum & Pearl Millet',
    botanicalName: 'Sorghum bicolor & Pennisetum glaucum',
    category: 'grains',
    categoryLabel: 'Sahelian Ancient Grains',
    primaryImage: 'assets/aistudio/IMG-20261024-WA0011_8ebf4791.jpg',
    galleryImages: [
      'assets/aistudio/IMG-20261024-WA0011_8ebf4791.jpg',
      'assets/aistudio/IMG-20261024-WA0008_b2c36025.jpg'
    ],
    grade: 'Commercial Food & Flour Milling Grade',
    specs: [
      { label: 'Grain Purity', value: '98.5% Min Cleaned' },
      { label: 'Moisture Content', value: '11.0% – 12.0% Max' },
      { label: 'Non-GMO Certification', value: '100% Non-Genetically Modified' },
      { label: 'Tannin Content', value: 'Low Tannin White Grain' },
      { label: 'Foreign Matter', value: '< 1.5% Max' },
      { label: 'Color', value: 'Pearly White (Sorghum) / Olive Grey (Millet)' }
    ],
    packaging: '50kg / 100kg Heavy-Duty Export Sacks or Bulk Container Bags',
    origin: 'Kano, Kaduna & Sokoto Savannah Belts',
    annualVolume: '5,000+ Metric Tonnes',
    description: 'Sahelian climate-resilient ancient grains harvested at peak maturity. White Sorghum is primed for commercial food processing, gluten-free flour milling, confectioneries, and high-energy breakfast cereal production, while our whole Pearl Millet is prized for nutritious human food staples, livestock/poultry feed, and traditional culinary processing.',
    exportHighlights: [
      'High-yield nutritional grain profile ideal for food processors, commercial mills, and packaged cereal brands',
      'Naturally gluten-free, drought-hardy grains harvested with zero genetic engineering',
      'Bulk consignment staging ready for direct containerization at Kano export rail/inland depot'
    ]
  },
  {
    id: 'bulk-warehousing',
    name: 'Commercial Consolidation Warehouse & Container Staging Hub',
    category: 'warehousing',
    categoryLabel: 'Export Logistics & Warehousing',
    primaryImage: 'assets/aistudio/IMG-20261024-WA0016_09529ea7.jpg',
    galleryImages: [
      'assets/aistudio/IMG-20261024-WA0016_09529ea7.jpg',
      'assets/aistudio/IMG-20261024-WA0007_914cca3f.jpg'
    ],
    grade: 'ISO / NEPC Export Compliance Standard',
    specs: [
      { label: 'Storage Capacity', value: '10,000+ Metric Tonnes Covered Stacking' },
      { label: 'Yard Handling', value: 'Dedicated 40ft Container Truck Loading Docks' },
      { label: 'Bagging System', value: 'Semi-automated 50kg/100kg Stitching & Weighing' },
      { label: 'Inland Transit', value: 'Kano Dry Port to Apapa / Tin Can Port, Lagos' },
      { label: 'Incoterms Available', value: 'FOB Lagos, CIF European, Middle East & Asian Ports' },
      { label: 'Inspection Agents', value: 'SGS, Bureau Veritas, Cotecna Available' }
    ],
    packaging: 'Standard 20ft (approx. 18-20 MT) & 40ft (approx. 26-28 MT) FCL Containers',
    origin: 'Kano Industrial Export Corridor, Northern Nigeria',
    annualVolume: 'Multilateral Consignments Year-Round',
    description: 'Our high-capacity Kano warehousing complex coordinates large-scale collection, moisture monitoring, quality re-cleaning, weighing, and container stuffing. Seamless integration with the Kano Inland Dry Port ensures swift customs transit to Lagos maritime seaports for ocean freight worldwide.',
    exportHighlights: [
      'Equipped with heavy-duty weighbridge and high-speed loading bays for continuous container stuffing',
      'Full documentation compliance: Bill of Lading, Phytosanitary, Form NXP, Certificate of Origin',
      'Direct oversight by experienced logistics supervisors safeguarding cargo integrity from farm to port'
    ]
  }
];

interface CommoditiesSectionProps {
  isDark: boolean;
  onSelectCommodityForQuote: (commodityName: string) => void;
}

export const CommoditiesSection: React.FC<CommoditiesSectionProps> = ({
  isDark,
  onSelectCommodityForQuote
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedCommodity, setSelectedCommodity] = useState<CommodityItem | null>(null);
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isWarehouseVideoPlaying, setIsWarehouseVideoPlaying] = useState(true);
  const [isWarehouseVideoMuted, setIsWarehouseVideoMuted] = useState(true);

  const warehouseVideoRef = useRef<HTMLVideoElement>(null);

  const filteredCommodities = activeCategory === 'all'
    ? COMMODITIES_DATA
    : COMMODITIES_DATA.filter(item => item.category === activeCategory);

  const toggleVideoPlayback = () => {
    if (!warehouseVideoRef.current) return;
    if (warehouseVideoRef.current.paused) {
      warehouseVideoRef.current.play().then(() => {
        setIsWarehouseVideoPlaying(true);
      }).catch(() => {});
    } else {
      warehouseVideoRef.current.pause();
      setIsWarehouseVideoPlaying(false);
    }
  };

  const toggleVideoSound = () => {
    if (!warehouseVideoRef.current) return;
    const newMuted = !warehouseVideoRef.current.muted;
    warehouseVideoRef.current.muted = newMuted;
    setIsWarehouseVideoMuted(newMuted);
  };

  return (
    <div className={`transition-colors duration-200 ${
      isDark ? 'bg-[#0B1321] text-slate-100' : 'bg-[#FFFFFF] text-[#263445]'
    }`}>
      {/* ================= HERO SHOWCASE BANNER ================= */}
      <section className="relative overflow-hidden border-b border-emerald-900/30">
        {/* Background Visual Texture with subtle earthy emerald & gold glow */}
        <div className={`absolute inset-0 pointer-events-none ${
          isDark 
            ? 'bg-gradient-to-br from-[#061F17] via-[#0B1321] to-[#12241F]' 
            : 'bg-gradient-to-br from-emerald-50 via-white to-amber-50/40'
        }`} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Traditional Roots & Global Export Credentials */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="flex items-center gap-2 text-xs font-semibold">
                <span className={`px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider ${
                  isDark ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/30' : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                }`}>
                  Worldwide Agricultural Distribution
                </span>
                <span className="text-slate-400">·</span>
                <span className={`text-[11px] font-mono ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
                  Origin: Kano Hub, Northern Nigeria
                </span>
              </div>

              <h1 className={`font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-[1.15] tracking-tight ${
                isDark ? 'text-white' : 'text-[#142B4A]'
              }`} style={{ textWrap: 'balance' }}>
                Connecting Nigerian Agro-Commodities with Global Markets
              </h1>

              <p className={`text-base sm:text-lg leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-[#4A5D75]'
              }`}>
                Fuldej Integrated Service Ltd operates at the commercial heart of Northern Nigeria’s agrarian belt. We aggregate, process, test, and ship premier agro-commodities—including natural white sesame seeds, dried hibiscus calyces, indigenous cowpeas, and non-GMO ancient grains—directly to international importers across Europe, Asia, and the Middle East.
              </p>

              {/* Key Trust Metrics */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className={`p-3.5 rounded-xl border ${
                  isDark ? 'bg-[#122238] border-slate-700/80' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <div className={`font-mono text-xl sm:text-2xl font-extrabold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                    99.0%
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Cleaned Export Purity
                  </div>
                </div>

                <div className={`p-3.5 rounded-xl border ${
                  isDark ? 'bg-[#122238] border-slate-700/80' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <div className={`font-mono text-xl sm:text-2xl font-extrabold ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                    5,000+ MT
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Seasonal Capacity
                  </div>
                </div>

                <div className={`p-3.5 rounded-xl border ${
                  isDark ? 'bg-[#122238] border-slate-700/80' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <div className={`font-mono text-xl sm:text-2xl font-extrabold ${isDark ? 'text-cyan-400' : 'text-[#168A78]'}`}>
                    FOB / CIF
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Global Shipping Terms
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onSelectCommodityForQuote('All Agro Commodities / Bulk Export')}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-[#168A78] hover:from-emerald-500 hover:to-[#199d89] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center gap-2"
                >
                  <Ship className="w-4 h-4" />
                  <span>Request Export Commodity Quote</span>
                </button>

                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className={`px-5 py-3 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${
                    isDark 
                      ? 'border-emerald-500/40 text-emerald-300 hover:bg-emerald-950/40' 
                      : 'border-emerald-600/30 text-emerald-800 hover:bg-emerald-50'
                  }`}
                >
                  <Play className="w-4 h-4 text-emerald-500" />
                  <span>Inspect Live Warehouse Video</span>
                </button>
              </div>

            </div>

            {/* Right Column: Warehouse Live Video Player & Inspection Widget */}
            <div className="lg:col-span-5">
              <div className={`relative rounded-2xl overflow-hidden border-2 shadow-2xl transition-all ${
                isDark ? 'bg-black border-emerald-500/30' : 'bg-slate-900 border-slate-300'
              }`}>
                
                {/* Authentic User Video Stream: Kano Bulk Export Warehouse Staging */}
                <div className="relative aspect-[4/3] bg-black overflow-hidden group">
                  <video
                    ref={warehouseVideoRef}
                    src="assets/aistudio/VID-20261024-WA0019_e81acd5c.mp4"
                    autoPlay
                    loop
                    muted={isWarehouseVideoMuted}
                    playsInline
                    className="w-full h-full object-cover filter brightness-[1.03] contrast-[1.05]"
                  />

                  {/* Gradient Overlay for Top/Bottom HUD Visibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

                  {/* Top HUD Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-auto">
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono font-bold text-emerald-400 border border-emerald-500/40">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Live Facility Recording
                    </span>

                    <button
                      onClick={() => setIsVideoModalOpen(true)}
                      className="p-1.5 rounded-lg bg-black/60 hover:bg-black/90 backdrop-blur-md text-white border border-white/20 transition-colors"
                      title="Inspect Fullscreen"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Bottom Controls Bar */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10 text-white">
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold font-heading flex items-center gap-1.5">
                        <Package className="w-3.5 h-3.5 text-amber-400" />
                        <span>Kano Export Staging Warehouse Yard</span>
                      </div>
                      <div className="text-[10px] text-slate-300 font-mono">
                        Consolidated 50kg/100kg Jute Sacks · Freight Dispatch
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={toggleVideoPlayback}
                        className="p-2 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-md text-white transition-colors"
                        title={isWarehouseVideoPlaying ? "Pause Video" : "Play Video"}
                      >
                        {isWarehouseVideoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={toggleVideoSound}
                        className="p-2 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-md text-white transition-colors"
                        title={isWarehouseVideoMuted ? "Unmute Sound" : "Mute Sound"}
                      >
                        {isWarehouseVideoMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Technical Warehouse Footnote */}
                <div className={`p-4 text-xs space-y-2 border-t ${
                  isDark ? 'bg-[#0E1A2C] border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}>
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="font-semibold text-emerald-500 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified Field Footage
                    </span>
                    <span className="text-slate-400">RC 7360949</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Captured on-site at Fuldej’s regional aggregation depot in Kano State. Showing bulk commodity stacks awaiting moisture calibration, fumigation, and FCL container loading.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= COMMODITY CATEGORY FILTER TABS ================= */}
      <section className={`py-6 border-b transition-colors ${
        isDark ? 'bg-[#070E1A] border-slate-800' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center gap-2">
              <span className={`text-xs font-mono font-bold uppercase tracking-wider ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Filter Products:
              </span>
            </div>

            {/* Clean Segmented Filter Bar (Anti-Slop Functional Tab Controls) */}
            <div className={`p-1 rounded-xl border flex flex-wrap items-center gap-1 text-xs font-semibold ${
              isDark ? 'bg-[#0B1321] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              {[
                { id: 'all', label: 'All Commodities (5)' },
                { id: 'oilseeds', label: 'Sesame Seeds' },
                { id: 'botanicals', label: 'Hibiscus Calyces' },
                { id: 'legumes', label: 'Cowpeas & Honey Beans' },
                { id: 'grains', label: 'Sorghum & Millet' },
                { id: 'warehousing', label: 'Consolidation & Hub' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-3.5 py-1.5 rounded-lg transition-all ${
                    activeCategory === tab.id
                      ? (isDark 
                          ? 'bg-emerald-600 text-white shadow-sm font-bold' 
                          : 'bg-[#168A78] text-white shadow-sm font-bold')
                      : (isDark 
                          ? 'text-slate-400 hover:text-white hover:bg-slate-800/60' 
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100')
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ================= COMMODITY CARDS SHOWCASE GRID ================= */}
      <section className={`py-14 sm:py-20 transition-colors ${
        isDark ? 'bg-[#0B1321]' : 'bg-[#FFFFFF]'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-3xl space-y-3">
            <span className={`font-mono text-xs font-bold uppercase tracking-wider ${
              isDark ? 'text-emerald-400' : 'text-[#168A78]'
            }`}>
              Export Grade Specifications
            </span>
            <h2 className={`font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl ${
              isDark ? 'text-white' : 'text-[#142B4A]'
            }`}>
              Featured Agro-Export Catalog
            </h2>
            <p className={`text-sm leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-[#5A6B82]'
            }`}>
              Click any commodity card or high-resolution photo to inspect physical grain quality, moisture test benchmarks, certified laboratory packaging, and export shipment specifications.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredCommodities.map((item) => (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col justify-between group ${
                  isDark
                    ? 'bg-[#122238] border-slate-700/80 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-950/20'
                    : 'bg-white border-slate-200 hover:border-[#168A78]/50 hover:shadow-xl'
                }`}
              >
                <div>
                  {/* Photo Display Strip with High Visual Clarity (Zero muddy filters) */}
                  <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden cursor-pointer"
                    onClick={() => setActiveLightboxImage(item.primaryImage)}
                  >
                    <img
                      src={item.primaryImage}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-[1.03] contrast-[1.05]"
                      loading="lazy"
                    />

                    {/* Gradient scrim for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                    {/* Category kicker & Grade Tag */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs">
                      <span className="font-mono text-[11px] font-bold px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-emerald-300 border border-emerald-500/30">
                        {item.categoryLabel}
                      </span>
                      <span className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white border border-white/20">
                        {item.grade}
                      </span>
                    </div>

                    {/* Image inspection hint */}
                    <div className="absolute bottom-3 right-3">
                      <span className="px-3 py-1.5 rounded-lg bg-black/70 hover:bg-black/90 backdrop-blur-md text-white text-[11px] font-semibold flex items-center gap-1.5 border border-white/20 transition-all shadow-md">
                        <ZoomIn className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Inspect High-Res Sample</span>
                      </span>
                    </div>

                    {/* Botanical name subtitle */}
                    {item.botanicalName && (
                      <div className="absolute bottom-3 left-3 text-xs text-slate-200 font-mono italic">
                        {item.botanicalName}
                      </div>
                    )}
                  </div>

                  {/* Thumbnail Row if Multiple Images Exist */}
                  {item.galleryImages.length > 1 && (
                    <div className={`p-2.5 flex items-center gap-2 border-b overflow-x-auto ${
                      isDark ? 'bg-[#0E1A2C] border-slate-800' : 'bg-slate-50 border-slate-100'
                    }`}>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider shrink-0 mr-1">
                        Gallery ({item.galleryImages.length}):
                      </span>
                      {item.galleryImages.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveLightboxImage(img)}
                          className="w-14 h-10 rounded-lg overflow-hidden border border-slate-400/40 hover:border-emerald-500 transition-transform hover:scale-105 shrink-0"
                          title="Click to view full photo"
                        >
                          <img
                            src={img}
                            alt={`${item.name} sample ${idx + 1}`}
                            className="w-full h-full object-cover filter brightness-[1.02] contrast-[1.04]"
                          />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Card Content & Details */}
                  <div className="p-6 space-y-5">
                    
                    <div>
                      <h3 className={`font-heading font-extrabold text-xl leading-snug transition-colors ${
                        isDark ? 'text-white group-hover:text-emerald-400' : 'text-[#142B4A] group-hover:text-[#168A78]'
                      }`}>
                        {item.name}
                      </h3>
                      <p className={`text-xs leading-relaxed mt-2 ${
                        isDark ? 'text-slate-300' : 'text-[#5A6B82]'
                      }`}>
                        {item.description}
                      </p>
                    </div>

                    {/* Technical Specification Table */}
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                        <Scale className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Laboratory & Export Parameters:</span>
                      </div>
                      
                      <div className={`grid grid-cols-2 gap-2 text-xs font-mono rounded-xl p-3 border ${
                        isDark ? 'bg-[#0E1A2C] border-slate-800' : 'bg-slate-50 border-slate-200'
                      }`}>
                        {item.specs.map((spec, sIdx) => (
                          <div key={sIdx} className="space-y-0.5">
                            <span className="text-[10px] text-slate-400 block">{spec.label}</span>
                            <span className={`font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                              {spec.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Origin & Packaging Information */}
                    <div className="space-y-2 text-xs">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                          <strong className="text-slate-400 font-medium">Sourcing Belt:</strong> {item.origin}
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Package className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                        <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                          <strong className="text-slate-400 font-medium">Packaging:</strong> {item.packaging}
                        </span>
                      </div>
                    </div>

                    {/* Export Highlights Checklist */}
                    <div className="space-y-1.5 pt-1">
                      {item.exportHighlights.map((hl, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2 text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>{hl}</span>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>

                {/* Card Action Footer */}
                <div className={`p-6 pt-0 border-t mt-4 flex flex-wrap items-center justify-between gap-3 ${
                  isDark ? 'border-slate-800' : 'border-slate-100'
                }`}>
                  <button
                    onClick={() => onSelectCommodityForQuote(item.name)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#168A78] hover:bg-[#127163] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95"
                  >
                    <span>Request Quotation (RFQ)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setSelectedCommodity(item)}
                    className={`w-full sm:w-auto px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                      isDark
                        ? 'border-slate-700 hover:border-emerald-500 text-slate-300 hover:text-white'
                        : 'border-slate-300 hover:border-[#142B4A] text-slate-700 hover:text-[#142B4A]'
                    }`}
                  >
                    <span>View Full Specs Dossier</span>
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= INTERNATIONAL EXPORT PROTOCOLS & LOGISTICS STRIP ================= */}
      <section className={`py-14 sm:py-18 border-y transition-colors ${
        isDark ? 'bg-[#0E1A2C] border-slate-800' : 'bg-[#F8FAFC] border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className={`font-mono text-xs font-bold uppercase tracking-wider ${
              isDark ? 'text-cyan-400' : 'text-[#168A78]'
            }`}>
              Global Trade Architecture
            </span>
            <h2 className={`font-heading font-extrabold text-2xl sm:text-3xl ${
              isDark ? 'text-white' : 'text-[#142B4A]'
            }`}>
              Standard Export & Distribution Framework
            </h2>
            <p className={`text-xs sm:text-sm ${
              isDark ? 'text-slate-300' : 'text-[#5A6B82]'
            }`}>
              Fuldej adheres to international trade standards governed by the Nigerian Export Promotion Council (NEPC) and global maritime chambers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className={`p-5 rounded-xl border space-y-3 ${
              isDark ? 'bg-[#132238] border-slate-700/80' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                <FileCheck className="w-5 h-5" />
              </div>
              <h4 className={`font-heading font-bold text-base ${isDark ? 'text-white' : 'text-[#142B4A]'}`}>
                NEPC & NAQS Certified
              </h4>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-[#5A6B82]'}`}>
                Full statutory documentation including Form NXP, Nigerian Export Promotion Council registration, NAQS Phytosanitary Certificate, and Certificate of Origin.
              </p>
            </div>

            <div className={`p-5 rounded-xl border space-y-3 ${
              isDark ? 'bg-[#132238] border-slate-700/80' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-500">
                <Ship className="w-5 h-5" />
              </div>
              <h4 className={`font-heading font-bold text-base ${isDark ? 'text-white' : 'text-[#142B4A]'}`}>
                Flexible Incoterms
              </h4>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-[#5A6B82]'}`}>
                We structure delivery under FOB (Apapa or Tin Can Island Ports, Lagos) or CIF (Cost, Insurance & Freight) to European, Middle Eastern, and Asian destinations.
              </p>
            </div>

            <div className={`p-5 rounded-xl border space-y-3 ${
              isDark ? 'bg-[#132238] border-slate-700/80' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                <Scale className="w-5 h-5" />
              </div>
              <h4 className={`font-heading font-bold text-base ${isDark ? 'text-white' : 'text-[#142B4A]'}`}>
                Third-Party Pre-Shipment
              </h4>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-[#5A6B82]'}`}>
                Inspection by reputable international surveyors including SGS, Bureau Veritas, or Cotecna for independent moisture, purity, and container seal validation.
              </p>
            </div>

            <div className={`p-5 rounded-xl border space-y-3 ${
              isDark ? 'bg-[#132238] border-slate-700/80' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-500">
                <Truck className="w-5 h-5" />
              </div>
              <h4 className={`font-heading font-bold text-base ${isDark ? 'text-white' : 'text-[#142B4A]'}`}>
                Kano Consolidation Depot
              </h4>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-[#5A6B82]'}`}>
                Strategic proximity to Dawanau International Grains Market and direct access to heavy freight corridors, expediting turnaround time for bulk vessel contracts.
              </p>
            </div>

          </div>

          {/* Quick Contact & Dispatch Band */}
          <div className={`rounded-2xl p-6 sm:p-8 border flex flex-col md:flex-row items-center justify-between gap-6 ${
            isDark ? 'bg-[#132238] border-slate-700' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="space-y-1 text-center md:text-left">
              <h3 className={`font-heading font-bold text-lg sm:text-xl ${isDark ? 'text-white' : 'text-[#142B4A]'}`}>
                Require Physical Export Samples or Direct Container Booking?
              </h3>
              <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Our agricultural export desk dispatches DHL/FedEx lab samples and provides formal FOB/CIF proforma quotations within 24 hours.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="https://wa.me/2349030986923?text=Hello%20Fuldej%20Agro-Export%20Directorate,%20I%20would%20like%20to%20inquire%20about%20ordering%20agricultural%20commodities%20(Sesame%20Seeds,%20Hibiscus,%20Beans,%20or%20Grains)%20for%20export."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-md active:scale-95"
              >
                <Phone className="w-4 h-4" />
                <span>WhatsApp Export Desk</span>
              </a>

              <button
                onClick={() => onSelectCommodityForQuote('Commercial Agro-Commodities Export Inquiry')}
                className="px-5 py-2.5 rounded-xl bg-[#168A78] hover:bg-[#127163] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-md active:scale-95"
              >
                <Mail className="w-4 h-4" />
                <span>Submit Formal Inquiry</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ================= HIGH-RESOLUTION IMAGE LIGHTBOX MODAL ================= */}
      {activeLightboxImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-5xl w-full max-h-[92vh] flex flex-col items-center">
            
            {/* Top Toolbar */}
            <div className="w-full flex items-center justify-between text-white pb-3 px-2">
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Fuldej Official Commodity Inspection · High Clarity Asset</span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={activeLightboxImage}
                  download="fuldej_agricultural_commodity_sample.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  title="Download full quality image"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Photo</span>
                </a>

                <button
                  onClick={() => setActiveLightboxImage(null)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                  title="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Crisp, Crystal-Clear Image Container */}
            <div className="relative max-h-[82vh] overflow-hidden rounded-xl border border-white/20 shadow-2xl bg-black flex items-center justify-center">
              <img
                src={activeLightboxImage}
                alt="Enlarged agricultural sample"
                className="max-h-[82vh] w-auto max-w-full object-contain filter brightness-[1.03] contrast-[1.05]"
              />
            </div>

          </div>
        </div>
      )}

      {/* ================= FULLSCREEN WAREHOUSE VIDEO INSPECTION MODAL ================= */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full flex flex-col items-center">
            
            {/* Modal Header */}
            <div className="w-full flex items-center justify-between text-white pb-3 px-2">
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-bold text-emerald-400">Fuldej Agro-Logistics Yard & Warehouse Inspection</span>
              </div>

              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Close Inspection Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player */}
            <div className="w-full aspect-video rounded-2xl overflow-hidden border border-white/20 bg-black shadow-2xl relative">
              <video
                src="assets/aistudio/VID-20261024-WA0019_e81acd5c.mp4"
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain filter brightness-[1.04] contrast-[1.06]"
              />
            </div>

            {/* Video Technical Specs Footer */}
            <div className="w-full mt-4 p-4 rounded-xl bg-slate-900 border border-white/10 text-slate-300 text-xs space-y-2">
              <div className="flex items-center justify-between font-mono">
                <span className="text-emerald-400 font-bold">Facility: Kano Agro-Commodity Consolidation Depot</span>
                <span className="text-slate-400">Operating Entity: Fuldej Integrated Service Ltd</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-400">
                Demonstrates high-volume outdoor bagging, jute sack stacking (50kg/100kg grain units), quality segregation, and cargo staging ready for containerization and intermodal transit to Lagos maritime seaports.
              </p>
            </div>

          </div>
        </div>
      )}

      {/* ================= COMMODITY DOSSIER MODAL ================= */}
      {selectedCommodity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className={`relative max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-2xl p-6 sm:p-8 border shadow-2xl space-y-6 ${
            isDark ? 'bg-[#0E1A2C] border-slate-700 text-white' : 'bg-white border-slate-200 text-[#142B4A]'
          }`}>
            
            <div className="flex items-start justify-between gap-4 border-b pb-4 dark:border-slate-800">
              <div>
                <span className="font-mono text-xs font-bold text-emerald-500 uppercase tracking-wider block">
                  {selectedCommodity.categoryLabel}
                </span>
                <h3 className="font-heading font-extrabold text-2xl mt-1">
                  {selectedCommodity.name}
                </h3>
                {selectedCommodity.botanicalName && (
                  <p className="font-mono text-xs italic text-slate-400 mt-0.5">
                    {selectedCommodity.botanicalName} · {selectedCommodity.grade}
                  </p>
                )}
              </div>

              <button
                onClick={() => setSelectedCommodity(null)}
                className="p-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Big Preview Photo */}
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-black border border-slate-700">
              <img
                src={selectedCommodity.primaryImage}
                alt={selectedCommodity.name}
                className="w-full h-full object-cover filter brightness-[1.03] contrast-[1.05]"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-slate-400">
                Product Specification & Export Profile
              </h4>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {selectedCommodity.description}
              </p>
            </div>

            {/* Specs Table */}
            <div className="space-y-2">
              <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-slate-400">
                Certified Contract Tolerances
              </h4>
              <div className={`grid grid-cols-2 gap-2 text-xs font-mono rounded-xl p-3 border ${
                isDark ? 'bg-[#132238] border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}>
                {selectedCommodity.specs.map((spec, sIdx) => (
                  <div key={sIdx} className="space-y-0.5">
                    <span className="text-[10px] text-slate-400 block">{spec.label}</span>
                    <span className="font-semibold text-emerald-400 dark:text-emerald-300">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sourcing & Volume */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className={`p-3 rounded-xl border ${
                isDark ? 'bg-[#132238] border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className="text-[10px] text-slate-400 block font-mono">Origin / Agro Belt:</span>
                <span className="font-semibold">{selectedCommodity.origin}</span>
              </div>
              <div className={`p-3 rounded-xl border ${
                isDark ? 'bg-[#132238] border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className="text-[10px] text-slate-400 block font-mono">Seasonal Supply Capacity:</span>
                <span className="font-semibold text-amber-500">{selectedCommodity.annualVolume}</span>
              </div>
            </div>

            {/* Packaging */}
            <div className={`p-3 rounded-xl border text-xs ${
              isDark ? 'bg-[#132238] border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className="text-[10px] text-slate-400 block font-mono">Export Packaging:</span>
              <span className="font-semibold">{selectedCommodity.packaging}</span>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-wrap items-center justify-end gap-3 border-t dark:border-slate-800">
              <button
                onClick={() => {
                  const targetName = selectedCommodity.name;
                  setSelectedCommodity(null);
                  onSelectCommodityForQuote(targetName);
                }}
                className="px-6 py-2.5 rounded-xl bg-[#168A78] hover:bg-[#127163] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow"
              >
                <span>Request Formal Quotation for this Commodity</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
