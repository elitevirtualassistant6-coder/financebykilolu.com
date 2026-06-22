import { LearnFeature, Testimonial } from './types';

export const LEARN_FEATURES: LearnFeature[] = [
  {
    id: 'f1',
    title: 'Review Credit Reports',
    description: 'How to properly obtain, inspect, and analyze your credit files across multiple credit reference agencies.',
    iconName: 'FileText'
  },
  {
    id: 'f2',
    title: 'Avoid Common Mistakes',
    description: 'Discover key errors and common traps that inadvertently lock people into poor credit brackets.',
    iconName: 'AlertTriangle'
  },
  {
    id: 'f3',
    title: 'Challenge Reporting Errors',
    description: 'The practical process to identify factual inaccuracies and formal ways to challenge them.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'f4',
    title: 'Understand Lender Criteria',
    description: 'What underwriters and scoring algorithms look for during physical and automated reviews.',
    iconName: 'Eye'
  },
  {
    id: 'f5',
    title: 'Strengthen Your Profile',
    description: 'Steps to consistently build positive credit history and structural stability over time.',
    iconName: 'TrendingUp'
  },
  {
    id: 'f6',
    title: 'Position for Funding',
    description: 'Build credit architecture optimized for securing commercial, property, or growth funding.',
    iconName: 'CircleDollarSign'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    title: 'Kayla had an unfair CIFAS marker removed after following our steps',
    clientName: 'kayla',
    role: 'Case Study',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    videoUrl: 'https://youtube.com/shorts/GFZ5r9O3dDs'
  },
  {
    id: 't2',
    title: 'Bernard had a default off in just 3 days',
    clientName: 'Bernard',
    role: 'Success Story',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    videoUrl: 'https://youtube.com/shorts/PXCALQrqkhA'
  },
  {
    id: 't3',
    title: 'Chris went for Done for you 1-2-1 and the CIFAS marker was finally removed',
    clientName: 'Chris',
    role: 'Done-for-You Client',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    videoUrl: 'https://www.youtube.com/shorts/nO-dms_ZZEQ?feature=share'
  },
  {
    id: 't4',
    title: 'Donte had multiple CIFAS markers & Late payments removed following our process',
    clientName: 'Donte',
    role: 'Squeeze Graduate',
    imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400',
    videoUrl: 'https://youtu.be/U_ZITIVrg1w'
  },
  {
    id: 't5',
    title: 'Amadou had 4 defaults removed after making a scripted phone call',
    clientName: 'Amadou',
    role: 'Challenge Case Study',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
    videoUrl: 'https://youtube.com/shorts/D7ZkCNWeuEc'
  },
  {
    id: 't6',
    title: 'Wasim had multiple accounts shut down and had his complaint rejected',
    clientName: 'Wasim',
    role: 'Case Review',
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
    videoUrl: 'https://youtu.be/Lo0bNKEel24'
  }
];

export const EXPECTED_RESULTS = [
  'Improved credit scores across major credit reference agencies.',
  'Identification and challenge of inaccurate negative reporting.',
  'Greater confidence when submitting loan or mortgage applications.',
  'Access to competitive rates and higher tier funding limits.'
];
