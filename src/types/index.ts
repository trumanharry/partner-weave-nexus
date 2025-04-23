
// Common fields all records will have
export interface BaseRecord {
  id: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
  last_modified_by?: string;
}

// User roles
export type UserRole = 'admin' | 'corporate' | 'distributor';

// Company record
export interface Company extends BaseRecord {
  name: string;
  industry?: string;
  website?: string;
  logo_url?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  phone?: string;
  email?: string;
  status?: 'active' | 'inactive' | 'prospect' | 'former';
  notes?: string;
  company_type?: 'corporate' | 'distributor' | 'supplier' | 'partner' | 'competitor' | 'other';
  revenue_tier?: 'enterprise' | 'mid-market' | 'small-business' | 'startup';
}

// Hospital record
export interface Hospital extends BaseRecord {
  name: string;
  type?: 'general' | 'specialized' | 'teaching' | 'psychiatric' | 'rehabilitation' | 'other';
  beds?: number;
  website?: string;
  logo_url?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  phone?: string;
  email?: string;
  status?: 'active' | 'inactive' | 'prospect';
  notes?: string;
}

// User record (for system users)
export interface User extends BaseRecord {
  email: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  role: UserRole;
  company_id?: string;
  title?: string;
  phone?: string;
  status: 'active' | 'inactive' | 'pending';
  last_login?: string;
}

// Contact record (not system users)
export interface Contact extends BaseRecord {
  first_name: string;
  last_name: string;
  email?: string;
  company_id?: string;
  title?: string;
  phone?: string;
  mobile?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  notes?: string;
  status?: 'active' | 'inactive' | 'lead';
  avatar_url?: string;
}

// Physician specialties
export type PhysicianSpecialty =
  | 'cardiology'
  | 'dermatology'
  | 'endocrinology'
  | 'gastroenterology'
  | 'neurology'
  | 'oncology'
  | 'orthopedics'
  | 'pediatrics'
  | 'psychiatry'
  | 'radiology'
  | 'surgery'
  | 'urology'
  | 'other';

// Physician record
export interface Physician extends BaseRecord {
  first_name: string;
  last_name: string;
  email?: string;
  specialty: PhysicianSpecialty;
  hospital_ids?: string[];
  title?: string;
  phone?: string;
  avatar_url?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  notes?: string;
  status?: 'active' | 'inactive' | 'prospect';
}

// Comment record
export interface Comment extends BaseRecord {
  content: string;
  record_id: string;
  record_type: 'company' | 'hospital' | 'user' | 'contact' | 'physician' | 'comment';
  user_id: string;
  parent_id?: string;
  upvotes: number;
  downvotes: number;
}

// Rating record
export interface Rating extends BaseRecord {
  value: number; // 1-5 stars
  record_id: string;
  record_type: 'company' | 'hospital' | 'user' | 'contact' | 'physician';
  user_id: string;
  notes?: string;
}

// Notification record
export interface Notification extends BaseRecord {
  title: string;
  content: string;
  user_id: string;
  read: boolean;
  action_url?: string;
  type: 'comment' | 'rating' | 'update' | 'mention' | 'system';
  record_id?: string;
  record_type?: 'company' | 'hospital' | 'user' | 'contact' | 'physician' | 'comment';
}

// Linked Record type
export interface LinkedRecord extends BaseRecord {
  source_id: string;
  source_type: 'company' | 'hospital' | 'user' | 'contact' | 'physician';
  target_id: string;
  target_type: 'company' | 'hospital' | 'user' | 'contact' | 'physician';
  relationship_type?: string;
  notes?: string;
  status?: 'active' | 'inactive';
}

// User Profile
export interface UserProfile extends BaseRecord {
  user_id: string;
  points: number;
  bio?: string;
  following_records?: {
    id: string;
    type: 'company' | 'hospital' | 'user' | 'contact' | 'physician';
  }[];
  preferences?: Record<string, any>;
}

// Generic Record Type
export type RecordType = Company | Hospital | User | Contact | Physician;

// Mock data for dashboard
export interface DashboardStats {
  totalCompanies: number;
  totalHospitals: number;
  totalContacts: number;
  totalPhysicians: number;
  activeUsers: number;
  recentActivity: {
    id: string;
    type: 'comment' | 'rating' | 'update' | 'new';
    user: string;
    record: string;
    recordType: 'company' | 'hospital' | 'user' | 'contact' | 'physician';
    timestamp: string;
    description: string;
  }[];
}
