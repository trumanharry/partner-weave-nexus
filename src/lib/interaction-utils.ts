
import type { Rating, Comment, Notification, UserProfile } from '@/types';

export const calculateAverageRating = (ratings: Rating[]): number => {
  if (!ratings.length) return 0;
  const sum = ratings.reduce((acc, rating) => acc + rating.value, 0);
  return Math.round((sum / ratings.length) * 10) / 10;
};

export const getThreadedComments = (comments: Comment[]): Comment[] => {
  const topLevelComments = comments.filter(comment => !comment.parent_id);
  const commentsByParentId = comments.reduce((acc, comment) => {
    if (comment.parent_id) {
      if (!acc[comment.parent_id]) {
        acc[comment.parent_id] = [];
      }
      acc[comment.parent_id].push(comment);
    }
    return acc;
  }, {} as Record<string, Comment[]>);
  
  return topLevelComments;
};

export const calculateUserPoints = (
  profile: UserProfile,
  comments: Comment[],
  ratings: Rating[]
): number => {
  // Points calculation rules:
  // - 10 points per rating
  // - 5 points per comment
  // - 2 points per upvote received
  const commentPoints = comments.length * 5;
  const ratingPoints = ratings.length * 10;
  const upvotePoints = comments.reduce((acc, comment) => acc + comment.upvotes * 2, 0);
  
  return commentPoints + ratingPoints + upvotePoints;
};

export const formatNotification = (notification: Notification): string => {
  const timeAgo = new Date(notification.created_at).toLocaleDateString();
  return `${notification.title} - ${notification.content} (${timeAgo})`;
};
