export interface Hotspot {
  id: string;
  label: string;
  icon: 'entrance' | 'view' | 'landmark' | 'amenity' | 'parking';
  yawDeg: number;
  pitchDeg: number;
  description: string;
}

export interface PanoramicScene {
  id: string;
  label: string;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  hotspots: Hotspot[];
}

export interface PropertyPanoramicData {
  propertyId: string;
  scenes: PanoramicScene[];
}

const panoramicDataMap: Record<string, PropertyPanoramicData> = {
  D1: {
    propertyId: 'D1',
    scenes: [
      {
        id: 'D1-S1',
        label: 'Site Overview',
        imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=4000&h=2000&fit=crop',
        imageWidth: 4000,
        imageHeight: 2000,
        hotspots: [
          { id: 'D1-H1', label: 'Main Entrance', icon: 'entrance', yawDeg: 45, pitchDeg: -5, description: 'Primary access road with 30m frontage' },
          { id: 'D1-H2', label: 'Creek View', icon: 'view', yawDeg: 160, pitchDeg: 10, description: 'Panoramic view of Thane Creek and mangroves' },
          { id: 'D1-H3', label: 'Metro Station', icon: 'landmark', yawDeg: 270, pitchDeg: -10, description: 'Sanpada Metro — 800m walking distance' },
        ],
      },
    ],
  },
  D2: {
    propertyId: 'D2',
    scenes: [
      {
        id: 'D2-S1',
        label: 'Industrial Hub View',
        imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=4000&h=2000&fit=crop',
        imageWidth: 4000,
        imageHeight: 2000,
        hotspots: [
          { id: 'D2-H1', label: 'Expressway Access', icon: 'entrance', yawDeg: 30, pitchDeg: -8, description: 'Noida-Greater Noida Expressway interchange' },
          { id: 'D2-H2', label: 'IT Park Cluster', icon: 'landmark', yawDeg: 120, pitchDeg: 5, description: 'Sector 96 IT park with 50+ MNC offices' },
          { id: 'D2-H3', label: 'Residential Belt', icon: 'view', yawDeg: 240, pitchDeg: 0, description: 'Upcoming residential corridors along expressway' },
          { id: 'D2-H4', label: 'Parking Zone', icon: 'parking', yawDeg: 320, pitchDeg: -12, description: 'Multi-level parking structure — 200 bays' },
        ],
      },
    ],
  },
  D3: {
    propertyId: 'D3',
    scenes: [
      {
        id: 'D3-S1',
        label: 'Land Pooling View',
        imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=4000&h=2000&fit=crop',
        imageWidth: 4000,
        imageHeight: 2000,
        hotspots: [
          { id: 'D3-H1', label: 'Development Zone', icon: 'landmark', yawDeg: 60, pitchDeg: 0, description: 'Haryana DDJAY Affordable Housing Zone' },
          { id: 'D3-H2', label: 'Green Belt', icon: 'view', yawDeg: 180, pitchDeg: 8, description: 'Protected green belt with native Aravallis flora' },
          { id: 'D3-H3', label: 'Amenity Block', icon: 'amenity', yawDeg: 300, pitchDeg: -5, description: 'Community center and sports complex' },
        ],
      },
    ],
  },
  D4: {
    propertyId: 'D4',
    scenes: [
      {
        id: 'D4-S1',
        label: 'DMIC Township',
        imageUrl: 'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=4000&h=2000&fit=crop',
        imageWidth: 4000,
        imageHeight: 2000,
        hotspots: [
          { id: 'D4-H1', label: 'Industrial Gate', icon: 'entrance', yawDeg: 20, pitchDeg: -6, description: 'DMIC corridor south gate entry' },
          { id: 'D4-H2', label: 'Skyline View', icon: 'view', yawDeg: 140, pitchDeg: 12, description: 'Panoramic township skyline towards Rajasthan plains' },
          { id: 'D4-H3', label: 'Logistics Hub', icon: 'landmark', yawDeg: 250, pitchDeg: -3, description: 'Multi-modal freight terminal — rail + road' },
        ],
      },
    ],
  },
  D5: {
    propertyId: 'D5',
    scenes: [
      {
        id: 'D5-S1',
        label: 'Surat Varachha View',
        imageUrl: 'https://images.unsplash.com/photo-1464938050520-ef2571e0d6e0?w=4000&h=2000&fit=crop',
        imageWidth: 4000,
        imageHeight: 2000,
        hotspots: [
          { id: 'D5-H1', label: 'Township Gate', icon: 'entrance', yawDeg: 50, pitchDeg: -4, description: 'Gated community entrance with 24/7 security' },
          { id: 'D5-H2', label: 'Diamond Bourse', icon: 'landmark', yawDeg: 170, pitchDeg: 6, description: 'Surat Diamond Bourse visible on horizon — 3km' },
          { id: 'D5-H3', label: 'Club House', icon: 'amenity', yawDeg: 290, pitchDeg: -8, description: 'Premium clubhouse with infinity pool and tennis courts' },
        ],
      },
    ],
  },
  D6: {
    propertyId: 'D6',
    scenes: [
      {
        id: 'D6-S1',
        label: 'Panchkula Commercial',
        imageUrl: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=4000&h=2000&fit=crop',
        imageWidth: 4000,
        imageHeight: 2000,
        hotspots: [
          { id: 'D6-H1', label: 'Commercial Plaza', icon: 'landmark', yawDeg: 40, pitchDeg: 0, description: 'Grade A commercial plaza with marble lobbies' },
          { id: 'D6-H2', label: 'Hill View', icon: 'view', yawDeg: 200, pitchDeg: 15, description: 'Shivalik foothills panoramic backdrop' },
          { id: 'D6-H3', label: 'Visitor Parking', icon: 'parking', yawDeg: 310, pitchDeg: -10, description: 'Basement parking — 500+ vehicle capacity' },
        ],
      },
    ],
  },
  D7: {
    propertyId: 'D7',
    scenes: [
      {
        id: 'D7-S1',
        label: 'Thane Leasehold',
        imageUrl: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=4000&h=2000&fit=crop',
        imageWidth: 4000,
        imageHeight: 2000,
        hotspots: [
          { id: 'D7-H1', label: 'Creek Front', icon: 'view', yawDeg: 80, pitchDeg: 5, description: 'Ulhas Creek waterfront with mangrove buffer zone' },
          { id: 'D7-H2', label: 'Station Walk', icon: 'landmark', yawDeg: 190, pitchDeg: -6, description: 'Thane Station — 12 min walk via skybridge' },
          { id: 'D7-H3', label: 'Garden Square', icon: 'amenity', yawDeg: 330, pitchDeg: -2, description: 'Japanese-style zen garden courtyard' },
        ],
      },
    ],
  },
  D8: {
    propertyId: 'D8',
    scenes: [
      {
        id: 'D8-S1',
        label: 'Kakkanad IT Township',
        imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=4000&h=2000&fit=crop',
        imageWidth: 4000,
        imageHeight: 2000,
        hotspots: [
          { id: 'D8-H1', label: 'Tech Park Entry', icon: 'entrance', yawDeg: 35, pitchDeg: -3, description: 'Smart City tech park main boulevard' },
          { id: 'D8-H2', label: 'Backwaters', icon: 'view', yawDeg: 150, pitchDeg: 8, description: 'Kerala backwaters visible from upper floors' },
          { id: 'D8-H3', label: 'Sports Arena', icon: 'amenity', yawDeg: 260, pitchDeg: -7, description: 'International cricket practice nets and futsal' },
        ],
      },
    ],
  },
  D9: {
    propertyId: 'D9',
    scenes: [
      {
        id: 'D9-S1',
        label: 'Vizag Port Edge',
        imageUrl: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=4000&h=2000&fit=crop',
        imageWidth: 4000,
        imageHeight: 2000,
        hotspots: [
          { id: 'D9-H1', label: 'Port Terminal', icon: 'landmark', yawDeg: 55, pitchDeg: 0, description: 'Visakhapatnam port container terminal — 2km' },
          { id: 'D9-H2', label: 'Bay of Bengal', icon: 'view', yawDeg: 180, pitchDeg: 10, description: 'Unobstructed Bay of Bengal coastline view' },
          { id: 'D9-H3', label: 'Rail Siding', icon: 'entrance', yawDeg: 300, pitchDeg: -8, description: 'Dedicated freight rail siding for logistics' },
        ],
      },
    ],
  },
  D10: {
    propertyId: 'D10',
    scenes: [
      {
        id: 'D10-S1',
        label: 'Naya Raipur Township',
        imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=4000&h=2000&fit=crop',
        imageWidth: 4000,
        imageHeight: 2000,
        hotspots: [
          { id: 'D10-H1', label: 'Capitol Complex', icon: 'landmark', yawDeg: 70, pitchDeg: 5, description: 'CG State Capitol Complex — 4km' },
          { id: 'D10-H2', label: 'Purkhouti Park', icon: 'view', yawDeg: 200, pitchDeg: 8, description: 'Heritage theme park and cultural center' },
          { id: 'D10-H3', label: 'Township Center', icon: 'amenity', yawDeg: 320, pitchDeg: -4, description: 'Central commercial hub with retail arcades' },
        ],
      },
    ],
  },
  D11: {
    propertyId: 'D11',
    scenes: [
      {
        id: 'D11-S1',
        label: 'Surat Magdalla',
        imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=4000&h=2000&fit=crop',
        imageWidth: 4000,
        imageHeight: 2000,
        hotspots: [
          { id: 'D11-H1', label: 'Coastal Road', icon: 'entrance', yawDeg: 40, pitchDeg: -5, description: 'New coastal highway connecting to Dumas Beach' },
          { id: 'D11-H2', label: 'River Tapti', icon: 'view', yawDeg: 160, pitchDeg: 6, description: 'Tapti riverfront promenade — evening golden hour' },
          { id: 'D11-H3', label: 'Heritage Quarter', icon: 'landmark', yawDeg: 280, pitchDeg: 0, description: 'Dutch-era trading post heritage zone' },
        ],
      },
    ],
  },
  D12: {
    propertyId: 'D12',
    scenes: [
      {
        id: 'D12-S1',
        label: 'NOIDA Sector 15A',
        imageUrl: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=4000&h=2000&fit=crop',
        imageWidth: 4000,
        imageHeight: 2000,
        hotspots: [
          { id: 'D12-H1', label: 'Metro Line', icon: 'landmark', yawDeg: 30, pitchDeg: -3, description: 'Aqua Line metro station — direct connectivity to Delhi' },
          { id: 'D12-H2', label: 'Yamuna View', icon: 'view', yawDeg: 150, pitchDeg: 7, description: 'Yamuna floodplain views with Okhla Bird Sanctuary' },
          { id: 'D12-H3', label: 'Commercial Strip', icon: 'amenity', yawDeg: 260, pitchDeg: -5, description: 'High-street retail and F&B corridor' },
          { id: 'D12-H4', label: 'Underground Parking', icon: 'parking', yawDeg: 340, pitchDeg: -12, description: 'Automated underground parking — 400 bays' },
        ],
      },
    ],
  },
};

export function getPropertyPanoramic(propertyId: string): PropertyPanoramicData | undefined {
  return panoramicDataMap[propertyId];
}
