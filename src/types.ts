/**
 * Types and Interfaces for Joshua's Credit Framework Squeeze Page
 */

export interface AppSettings {
  googleWebAppUrl: string;
  whatsAppNumber: string;
  customMessage: string;
  freeTrainingUrl: string;
}

export interface Testimonial {
  id: string;
  title: string;
  clientName: string;
  role: string;
  imageUrl: string;
  videoUrl?: string;
}

export interface LearnFeature {
  id: string;
  title: string;
  description: string;
  iconName: 'FileText' | 'AlertTriangle' | 'ShieldCheck' | 'Eye' | 'TrendingUp' | 'CircleDollarSign';
}

export interface PackageDeliverable {
  title: string;
  features: string[];
}
