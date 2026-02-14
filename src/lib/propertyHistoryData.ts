// Property History Data — ownership timelines, historical facts, and area context

export type OwnerType =
  | 'Individual'
  | 'Government'
  | 'Corporation'
  | 'Trust'
  | 'Royal Estate'
  | 'Community';

export type TransferMethod =
  | 'Government Allotment'
  | 'Direct Sale'
  | 'Auction'
  | 'Inheritance'
  | 'Land Reform'
  | 'Corporate Acquisition'
  | 'Court Order'
  | 'Crown Grant'
  | 'Municipal Transfer';

export interface OwnershipRecord {
  id: string;
  ownerName: string;
  ownerType: OwnerType;
  acquiredDate: string;
  transferDate: string;
  acquiredPrice: number;
  transferPrice: number;
  transferMethod: TransferMethod;
  description: string;
  image: string;
}

export interface HistoricalFact {
  year: string;
  title: string;
  description: string;
  category: 'landmark' | 'event' | 'development' | 'culture' | 'infrastructure';
}

export interface LandUseEntry {
  period: string;
  use: string;
  color: string;
}

export interface PropertyHistoryData {
  propertyId: string;
  tagline: string;
  heroImage: string;
  ownershipTimeline: OwnershipRecord[];
  historicalFacts: HistoricalFact[];
  areaHistory: string;
  areaHistoryPullQuote: string;
  landUseEvolution: LandUseEntry[];
}

// ---------------------------------------------------------------------------
// D1 — CIDCO Residential Parcel, Sanpada, Navi Mumbai
// ---------------------------------------------------------------------------
const D1History: PropertyHistoryData = {
  propertyId: 'D1',
  tagline: 'From colonial marshland to India\'s most planned city',
  heroImage: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1600',
  ownershipTimeline: [
    {
      id: 'D1-O1',
      ownerName: 'Bombay Presidency (British Crown)',
      ownerType: 'Government',
      acquiredDate: 'Pre-1850',
      transferDate: 'August 1947',
      acquiredPrice: 0,
      transferPrice: 0,
      transferMethod: 'Crown Grant',
      description: 'Under British colonial rule, the swampy creek lands east of Bombay Island were classified as Crown territory. The marshes of what would become Navi Mumbai were considered uninhabitable — used only by local fishing communities for seasonal catches in the Thane Creek.',
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800',
    },
    {
      id: 'D1-O2',
      ownerName: 'Government of Maharashtra',
      ownerType: 'Government',
      acquiredDate: 'August 1947',
      transferDate: 'March 1971',
      acquiredPrice: 0,
      transferPrice: 0,
      transferMethod: 'Government Allotment',
      description: 'Post-independence, the land became state property under the Government of Maharashtra. As Bombay\'s population surged past 4 million in the 1960s, urban planners began eyeing the eastern mainland for a radical solution — an entirely new twin city.',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800',
    },
    {
      id: 'D1-O3',
      ownerName: 'CIDCO',
      ownerType: 'Corporation',
      acquiredDate: 'March 1971',
      transferDate: 'January 2025',
      acquiredPrice: 0,
      transferPrice: 14000000,
      transferMethod: 'Government Allotment',
      description: 'The City and Industrial Development Corporation was established in 1970 specifically to build Navi Mumbai. Sector 18 in Sanpada was developed as a premium residential zone with planned infrastructure, wide roads, and proximity to the Vashi railway bridge. CIDCO held this parcel for over 50 years as part of its phased development strategy.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    },
    {
      id: 'D1-O4',
      ownerName: 'PropHit SPV (Current)',
      ownerType: 'Corporation',
      acquiredDate: 'January 2025',
      transferDate: 'Present',
      acquiredPrice: 14000000,
      transferPrice: 0,
      transferMethod: 'Government Allotment',
      description: 'Acquired through CIDCO\'s transparent e-auction process. The parcel is now held under a Special Purpose Vehicle for fractional participation, enabling retail investors to own a piece of one of India\'s most meticulously planned urban corridors.',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
    },
  ],
  historicalFacts: [
    { year: '1672', title: 'Portuguese Trading Post', description: 'The first European trading post was established near the Thane creek, just north of modern-day Sanpada, for spice and textile trade.', category: 'landmark' },
    { year: '1971', title: 'Navi Mumbai Conceived', description: 'Architects Charles Correa, Shirish Patel, and Pravina Mehta presented the plan for New Bombay to decongest the island city.', category: 'development' },
    { year: '1998', title: 'Palm Beach Road Opens', description: 'The arterial 6-lane road connecting Vashi to Belapur transformed Sanpada into a premium connectivity hub overnight.', category: 'infrastructure' },
    { year: '2014', title: 'Metro Line Approved', description: 'Navi Mumbai Metro Line 1 approval connected Sanpada to the rapid transit network, boosting land values by 40%.', category: 'infrastructure' },
    { year: '2020', title: 'International Airport Announced', description: 'The Navi Mumbai International Airport (NMIA) at Ulwe brought global connectivity within 20km of this parcel.', category: 'development' },
  ],
  areaHistory: 'Sanpada sits at the heart of Navi Mumbai, a city born from one of the most ambitious urban planning experiments in post-independence India. When the Correa-Patel-Mehta trio proposed the twin city concept in 1965, few believed that the marshy eastern mainland could rival Bombay. Yet five decades later, Navi Mumbai stands as proof that visionary planning can create livable, prosperous urban centers from scratch.\n\nThe Sanpada node specifically benefited from its position between the Vashi and Sion-Panvel arterial corridors. The Palm Beach Road, completed in 1998, transformed it into a premium address. Today, with the upcoming Navi Mumbai Metro and proximity to the international airport, Sanpada has evolved from planned township to aspirational urban destination.',
  areaHistoryPullQuote: 'What was once marshland at the edge of a colonial port is now one of India\'s most meticulously planned urban corridors.',
  landUseEvolution: [
    { period: 'Pre-1947', use: 'Marshland & Creek', color: 'bg-gold-dark/30' },
    { period: '1947–1971', use: 'State Reserve', color: 'bg-gold-dark/50' },
    { period: '1971–1998', use: 'CIDCO Dev Zone', color: 'bg-gold/50' },
    { period: '1998–Present', use: 'Premium Residential', color: 'bg-gold/80' },
  ],
};

// ---------------------------------------------------------------------------
// D2 — Noida Authority Industrial Plot, Sector 96
// ---------------------------------------------------------------------------
const D2History: PropertyHistoryData = {
  propertyId: 'D2',
  tagline: 'Where agricultural plains became India\'s industrial powerhouse',
  heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600',
  ownershipTimeline: [
    {
      id: 'D2-O1',
      ownerName: 'Zamindari Landholders',
      ownerType: 'Individual',
      acquiredDate: 'Pre-1900',
      transferDate: 'March 1952',
      acquiredPrice: 0,
      transferPrice: 0,
      transferMethod: 'Land Reform',
      description: 'For centuries, the fertile plains of western Uttar Pradesh were held under the zamindari system. Local landlords controlled vast agricultural tracts, with tenant farmers cultivating wheat, sugarcane, and mustard across what is now Sector 96.',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
    },
    {
      id: 'D2-O2',
      ownerName: 'Government of Uttar Pradesh',
      ownerType: 'Government',
      acquiredDate: 'March 1952',
      transferDate: 'April 1976',
      acquiredPrice: 0,
      transferPrice: 0,
      transferMethod: 'Land Reform',
      description: 'The UP Zamindari Abolition Act of 1951 transferred feudal landholdings to the state. For 24 years, this land remained classified as agricultural reserve, part of the vast Gangetic plain that stretched uninterrupted from Delhi to Agra.',
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800',
    },
    {
      id: 'D2-O3',
      ownerName: 'New Okhla Industrial Development Authority',
      ownerType: 'Government',
      acquiredDate: 'April 1976',
      transferDate: 'June 2026',
      acquiredPrice: 0,
      transferPrice: 120000000,
      transferMethod: 'Government Allotment',
      description: 'NOIDA was established in 1976 to create a planned industrial township adjacent to Delhi. Sector 96 was designated as an industrial zone, part of the authority\'s vision to build a self-sufficient satellite city. The sector was developed with wide arterial roads, utility corridors, and proximity to the Noida-Greater Noida Expressway.',
      image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800',
    },
    {
      id: 'D2-O4',
      ownerName: 'PropHit SPV (Current)',
      ownerType: 'Corporation',
      acquiredDate: 'June 2026',
      transferDate: 'Present',
      acquiredPrice: 120000000,
      transferPrice: 0,
      transferMethod: 'Auction',
      description: 'Acquired through NOIDA Authority\'s transparent e-auction portal. The 5,000 sqm industrial plot is positioned along the Noida-Greater Noida Expressway, one of India\'s most dynamic logistics corridors with over 200% growth in warehouse demand since 2020.',
      image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800',
    },
  ],
  historicalFacts: [
    { year: '1596', title: 'Mughal Revenue Records', description: 'The earliest revenue records for this region come from Akbar\'s Ain-i-Akbari, listing it as productive agricultural land yielding wheat and indigo.', category: 'landmark' },
    { year: '1976', title: 'NOIDA Founded', description: 'The New Okhla Industrial Development Authority was established with a mandate to build India\'s first fully planned industrial township.', category: 'development' },
    { year: '2001', title: 'IT Boom Arrives', description: 'Sector 62-63 IT parks attracted global tech firms, transforming Noida from an industrial zone to a tech hub virtually overnight.', category: 'event' },
    { year: '2019', title: 'Expressway Connectivity', description: 'The Yamuna Expressway and Eastern Peripheral Expressway gave Sector 96 direct connectivity to 5 major highways.', category: 'infrastructure' },
  ],
  areaHistory: 'Noida\'s transformation from flat agricultural plains to India\'s industrial and IT powerhouse is one of modern India\'s most remarkable urban stories. When the authority was created in 1976, the area was dotted with mustard fields and sugarcane plantations. The first industrial plots attracted small manufacturers who relocated from congested Old Delhi.\n\nBy the 2000s, the IT boom had completely rewritten Noida\'s identity. Today, Sector 96 sits at the convergence of three expressways, making it one of the most connected industrial locations in the National Capital Region. The sector\'s proximity to the Jewar International Airport (under construction) is expected to catalyze another wave of industrial demand.',
  areaHistoryPullQuote: 'From Mughal-era farmland to expressway-connected industrial hub — Noida\'s 50-year transformation rivals any global city.',
  landUseEvolution: [
    { period: 'Pre-1952', use: 'Zamindari Farmland', color: 'bg-gold-dark/30' },
    { period: '1952–1976', use: 'State Agriculture', color: 'bg-gold-dark/50' },
    { period: '1976–2001', use: 'Industrial Township', color: 'bg-gold/50' },
    { period: '2001–Present', use: 'IT & Logistics Hub', color: 'bg-gold/80' },
  ],
};

// ---------------------------------------------------------------------------
// D3 — HLPP Developed Parcel, Peri-Delhi (Haryana Belt)
// ---------------------------------------------------------------------------
const D3History: PropertyHistoryData = {
  propertyId: 'D3',
  tagline: 'Ancient crossroads reborn through India\'s largest land pooling experiment',
  heroImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600',
  ownershipTimeline: [
    {
      id: 'D3-O1',
      ownerName: 'Village Panchayat (Community Grazing Land)',
      ownerType: 'Community',
      acquiredDate: 'Pre-1800',
      transferDate: 'November 1966',
      acquiredPrice: 0,
      transferPrice: 0,
      transferMethod: 'Land Reform',
      description: 'For centuries, the land on Delhi\'s southwestern fringe served as communal grazing ground for surrounding villages. The area was part of the ancient trade route connecting Delhi to Jaipur, with caravans stopping at local serais.',
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800',
    },
    {
      id: 'D3-O2',
      ownerName: 'Government of Haryana',
      ownerType: 'Government',
      acquiredDate: 'November 1966',
      transferDate: 'August 2020',
      acquiredPrice: 0,
      transferPrice: 0,
      transferMethod: 'Government Allotment',
      description: 'When Haryana was carved out of Punjab in 1966, community lands were reclassified under state revenue records. For decades, the peri-Delhi belt remained agricultural, even as Gurgaon to the south began its dramatic transformation into a corporate hub.',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800',
    },
    {
      id: 'D3-O3',
      ownerName: 'Haryana Land Pooling Policy (HLPP)',
      ownerType: 'Government',
      acquiredDate: 'August 2020',
      transferDate: 'December 2024',
      acquiredPrice: 0,
      transferPrice: 7500000,
      transferMethod: 'Government Allotment',
      description: 'Under the Haryana Land Pooling Policy, farmers voluntarily contributed agricultural land in exchange for developed residential plots. The LEC (Land Entitlement Certificate) system ensured transparent allocation, converting 225 sqm of raw land into a serviced residential plot with roads, sewage, and electricity.',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800',
    },
    {
      id: 'D3-O4',
      ownerName: 'PropHit SPV (Current)',
      ownerType: 'Corporation',
      acquiredDate: 'December 2024',
      transferDate: 'Present',
      acquiredPrice: 7500000,
      transferPrice: 0,
      transferMethod: 'Direct Sale',
      description: 'Acquired via direct sale from an HLPP allottee. The plot comes with a verified Land Entitlement Certificate, transferable under HLPP rules. Positioned in the rapidly developing Haryana Belt, it offers proximity to the Dwarka Expressway and upcoming metro extensions.',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
    },
  ],
  historicalFacts: [
    { year: '1398', title: 'Timur\'s March Through Delhi', description: 'Historical accounts place Timur\'s encampment on the southwestern plains of Delhi — the very belt where this parcel now sits.', category: 'event' },
    { year: '1966', title: 'Haryana Formed', description: 'The state of Haryana was carved from Punjab on November 1, 1966, bringing these lands under new administrative control.', category: 'event' },
    { year: '2013', title: 'Dwarka Expressway Approved', description: 'The 29km Dwarka Expressway connecting Delhi to Gurgaon transformed the peri-Delhi belt from rural backwater to real estate hotspot.', category: 'infrastructure' },
    { year: '2020', title: 'HLPP Launched', description: 'Haryana\'s Land Pooling Policy gave farmers a stake in urbanization, creating one of India\'s largest voluntary land aggregation experiments.', category: 'development' },
  ],
  areaHistory: 'The Haryana Belt south-west of Delhi has been a frontier zone for millennia. From Mughal-era trade routes to British cantonment boundaries, this land has always marked the edge between metropolitan Delhi and the agrarian heartland. For centuries, it was defined by its role as a transit corridor — not a destination.\n\nThat changed dramatically in the 2010s. The Dwarka Expressway, combined with metro expansion and the Haryana Land Pooling Policy, created an entirely new urban frontier. Young professionals priced out of Gurgaon and Delhi now see this belt as their entry point into homeownership, driving demand that has pushed land prices up 31% in just two years.',
  areaHistoryPullQuote: 'Where Mughal caravans once rested, a new urban frontier rises — powered by India\'s most innovative land pooling policy.',
  landUseEvolution: [
    { period: 'Pre-1966', use: 'Community Grazing', color: 'bg-gold-dark/30' },
    { period: '1966–2013', use: 'Agricultural Reserve', color: 'bg-gold-dark/50' },
    { period: '2013–2020', use: 'Development Zone', color: 'bg-gold/50' },
    { period: '2020–Present', use: 'HLPP Residential', color: 'bg-gold/80' },
  ],
};

// ---------------------------------------------------------------------------
// D4 — DMIC Industrial Township Parcel
// ---------------------------------------------------------------------------
const D4History: PropertyHistoryData = {
  propertyId: 'D4',
  tagline: 'India\'s trillion-dollar industrial corridor takes shape',
  heroImage: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1600',
  ownershipTimeline: [
    {
      id: 'D4-O1',
      ownerName: 'Princely State of Rajputana',
      ownerType: 'Royal Estate',
      acquiredDate: 'Pre-1818',
      transferDate: 'November 1949',
      acquiredPrice: 0,
      transferPrice: 0,
      transferMethod: 'Crown Grant',
      description: 'The arid lands of the DMIC corridor were part of the princely states of Rajputana. Under the paramountcy system, British suzerainty allowed local rulers to maintain nominal control over vast desert tracts used primarily for grazing and seasonal cultivation.',
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800',
    },
    {
      id: 'D4-O2',
      ownerName: 'Government of India',
      ownerType: 'Government',
      acquiredDate: 'November 1949',
      transferDate: 'September 2007',
      acquiredPrice: 0,
      transferPrice: 0,
      transferMethod: 'Land Reform',
      description: 'Post-independence integration of princely states brought these lands under federal control. For nearly six decades, the region remained sparsely developed — classified as wasteland in revenue records, with occasional attempts at canal irrigation from the Indira Gandhi Canal project.',
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800',
    },
    {
      id: 'D4-O3',
      ownerName: 'NICDC (National Industrial Corridor Development Corporation)',
      ownerType: 'Corporation',
      acquiredDate: 'September 2007',
      transferDate: 'March 2025',
      acquiredPrice: 0,
      transferPrice: 280000000,
      transferMethod: 'Government Allotment',
      description: 'The Delhi-Mumbai Industrial Corridor project, backed by Japanese JICA funding, identified this node as a key industrial township site. NICDC developed trunk infrastructure — roads, power, water treatment — transforming barren land into shovel-ready industrial parcels over a 15-year development cycle.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    },
    {
      id: 'D4-O4',
      ownerName: 'PropHit SPV (Current)',
      ownerType: 'Corporation',
      acquiredDate: 'March 2025',
      transferDate: 'Present',
      acquiredPrice: 280000000,
      transferPrice: 0,
      transferMethod: 'Auction',
      description: 'Acquired through NICDC\'s competitive tender process, this 10,000 sqm industrial parcel is positioned for warehouse and logistics anchor tenants. The DMIC corridor, when fully operational, is projected to contribute $100 billion to India\'s GDP.',
      image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800',
    },
  ],
  historicalFacts: [
    { year: '1858', title: 'Railway Survey Route', description: 'British engineers surveyed this very corridor for the Great Indian Peninsula Railway — the same alignment now used by the Dedicated Freight Corridor.', category: 'infrastructure' },
    { year: '2007', title: 'DMIC Announced', description: 'PM Manmohan Singh and Japanese PM Abe jointly announced the $100B Delhi-Mumbai Industrial Corridor, the largest infrastructure project in Indian history.', category: 'development' },
    { year: '2019', title: 'Dedicated Freight Corridor', description: 'The Western DFC reached this node, enabling 100km/h freight trains that cut logistics costs by 40% compared to road transport.', category: 'infrastructure' },
    { year: '2023', title: 'First Anchor Tenant', description: 'A major Japanese automotive manufacturer signed the first anchor lease in the adjacent township, validating the corridor\'s industrial potential.', category: 'event' },
  ],
  areaHistory: 'The DMIC corridor represents India\'s most ambitious attempt to replicate the manufacturing-led growth models of Japan, South Korea, and China. Stretching 1,504 km from Delhi to Mumbai, it follows the alignment of the Dedicated Freight Corridor — itself tracing routes first surveyed by British railway engineers in the 1850s.\n\nThis particular node sits in the Rajasthan segment, where desert conditions initially deterred development. But the combination of Japanese funding, federal land acquisition powers, and the DFC\'s transformative logistics capabilities have created an industrial ecosystem from scratch. Early tenants report 40% lower logistics costs compared to traditional industrial estates.',
  areaHistoryPullQuote: 'A century-old railway survey line became the backbone of India\'s most ambitious industrial transformation.',
  landUseEvolution: [
    { period: 'Pre-1949', use: 'Princely Estate', color: 'bg-gold-dark/30' },
    { period: '1949–2007', use: 'Barren / Wasteland', color: 'bg-gold-dark/40' },
    { period: '2007–2020', use: 'DMIC Development', color: 'bg-gold/50' },
    { period: '2020–Present', use: 'Industrial Township', color: 'bg-gold/80' },
  ],
};

// ---------------------------------------------------------------------------
// D5 — Developer Buyback Plot, Surat, Varachha
// ---------------------------------------------------------------------------
const D5History: PropertyHistoryData = {
  propertyId: 'D5',
  tagline: 'The diamond city\'s newest residential frontier',
  heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600',
  ownershipTimeline: [
    {
      id: 'D5-O1',
      ownerName: 'Surat Sultanate (Revenue Land)',
      ownerType: 'Government',
      acquiredDate: 'Pre-1600',
      transferDate: 'February 1759',
      acquiredPrice: 0,
      transferPrice: 0,
      transferMethod: 'Crown Grant',
      description: 'Surat was one of the wealthiest cities in the Mughal Empire, serving as the primary port for Hajj pilgrimages and European trade. The lands east of the old city walls — including modern Varachha — were agricultural plots feeding the port city\'s massive population.',
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800',
    },
    {
      id: 'D5-O2',
      ownerName: 'Desai Family (Agricultural Holding)',
      ownerType: 'Individual',
      acquiredDate: 'February 1759',
      transferDate: 'January 1998',
      acquiredPrice: 0,
      transferPrice: 450000,
      transferMethod: 'Inheritance',
      description: 'After the Maratha conquest of Surat, local desai families were granted revenue collection rights over surrounding farmland. The Varachha tract was passed down through seven generations, remaining agricultural even as Surat grew into India\'s diamond-cutting capital in the 1980s.',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
    },
    {
      id: 'D5-O3',
      ownerName: 'Acuity Homes Pvt Ltd',
      ownerType: 'Corporation',
      acquiredDate: 'January 1998',
      transferDate: 'September 2026',
      acquiredPrice: 450000,
      transferPrice: 4800000,
      transferMethod: 'Direct Sale',
      description: 'Acuity Homes acquired the agricultural plot and obtained NA (Non-Agricultural) conversion. The developer planned a gated township with 150 plots, securing RERA registration and establishing a buyback escrow mechanism with ABC Bank as a confidence-building measure for early buyers.',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800',
    },
    {
      id: 'D5-O4',
      ownerName: 'PropHit SPV (Current)',
      ownerType: 'Corporation',
      acquiredDate: 'September 2026',
      transferDate: 'Present',
      acquiredPrice: 4800000,
      transferPrice: 0,
      transferMethod: 'Corporate Acquisition',
      description: 'Acquired under Acuity Homes\' 24-month developer buyback program with escrow confirmation at ABC Bank. The fractional ownership model allows investors to participate in Surat\'s residential boom — a city projected to become India\'s first diamond-funded smart city.',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
    },
  ],
  historicalFacts: [
    { year: '1573', title: 'Mughal Port City', description: 'Akbar conquered Surat and designated it the empire\'s premier maritime port — ships carried textiles, spices, and indigo to the world.', category: 'landmark' },
    { year: '1612', title: 'First British Factory', description: 'The East India Company established its first factory in Surat, marking the beginning of British commercial presence in India.', category: 'event' },
    { year: '1980', title: 'Diamond Capital Born', description: 'Surat emerged as the world\'s diamond cutting and polishing capital, processing 90% of the world\'s diamonds by value.', category: 'culture' },
    { year: '2022', title: 'Surat Diamond Bourse', description: 'The world\'s largest office building (6.7M sqft) opened as the Surat Diamond Bourse, solidifying the city\'s global status.', category: 'development' },
  ],
  areaHistory: 'Surat\'s story is one of constant reinvention. From Mughal maritime capital to British trading post, from plague-devastated city in 1994 to one of India\'s cleanest and fastest-growing metros — the city defies its own past at every turn. Varachha, specifically, represents Surat\'s newest chapter: a residential expansion zone absorbing the workforce that powers the city\'s diamond, textile, and IT industries.\n\nThe neighborhood\'s transformation from agricultural land to organized residential township mirrors Surat\'s own evolution. Where diamond polishing workshops once operated from converted homes, planned gated communities now offer modern amenities. The city\'s per-capita income — among the highest in India — ensures sustained residential demand.',
  areaHistoryPullQuote: 'In the city that polishes 90% of the world\'s diamonds, even the land has been transformed from rough to refined.',
  landUseEvolution: [
    { period: 'Pre-1759', use: 'Sultanate Farmland', color: 'bg-gold-dark/30' },
    { period: '1759–1998', use: 'Agricultural Holding', color: 'bg-gold-dark/50' },
    { period: '1998–2020', use: 'NA Conversion Zone', color: 'bg-gold/50' },
    { period: '2020–Present', use: 'Gated Township', color: 'bg-gold/80' },
  ],
};

// ---------------------------------------------------------------------------
// D6 — Municipal Auction Commercial Plot, Panchkula
// ---------------------------------------------------------------------------
const D6History: PropertyHistoryData = {
  propertyId: 'D6',
  tagline: 'Chandigarh\'s quiet neighbor becomes its commercial twin',
  heroImage: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=1600',
  ownershipTimeline: [
    {
      id: 'D6-O1',
      ownerName: 'Punjab Province (British India)',
      ownerType: 'Government',
      acquiredDate: 'Pre-1947',
      transferDate: 'August 1947',
      acquiredPrice: 0,
      transferPrice: 0,
      transferMethod: 'Crown Grant',
      description: 'The foothills of the Shivalik range, where Panchkula now stands, were forested crown land under British Punjab. The area served as a buffer zone between the plains of Ambala and the Himalayan foothills, with scattered settlements of Gujar pastoralists.',
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800',
    },
    {
      id: 'D6-O2',
      ownerName: 'Government of Punjab / Haryana',
      ownerType: 'Government',
      acquiredDate: 'August 1947',
      transferDate: 'March 1995',
      acquiredPrice: 0,
      transferPrice: 0,
      transferMethod: 'Government Allotment',
      description: 'Post-partition, the area fell under Punjab state. When Haryana was formed in 1966, Panchkula was designated as its future administrative headquarters. Le Corbusier\'s Chandigarh next door inspired a planned-city approach, with wide sectors and green belts mimicking the modernist capital.',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800',
    },
    {
      id: 'D6-O3',
      ownerName: 'Panchkula Municipal Corporation',
      ownerType: 'Government',
      acquiredDate: 'March 1995',
      transferDate: 'November 2025',
      acquiredPrice: 0,
      transferPrice: 9500000,
      transferMethod: 'Municipal Transfer',
      description: 'Sector 20 was developed as a commercial zone by the Panchkula MC, with plots reserved for retail and hospitality use. The sector\'s position on the main arterial connecting Chandigarh to Kalka made it a natural high-footfall location.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    },
    {
      id: 'D6-O4',
      ownerName: 'PropHit SPV (Current)',
      ownerType: 'Corporation',
      acquiredDate: 'November 2025',
      transferDate: 'Present',
      acquiredPrice: 9500000,
      transferPrice: 0,
      transferMethod: 'Auction',
      description: 'Acquired through the Panchkula MC\'s open e-auction process. The 120 sqm commercial plot sits on the main retail strip, with high footfall from both Panchkula residents and Chandigarh commuters. Commercial yields in this sector average 6-8% annually.',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
    },
  ],
  historicalFacts: [
    { year: '1952', title: 'Le Corbusier\'s Chandigarh', description: 'The construction of Chandigarh as India\'s first planned city directly influenced Panchkula\'s own grid-based urban design.', category: 'development' },
    { year: '1966', title: 'Haryana\'s Capital Seat', description: 'Panchkula was designated as Haryana\'s administrative headquarters, sharing the Chandigarh capital complex under a unique tri-city arrangement.', category: 'event' },
    { year: '2006', title: 'IT Park Opens', description: 'Rajiv Gandhi Chandigarh Technology Park expanded into Panchkula, bringing IT jobs and young professionals to the satellite city.', category: 'development' },
    { year: '2018', title: 'Metro Extension Planned', description: 'The Chandigarh Metro plan included a Panchkula extension, promising rapid transit connectivity to the tri-city region.', category: 'infrastructure' },
  ],
  areaHistory: 'Panchkula\'s identity is inseparable from Chandigarh\'s. Born as the Haryana counterpart to India\'s only Le Corbusier-designed city, Panchkula adopted the same sector-grid planning but with a more commercial orientation. While Chandigarh remained deliberately restricted in growth (owing to its UT status), Panchkula absorbed the commercial overflow.\n\nSector 20\'s commercial strip benefits from this dynamic: Chandigarh\'s residents, limited by strict zoning in their own city, flock to Panchkula for retail, dining, and entertainment. This structural demand imbalance has made Panchkula\'s commercial plots some of the most stable retail investments in northern India.',
  areaHistoryPullQuote: 'In the shadow of Le Corbusier\'s masterpiece, Panchkula quietly became the commercial engine of the tri-city.',
  landUseEvolution: [
    { period: 'Pre-1966', use: 'Forest & Grassland', color: 'bg-gold-dark/30' },
    { period: '1966–1995', use: 'Planned Township', color: 'bg-gold-dark/50' },
    { period: '1995–2010', use: 'Municipal Development', color: 'bg-gold/50' },
    { period: '2010–Present', use: 'Commercial Hub', color: 'bg-gold/80' },
  ],
};

// ---------------------------------------------------------------------------
// D7 — Leasehold Conversion Eligible Plot, Thane
// ---------------------------------------------------------------------------
const D7History: PropertyHistoryData = {
  propertyId: 'D7',
  tagline: 'Mumbai\'s overlooked neighbor writes its own success story',
  heroImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600',
  ownershipTimeline: [
    {
      id: 'D7-O1',
      ownerName: 'Thane District Collectorate',
      ownerType: 'Government',
      acquiredDate: 'Pre-1900',
      transferDate: 'June 1960',
      acquiredPrice: 0,
      transferPrice: 0,
      transferMethod: 'Crown Grant',
      description: 'The Thane creek periphery was classified as government wasteland under British revenue surveys. The marshy terrain, prone to monsoon flooding, kept development at bay for over a century. Local fishing communities held informal use rights but no formal title.',
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800',
    },
    {
      id: 'D7-O2',
      ownerName: 'Maharashtra Housing Board',
      ownerType: 'Government',
      acquiredDate: 'June 1960',
      transferDate: 'April 1988',
      acquiredPrice: 0,
      transferPrice: 0,
      transferMethod: 'Government Allotment',
      description: 'The Maharashtra Housing Board acquired creek-adjacent land for affordable housing colonies. Plots were issued on 30-year leasehold terms to government employees and mill workers displaced by Mumbai\'s textile mill closures.',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800',
    },
    {
      id: 'D7-O3',
      ownerName: 'Leasehold Tenant (Individual)',
      ownerType: 'Individual',
      acquiredDate: 'April 1988',
      transferDate: 'July 2025',
      acquiredPrice: 35000,
      transferPrice: 7500000,
      transferMethod: 'Direct Sale',
      description: 'A textile mill worker was allotted this 100 sqm plot on a 30-year leasehold basis. The family filed for freehold conversion under Maharashtra\'s 2019 leasehold conversion policy. The conversion application, once approved, transforms the plot from restricted-transfer to fully marketable.',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800',
    },
    {
      id: 'D7-O4',
      ownerName: 'PropHit SPV (Current)',
      ownerType: 'Corporation',
      acquiredDate: 'July 2025',
      transferDate: 'Present',
      acquiredPrice: 7500000,
      transferPrice: 0,
      transferMethod: 'Direct Sale',
      description: 'Acquired with the pending conversion application as an upside trigger. Once freehold conversion is granted, the plot becomes fully transferable on the open market — historically a 15-25% value uplift event for similar Thane properties.',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
    },
  ],
  historicalFacts: [
    { year: '1863', title: 'First Railway to Thane', description: 'India\'s first passenger railway ran from Bombay to Thane in 1853, making it the terminus of Asia\'s first rail line.', category: 'infrastructure' },
    { year: '1982', title: 'Textile Mill Closures', description: 'The Great Bombay Textile Strike led to mill closures, pushing thousands of workers to resettle in affordable Thane colonies.', category: 'event' },
    { year: '2004', title: 'Thane\'s IT Boom', description: 'Major IT parks opened in Thane, rebranding it from "dormitory town" to self-sufficient tech suburb of Mumbai.', category: 'development' },
    { year: '2019', title: 'Conversion Policy', description: 'Maharashtra\'s leasehold-to-freehold conversion policy unlocked thousands of restricted plots for open market transfer.', category: 'event' },
  ],
  areaHistory: 'Thane\'s relationship with Mumbai mirrors that of Brooklyn to Manhattan — once dismissed as a commuter suburb, now celebrated for its own identity. The city\'s location at the head of the Thane creek gave it strategic importance since the Maratha era, but modern development only began with the railway connection in 1853.\n\nThe textile mill closures of the 1980s inadvertently seeded Thane\'s residential boom, as displaced workers created housing demand that attracted developers. Today, Thane\'s property market is among the most liquid in the Mumbai Metropolitan Region, with leasehold-to-freehold conversion adding a unique value catalyst.',
  areaHistoryPullQuote: 'From Asia\'s first railway terminus to Mumbai\'s most dynamic satellite — Thane has been reinventing itself for 170 years.',
  landUseEvolution: [
    { period: 'Pre-1960', use: 'Creek Marshland', color: 'bg-gold-dark/30' },
    { period: '1960–1988', use: 'Housing Board Colony', color: 'bg-gold-dark/50' },
    { period: '1988–2019', use: 'Leasehold Residential', color: 'bg-gold/50' },
    { period: '2019–Present', use: 'Conversion-Ready', color: 'bg-gold/80' },
  ],
};

// ---------------------------------------------------------------------------
// D8 — RERA Township Plot, Kakkanad, Kochi
// ---------------------------------------------------------------------------
const D8History: PropertyHistoryData = {
  propertyId: 'D8',
  tagline: 'Where spice trade legacy meets Silicon Valley ambitions',
  heroImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600',
  ownershipTimeline: [
    {
      id: 'D8-O1',
      ownerName: 'Kingdom of Cochin',
      ownerType: 'Royal Estate',
      acquiredDate: 'Pre-1500',
      transferDate: 'July 1949',
      acquiredPrice: 0,
      transferPrice: 0,
      transferMethod: 'Crown Grant',
      description: 'The Cochin royal family held vast landholdings across the backwater region. Kakkanad, meaning "land of the eye" in Malayalam, was a lush plantation zone where pepper, cardamom, and rubber trees dominated the landscape. The royal estate leased plots to plantation families under traditional janmi tenure.',
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800',
    },
    {
      id: 'D8-O2',
      ownerName: 'Government of Kerala',
      ownerType: 'Government',
      acquiredDate: 'July 1949',
      transferDate: 'March 2005',
      acquiredPrice: 0,
      transferPrice: 0,
      transferMethod: 'Land Reform',
      description: 'Kerala\'s sweeping land reform acts of the 1960s-70s abolished janmi tenure and redistributed plantation land. Kakkanad\'s hillsides were divided among former tenants, creating a patchwork of small holdings that would remain largely unchanged for decades.',
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800',
    },
    {
      id: 'D8-O3',
      ownerName: 'BlueStone Developers Pvt Ltd',
      ownerType: 'Corporation',
      acquiredDate: 'March 2005',
      transferDate: 'April 2025',
      acquiredPrice: 1200000,
      transferPrice: 6500000,
      transferMethod: 'Direct Sale',
      description: 'BlueStone aggregated small holdings to create a RERA-registered township adjacent to the Infopark IT campus. The project secured institutional MOUs with IT companies for employee housing, ensuring steady demand. The 180 sqm plot is part of a master-planned community with clubhouse, landscaping, and 24/7 security.',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800',
    },
    {
      id: 'D8-O4',
      ownerName: 'PropHit SPV (Current)',
      ownerType: 'Corporation',
      acquiredDate: 'April 2025',
      transferDate: 'Present',
      acquiredPrice: 6500000,
      transferPrice: 0,
      transferMethod: 'Corporate Acquisition',
      description: 'Acquired through BlueStone\'s institutional offtake channel, with RERA protection and MOU-backed demand from IT corridor employers. Kakkanad\'s emergence as Kerala\'s IT capital ensures a deep tenant pool for residential plots in this zone.',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
    },
  ],
  historicalFacts: [
    { year: '1503', title: 'Portuguese Fort Cochin', description: 'Vasco da Gama\'s successors built Fort Cochin nearby, making this coast one of the earliest European trading outposts in Asia.', category: 'landmark' },
    { year: '1969', title: 'Kerala Land Reforms', description: 'The Kerala Land Reforms Act abolished feudal land tenure, redistributing 1.5 million acres and creating one of India\'s most equitable land ownership patterns.', category: 'event' },
    { year: '2004', title: 'Infopark Opens', description: 'Kochi\'s Infopark in Kakkanad attracted IT giants, transforming a sleepy plantation town into Kerala\'s tech capital.', category: 'development' },
    { year: '2017', title: 'Metro Reaches Kakkanad', description: 'Kochi Metro\'s extension to the Kakkanad IT zone connected 100,000+ tech workers to the city center.', category: 'infrastructure' },
  ],
  areaHistory: 'Kakkanad\'s journey from spice plantation to IT hub encapsulates Kerala\'s own transformation. The region that once exported pepper and cardamom to Portuguese, Dutch, and British traders now exports software services to the world. The Infopark campus, sprawling across 400 acres, houses over 350 IT companies and employs nearly 70,000 professionals.\n\nThis IT influx has created intense housing demand in a state known for restrictive land policies. Kerala\'s land reform legacy means plots are small and ownership is fragmented — making organized township developments like BlueStone\'s particularly valuable. The RERA registration provides an additional layer of regulatory protection that individual plot purchases in Kerala often lack.',
  areaHistoryPullQuote: 'From the kingdom that traded spices with Vasco da Gama to the IT corridor that trades code with the world.',
  landUseEvolution: [
    { period: 'Pre-1949', use: 'Royal Plantation', color: 'bg-gold-dark/30' },
    { period: '1949–1969', use: 'Tenant Holdings', color: 'bg-gold-dark/50' },
    { period: '1969–2004', use: 'Small Agricultural', color: 'bg-gold/40' },
    { period: '2004–Present', use: 'IT Township', color: 'bg-gold/80' },
  ],
};

// ---------------------------------------------------------------------------
// D9 — Vizag Port-Edge Tender Parcel
// ---------------------------------------------------------------------------
const D9History: PropertyHistoryData = {
  propertyId: 'D9',
  tagline: 'Where the Bay of Bengal meets India\'s logistics revolution',
  heroImage: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1600',
  ownershipTimeline: [
    {
      id: 'D9-O1',
      ownerName: 'Madras Presidency (British India)',
      ownerType: 'Government',
      acquiredDate: 'Pre-1860',
      transferDate: 'August 1947',
      acquiredPrice: 0,
      transferPrice: 0,
      transferMethod: 'Crown Grant',
      description: 'The coastline north of Visakhapatnam was classified as naval reserve land under the Madras Presidency. British engineers recognized the deep-water potential of the Vizag harbor, establishing a minor port that would eventually become one of India\'s largest.',
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800',
    },
    {
      id: 'D9-O2',
      ownerName: 'Visakhapatnam Port Trust',
      ownerType: 'Government',
      acquiredDate: 'August 1947',
      transferDate: 'March 2025',
      acquiredPrice: 0,
      transferPrice: 200000000,
      transferMethod: 'Government Allotment',
      description: 'Post-independence, the Vizag Port Trust inherited vast landholdings around the harbor. As the port evolved from a minor facility handling 1 million tonnes (1950) to a major port processing 75 million tonnes (2023), adjacent industrial land became increasingly strategic for logistics and warehousing operations.',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
    },
    {
      id: 'D9-O3',
      ownerName: 'PropHit SPV (Current)',
      ownerType: 'Corporation',
      acquiredDate: 'March 2025',
      transferDate: 'Present',
      acquiredPrice: 200000000,
      transferPrice: 0,
      transferMethod: 'Auction',
      description: 'Acquired through the Visakhapatnam Port Authority\'s competitive tender for port-edge industrial parcels. The 6,000 sqm plot is positioned for last-mile logistics operations, with direct port connectivity reducing cargo handling times by an estimated 30%.',
      image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800',
    },
  ],
  historicalFacts: [
    { year: '1858', title: 'Port Construction Begins', description: 'British engineers began constructing Vizag\'s deep-water port, recognizing its natural harbor as the finest on India\'s eastern coast.', category: 'infrastructure' },
    { year: '1943', title: 'WWII Naval Base', description: 'Vizag served as a key Allied naval base during WWII. Japanese submarine shelling in 1942 marked the only Axis attack on Indian soil.', category: 'event' },
    { year: '2014', title: 'AP Capital Contender', description: 'After Telangana\'s separation, Visakhapatnam was considered as Andhra Pradesh\'s new capital, boosting infrastructure investment.', category: 'development' },
    { year: '2023', title: 'Port Expansion Complete', description: 'The port\'s inner harbor expansion increased capacity to 100M tonnes, making it India\'s busiest east coast port by tonnage.', category: 'infrastructure' },
  ],
  areaHistory: 'Visakhapatnam\'s deep natural harbor has shaped its destiny for centuries. From a sleepy fishing village, it grew into a strategic British naval base, survived Japanese shelling during World War II, and emerged as independent India\'s premier east coast port. The city\'s industrial corridor — stretching from the port to Madhurawada — is now one of the most dynamic logistics zones in South Asia.\n\nThe port-edge industrial zone represents a new chapter in Vizag\'s evolution. As India\'s manufacturing ambitions grow and the Bay of Bengal becomes a critical trade route for ASEAN commerce, Vizag\'s port-adjacent land is being repositioned from basic storage to high-value logistics and processing operations.',
  areaHistoryPullQuote: 'The harbor that survived Japanese shells in 1943 now anchors India\'s Bay of Bengal trade gateway.',
  landUseEvolution: [
    { period: 'Pre-1947', use: 'Naval Reserve', color: 'bg-gold-dark/30' },
    { period: '1947–1990', use: 'Port Trust Land', color: 'bg-gold-dark/50' },
    { period: '1990–2015', use: 'Industrial Storage', color: 'bg-gold/50' },
    { period: '2015–Present', use: 'Port-Edge Logistics', color: 'bg-gold/80' },
  ],
};

// ---------------------------------------------------------------------------
// D10 — Naya Raipur Govt Township Plot
// ---------------------------------------------------------------------------
const D10History: PropertyHistoryData = {
  propertyId: 'D10',
  tagline: 'India\'s newest planned capital rises from the rice paddies',
  heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600',
  ownershipTimeline: [
    {
      id: 'D10-O1',
      ownerName: 'Central Provinces (British India)',
      ownerType: 'Government',
      acquiredDate: 'Pre-1900',
      transferDate: 'August 1947',
      acquiredPrice: 0,
      transferPrice: 0,
      transferMethod: 'Crown Grant',
      description: 'The Chhattisgarh plains were part of the Central Provinces under British administration. The flat, fertile land surrounding Raipur was dominated by rice paddies, with the region known as India\'s "rice bowl." Dense sal forests bordered the cultivated areas.',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
    },
    {
      id: 'D10-O2',
      ownerName: 'Government of Madhya Pradesh / Chhattisgarh',
      ownerType: 'Government',
      acquiredDate: 'August 1947',
      transferDate: 'November 2000',
      acquiredPrice: 0,
      transferPrice: 0,
      transferMethod: 'Government Allotment',
      description: 'The region remained under Madhya Pradesh until 2000, when Chhattisgarh was carved out as India\'s 26th state. The new state needed a new capital, and the flat terrain southeast of Raipur was selected for an ambitious greenfield city — Naya Raipur.',
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800',
    },
    {
      id: 'D10-O3',
      ownerName: 'Naya Raipur Development Authority (NRDA)',
      ownerType: 'Government',
      acquiredDate: 'November 2000',
      transferDate: 'August 2024',
      acquiredPrice: 0,
      transferPrice: 5500000,
      transferMethod: 'Government Allotment',
      description: 'NRDA was established to build India\'s first greenfield capital city after Chandigarh. Designed by Hafeez Contractor and Maki & Associates, the plan featured wide boulevards, a central lake, and a mixed-use zone. This 250 sqm residential plot is in the government township sector, adjacent to the Mantralaya complex.',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800',
    },
    {
      id: 'D10-O4',
      ownerName: 'PropHit SPV (Current)',
      ownerType: 'Corporation',
      acquiredDate: 'August 2024',
      transferDate: 'Present',
      acquiredPrice: 5500000,
      transferPrice: 0,
      transferMethod: 'Government Allotment',
      description: 'Acquired through NRDA\'s allotment scheme for the government township zone. The plot benefits from proximity to the Mantralaya (state secretariat), ensuring sustained demand from government employees and contractors. Naya Raipur\'s development is backed by state and central funding commitments.',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
    },
  ],
  historicalFacts: [
    { year: '1741', title: 'Maratha Conquest', description: 'The Marathas conquered the Chhattisgarh region from the Gond tribal kingdoms, establishing revenue administration over the rice-growing plains.', category: 'event' },
    { year: '2000', title: 'Chhattisgarh Born', description: 'India\'s 26th state was carved from Madhya Pradesh on November 1, 2000, creating the need for a new state capital.', category: 'event' },
    { year: '2012', title: 'Mantralaya Opens', description: 'The state secretariat complex opened in Naya Raipur, anchoring government operations in the new capital and triggering residential demand.', category: 'development' },
    { year: '2024', title: 'Smart City Status', description: 'Naya Raipur was selected under the Smart Cities Mission, bringing IoT infrastructure, solar power grids, and intelligent traffic systems.', category: 'infrastructure' },
  ],
  areaHistory: 'Naya Raipur is India\'s only greenfield state capital built in the 21st century. Its creation was necessitated by Chhattisgarh\'s formation in 2000 — a state carved from Madhya Pradesh to give the tribal and mineral-rich region its own governance. The vision was bold: build a modern, sustainable capital city on 8,000 hectares of rice paddy land, complete with a jungle safari, international cricket stadium, and India\'s largest man-made lake.\n\nThe reality, while more measured, has been impressive. The Mantralaya complex, IIT campus, and AIIMS hospital are all operational. A steady inflow of government employees and institutional staff ensures baseline residential demand. For investors, Naya Raipur represents the rare opportunity to participate in a capital city\'s early growth — the Indian equivalent of buying into Canberra or Brasilia in their founding decades.',
  areaHistoryPullQuote: 'India\'s youngest state built India\'s newest capital — a 21st-century answer to Chandigarh\'s 20th-century experiment.',
  landUseEvolution: [
    { period: 'Pre-1947', use: 'Rice Paddies', color: 'bg-gold-dark/30' },
    { period: '1947–2000', use: 'Agricultural Reserve', color: 'bg-gold-dark/50' },
    { period: '2000–2012', use: 'Capital Construction', color: 'bg-gold/50' },
    { period: '2012–Present', use: 'Govt Township', color: 'bg-gold/80' },
  ],
};

// ---------------------------------------------------------------------------
// D11 — Short Term Developer Repurchase, Surat, Magdalla
// ---------------------------------------------------------------------------
const D11History: PropertyHistoryData = {
  propertyId: 'D11',
  tagline: 'From Dutch trading outpost to developer-backed smart plots',
  heroImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600',
  ownershipTimeline: [
    {
      id: 'D11-O1',
      ownerName: 'Dutch East India Company (VOC)',
      ownerType: 'Corporation',
      acquiredDate: '1616',
      transferDate: '1795',
      acquiredPrice: 0,
      transferPrice: 0,
      transferMethod: 'Crown Grant',
      description: 'The Dutch established a trading factory at Magdalla in the early 17th century, using the Tapi riverbank for textile and spice exports. The VOC maintained a warehouse and residential compound here for nearly 180 years, making Magdalla one of the longest-running European settlements in Gujarat.',
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800',
    },
    {
      id: 'D11-O2',
      ownerName: 'Gaekwad of Baroda / Gujarat State',
      ownerType: 'Government',
      acquiredDate: '1795',
      transferDate: 'June 2002',
      acquiredPrice: 0,
      transferPrice: 0,
      transferMethod: 'Inheritance',
      description: 'After the Dutch departed, the Gaekwad rulers of Baroda incorporated Magdalla into their domain. Post-independence, it fell under Gujarat state. For two centuries, the area reverted to fishing and small-scale agriculture, its European trading past forgotten.',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
    },
    {
      id: 'D11-O3',
      ownerName: 'Acuity Homes Pvt Ltd',
      ownerType: 'Corporation',
      acquiredDate: 'June 2002',
      transferDate: 'March 2026',
      acquiredPrice: 320000,
      transferPrice: 4200000,
      transferMethod: 'Direct Sale',
      description: 'Acuity Homes identified Magdalla as Surat\'s next growth corridor, acquiring agricultural land and converting it to residential NA plots. The developer\'s 12-18 month buyback program, backed by escrow at XYZ Bank, was designed to attract short-term investors comfortable with the developer\'s covenant structure.',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800',
    },
    {
      id: 'D11-O4',
      ownerName: 'PropHit SPV (Current)',
      ownerType: 'Corporation',
      acquiredDate: 'March 2026',
      transferDate: 'Present',
      acquiredPrice: 4200000,
      transferPrice: 0,
      transferMethod: 'Corporate Acquisition',
      description: 'Acquired under the developer repurchase program with partial escrow coverage at XYZ Bank. The 120 sqm plot is positioned for short-term returns via the buyback mechanism, with the Dumas Beach Road development corridor providing additional market exit optionality.',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
    },
  ],
  historicalFacts: [
    { year: '1616', title: 'Dutch Factory Established', description: 'The VOC opened its Surat trading factory, with Magdalla serving as a satellite warehouse for textile exports to Southeast Asia.', category: 'landmark' },
    { year: '1795', title: 'Dutch Departure', description: 'The decline of the VOC led to the Dutch withdrawal from Surat, ending 180 years of European trading presence at Magdalla.', category: 'event' },
    { year: '1994', title: 'Surat Plague Outbreak', description: 'The pneumonic plague outbreak devastated Surat but catalyzed a dramatic civic cleanup that made it one of India\'s cleanest cities.', category: 'event' },
    { year: '2020', title: 'Dumas Beach Road Widening', description: 'The coastal road connecting Surat to Dumas Beach was widened, opening Magdalla to tourism and recreational development.', category: 'infrastructure' },
  ],
  areaHistory: 'Magdalla\'s story is a microcosm of global trade history. Dutch merchants chose this precise riverbank 400 years ago for the same reason developers choose it today: strategic location. The Tapi River provided port access in the 17th century; the Dumas Beach Road provides urban connectivity in the 21st.\n\nSurat\'s post-plague transformation is legendary in Indian urban planning. The 1994 outbreak forced a comprehensive civic overhaul that turned a disease-ravaged city into a model of cleanliness and governance. This institutional strength now supports organized real estate development, with RERA-registered projects and escrow-backed buyback mechanisms that would have been unthinkable in the pre-reform era.',
  areaHistoryPullQuote: 'Where Dutch merchants docked their ships four centuries ago, modern developers now build India\'s trust-first residential communities.',
  landUseEvolution: [
    { period: '1616–1795', use: 'Dutch Trading Post', color: 'bg-gold-dark/30' },
    { period: '1795–2002', use: 'Fishing & Agriculture', color: 'bg-gold-dark/50' },
    { period: '2002–2020', use: 'NA Conversion Zone', color: 'bg-gold/50' },
    { period: '2020–Present', use: 'Developer Township', color: 'bg-gold/80' },
  ],
};

// ---------------------------------------------------------------------------
// D12 — Special Category Municipal Allotment, Noida, Sector 15A
// ---------------------------------------------------------------------------
const D12History: PropertyHistoryData = {
  propertyId: 'D12',
  tagline: 'A special allotment in the heart of Noida\'s original blueprint',
  heroImage: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600',
  ownershipTimeline: [
    {
      id: 'D12-O1',
      ownerName: 'Local Farming Community',
      ownerType: 'Community',
      acquiredDate: 'Pre-1900',
      transferDate: 'March 1952',
      acquiredPrice: 0,
      transferPrice: 0,
      transferMethod: 'Land Reform',
      description: 'The low-lying plains along the Yamuna floodplain were cultivated by local farming communities for generations. Seasonal flooding enriched the soil, making it ideal for rice and vegetable cultivation. Villages like Garhi Chaukhandi and Sorkha dotted the landscape.',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
    },
    {
      id: 'D12-O2',
      ownerName: 'Government of Uttar Pradesh',
      ownerType: 'Government',
      acquiredDate: 'March 1952',
      transferDate: 'April 1976',
      acquiredPrice: 0,
      transferPrice: 0,
      transferMethod: 'Land Reform',
      description: 'Zamindari abolition transferred these lands to state control. For 24 years, the area remained part of the Yamuna floodplain agricultural belt, periodically inundated during monsoons and considered unsuitable for permanent habitation.',
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800',
    },
    {
      id: 'D12-O3',
      ownerName: 'Noida Authority',
      ownerType: 'Government',
      acquiredDate: 'April 1976',
      transferDate: 'December 2025',
      acquiredPrice: 0,
      transferPrice: 2800000,
      transferMethod: 'Municipal Transfer',
      description: 'Sector 15A was one of Noida\'s original planned sectors, designed as a mixed residential-institutional zone. The special category allotment was reserved for municipal purposes before being released through the authority\'s periodic review process. The 302 sqm plot comes with specific transfer conditions tied to municipal approval.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    },
    {
      id: 'D12-O4',
      ownerName: 'PropHit SPV (Current)',
      ownerType: 'Corporation',
      acquiredDate: 'December 2025',
      transferDate: 'Present',
      acquiredPrice: 2800000,
      transferPrice: 0,
      transferMethod: 'Municipal Transfer',
      description: 'Acquired through Noida Authority\'s special category release process. The plot sits in one of Noida\'s most established sectors, with mature tree cover, completed infrastructure, and proximity to Sector 15 metro station. Transfer is subject to municipal approval, which typically adds 60-90 days to resale timelines.',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
    },
  ],
  historicalFacts: [
    { year: '1206', title: 'Delhi Sultanate Expansion', description: 'The trans-Yamuna plains were first brought under organized administration during the Delhi Sultanate, with revenue collectors mapping agricultural output.', category: 'event' },
    { year: '1976', title: 'NOIDA Master Plan', description: 'Noida\'s original master plan designated Sector 15 as the institutional core, home to schools, hospitals, and municipal offices.', category: 'development' },
    { year: '2010', title: 'Metro Connectivity', description: 'The Delhi Metro Blue Line extension to Noida brought Sector 15 within 35 minutes of central Delhi, transforming property values.', category: 'infrastructure' },
    { year: '2022', title: 'Aqua Line Extension', description: 'The Aqua Line connected Noida to Greater Noida, with Sector 15A\'s proximity to interchange stations boosting its strategic value.', category: 'infrastructure' },
  ],
  areaHistory: 'Sector 15A holds a special place in Noida\'s origin story. When the authority drew its first master plan in 1976, this sector was envisioned as the institutional heart — a zone where schools, hospitals, and government offices would anchor the nascent township. Four decades later, the vision has been realized, with Sector 15 hosting some of Noida\'s most established institutions.\n\nThe metro\'s arrival in 2010 transformed the sector from a quiet institutional zone to one of Noida\'s most connected addresses. Properties here command a premium not for flashy development, but for maturity — complete infrastructure, tree-lined avenues, and the stability of being surrounded by institutional anchors rather than speculative projects.',
  areaHistoryPullQuote: 'In Noida\'s original blueprint, this sector was drawn first — and 50 years later, it remains the city\'s most stable address.',
  landUseEvolution: [
    { period: 'Pre-1952', use: 'Yamuna Floodplain', color: 'bg-gold-dark/30' },
    { period: '1952–1976', use: 'State Agricultural', color: 'bg-gold-dark/50' },
    { period: '1976–2010', use: 'Institutional Zone', color: 'bg-gold/50' },
    { period: '2010–Present', use: 'Metro-Connected', color: 'bg-gold/80' },
  ],
};

// ---------------------------------------------------------------------------
// Lookup map and getter
// ---------------------------------------------------------------------------
const propertyHistoryMap: Record<string, PropertyHistoryData> = {
  D1: D1History,
  D2: D2History,
  D3: D3History,
  D4: D4History,
  D5: D5History,
  D6: D6History,
  D7: D7History,
  D8: D8History,
  D9: D9History,
  D10: D10History,
  D11: D11History,
  D12: D12History,
};

export function getPropertyHistory(propertyId: string): PropertyHistoryData | undefined {
  return propertyHistoryMap[propertyId];
}
