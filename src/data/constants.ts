import { FamilyMember } from './types';

export const TENURE = ['Just moved in', 'Under 1 year', '1–3 years', '3–10 years', '10+ years'];

export const ONBOARDING_INTERESTS = [
  'Coffee',
  'Running',
  'Dogs',
  'Books',
  'Photography',
  'Young kids',
  'Tennis',
  'DIY',
  'Camping',
  'Foodie',
];

export const INTEREST_POOL = [
  'Coffee',
  'Running',
  'Dogs',
  'Books',
  'Photography',
  'Young kids',
  'Tennis',
  'DIY',
  'Camping',
  'Foodie',
  'Gardening',
  'Cooking',
];

export type ProfileData = {
  firstName: string;
  lastName: string;
  age: string;
  street: string;
  profession: string;
  yearsIn: string;
  bio: string;
  interests: string[];
  family: FamilyMember[];
};
