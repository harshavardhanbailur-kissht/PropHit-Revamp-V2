// Property Interface
export interface Property {
  id: number;
  name: string;
  location: string;
  city: string;
  price: number;
  totalTokens: number;
  soldTokens: number;
  rentalYield: number;
  appreciation: number;
  image: string;
  type: 'Residential' | 'Commercial' | 'Mixed Use';
  tag?: string;
}

// Dummy Properties Data
export const properties: Property[] = [
  {
    id: 1,
    name: 'Lodha World Towers',
    location: 'Lower Parel, Mumbai',
    city: 'Mumbai',
    price: 2850,
    totalTokens: 10000,
    soldTokens: 6800,
    rentalYield: 3.8,
    appreciation: 12.5,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
    type: 'Residential',
    tag: 'Hot Deal',
  },
  {
    id: 2,
    name: 'Oberoi Realty Worli',
    location: 'Worli Sea Face',
    city: 'Mumbai',
    price: 3499,
    totalTokens: 8000,
    soldTokens: 8000,
    rentalYield: 3.5,
    appreciation: 15.2,
    image: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=800',
    type: 'Residential',
    tag: 'Fully Subscribed',
  },
  {
    id: 3,
    name: 'Brigade Gateway',
    location: 'Rajajinagar',
    city: 'Bangalore',
    price: 2100,
    totalTokens: 12000,
    soldTokens: 7200,
    rentalYield: 4.5,
    appreciation: 11.2,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800',
    type: 'Mixed Use',
    tag: 'Top Rated',
  },
  {
    id: 4,
    name: 'Embassy Tech Village',
    location: 'Outer Ring Road',
    city: 'Bangalore',
    price: 1999,
    totalTokens: 20000,
    soldTokens: 8000,
    rentalYield: 5.5,
    appreciation: 10.5,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
    type: 'Commercial',
    tag: 'Commercial',
  },
  {
    id: 5,
    name: 'DLF Cyber City',
    location: 'Sector 24-25',
    city: 'Gurugram',
    price: 2499,
    totalTokens: 18000,
    soldTokens: 12600,
    rentalYield: 5.8,
    appreciation: 12.0,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    type: 'Commercial',
    tag: 'Premium',
  },
  {
    id: 6,
    name: 'My Home Bhooja',
    location: 'Madhapur',
    city: 'Hyderabad',
    price: 2350,
    totalTokens: 10000,
    soldTokens: 7000,
    rentalYield: 3.6,
    appreciation: 11.8,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    type: 'Residential',
    tag: 'New',
  },
];

// Get progress percentage
export function getProgress(property: Property): number {
  return Math.round((property.soldTokens / property.totalTokens) * 100);
}

// Format price
export function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`;
}
