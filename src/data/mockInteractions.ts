
import { LinkedRecord, Comment, Rating, Notification } from '@/types';
import { mockUsers, mockCompanies, mockHospitals } from './mockData';

export const mockLinkedRecords: LinkedRecord[] = [
  {
    id: "1",
    source_id: mockCompanies[0].id,
    source_type: "company",
    target_id: mockHospitals[0].id,
    target_type: "hospital",
    relationship_type: "supplier",
    notes: "Primary medical equipment supplier",
    created_at: "2023-01-15T08:00:00Z",
    updated_at: "2023-04-22T14:30:00Z",
    created_by: mockUsers[0].id,
    last_modified_by: mockUsers[0].id
  },
  {
    id: "2",
    source_id: mockCompanies[1].id,
    source_type: "company",
    target_id: mockHospitals[1].id,
    target_type: "hospital",
    relationship_type: "distributor",
    notes: "Regional medical supplies distributor",
    created_at: "2023-02-20T10:15:00Z",
    updated_at: "2023-05-17T09:20:00Z",
    created_by: mockUsers[1].id,
    last_modified_by: mockUsers[1].id
  }
];

export const mockComments: Comment[] = [
  {
    id: "1",
    content: "Great partner hospital, very responsive team",
    record_id: mockHospitals[0].id,
    record_type: "hospital",
    user_id: mockUsers[0].id,
    upvotes: 5,
    downvotes: 0,
    created_at: "2023-06-01T09:00:00Z",
    updated_at: "2023-06-01T09:00:00Z"
  },
  {
    id: "2",
    content: "Successfully completed the medical equipment installation",
    record_id: mockHospitals[0].id,
    record_type: "hospital",
    user_id: mockUsers[1].id,
    parent_id: "1",
    upvotes: 3,
    downvotes: 0,
    created_at: "2023-06-02T10:30:00Z",
    updated_at: "2023-06-02T10:30:00Z"
  }
];

export const mockRatings: Rating[] = [
  {
    id: "1",
    value: 5,
    record_id: mockHospitals[0].id,
    record_type: "hospital",
    user_id: mockUsers[0].id,
    notes: "Excellent facility and staff",
    created_at: "2023-05-15T08:30:00Z",
    updated_at: "2023-05-15T08:30:00Z"
  },
  {
    id: "2",
    value: 4,
    record_id: mockCompanies[0].id,
    record_type: "company",
    user_id: mockUsers[1].id,
    notes: "Good service, room for improvement",
    created_at: "2023-05-20T14:15:00Z",
    updated_at: "2023-05-20T14:15:00Z"
  }
];

export const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New Comment",
    content: "Someone commented on Central City Medical Center",
    user_id: mockUsers[0].id,
    read: false,
    action_url: "/hospitals/1",
    type: "comment",
    record_id: mockHospitals[0].id,
    record_type: "hospital",
    created_at: "2023-06-02T10:30:00Z",
    updated_at: "2023-06-02T10:30:00Z"
  },
  {
    id: "2",
    title: "New Rating",
    content: "MedTech Solutions received a new rating",
    user_id: mockUsers[1].id,
    read: true,
    action_url: "/companies/1",
    type: "rating",
    record_id: mockCompanies[0].id,
    record_type: "company",
    created_at: "2023-05-20T14:15:00Z",
    updated_at: "2023-05-20T14:15:00Z"
  }
];
