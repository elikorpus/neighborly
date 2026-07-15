import { theme } from '../theme';
import { FamilyMember, Neighborhood } from './types';

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

const C = theme.colors;

export const NEIGHBORHOODS: Neighborhood[] = [
  { name: 'Cypress Bend', score: 87, you: true, blurb: 'You live here', kids: '+12%', events: 9 },
  { name: 'Willow Marsh', score: 81, blurb: 'Older trees, quieter, strong garden club', kids: '+3%', events: 6 },
  { name: 'The Groves at Brazos', score: 76, blurb: 'New build, amenities still filling in', kids: '+21%', events: 4 },
  { name: 'Lakeshore Landing', score: 68, blurb: 'Great pool, low event turnout', kids: '-2%', events: 3 },
];

export const NEIGHBORHOOD_TRENDS: [string, string, string][] = [
  ['Families with kids under 10', '+12% this year', '34 new kids since Jan'],
  ['Community events per month', '9 (up from 6)', 'Run club + mahjong are carrying'],
  ['Help-request response time', '26 min average', 'Fastest in the county'],
  ['Homes sold above asking', '8 of last 11', 'Avg 6 days on market'],
  ['New-neighbor welcome rate', '96%', 'The Ortegas got 23 waves'],
];

export const REALTORS = [
  { name: 'Lena Ward', tag: 'Lives on Cypress Bend Dr', deals: '14 homes sold here', initials: 'LW', bg: C.marigoldSoft },
  { name: 'Ward Realty Group', tag: 'Insights Certified · Houston NW', deals: '4.9★ from 61 neighbors', initials: 'WR', bg: C.sky },
];

export const NEIGHBORHOOD_SPOTS: [string, string, string][] = [
  ['🌮', 'Taco Luz Truck', 'Heron Pond lot · tonight 5–8p'],
  ['🎾', 'Pickleball Courts', '4 courts, lights until 9p'],
  ['📚', 'Little Free Library', 'Corner of Wren Ct — cookies today'],
  ['🌱', 'Community Garden', 'Plot waitlist: 3'],
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
