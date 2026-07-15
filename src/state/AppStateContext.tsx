import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { ASKS, EVENTS, FINES, NOTIFICATIONS } from '../data';
import { Ask, FamilyMember, Fine } from '../data/types';
import { DEFAULT_PROFILE } from '../data/constants';

export type Profile = typeof DEFAULT_PROFILE;

type Vote = 'fair' | 'unfair';

type AppState = {
  // auth
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;

  // demo toggle — shows empty/first-run variants without a backend
  isEmpty: boolean;
  toggleEmpty: () => void;

  // profile
  profile: Profile;
  setProfile: (p: Profile) => void;
  addFamilyMember: (m: FamilyMember) => void;
  removeFamilyMember: (index: number) => void;

  // notifications
  readNotificationIds: number[];
  markNotificationRead: (id: number) => void;
  markAllNotificationsRead: () => void;
  unreadNotificationCount: number;

  // asks + votes
  asks: Ask[];
  addAsk: (text: string) => string;
  sendChatMessage: (askId: string, text: string) => void;
  fines: Fine[];
  votes: Record<string, Vote>;
  vote: (fineId: string, which: Vote) => void;

  // event RSVPs
  eventRsvps: Record<string, boolean>;
  toggleEventRsvp: (eventId: string) => void;

  // "say hi" / wave sent, per person id
  wavedIds: string[];
  sendWave: (personId: string) => void;

  // club membership
  joinedClubIds: string[];
  toggleClubJoined: (clubId: string) => void;
};

const AppStateContext = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isEmpty, setEmpty] = useState(true);

  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);

  const [readNotificationIds, setReadNotificationIds] = useState<number[]>([4, 5, 6]);

  const [asks, setAsks] = useState<Ask[]>(ASKS);
  const [fines, setFines] = useState<Fine[]>(FINES);
  const [votes, setVotes] = useState<Record<string, Vote>>({});

  const [eventRsvps, setEventRsvps] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(EVENTS.map((e) => [e.id, e.rsvp]))
  );

  const [wavedIds, setWavedIds] = useState<string[]>(['maya', 'dev', 'grace', 'kim', 'rita']);
  const [joinedClubIds, setJoinedClubIds] = useState<string[]>([]);

  const login = useCallback(() => setAuthenticated(true), []);
  const logout = useCallback(() => setAuthenticated(false), []);
  const toggleEmpty = useCallback(() => setEmpty((e) => !e), []);

  const addFamilyMember = useCallback((m: FamilyMember) => {
    setProfile((p) => ({ ...p, family: [...p.family, m] }));
  }, []);
  const removeFamilyMember = useCallback((index: number) => {
    setProfile((p) => ({ ...p, family: p.family.filter((_, i) => i !== index) }));
  }, []);

  const markNotificationRead = useCallback((id: number) => {
    setReadNotificationIds((ids) => (ids.includes(id) ? ids : [...ids, id]));
  }, []);
  const markAllNotificationsRead = useCallback(() => {
    setReadNotificationIds(NOTIFICATIONS.map((n) => n.id));
  }, []);
  const unreadNotificationCount = NOTIFICATIONS.length - readNotificationIds.length;

  const addAsk = useCallback((text: string) => {
    const id = 'ask' + Date.now();
    setAsks((prev) => [
      { id, who: 'You', initials: 'EL', bg: '#CFE3EA', kind: 'Ask', text, messages: [{ from: 'you', text }] },
      ...prev,
    ]);
    return id;
  }, []);
  const sendChatMessage = useCallback((askId: string, text: string) => {
    setAsks((prev) => {
      const target = prev.find((a) => a.id === askId);
      const next = prev.map((a) => (a.id === askId ? { ...a, messages: [...a.messages, { from: 'you' as const, text }] } : a));
      if (target && target.who !== 'You') {
        setTimeout(() => {
          setAsks((p2) =>
            p2.map((a) => (a.id === askId ? { ...a, messages: [...a.messages, { from: 'them' as const, text: 'Perfect — thank you!! 🙌' }] } : a))
          );
        }, 900);
      }
      return next;
    });
  }, []);

  const vote = useCallback((fineId: string, which: Vote) => {
    setVotes((v) => {
      if (v[fineId]) return v;
      setFines((fs) => fs.map((f) => (f.id === fineId ? { ...f, [which]: f[which] + 1 } : f)));
      return { ...v, [fineId]: which };
    });
  }, []);

  const toggleEventRsvp = useCallback((eventId: string) => {
    setEventRsvps((r) => ({ ...r, [eventId]: !r[eventId] }));
  }, []);

  const sendWave = useCallback((personId: string) => {
    setWavedIds((ids) => (ids.includes(personId) ? ids : [...ids, personId]));
  }, []);

  const toggleClubJoined = useCallback((clubId: string) => {
    setJoinedClubIds((ids) => (ids.includes(clubId) ? ids.filter((id) => id !== clubId) : [...ids, clubId]));
  }, []);

  const value = useMemo<AppState>(
    () => ({
      isAuthenticated,
      login,
      logout,
      isEmpty,
      toggleEmpty,
      profile,
      setProfile,
      addFamilyMember,
      removeFamilyMember,
      readNotificationIds,
      markNotificationRead,
      markAllNotificationsRead,
      unreadNotificationCount,
      asks,
      addAsk,
      sendChatMessage,
      fines,
      votes,
      vote,
      eventRsvps,
      toggleEventRsvp,
      wavedIds,
      sendWave,
      joinedClubIds,
      toggleClubJoined,
    }),
    [
      isAuthenticated,
      login,
      logout,
      isEmpty,
      toggleEmpty,
      profile,
      addFamilyMember,
      removeFamilyMember,
      readNotificationIds,
      markNotificationRead,
      markAllNotificationsRead,
      unreadNotificationCount,
      asks,
      addAsk,
      sendChatMessage,
      fines,
      votes,
      vote,
      eventRsvps,
      toggleEventRsvp,
      wavedIds,
      sendWave,
      joinedClubIds,
      toggleClubJoined,
    ]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider');
  return ctx;
}
