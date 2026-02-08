// Hardcoded OTP for demo
export const HARDCODED_OTP = "1111";

// Phone validation regex (Indian mobile: starts with 6-9, 10 digits)
export const PHONE_REGEX = /^[6-9]\d{9}$/;

// Skills options
export const SKILLS = [
  {
    id: 'research',
    label: 'Deep Research',
    icon: '🔍',
    description: 'Market analysis & due diligence',
  },
  {
    id: 'product',
    label: 'Product Management',
    icon: '📦',
    description: 'Product strategy & roadmaps',
  },
  {
    id: 'strategy',
    label: 'Strategy',
    icon: '📊',
    description: 'Business strategy & planning',
  },
  {
    id: 'analytics',
    label: 'Data Analytics',
    icon: '📈',
    description: 'Data-driven insights',
  },
  {
    id: 'marketing',
    label: 'Marketing',
    icon: '📣',
    description: 'Growth & acquisition',
  },
  {
    id: 'finance',
    label: 'Finance',
    icon: '💰',
    description: 'Financial modeling & analysis',
  },
] as const;

// Flow steps
export const STEPS = [
  { id: 'phone', label: 'Phone' },
  { id: 'verify', label: 'Verify' },
  { id: 'skills', label: 'Skills' },
  { id: 'personalize', label: 'Name' },
  { id: 'dashboard', label: 'Home' },
] as const;
