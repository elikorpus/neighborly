import { Calendar as CalIcon, Check, ChevronRight } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from '../components/Card';
import { Chip } from '../components/Chip';
import { EMPTY_STATES } from '../data/emptyStates';
import { useAppNavigation } from '../navigation/useAppNavigation';
import { EmptyTab } from './empty';
import { useAppState } from '../state/AppStateContext';
import { theme } from '../theme';

function DateChip({ mon, day, size = 52 }: { mon: string; day: string; size?: number }) {
  return (
    <View style={[styles.dateChip, { width: size }, theme.hardShadow('sm')]}>
      <View style={styles.dateChipMon}>
        <Text style={styles.dateChipMonText}>{mon}</Text>
      </View>
      <View style={styles.dateChipDay}>
        <Text style={[styles.dateChipDayText, { fontSize: size * 0.42 }]}>{day}</Text>
      </View>
    </View>
  );
}

const FILTERS = ["RSVP'd", 'All events'] as const;

export function EventsScreen() {
  const navigation = useAppNavigation();
  const { events, eventRsvps } = useAppState();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("RSVP'd");

  if (events.length === 0) return <EmptyTab config={EMPTY_STATES.events} />;

  const rsvpCount = events.filter((e) => eventRsvps[e.id]).length;
  const list = filter === "RSVP'd" ? events.filter((e) => eventRsvps[e.id]) : events;

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.headerBlock}>
        <Text style={styles.h1}>Your calendar</Text>
        <Text style={styles.lead}>
          You're on the list for <Text style={styles.bold}>{rsvpCount} events</Text> — plus everything else happening
          in Cypress Bend.
        </Text>
      </View>

      <View style={styles.tabRow}>
        {FILTERS.map((t) => (
          <Chip key={t} active={filter === t} onPress={() => setFilter(t)}>
            {t}
          </Chip>
        ))}
      </View>

      {list.map((e) => {
        const rsvp = eventRsvps[e.id];
        return (
          <Card key={e.id} onPress={() => navigation.navigate('EventDetail', { eventId: e.id })} style={{ marginBottom: 12 }}>
            <View style={styles.row}>
              <DateChip mon={e.mon} day={e.day} />
              <View style={{ flex: 1 }}>
                <View style={styles.titleRow}>
                  <Text style={{ fontSize: 16 }}>{e.emoji}</Text>
                  <Text style={styles.eventTitle}>{e.title}</Text>
                </View>
                <View style={styles.timeRow}>
                  <CalIcon size={12} color={theme.colors.inkSoft} />
                  <Text style={styles.eventTime}>{e.time}</Text>
                </View>
                <View style={styles.statusRow}>
                  {rsvp ? (
                    <View style={styles.goingBadge}>
                      <Check size={11} color={theme.colors.grassDeep} />
                      <Text style={styles.goingText}>Going</Text>
                    </View>
                  ) : (
                    <View style={styles.notYetBadge}>
                      <Text style={styles.notYetText}>Not yet</Text>
                    </View>
                  )}
                  <Text style={styles.goingCount}>{e.going} going</Text>
                </View>
              </View>
              <ChevronRight size={16} color={theme.colors.inkSoft} />
            </View>
          </Card>
        );
      })}

      {list.length === 0 && <Text style={styles.empty}>No RSVPs yet — tap "All events" to find something for the weekend.</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, paddingBottom: 24 },
  headerBlock: { paddingTop: 24, paddingBottom: 16 },
  h1: { fontFamily: theme.font.displaySemibold, fontSize: 28, color: theme.colors.ink },
  lead: { fontSize: 14, color: theme.colors.inkSoft, marginTop: 4, fontFamily: theme.font.bodyRegular },
  bold: { color: theme.colors.grass, fontFamily: theme.font.bodyBold },
  tabRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  dateChip: { borderWidth: theme.border.width, borderColor: theme.colors.ink, borderRadius: 12, overflow: 'hidden' },
  dateChipMon: { backgroundColor: theme.colors.grass, paddingVertical: 3 },
  dateChipMonText: { color: '#fff', fontSize: 10, fontFamily: theme.font.bodyBold, textAlign: 'center', letterSpacing: 1 },
  dateChipDay: { backgroundColor: theme.colors.card, paddingVertical: 3, paddingBottom: 4 },
  dateChipDayText: { fontFamily: theme.font.displayBold, color: theme.colors.ink, textAlign: 'center' },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  eventTitle: { fontFamily: theme.font.displaySemibold, fontSize: 16, color: theme.colors.ink },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 2 },
  eventTime: { fontSize: 12.5, color: theme.colors.inkSoft, fontFamily: theme.font.bodyRegular },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
  goingBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: theme.colors.grassPale, borderRadius: theme.radius.pill, paddingVertical: 3, paddingHorizontal: 9 },
  goingText: { fontSize: 10.5, fontFamily: theme.font.bodyBold, color: theme.colors.grassDeep },
  notYetBadge: { borderWidth: theme.border.width, borderColor: theme.colors.line, borderRadius: theme.radius.pill, paddingVertical: 3, paddingHorizontal: 9 },
  notYetText: { fontSize: 10.5, fontFamily: theme.font.bodyBold, color: theme.colors.inkSoft },
  goingCount: { fontSize: 12, color: theme.colors.inkSoft, fontFamily: theme.font.bodySemibold },
  empty: { fontSize: 13.5, color: theme.colors.inkSoft, fontFamily: theme.font.bodySemibold, textAlign: 'center', paddingVertical: 32 },
});
