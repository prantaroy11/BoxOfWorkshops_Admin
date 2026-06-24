/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Practitioner {
  id: number;
  name?: string;
  contactPerson?: string;
  businessName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  profileImageUrl?: string;
}

export interface ServiceType {
  id: number;
  name: string;
  slug: string;
}

export interface WorkshopListing {
  id: number;
  title?: string;
  shortDescription?: string;
  description?: string;
  priceFrom?: number;
  price?: number;
  isApproved?: boolean;
  visibilityStatus?: string;
  createdAt?: string;
  updatedAt?: string;
  practitioner?: Practitioner;
  serviceType?: ServiceType;
  workshop?: {
    duration?: string;
    maxGroupSize?: number;
    whatHappens?: string;
    format?: string;
    categoryTags?: string[];
    availability?: {
      dateTime?: string;
    };
  };
  category?: {
    name?: string;
  };
  subcategories?: any[];
  // Other potential fields from CommonListing
  location?: string;
  date?: string;
  time?: string;
}

export interface PaginatedResponse<T> {
  results?: T[];
  rows?: T[];
  data?: T[];
  docs?: T[];
  items?: T[];
  count?: number;
  totalDocs?: number;
  total?: number;
}
