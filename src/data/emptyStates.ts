import { theme } from '../theme';

const C = theme.colors;

export type EmptyStateConfig = {
  emoji: string;
  tint: string;
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
};

export const EMPTY_STATES: Record<'today' | 'meet' | 'ask' | 'events' | 'discover' | 'hoa', EmptyStateConfig> = {
  today: {
    emoji: '🌱',
    tint: C.mint,
    eyebrow: 'Monday · 82° sunny · Cypress Bend',
    title: 'Your street is\nquiet — for now.',
    body: "Nothing's happening yet. Be the first to post a hello, an event, or a good taco-truck tip.",
    cta: 'Share something',
  },
  meet: {
    emoji: '👋',
    tint: C.marigoldSoft,
    eyebrow: 'Neighbor Match',
    title: 'No matches\nyet.',
    body: 'Add a few interests and Neighborly will find neighbors within a 5-minute walk. They only see you if you both say hi.',
    cta: 'Add your interests',
  },
  ask: {
    emoji: '🤝',
    tint: C.grassPale,
    eyebrow: 'Ask the neighborhood',
    title: 'Nothing to\nask about?',
    body: 'Need to borrow a ladder, get a hand, or find a trusted plumber? Post an ask and the street will answer.',
    cta: 'Post a new ask',
  },
  events: {
    emoji: '📅',
    tint: C.peach,
    eyebrow: 'Your calendar',
    title: 'Nothing on the\ncalendar.',
    body: "When neighbors host BBQs, run clubs, or garage sales, they'll show up here. Start one yourself?",
    cta: 'Create an event',
  },
  discover: {
    emoji: '🗺️',
    tint: C.sky,
    eyebrow: 'Cypress Bend',
    title: 'The map is\nstill filling in.',
    body: 'As neighbors join and opt into the directory, their homes appear on the map. Invite the people you know.',
    cta: 'Invite neighbors',
  },
  hoa: {
    emoji: '🏛️',
    tint: C.lilac,
    eyebrow: 'Cypress Bend Community Association',
    title: 'No messages\nyet.',
    body: 'Reach your HOA board directly, or ask the rules assistant anything — fences, pool hours, RV parking.',
    cta: 'Message the board',
  },
};
