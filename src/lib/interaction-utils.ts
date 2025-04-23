import type { Rating, Comment, Notification, UserProfile, LinkedRecord } from '@/types';

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
  
  const addReplies = (comment: Comment) => {
    const replies = commentsByParentId[comment.id] || [];
    comment.replies = replies;
    replies.forEach(reply => addReplies(reply));
    return comment;
  };

  return topLevelComments.map(comment => addReplies({...comment}));
};

export const calculateUserPoints = (
  profile: UserProfile,
  comments: Comment[],
  ratings: Rating[]
): number => {
  const commentPoints = comments.length * 5;
  const ratingPoints = ratings.length * 10;
  const upvotePoints = comments.reduce((acc, comment) => acc + comment.upvotes * 2, 0);
  
  return commentPoints + ratingPoints + upvotePoints;
};

export const formatNotification = (notification: Notification): string => {
  const timeAgo = new Date(notification.created_at).toLocaleDateString();
  return `${notification.title} - ${notification.content} (${timeAgo})`;
};

export const getRelationshipType = (
  sourceType: string,
  targetType: string
): string[] => {
  const relationshipMap: Record<string, Record<string, string[]>> = {
    company: {
      hospital: ['supplier', 'distributor', 'partner', 'research_partner'],
      physician: ['employer', 'collaborator', 'advisor'],
      company: ['competitor', 'partner', 'subsidiary', 'parent'],
      user: ['employer'],
      contact: ['employer']
    },
    hospital: {
      company: ['client', 'research_partner', 'affiliate'],
      physician: ['employer', 'privilege_granter'],
      hospital: ['network_member', 'affiliate', 'referral_partner'],
      user: ['employer'],
      contact: ['employer']
    },
    physician: {
      company: ['consultant', 'employee', 'researcher'],
      hospital: ['staff', 'contractor', 'researcher'],
      physician: ['colleague', 'referring_physician', 'supervisor'],
      user: ['account_owner'],
      contact: ['related_contact']
    },
    user: {
      company: ['employee', 'representative'],
      hospital: ['employee', 'representative'],
      physician: ['representative'],
      user: ['colleague', 'manager', 'subordinate'],
      contact: ['contact_owner']
    },
    contact: {
      company: ['employee', 'representative', 'prospect'],
      hospital: ['employee', 'representative', 'patient'],
      physician: ['patient', 'colleague'],
      user: ['managed_by'],
      contact: ['colleague', 'related_contact']
    }
  };
  
  return relationshipMap[sourceType]?.[targetType] || ['related'];
};

export const findCommonRelationships = (
  linkedRecords: LinkedRecord[],
  entityId: string
): { entityId: string; entityType: string; relationshipCount: number }[] => {
  const relatedEntities = new Map<string, { entityType: string, count: number }>();
  
  linkedRecords.forEach(record => {
    let relatedId: string | null = null;
    let relatedType: string | null = null;
    
    if (record.source_id === entityId) {
      relatedId = record.target_id;
      relatedType = record.target_type;
    } else if (record.target_id === entityId) {
      relatedId = record.source_id;
      relatedType = record.source_type;
    }
    
    if (relatedId && relatedType) {
      const key = `${relatedType}-${relatedId}`;
      if (relatedEntities.has(key)) {
        const current = relatedEntities.get(key)!;
        relatedEntities.set(key, { ...current, count: current.count + 1 });
      } else {
        relatedEntities.set(key, { entityType: relatedType, count: 1 });
      }
    }
  });
  
  return Array.from(relatedEntities.entries())
    .map(([key, value]) => ({
      entityId: key.split('-')[1],
      entityType: value.entityType,
      relationshipCount: value.count
    }))
    .sort((a, b) => b.relationshipCount - a.relationshipCount);
};

export const createNotificationContent = (
  type: 'comment' | 'rating' | 'update' | 'mention' | 'system',
  actorName: string,
  targetName: string,
  targetType: string,
  details?: string
): string => {
  switch (type) {
    case 'comment':
      return `${actorName} commented on ${targetName} (${targetType})${details ? ': ' + details : ''}`;
    case 'rating':
      return `${actorName} rated ${targetName} (${targetType}) ${details || ''}`;
    case 'update':
      return `${actorName} updated ${targetName} (${targetType})`;
    case 'mention':
      return `${actorName} mentioned you in a comment on ${targetName} (${targetType})`;
    case 'system':
      return details || 'System notification';
    default:
      return '';
  }
};

export const validateRating = (value: number): boolean => {
  return value >= 1 && value <= 5;
};

export const validateComment = (content: string): boolean => {
  return content.trim().length > 0 && content.length <= 1000;
};

export const validateRelationship = (
  sourceType: string, 
  targetType: string, 
  relationshipType: string
): boolean => {
  const validTypes = getRelationshipType(sourceType, targetType);
  return validTypes.includes(relationshipType);
};

export const formatUserPointsBreakdown = (
  comments: Comment[],
  ratings: Rating[]
): { source: string; points: number }[] => {
  const breakdown = [];
  
  const commentPoints = comments.length * 5;
  if (commentPoints > 0) {
    breakdown.push({ source: 'Comments', points: commentPoints });
  }
  
  const ratingPoints = ratings.length * 10;
  if (ratingPoints > 0) {
    breakdown.push({ source: 'Ratings', points: ratingPoints });
  }
  
  const upvotePoints = comments.reduce((acc, comment) => acc + comment.upvotes * 2, 0);
  if (upvotePoints > 0) {
    breakdown.push({ source: 'Upvotes received', points: upvotePoints });
  }
  
  return breakdown;
};
