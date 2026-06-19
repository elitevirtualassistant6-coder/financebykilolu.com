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
    title: 'CIFAS Marker successfully challenged & removed',
    clientName: 'David K.',
    role: 'Professional Services',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    videoUrl: 'https://youtube.com/shorts/GFZ5r9O3dDs'
  },
  {
    id: 't2',
    title: 'Secured £45,000 corporate finance in 3 months',
    clientName: 'Michelle O.',
    role: 'Tech Founder',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    videoUrl: 'https://youtube.com/shorts/PXCALQrqkhA'
  },
  {
    id: 't4',
    title: 'Clean profile allowed me to buy my family home',
    clientName: 'Sarah T.',
    role: 'Retail Manager',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    videoUrl: 'https://youtube.com/shorts/2XOn6X1eROY'
  },
  {
    id: 't5',
    title: 'CCJ dispute cleared; now set up for funding',
    clientName: 'Marcus G.',
    role: 'Logistics Consultant',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400',
    videoUrl: 'https://youtube.com/shorts/f6ZG5LVZMT0'
  }
];

export const EXPECTED_RESULTS = [
  'Improved credit scores across major credit reference agencies.',
  'Identification and challenge of inaccurate negative reporting.',
  'Greater confidence when submitting loan or mortgage applications.',
  'Access to competitive rates and higher tier funding limits.'
];
