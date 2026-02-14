export interface POIData {
  id: string;
  name: string;
  category: 'metro' | 'school' | 'hospital' | 'mall' | 'highway' | 'airport' | 'park';
  lat: number;
  lng: number;
  distance: string;
}

export interface PropertyPOIData {
  propertyId: string;
  pois: POIData[];
}

const poiDataMap: Record<string, PropertyPOIData> = {
  D1: {
    propertyId: 'D1',
    pois: [
      { id: 'D1-P1', name: 'Sanpada Metro', category: 'metro', lat: 19.0355, lng: 73.0195, distance: '800m' },
      { id: 'D1-P2', name: 'Palm Beach Road', category: 'highway', lat: 19.0310, lng: 73.0250, distance: '1.2 km' },
      { id: 'D1-P3', name: 'CIDCO Hospital', category: 'hospital', lat: 19.0380, lng: 73.0180, distance: '1.5 km' },
      { id: 'D1-P4', name: 'Inorbit Mall', category: 'mall', lat: 19.0290, lng: 73.0175, distance: '2 km' },
      { id: 'D1-P5', name: 'DPS Navi Mumbai', category: 'school', lat: 19.0365, lng: 73.0260, distance: '1.8 km' },
    ],
  },
  D2: {
    propertyId: 'D2',
    pois: [
      { id: 'D2-P1', name: 'Sector 95 Metro', category: 'metro', lat: 28.5690, lng: 77.3200, distance: '600m' },
      { id: 'D2-P2', name: 'Noida Expressway', category: 'highway', lat: 28.5650, lng: 77.3280, distance: '1 km' },
      { id: 'D2-P3', name: 'Fortis Hospital', category: 'hospital', lat: 28.5710, lng: 77.3190, distance: '2 km' },
      { id: 'D2-P4', name: 'DLF Mall of India', category: 'mall', lat: 28.5720, lng: 77.3260, distance: '3 km' },
      { id: 'D2-P5', name: 'Lotus Park', category: 'park', lat: 28.5645, lng: 77.3210, distance: '1.5 km' },
    ],
  },
  D3: {
    propertyId: 'D3',
    pois: [
      { id: 'D3-P1', name: 'IMT Manesar', category: 'highway', lat: 28.5920, lng: 76.9950, distance: '2 km' },
      { id: 'D3-P2', name: 'Medanta Hospital', category: 'hospital', lat: 28.5980, lng: 77.0030, distance: '3 km' },
      { id: 'D3-P3', name: 'Pathways School', category: 'school', lat: 28.5900, lng: 76.9970, distance: '1.8 km' },
      { id: 'D3-P4', name: 'Aravalli Biodiversity Park', category: 'park', lat: 28.5990, lng: 76.9960, distance: '2.5 km' },
    ],
  },
  D4: {
    propertyId: 'D4',
    pois: [
      { id: 'D4-P1', name: 'NH-48 Corridor', category: 'highway', lat: 25.6050, lng: 72.2720, distance: '1 km' },
      { id: 'D4-P2', name: 'DMIC Rail Hub', category: 'metro', lat: 25.5990, lng: 72.2800, distance: '3 km' },
      { id: 'D4-P3', name: 'Civil Hospital', category: 'hospital', lat: 25.6060, lng: 72.2710, distance: '4 km' },
      { id: 'D4-P4', name: 'SEZ Park', category: 'park', lat: 25.5980, lng: 72.2790, distance: '2.5 km' },
    ],
  },
  D5: {
    propertyId: 'D5',
    pois: [
      { id: 'D5-P1', name: 'Surat Metro (Phase 1)', category: 'metro', lat: 21.1730, lng: 72.8280, distance: '1 km' },
      { id: 'D5-P2', name: 'SMIMER Hospital', category: 'hospital', lat: 21.1680, lng: 72.8350, distance: '2 km' },
      { id: 'D5-P3', name: 'VR Surat Mall', category: 'mall', lat: 21.1740, lng: 72.8270, distance: '1.5 km' },
      { id: 'D5-P4', name: 'Surat Airport', category: 'airport', lat: 21.1620, lng: 72.8400, distance: '5 km' },
      { id: 'D5-P5', name: 'Diamond Garden', category: 'park', lat: 21.1715, lng: 72.8290, distance: '800m' },
    ],
  },
  D6: {
    propertyId: 'D6',
    pois: [
      { id: 'D6-P1', name: 'Chandigarh-Panchkula Highway', category: 'highway', lat: 30.7370, lng: 76.8540, distance: '500m' },
      { id: 'D6-P2', name: 'Alchemist Hospital', category: 'hospital', lat: 30.7320, lng: 76.8610, distance: '1.5 km' },
      { id: 'D6-P3', name: 'Elante Mall', category: 'mall', lat: 30.7390, lng: 76.8550, distance: '4 km' },
      { id: 'D6-P4', name: 'Leisure Valley Park', category: 'park', lat: 30.7360, lng: 76.8600, distance: '3 km' },
      { id: 'D6-P5', name: 'The British School', category: 'school', lat: 30.7380, lng: 76.8530, distance: '2 km' },
    ],
  },
  D7: {
    propertyId: 'D7',
    pois: [
      { id: 'D7-P1', name: 'Thane Station', category: 'metro', lat: 19.2200, lng: 72.9750, distance: '1 km' },
      { id: 'D7-P2', name: 'Eastern Express Highway', category: 'highway', lat: 19.2160, lng: 72.9810, distance: '1.5 km' },
      { id: 'D7-P3', name: 'Jupiter Hospital', category: 'hospital', lat: 19.2210, lng: 72.9760, distance: '2 km' },
      { id: 'D7-P4', name: 'Viviana Mall', category: 'mall', lat: 19.2150, lng: 72.9820, distance: '3 km' },
      { id: 'D7-P5', name: 'Upvan Lake Garden', category: 'park', lat: 19.2220, lng: 72.9740, distance: '2.5 km' },
    ],
  },
  D8: {
    propertyId: 'D8',
    pois: [
      { id: 'D8-P1', name: 'Kochi Metro (Kalamassery)', category: 'metro', lat: 9.9740, lng: 76.3060, distance: '2 km' },
      { id: 'D8-P2', name: 'InfoPark', category: 'park', lat: 9.9700, lng: 76.3120, distance: '1.5 km' },
      { id: 'D8-P3', name: 'Aster Medcity', category: 'hospital', lat: 9.9750, lng: 76.3050, distance: '3 km' },
      { id: 'D8-P4', name: 'Lulu Mall Kochi', category: 'mall', lat: 9.9680, lng: 76.3130, distance: '5 km' },
    ],
  },
  D9: {
    propertyId: 'D9',
    pois: [
      { id: 'D9-P1', name: 'Vizag Port', category: 'highway', lat: 17.6890, lng: 83.2150, distance: '2 km' },
      { id: 'D9-P2', name: 'King George Hospital', category: 'hospital', lat: 17.6840, lng: 83.2220, distance: '4 km' },
      { id: 'D9-P3', name: 'Vizag Airport', category: 'airport', lat: 17.6900, lng: 83.2140, distance: '8 km' },
      { id: 'D9-P4', name: 'Simhachalam Park', category: 'park', lat: 17.6850, lng: 83.2210, distance: '3 km' },
    ],
  },
  D10: {
    propertyId: 'D10',
    pois: [
      { id: 'D10-P1', name: 'NH-6 National Highway', category: 'highway', lat: 21.2380, lng: 81.6260, distance: '1 km' },
      { id: 'D10-P2', name: 'AIIMS Raipur', category: 'hospital', lat: 21.2330, lng: 81.6330, distance: '4 km' },
      { id: 'D10-P3', name: 'Ambuja City Center', category: 'mall', lat: 21.2390, lng: 81.6270, distance: '3 km' },
      { id: 'D10-P4', name: 'Purkhouti Muktangan', category: 'park', lat: 21.2320, lng: 81.6320, distance: '5 km' },
      { id: 'D10-P5', name: 'DPS Raipur', category: 'school', lat: 21.2370, lng: 81.6250, distance: '2.5 km' },
    ],
  },
  D11: {
    propertyId: 'D11',
    pois: [
      { id: 'D11-P1', name: 'Surat Airport', category: 'airport', lat: 21.1650, lng: 72.8250, distance: '6 km' },
      { id: 'D11-P2', name: 'New Civil Hospital', category: 'hospital', lat: 21.1710, lng: 72.8170, distance: '3 km' },
      { id: 'D11-P3', name: 'Dumas Beach Road', category: 'highway', lat: 21.1660, lng: 72.8230, distance: '2 km' },
      { id: 'D11-P4', name: 'Dutch Garden Heritage', category: 'park', lat: 21.1700, lng: 72.8180, distance: '1.5 km' },
    ],
  },
  D12: {
    propertyId: 'D12',
    pois: [
      { id: 'D12-P1', name: 'Sector 15 Metro', category: 'metro', lat: 28.5870, lng: 77.3400, distance: '500m' },
      { id: 'D12-P2', name: 'DND Flyway', category: 'highway', lat: 28.5820, lng: 77.3460, distance: '1.5 km' },
      { id: 'D12-P3', name: 'Max Hospital', category: 'hospital', lat: 28.5880, lng: 77.3390, distance: '2 km' },
      { id: 'D12-P4', name: 'Botanical Garden', category: 'park', lat: 28.5830, lng: 77.3440, distance: '1 km' },
      { id: 'D12-P5', name: 'GIP Mall', category: 'mall', lat: 28.5860, lng: 77.3380, distance: '3 km' },
    ],
  },
};

export function getPropertyPOIs(propertyId: string): POIData[] {
  return poiDataMap[propertyId]?.pois ?? [];
}
