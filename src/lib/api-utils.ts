import type { LinkedRecord, Comment, Rating, Notification } from '@/types';
import { 
  mockLinkedRecords, 
  mockComments, 
  mockRatings, 
  mockNotifications 
} from '@/data/mockInteractions';

export const fetchRelatedRecords = async (
  recordId: string,
  recordType: 'company' | 'hospital' | 'user' | 'contact' | 'physician'
): Promise<LinkedRecord[]> => {
  // This would be replaced with actual API call when Supabase is connected
  return mockLinkedRecords.filter(
    record => 
      (record.source_id === recordId && record.source_type === recordType) ||
      (record.target_id === recordId && record.target_type === recordType)
  );
};

export const fetchCommentsForRecord = async (
  recordId: string,
  recordType: 'company' | 'hospital' | 'user' | 'contact' | 'physician'
): Promise<Comment[]> => {
  // This would be replaced with actual API call when Supabase is connected
  return mockComments.filter(
    comment => comment.record_id === recordId && comment.record_type === recordType
  );
};

export const fetchRatingsForRecord = async (
  recordId: string,
  recordType: 'company' | 'hospital' | 'user' | 'contact' | 'physician'
): Promise<Rating[]> => {
  // This would be replaced with actual API call when Supabase is connected
  return mockRatings.filter(
    rating => rating.record_id === recordId && rating.record_type === recordType
  );
};

export const fetchUserNotifications = async (userId: string): Promise<Notification[]> => {
  // This would be replaced with actual API call when Supabase is connected
  return mockNotifications.filter(notification => notification.user_id === userId);
};
