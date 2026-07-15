import { theme } from '../theme';
import { Club, MatchNeighbor } from './types';

const C = theme.colors;

/** "Your matches" on the Meet tab — matched on shared interests within a 5-minute walk. */
export const MATCHES: MatchNeighbor[] = [
  {
    id: 'maya',
    name: 'Maya Reyes',
    initials: 'MR',
    bg: C.marigold,
    street: 'Wren Ct',
    shared: ['Running', 'Coffee', 'Dogs'],
    note: 'Runs Cypress Loop most mornings',
    connected: true,
  },
  {
    id: 'ortega',
    name: 'The Ortegas',
    initials: 'JO',
    bg: C.sky,
    street: 'Heron Ln',
    shared: ['Young kids', 'Camping'],
    note: 'Just moved in — playdate hunting',
  },
  {
    id: 'dev',
    name: 'Dev Patel',
    initials: 'DP',
    bg: C.peach,
    street: 'Bluebonnet Dr',
    shared: ['Photography', 'Coffee'],
    note: 'Shoots the herons at dusk',
  },
  {
    id: 'grace',
    name: 'Grace Lin',
    initials: 'GL',
    bg: C.mint,
    street: 'Wren Ct',
    shared: ['Books', 'Tennis'],
    note: 'Hosting book club this month',
  },
];

export const CLUBS: Club[] = [
  {
    id: 'run',
    emoji: '🏃',
    name: 'Sunrise Run Club',
    meets: 'Tue + Sat, 6:30a',
    members: 14,
    accent: C.mint,
    accentDeep: C.grassDeep,
    tagline: 'Slow miles, fast friends.',
    since: 'Since 2023',
    spot: 'Cypress Loop trailhead',
    lead: { name: 'Maya Reyes', initials: 'MR', bg: C.marigold, job: 'ER nurse' },
    about:
      'All paces, zero judgment. We run the 2.4-mile loop in two groups — chatty and less chatty. Walkers, strollers, and leashed dogs welcome. We regroup at the pond so nobody finishes alone.',
    next: { title: 'Loop 5K → Taco Luz finish line', when: 'Sat · 6:30a', where: 'Heron Pond trailhead', going: 11 },
    rules: [
      'Nobody runs alone — we regroup at the pond',
      'Headlamps Nov–Feb',
      'First-timers pick the post-run coffee spot',
    ],
    posts: [
      {
        who: 'Maya Reyes',
        initials: 'MR',
        bg: C.marigold,
        text: "Dev PR'd the loop this morning — 21:40!! The herons were unimpressed but WE weren't. 🎉",
      },
      {
        who: 'Coach Al',
        initials: 'AT',
        bg: C.apricot,
        text: 'Bringing 4 of my soccer kids Saturday for their first 5K. Be loud at the finish.',
      },
    ],
    roster: [
      { initials: 'MR', bg: C.marigold },
      { initials: 'DP', bg: C.peach },
      { initials: 'AT', bg: C.apricot },
      { initials: 'PM', bg: C.sky },
    ],
  },
  {
    id: 'book',
    emoji: '📚',
    name: 'Cypress Book Club',
    meets: 'First Thursdays, 7p',
    members: 9,
    accent: C.peach,
    accentDeep: '#A2601F',
    tagline: 'One book a month. Snacks mandatory, finishing optional.',
    since: 'Since 2021',
    spot: "Grace's porch, 4411 Wren Ct",
    lead: { name: 'Grace Lin', initials: 'GL', bg: C.mint, job: 'Retired teacher' },
    about:
      'We rotate genres monthly and vote on the next read every meeting. Grace hosts on her porch (clubhouse in summer, because Houston). You can come having read nothing.',
    next: {
      title: "July pick: 'Remarkably Bright Creatures' + peach cobbler",
      when: 'Thu Aug 6 · 7p',
      where: 'Clubhouse (A/C season)',
      going: 8,
    },
    rules: ['No spoilers past the halfway mark', 'Whoever picks the book brings the snacks', "DNF-ing is a valid literary opinion"],
    posts: [
      {
        who: 'Grace Lin',
        initials: 'GL',
        bg: C.mint,
        text: 'August vote is live: sci-fi vs. a mystery vs. "something that will make us all cry." Choose wisely.',
      },
      {
        who: 'Priya Mehta',
        initials: 'PM',
        bg: C.sky,
        text: "Left this month's book in the Little Free Library with my margin notes.",
      },
    ],
    roster: [
      { initials: 'GL', bg: C.mint },
      { initials: 'PM', bg: C.sky },
      { initials: 'LW', bg: C.marigoldSoft },
      { initials: 'RB', bg: C.lilac },
    ],
  },
  {
    id: 'dogs',
    emoji: '🐶',
    name: 'Dog Owners of CB',
    meets: 'Dog park, always',
    members: 31,
    accent: C.blush,
    accentDeep: '#A05585',
    tagline: 'The biggest club in Cypress Bend, obviously.',
    since: 'Since 2020',
    spot: 'Dog park, south corner',
    lead: { name: 'The Kim Family', initials: 'SK', bg: C.blush, job: "Own Kim's Bakery" },
    about:
      'Part playgroup, part neighborhood watch for anything on four legs. We run the lost-pet alert chain (48-min average reunion — ask Biscuit), organize the Halloween costume contest, and keep the trailhead water bowl full.',
    next: { title: 'Pup Splash — kiddie pools at the dog park', when: 'Sun · 9a, before the heat', where: 'Dog park', going: 17 },
    rules: [
      "Update your pet's photo — it's how lost-pet alerts work",
      'Gate stays double-latched',
      'Costume contest grudges expire Jan 1',
    ],
    posts: [
      {
        who: 'The Kim Family',
        initials: 'SK',
        bg: C.blush,
        text: 'Biscuit update: fully recovered, now under porch arrest. Thank you again, search squad. 🍪',
      },
      {
        who: 'Dev Patel',
        initials: 'DP',
        bg: C.peach,
        text: "Golden-hour portraits at Pup Splash — I'll shoot anyone's dog free, prints at cost.",
      },
    ],
    roster: [
      { initials: 'SK', bg: C.blush },
      { initials: 'MR', bg: C.marigold },
      { initials: 'DP', bg: C.peach },
      { initials: 'JO', bg: C.sky },
    ],
  },
  {
    id: 'mahjong',
    emoji: '🀄',
    name: 'Mahjong Night',
    meets: 'Fridays, 7p',
    members: 8,
    accent: C.lilac,
    accentDeep: '#6B4FA0',
    tagline: "Tiles, trash talk, and Rita's lemon bars.",
    since: 'Since 2024',
    spot: 'Clubhouse, big table',
    lead: { name: 'Rita Boone', initials: 'RB', bg: C.lilac, job: 'HOA president · CPA' },
    about:
      'American rules, teaching table every week for newcomers. We started with four people and a card table; now we need the clubhouse. Fair warning: Rita is undefeated in July.',
    next: { title: 'Friday night tiles + teaching table', when: 'Fri · 7p', where: 'Clubhouse', going: 8 },
    rules: ['Teaching table means actually teaching', 'Snack rotation is sacred', 'Phone calls outside — we are concentrating'],
    posts: [
      {
        who: 'Rita Boone',
        initials: 'RB',
        bg: C.lilac,
        text: 'Reminder: new 2026 cards are in. Yes, you have to learn the new hands. No, complaining does not help (I have tried).',
      },
      {
        who: 'Grace Lin',
        initials: 'GL',
        bg: C.mint,
        text: "Bringing my sister Friday — she claims she's 'pretty good.' Rita, be gentle.",
      },
    ],
    roster: [
      { initials: 'RB', bg: C.lilac },
      { initials: 'GL', bg: C.mint },
      { initials: 'LW', bg: C.marigoldSoft },
      { initials: 'AT', bg: C.apricot },
    ],
  },
];
