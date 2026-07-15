import { theme } from '../theme';
import { NotificationItem } from './types';

const C = theme.colors;

export const NOTIFICATIONS: NotificationItem[] = [
  {
    id: 1,
    emoji: '👋',
    tint: C.marigoldSoft,
    title: 'Maya waved back!',
    sub: "You're connected — open her page",
    time: '12m',
    go: { type: 'person', id: 'maya' },
  },
  {
    id: 2,
    emoji: '🌮',
    tint: C.mint,
    title: 'Taco Luz arriving in 30 min',
    sub: 'Heron Pond lot · 5–8pm tonight',
    time: '28m',
    go: { type: 'event', id: 'tacos' },
  },
  {
    id: 3,
    emoji: '🗳️',
    tint: C.lilac,
    title: 'New fine posted for community vote',
    sub: '$150 — basketball hoop, Wren Ct',
    time: '2h',
    go: { type: 'tab', id: 'Ask' },
  },
  {
    id: 4,
    emoji: '🏛️',
    tint: C.sky,
    title: 'HOA board replied to your message',
    sub: 'Re: streetlight out on Wren Ct',
    time: '5h',
    go: { type: 'tab', id: 'HOA' },
  },
  {
    id: 5,
    emoji: '🎾',
    tint: C.mint,
    title: 'Pickleball Round Robin — Sat 9am',
    sub: "You RSVP'd · 14 going now",
    time: '1d',
    go: { type: 'event', id: 'pickle' },
  },
  {
    id: 6,
    emoji: '🐶',
    tint: C.blush,
    title: 'Biscuit is home!',
    sub: 'The Kims thanked the search party',
    time: '2d',
    go: { type: 'person', id: 'kim' },
  },
];
