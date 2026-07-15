import { Calendar, Check, ChevronRight, PartyPopper, Sun } from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Avatar } from '../components/Avatar';
import { Card } from '../components/Card';
import { PopIn } from '../components/PopIn';
import { EMPTY_STATES } from '../data/emptyStates';
import { useAppNavigation } from '../navigation/useAppNavigation';
import { EmptyTab } from './empty';
import { useAppState } from '../state/AppStateContext';
import { theme } from '../theme';

export function TodayScreen() {
  const navigation = useAppNavigation();
  const { profile, eventRsvps, toggleEventRsvp, wavedIds, sendWave, isEmpty } = useAppState();
  const [cheers, setCheers] = useState(12);
  const [cheered, setCheered] = useState(false);

  if (isEmpty) return <EmptyTab config={EMPTY_STATES.today} />;

  const rsvp = eventRsvps['pickle'];
  const waved = wavedIds.includes('ortega');

  const cheer = () => {
    if (!cheered) {
      setCheers((c) => c + 1);
      setCheered(true);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.headerBlock}>
        <View style={styles.eyebrowRow}>
          <Sun size={18} color={theme.colors.marigold} fill={theme.colors.marigold} />
          <Text style={styles.eyebrow}>Monday · 82° sunny · Cypress Bend</Text>
        </View>
        <Text style={styles.h1}>
          Morning, {profile.firstName}.{'\n'}
          <Text style={{ color: theme.colors.grass }}>3 things happening today.</Text>
        </Text>
      </View>

      <Pressable style={styles.tacoBanner} onPress={() => navigation.navigate('EventDetail', { eventId: 'tacos' })}>
        <Text style={{ fontSize: 18 }}>🌮</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.tacoTitle}>Taco Luz arriving in 30 min</Text>
          <Text style={styles.tacoSub}>Heron Pond lot · 5–8pm tonight</Text>
        </View>
        <ChevronRight size={16} color={theme.colors.paper} />
      </Pressable>

      <PopIn delay={70} style={{ marginBottom: 16 }}>
        <Card onPress={() => navigation.navigate('EventDetail', { eventId: 'pickle' })}>
          <View style={styles.rowBetween}>
            <View style={{ flex: 1 }}>
              <View style={styles.eventEyebrowRow}>
                <Calendar size={12} color={theme.colors.grass} />
                <Text style={styles.eventEyebrow}>Event · Saturday 9am</Text>
              </View>
              <Text style={styles.cardTitle}>Pickleball Round Robin</Text>
              <Text style={styles.cardBody}>
                All levels. Grace brings paddles for newbies. <Text style={styles.bold}>{14 + (rsvp ? 1 : 0)} going.</Text>
              </Text>
            </View>
            <Avatar initials="GL" bg={theme.colors.mint} size={40} tilt={-4} />
          </View>
          <Pressable
            onPress={() => toggleEventRsvp('pickle')}
            style={[styles.rsvpBtn, { backgroundColor: rsvp ? theme.colors.grass : theme.colors.paper, borderColor: rsvp ? theme.colors.grass : theme.colors.line }]}
          >
            {rsvp ? (
              <View style={styles.rowCenter}>
                <Check size={15} color="#fff" />
                <Text style={[styles.rsvpText, { color: '#fff' }]}>You're going</Text>
              </View>
            ) : (
              <Text style={[styles.rsvpText, { color: theme.colors.ink }]}>RSVP</Text>
            )}
          </Pressable>
        </Card>
      </PopIn>

      <PopIn delay={140} style={{ marginBottom: 16 }}>
        <Card
          onPress={() => navigation.navigate('PersonProfile', { personId: 'ortega' })}
          style={{ backgroundColor: theme.colors.marigoldSoft, borderColor: '#EFD79A' }}
        >
          <View style={styles.rowCenter}>
            <Avatar initials="JO" bg={theme.colors.sky} size={48} tilt={5} />
            <View style={{ flex: 1 }}>
              <Text style={styles.marigoldEyebrow}>👋 New on Heron Ln</Text>
              <Text style={styles.cardTitle}>The Ortegas moved in</Text>
              <Text style={styles.cardBody}>Two toddlers, one golden retriever, looking for playdates</Text>
            </View>
          </View>
          <Pressable
            onPress={() => sendWave('ortega')}
            style={[styles.rsvpBtn, { backgroundColor: waved ? '#fff' : theme.colors.ink, borderColor: theme.colors.ink }]}
          >
            <Text style={[styles.rsvpText, { color: waved ? theme.colors.ink : '#fff' }]}>{waved ? 'Wave sent 👋' : 'Say hi'}</Text>
          </Pressable>
        </Card>
      </PopIn>

      <PopIn delay={210}>
        <Card
          onPress={() => navigation.navigate('PersonProfile', { personId: 'kim' })}
          style={{ borderColor: '#E8CFE0', backgroundColor: '#FAF0F6' }}
        >
          <View style={styles.eventEyebrowRow}>
            <PartyPopper size={12} color="#A05585" />
            <Text style={[styles.eventEyebrow, { color: '#A05585' }]}>Celebrate</Text>
          </View>
          <Text style={styles.cardTitle}>Biscuit is home! 🐶</Text>
          <Text style={styles.cardBody}>
            Found near the pond after 6 neighbors joined the search. The Kims left thank-you cookies at the little
            library.
          </Text>
          <View style={styles.cheerRow}>
            <View style={styles.stack}>
              {[
                ['MR', theme.colors.marigold],
                ['GL', theme.colors.mint],
                ['DP', theme.colors.peach],
              ].map(([i, b], k) => (
                <View key={i} style={{ marginLeft: k ? -8 : 0 }}>
                  <Avatar initials={i} bg={b} size={30} />
                </View>
              ))}
            </View>
            <Pressable
              onPress={cheer}
              style={[styles.cheerBtn, { backgroundColor: cheered ? '#A05585' : '#fff' }]}
            >
              <Text style={{ color: cheered ? '#fff' : '#A05585', fontFamily: theme.font.bodyBold, fontSize: 12.5 }}>❤️ {cheers}</Text>
            </Pressable>
          </View>
        </Card>
      </PopIn>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, paddingBottom: 24 },
  headerBlock: { paddingTop: 24, paddingBottom: 16 },
  eyebrowRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  eyebrow: { fontSize: 13, fontFamily: theme.font.bodyBold, color: theme.colors.inkSoft, textTransform: 'uppercase', letterSpacing: 0.4 },
  h1: {
    fontFamily: theme.font.displaySemibold,
    fontSize: 30,
    color: theme.colors.ink,
    lineHeight: 30 * theme.lineHeightMultiplier.tight,
    marginTop: 8,
  },
  tacoBanner: {
    backgroundColor: theme.colors.ink,
    borderRadius: theme.radius.xl,
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  tacoTitle: { color: theme.colors.paper, fontSize: 14, fontFamily: theme.font.bodyBold },
  tacoSub: { color: theme.colors.onInkSoft, fontSize: 12, fontFamily: theme.font.bodyMedium },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 },
  rowCenter: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  eventEyebrowRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  eventEyebrow: { fontSize: 11, fontFamily: theme.font.bodyBold, color: theme.colors.grass, textTransform: 'uppercase', letterSpacing: 0.4 },
  cardTitle: { fontFamily: theme.font.displaySemibold, fontSize: 20, color: theme.colors.ink, marginTop: 6 },
  cardBody: { fontSize: 14, color: theme.colors.inkSoft, marginTop: 4, fontFamily: theme.font.bodyRegular, lineHeight: 14 * 1.35 },
  bold: { fontFamily: theme.font.bodyBold, color: theme.colors.grassDeep },
  rsvpBtn: {
    width: '100%',
    marginTop: 12,
    paddingVertical: 10,
    borderRadius: theme.radius.md,
    borderWidth: theme.border.width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rsvpText: { fontFamily: theme.font.bodyBold, fontSize: 14 },
  marigoldEyebrow: { fontSize: 11, fontFamily: theme.font.bodyBold, color: theme.colors.marigoldInk, textTransform: 'uppercase', letterSpacing: 0.4 },
  cheerRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  stack: { flexDirection: 'row' },
  cheerBtn: {
    marginLeft: 12,
    borderWidth: theme.border.width,
    borderColor: '#A05585',
    borderRadius: theme.radius.pill,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
});
