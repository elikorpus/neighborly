import { Calendar, Check, ChevronRight } from 'lucide-react-native';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Avatar } from '../components/Avatar';
import { Card } from '../components/Card';
import { PopIn } from '../components/PopIn';
import { EMPTY_STATES } from '../data/emptyStates';
import { useAppNavigation } from '../navigation/useAppNavigation';
import { useAppState } from '../state/AppStateContext';
import { theme } from '../theme';
import { EmptyTab } from './empty';

export function TodayScreen() {
  const navigation = useAppNavigation();
  const { profile, events, eventRsvps, toggleEventRsvp, directory, wavedIds, sendWave, notifications } = useAppState();

  const upcoming = events.slice(0, 3);
  const newNeighbor = directory.find((p) => !wavedIds.includes(p.id));
  const recentNotifications = notifications.slice(0, 2);

  if (upcoming.length === 0 && !newNeighbor && recentNotifications.length === 0) {
    return <EmptyTab config={EMPTY_STATES.today} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.headerBlock}>
        <Text style={styles.h1}>
          Morning, {profile.firstName || 'neighbor'}.{'\n'}
          <Text style={{ color: theme.colors.grass }}>
            {upcoming.length} thing{upcoming.length === 1 ? '' : 's'} coming up.
          </Text>
        </Text>
      </View>

      {upcoming.map((e, i) => {
        const rsvp = eventRsvps[e.id];
        return (
          <PopIn key={e.id} delay={70 * (i + 1)} style={{ marginBottom: 16 }}>
            <Card onPress={() => navigation.navigate('EventDetail', { eventId: e.id })}>
              <View style={styles.rowBetween}>
                <View style={{ flex: 1 }}>
                  <View style={styles.eventEyebrowRow}>
                    <Calendar size={12} color={theme.colors.grass} />
                    <Text style={styles.eventEyebrow}>
                      {e.mon} {e.day} · {e.time}
                    </Text>
                  </View>
                  <Text style={styles.cardTitle}>
                    {e.emoji} {e.title}
                  </Text>
                  <Text style={styles.cardBody}>
                    {e.where} · <Text style={styles.bold}>{e.going} going.</Text>
                  </Text>
                </View>
                <Avatar initials={e.host.initials} bg={e.host.bg} size={40} tilt={i % 2 ? 4 : -4} />
              </View>
              <Pressable
                onPress={() => toggleEventRsvp(e.id)}
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
        );
      })}

      {newNeighbor && (
        <PopIn delay={70 * (upcoming.length + 1)} style={{ marginBottom: 16 }}>
          <Card
            onPress={() => navigation.navigate('PersonProfile', { personId: newNeighbor.id })}
            style={{ backgroundColor: theme.colors.marigoldSoft, borderColor: '#EFD79A' }}
          >
            <View style={styles.rowCenter}>
              <Avatar initials={newNeighbor.initials} bg={newNeighbor.bg} size={48} tilt={5} />
              <View style={{ flex: 1 }}>
                <Text style={styles.marigoldEyebrow}>👋 Say hello</Text>
                <Text style={styles.cardTitle}>{newNeighbor.name}</Text>
                <Text style={styles.cardBody}>{newNeighbor.street}</Text>
              </View>
            </View>
            <Pressable
              onPress={() => sendWave(newNeighbor.id)}
              style={[styles.rsvpBtn, { backgroundColor: theme.colors.ink, borderColor: theme.colors.ink }]}
            >
              <Text style={[styles.rsvpText, { color: '#fff' }]}>Say hi</Text>
            </Pressable>
          </Card>
        </PopIn>
      )}

      {recentNotifications.map((n, i) => (
        <PopIn key={n.id} delay={70 * (upcoming.length + 2 + i)} style={{ marginBottom: 16 }}>
          <Pressable
            onPress={() => navigation.navigate('Notifications')}
            style={styles.notificationRow}
          >
            <Text style={{ fontSize: 18 }}>{n.emoji}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{n.title}</Text>
              <Text style={styles.cardBody}>{n.sub}</Text>
            </View>
            <ChevronRight size={16} color={theme.colors.inkSoft} />
          </Pressable>
        </PopIn>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, paddingBottom: 24 },
  headerBlock: { paddingTop: 24, paddingBottom: 16 },
  h1: {
    fontFamily: theme.font.displaySemibold,
    fontSize: 30,
    color: theme.colors.ink,
    lineHeight: 30 * theme.lineHeightMultiplier.tight,
  },
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
  notificationRow: {
    backgroundColor: theme.colors.card,
    borderWidth: theme.border.width,
    borderColor: theme.colors.line,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
  },
});
