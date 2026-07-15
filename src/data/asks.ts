import { theme } from '../theme';
import { Ask, Fine, Pro } from './types';

const C = theme.colors;

export const ASKS: Ask[] = [
  {
    id: 'ladder',
    who: 'Dev Patel',
    initials: 'DP',
    bg: C.peach,
    kind: 'Borrow',
    text: 'Anyone have an extension ladder for Sunday? Gutters won.',
    messages: [
      { from: 'them', text: 'Anyone have an extension ladder for Sunday? Gutters won.' },
      { from: 'you', text: "I've got a 24-footer in the garage — all yours" },
      { from: 'them', text: "You're a lifesaver. Swing by Sunday 9ish? I'll return it with banana bread 🍌" },
    ],
  },
  {
    id: 'plants',
    who: 'Maya Reyes',
    initials: 'MR',
    bg: C.marigold,
    kind: 'Favor',
    text: 'Need a plant-waterer Aug 2–9, will pay in tomatoes 🍅',
    messages: [
      { from: 'them', text: 'Need a plant-waterer Aug 2–9, will pay in tomatoes 🍅' },
      { from: 'them', text: "It's just the porch ferns + the stubborn fig. 10 min tops." },
    ],
  },
  {
    id: 'ac',
    who: 'Grace Lin',
    initials: 'GL',
    bg: C.mint,
    kind: 'Recommend',
    text: 'Best AC repair before Houston August arrives?',
    messages: [
      { from: 'them', text: 'Best AC repair before Houston August arrives?' },
      { from: 'them', text: "Mine is making a noise I can only describe as 'ominous.'" },
    ],
  },
];

export const FINES: Fine[] = [
  {
    id: 'f1',
    desc: 'Trash cans visible from street, 2 days past pickup',
    addr: 'Heron Ln',
    amount: 75,
    fair: 41,
    unfair: 12,
    comment: 'Board note: second offense this quarter.',
  },
  {
    id: 'f2',
    desc: 'Basketball hoop left in cul-de-sac overnight',
    addr: 'Wren Ct',
    amount: 150,
    fair: 8,
    unfair: 56,
    comment: "Resident note: kids' tournament weekend.",
  },
  {
    id: 'f3',
    desc: 'Unapproved fence stain (espresso vs. walnut)',
    addr: 'Mockingbird Way',
    amount: 200,
    fair: 15,
    unfair: 33,
    comment: 'ARC palette dispute — shades look identical at dusk.',
  },
];

export const PROS: Pro[] = [
  { name: 'Bayou Electric Co.', used: 7, tag: "Electrician — that's Marcus on Bluebonnet" },
  { name: 'Luz Lawn + Garden', used: 12, tag: 'Lawn care' },
  { name: "Priya Mehta (Rice '27)", used: 4, tag: 'Math tutor, Mockingbird Way' },
];
