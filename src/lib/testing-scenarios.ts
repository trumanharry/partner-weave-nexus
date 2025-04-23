
import { 
  calculateAverageRating, 
  getThreadedComments, 
  calculateUserPoints,
  formatNotification,
  getRelationshipType,
  findCommonRelationships,
  validateRating,
  validateComment,
  validateRelationship,
  formatUserPointsBreakdown
} from './interaction-utils';

import {
  fetchRelatedRecords,
  fetchCommentsForRecord,
  fetchRatingsForRecord,
  fetchUserNotifications,
  fetchUserProfile,
  createComment,
  createRating,
  createLinkedRecord,
  fetchThreadedComments,
  fetchActivityFeed,
  updateUserPoints
} from './api-utils';

import type { 
  Comment, 
  Rating, 
  LinkedRecord, 
  Notification, 
  User, 
  Company, 
  Hospital, 
  Physician, 
  UserProfile,
  RecordType
} from '@/types';

import { 
  mockUsers, 
  mockCompanies, 
  mockHospitals, 
  mockPhysicians 
} from '@/data/mockData';

import { 
  mockComments, 
  mockRatings, 
  mockLinkedRecords, 
  mockNotifications, 
  mockUserProfiles 
} from '@/data/mockInteractions';

// Types for test results
interface TestResult {
  passed: boolean;
  message: string;
  data?: any;
}

interface TestScenario {
  name: string;
  description: string;
  execute: () => Promise<TestResult>;
}

// Test scenario 1: Polymorphic relationships - Comments on different record types
const testPolymorphicComments: TestScenario = {
  name: 'Polymorphic Comments',
  description: 'Test comments on different record types (company, hospital, physician)',
  execute: async (): Promise<TestResult> => {
    try {
      // Test commenting on different entity types
      const companyComment = await createComment(
        'Test comment on company',
        mockCompanies[0].id,
        'company',
        mockUsers[0].id
      );
      
      const hospitalComment = await createComment(
        'Test comment on hospital',
        mockHospitals[0].id,
        'hospital',
        mockUsers[0].id
      );
      
      const physicianComment = await createComment(
        'Test comment on physician',
        mockPhysicians[0].id,
        'physician',
        mockUsers[0].id
      );
      
      // Test threading - reply to the company comment
      const replyComment = await createComment(
        'Reply to company comment',
        mockCompanies[0].id,
        'company',
        mockUsers[1].id,
        companyComment.id
      );
      
      return {
        passed: true,
        message: 'Successfully created comments on different record types and tested threading',
        data: {
          companyComment,
          hospitalComment,
          physicianComment,
          replyComment
        }
      };
    } catch (error) {
      return {
        passed: false,
        message: `Failed to test polymorphic comments: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
};

// Test scenario 2: User points system
const testUserPointsSystem: TestScenario = {
  name: 'User Points System',
  description: 'Test user points calculation and updates',
  execute: async (): Promise<TestResult> => {
    try {
      const userId = mockUsers[0].id;
      const userProfile = await fetchUserProfile(userId);
      
      if (!userProfile) {
        return {
          passed: false,
          message: `User profile not found for user ${userId}`
        };
      }
      
      // Get user's current comments and ratings
      const userComments = mockComments.filter(comment => comment.user_id === userId);
      const userRatings = mockRatings.filter(rating => rating.user_id === userId);
      
      // Calculate expected points
      const calculatedPoints = calculateUserPoints(userProfile, userComments, userRatings);
      
      // Get points breakdown
      const pointsBreakdown = formatUserPointsBreakdown(userComments, userRatings);
      
      // Test updating points
      const updatedProfile = await updateUserPoints(userId, 50);
      
      return {
        passed: true,
        message: 'Successfully calculated and updated user points',
        data: {
          originalPoints: userProfile.points,
          calculatedPoints,
          pointsBreakdown,
          updatedPoints: updatedProfile?.points
        }
      };
    } catch (error) {
      return {
        passed: false,
        message: `Failed to test user points system: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
};

// Test scenario 3: Notification generation and activity feed
const testNotificationsAndActivityFeed: TestScenario = {
  name: 'Notifications and Activity Feed',
  description: 'Test notification generation and activity feed retrieval',
  execute: async (): Promise<TestResult> => {
    try {
      const userId = mockUsers[0].id;
      
      // Retrieve user notifications
      const notifications = await fetchUserNotifications(userId);
      
      // Format a notification
      const formattedNotification = notifications.length > 0 ? 
        formatNotification(notifications[0]) : 'No notifications found';
      
      // Test activity feed
      const activityFeed = await fetchActivityFeed(userId, 5);
      
      return {
        passed: true,
        message: 'Successfully retrieved notifications and activity feed',
        data: {
          notificationCount: notifications.length,
          formattedNotification,
          activityFeed
        }
      };
    } catch (error) {
      return {
        passed: false,
        message: `Failed to test notifications: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
};

// Test scenario 4: Threaded comments
const testThreadedComments: TestScenario = {
  name: 'Threaded Comments',
  description: 'Test retrieval of threaded comments with proper hierarchy',
  execute: async (): Promise<TestResult> => {
    try {
      // Get threaded comments for a hospital
      const hospitalId = mockHospitals[0].id;
      const threadedComments = await fetchThreadedComments(hospitalId, 'hospital');
      
      // Check that replies are properly nested
      const hasThreadedStructure = threadedComments.some(comment => 
        comment.replies && comment.replies.length > 0
      );
      
      return {
        passed: hasThreadedStructure,
        message: hasThreadedStructure ? 
          'Successfully retrieved threaded comments with proper hierarchy' : 
          'No threaded comments found or threading not working properly',
        data: {
          threadedComments
        }
      };
    } catch (error) {
      return {
        passed: false,
        message: `Failed to test threaded comments: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
};

// Test scenario 5: Related records and relationships
const testRelatedRecordsAndRelationships: TestScenario = {
  name: 'Related Records and Relationships',
  description: 'Test fetching related records and relationship validation',
  execute: async (): Promise<TestResult> => {
    try {
      const companyId = mockCompanies[0].id;
      
      // Fetch related records for a company
      const relatedRecords = await fetchRelatedRecords(companyId, 'company');
      
      // Get possible relationship types
      const possibleRelationships = getRelationshipType('company', 'hospital');
      
      // Test relationship validation
      const validRelationship = validateRelationship('company', 'hospital', 'supplier');
      const invalidRelationship = validateRelationship('company', 'hospital', 'invalid_type');
      
      // Find common relationships
      const commonRelationships = findCommonRelationships(mockLinkedRecords, companyId);
      
      // Create a new relationship
      const newRelationship = await createLinkedRecord(
        mockCompanies[1].id,
        'company',
        mockHospitals[2].id,
        'hospital',
        'supplier',
        mockUsers[0].id,
        'Test relationship'
      );
      
      return {
        passed: validRelationship && !invalidRelationship,
        message: 'Successfully tested relationship functionality',
        data: {
          relatedRecordsCount: relatedRecords.length,
          possibleRelationships,
          validRelationship,
          invalidRelationship,
          commonRelationships,
          newRelationship
        }
      };
    } catch (error) {
      return {
        passed: false,
        message: `Failed to test relationships: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
};

// Test scenario 6: Data validation
const testDataValidation: TestScenario = {
  name: 'Data Validation',
  description: 'Test validation functions for ratings, comments and relationships',
  execute: async (): Promise<TestResult> => {
    try {
      // Test rating validation
      const validRating = validateRating(4);
      const invalidRatingHigh = validateRating(6);
      const invalidRatingLow = validateRating(0);
      
      // Test comment validation
      const validComment = validateComment('This is a valid comment');
      const invalidComment = validateComment('');
      
      return {
        passed: validRating && !invalidRatingHigh && !invalidRatingLow && validComment && !invalidComment,
        message: 'Data validation tests completed',
        data: {
          validRating,
          invalidRatingHigh,
          invalidRatingLow,
          validComment,
          invalidComment
        }
      };
    } catch (error) {
      return {
        passed: false,
        message: `Failed to test data validation: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
};

// Create more extensive data scenarios
const testMoreExtensiveDataScenarios: TestScenario = {
  name: 'Extensive Data Scenarios',
  description: 'Test with more diverse and edge case data',
  execute: async (): Promise<TestResult> => {
    try {
      // Create a multi-level threaded comment (comment with replies to replies)
      const parentComment = await createComment(
        'Parent comment for threading test',
        mockHospitals[0].id,
        'hospital',
        mockUsers[0].id
      );
      
      const childComment = await createComment(
        'First level reply',
        mockHospitals[0].id,
        'hospital',
        mockUsers[1].id,
        parentComment.id
      );
      
      const grandchildComment = await createComment(
        'Second level reply',
        mockHospitals[0].id,
        'hospital',
        mockUsers[2].id,
        childComment.id
      );
      
      // Test uncommon relationship types
      const uncommonRelationship = await createLinkedRecord(
        mockCompanies[0].id,
        'company',
        mockPhysicians[0].id,
        'physician',
        'advisor',
        mockUsers[0].id,
        'Physician serving as advisor to company'
      );
      
      // Create a rating with edge case value (minimum valid)
      const minRating = await createRating(
        1,
        mockPhysicians[0].id,
        'physician',
        mockUsers[0].id,
        'Minimum rating test'
      );
      
      // Create a rating with max value
      const maxRating = await createRating(
        5,
        mockPhysicians[0].id,
        'physician',
        mockUsers[1].id,
        'Maximum rating test'
      );
      
      return {
        passed: true,
        message: 'Successfully tested extensive data scenarios with edge cases',
        data: {
          threadedComments: {
            parent: parentComment,
            child: childComment,
            grandchild: grandchildComment
          },
          uncommonRelationship,
          ratings: {
            min: minRating,
            max: maxRating
          }
        }
      };
    } catch (error) {
      return {
        passed: false,
        message: `Failed to test extensive data scenarios: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
};

// Run all test scenarios
export const runAllTestScenarios = async (): Promise<Record<string, TestResult>> => {
  const scenarios = [
    testPolymorphicComments,
    testUserPointsSystem,
    testNotificationsAndActivityFeed,
    testThreadedComments,
    testRelatedRecordsAndRelationships,
    testDataValidation,
    testMoreExtensiveDataScenarios
  ];
  
  const results: Record<string, TestResult> = {};
  
  for (const scenario of scenarios) {
    console.log(`Running test scenario: ${scenario.name}`);
    results[scenario.name] = await scenario.execute();
    console.log(`Result: ${results[scenario.name].passed ? 'PASSED' : 'FAILED'}`);
    console.log(results[scenario.name].message);
    console.log('-----------------------');
  }
  
  return results;
};

// Function to test a specific scenario by name
export const runTestScenario = async (scenarioName: string): Promise<TestResult | null> => {
  const scenarios: Record<string, TestScenario> = {
    'PolymorphicComments': testPolymorphicComments,
    'UserPointsSystem': testUserPointsSystem,
    'NotificationsAndActivityFeed': testNotificationsAndActivityFeed,
    'ThreadedComments': testThreadedComments,
    'RelatedRecordsAndRelationships': testRelatedRecordsAndRelationships,
    'DataValidation': testDataValidation,
    'ExtensiveDataScenarios': testMoreExtensiveDataScenarios
  };
  
  const scenario = scenarios[scenarioName];
  if (!scenario) {
    console.log(`Test scenario "${scenarioName}" not found`);
    return null;
  }
  
  console.log(`Running test scenario: ${scenario.name}`);
  const result = await scenario.execute();
  console.log(`Result: ${result.passed ? 'PASSED' : 'FAILED'}`);
  console.log(result.message);
  
  return result;
};

export const getAvailableTestScenarios = (): string[] => {
  return [
    'PolymorphicComments',
    'UserPointsSystem',
    'NotificationsAndActivityFeed',
    'ThreadedComments',
    'RelatedRecordsAndRelationships',
    'DataValidation',
    'ExtensiveDataScenarios'
  ];
};
