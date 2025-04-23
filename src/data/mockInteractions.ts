
import { LinkedRecord, Comment, Rating, Notification, UserProfile } from '@/types';
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
  },
  // Additional relationship types
  {
    id: "3",
    source_id: mockCompanies[2].id,
    source_type: "company",
    target_id: mockHospitals[2].id,
    target_type: "hospital",
    relationship_type: "research_partner",
    notes: "Joint research on medical innovations",
    created_at: "2023-03-10T08:30:00Z",
    updated_at: "2023-05-22T09:15:00Z",
    created_by: mockUsers[2].id,
    last_modified_by: mockUsers[2].id
  },
  {
    id: "4",
    source_id: mockCompanies[3].id,
    source_type: "company",
    target_id: mockCompanies[0].id,
    target_type: "company",
    relationship_type: "competitor",
    notes: "Direct competitor in medical devices market",
    created_at: "2023-04-05T14:20:00Z",
    updated_at: "2023-04-05T14:20:00Z",
    created_by: mockUsers[3].id,
    last_modified_by: mockUsers[3].id,
    // Example of an inactive relationship
    status: "inactive"
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
  },
  // Additional comments with threading
  {
    id: "3",
    content: "Looking forward to our next collaboration",
    record_id: mockHospitals[0].id,
    record_type: "hospital",
    user_id: mockUsers[2].id,
    parent_id: "2",
    upvotes: 2,
    downvotes: 0,
    created_at: "2023-06-03T11:15:00Z",
    updated_at: "2023-06-03T11:15:00Z"
  },
  {
    id: "4",
    content: "Their IT department is excellent to work with",
    record_id: mockCompanies[0].id,
    record_type: "company",
    user_id: mockUsers[3].id,
    upvotes: 4,
    downvotes: 1,
    created_at: "2023-06-04T09:45:00Z",
    updated_at: "2023-06-04T09:45:00Z"
  },
  {
    id: "5",
    content: "I agree! They helped us implement our new system",
    record_id: mockCompanies[0].id,
    record_type: "company",
    user_id: mockUsers[4].id,
    parent_id: "4",
    upvotes: 2,
    downvotes: 0,
    created_at: "2023-06-05T13:20:00Z",
    updated_at: "2023-06-05T13:20:00Z"
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
  },
  // Additional ratings for different record types
  {
    id: "3",
    value: 3,
    record_id: mockUsers[3].id,
    record_type: "user",
    user_id: mockUsers[2].id,
    notes: "Average response time, but knowledgeable",
    created_at: "2023-05-22T10:30:00Z",
    updated_at: "2023-05-22T10:30:00Z"
  },
  {
    id: "4",
    value: 5,
    record_id: mockHospitals[2].id,
    record_type: "hospital",
    user_id: mockUsers[3].id,
    notes: "Outstanding research facilities",
    created_at: "2023-05-25T15:45:00Z",
    updated_at: "2023-05-25T15:45:00Z"
  },
  {
    id: "5",
    value: 2,
    record_id: mockCompanies[4].id,
    record_type: "company",
    user_id: mockUsers[4].id,
    notes: "Delayed deliveries, communication issues",
    created_at: "2023-05-30T09:20:00Z",
    updated_at: "2023-05-30T09:20:00Z"
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
  },
  // Additional notifications with different types
  {
    id: "3",
    title: "Record Update",
    content: "University Medical Research Center updated their information",
    user_id: mockUsers[2].id,
    read: false,
    action_url: "/hospitals/3",
    type: "update",
    record_id: mockHospitals[2].id,
    record_type: "hospital",
    created_at: "2023-06-05T08:45:00Z",
    updated_at: "2023-06-05T08:45:00Z"
  },
  {
    id: "4",
    title: "You were mentioned",
    content: "Sarah Miller mentioned you in a comment",
    user_id: mockUsers[3].id,
    read: false,
    action_url: "/comments/5",
    type: "mention",
    record_id: "5",
    record_type: "comment",
    created_at: "2023-06-05T13:25:00Z",
    updated_at: "2023-06-05T13:25:00Z"
  },
  {
    id: "5",
    title: "System Notification",
    content: "Your account permissions have been updated",
    user_id: mockUsers[4].id,
    read: false,
    type: "system",
    created_at: "2023-06-06T10:00:00Z",
    updated_at: "2023-06-06T10:00:00Z"
  }
];

// New: User Profile mock data with points and preferences
export const mockUserProfiles: UserProfile[] = [
  {
    id: "1",
    user_id: mockUsers[0].id,
    points: 520,
    bio: "Healthcare technology specialist with 10+ years of experience",
    following_records: [
      { id: mockHospitals[0].id, type: "hospital" },
      { id: mockCompanies[1].id, type: "company" }
    ],
    preferences: {
      notifications: {
        comments: true,
        ratings: true,
        mentions: true,
        updates: false
      },
      theme: "light",
      dashboardLayout: "compact"
    },
    created_at: "2022-05-15T09:00:00Z",
    updated_at: "2023-06-10T14:30:00Z"
  },
  {
    id: "2",
    user_id: mockUsers[1].id,
    points: 375,
    bio: "Medical distribution professional focused on hospital partnerships",
    following_records: [
      { id: mockHospitals[1].id, type: "hospital" },
      { id: mockHospitals[2].id, type: "hospital" }
    ],
    preferences: {
      notifications: {
        comments: true,
        ratings: true,
        mentions: true,
        updates: true
      },
      theme: "dark",
      dashboardLayout: "detailed"
    },
    created_at: "2022-06-20T11:30:00Z",
    updated_at: "2023-06-12T10:15:00Z"
  },
  {
    id: "3",
    user_id: mockUsers[2].id,
    points: 890,
    bio: "System administrator with healthcare IT background",
    following_records: [
      { id: mockCompanies[0].id, type: "company" },
      { id: mockCompanies[2].id, type: "company" },
      { id: mockHospitals[0].id, type: "hospital" }
    ],
    preferences: {
      notifications: {
        comments: false,
        ratings: false,
        mentions: true,
        updates: true
      },
      theme: "system",
      dashboardLayout: "compact"
    },
    created_at: "2022-04-10T08:15:00Z",
    updated_at: "2023-06-12T16:45:00Z"
  }
];
