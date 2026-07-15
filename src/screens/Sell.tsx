import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TrendingUp } from 'lucide-react-native';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Avatar } from '../components/Avatar';
import { BackBar } from '../components/BackBar';
import { Card } from '../components/Card';
import { ScoreRing } from '../components/ScoreRing';
import { SectionLabel } from '../components/SectionLabel';
import { NEIGHBORHOODS, NEIGHBORHOOD_TRENDS, REALTORS } from '../data/constants';
import { AppStackParamList } from '../navigation/types';
import { theme } from '../theme';

type Props = NativeStackScreenProps<AppStackParamList, 'Sell'>;

export function SellScreen({ navigation }: Props) {
  return (
    <View style={styles.screen}>
      <BackBar title="Sell & explore" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <Card style={{ marginBottom: 20, backgroundColor: theme.colors.ink, borderWidth: 0 }}>
          <Text style={styles.homeLabel}>Your home · 4413 Wren Ct</Text>
          <Text style={styles.homeValue}>$412,000</Text>
          <Text style={styles.homeSub}>Neighborly estimate · ↑ $18k since last year</Text>
          <View style={styles.homeActions}>
            <Pressable style={styles.listBtn}>
              <Text style={styles.listBtnText}>List my home</Text>
            </Pressable>
            <Pressable style={styles.valuationBtn}>
              <Text style={styles.valuationBtnText}>Get a valuation</Text>
            </Pressable>
          </View>
        </Card>

        <SectionLabel>Your neighborhood score</SectionLabel>
        <Card style={{ marginBottom: 20 }}>
          <View style={styles.scoreRow}>
            <ScoreRing score={87} size={72} />
            <View>
              <Text style={styles.scoreName}>Cypress Bend</Text>
              <View style={styles.trendRow}>
                <TrendingUp size={13} color={theme.colors.grassDeep} />
                <Text style={styles.trendText}>Up 4 pts this quarter</Text>
              </View>
              <Text style={styles.scoreNote}>Anonymous, community-level data only</Text>
            </View>
          </View>
          <View style={{ marginTop: 16 }}>
            {NEIGHBORHOOD_TRENDS.map(([l, val, note], i) => (
              <View key={l} style={[styles.trendItemRow, i > 0 && styles.trendItemBorder]}>
                <TrendingUp size={14} color={theme.colors.grass} style={{ marginTop: 2 }} />
                <View style={{ flex: 1 }}>
                  <View style={styles.trendItemHead}>
                    <Text style={styles.trendItemLabel}>{l}</Text>
                    <Text style={styles.trendItemValue}>{val}</Text>
                  </View>
                  <Text style={styles.trendItemNote}>{note}</Text>
                </View>
              </View>
            ))}
          </View>
        </Card>

        <SectionLabel>Insights-certified realtors</SectionLabel>
        {REALTORS.map((r) => (
          <Card key={r.name} style={{ marginBottom: 12 }}>
            <View style={styles.realtorRow}>
              <Avatar initials={r.initials} bg={r.bg} size={44} tilt={-3} />
              <View style={{ flex: 1 }}>
                <Text style={styles.realtorName}>{r.name}</Text>
                <Text style={styles.realtorTag}>{r.tag}</Text>
                <Text style={styles.realtorDeals}>{r.deals}</Text>
              </View>
              <Pressable style={styles.contactBtn}>
                <Text style={styles.contactBtnText}>Contact</Text>
              </Pressable>
            </View>
          </Card>
        ))}

        <SectionLabel>Explore neighborhoods</SectionLabel>
        {NEIGHBORHOODS.map((n) => (
          <Card key={n.name} style={[{ marginBottom: 12 }, n.you && { borderColor: theme.colors.grass, borderWidth: 2 }]}>
            <View style={styles.nRow}>
              <ScoreRing score={n.score} size={56} color={n.you ? theme.colors.grass : n.score > 75 ? theme.colors.skyDeep : theme.colors.marigold} />
              <View style={{ flex: 1 }}>
                <View style={styles.nHead}>
                  <Text style={styles.nName}>{n.name}</Text>
                  {n.you && (
                    <View style={styles.youBadge}>
                      <Text style={styles.youBadgeText}>You</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.nBlurb}>{n.blurb}</Text>
                <Text style={styles.nMeta}>
                  Kids {n.kids} · {n.events} events/mo
                </Text>
              </View>
            </View>
          </Card>
        ))}
        <Text style={styles.footnote}>Scores come from anonymous community activity — never individual neighbors.</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.colors.paper },
  content: { padding: 20 },
  homeLabel: { fontSize: 11, fontFamily: theme.font.bodyBold, color: theme.colors.onInkSoft, textTransform: 'uppercase', letterSpacing: 0.6 },
  homeValue: { fontFamily: theme.font.displayBold, fontSize: 32, color: theme.colors.paper, marginTop: 4 },
  homeSub: { fontSize: 13, color: theme.colors.onInkSoft, fontFamily: theme.font.bodySemibold },
  homeActions: { flexDirection: 'row', gap: 8, marginTop: 16 },
  listBtn: { flex: 1, paddingVertical: 10, borderRadius: 12, backgroundColor: theme.colors.marigold, alignItems: 'center' },
  listBtnText: { color: theme.colors.ink, fontFamily: theme.font.bodyBold, fontSize: 13 },
  valuationBtn: { flex: 1, paddingVertical: 10, borderRadius: 12, borderWidth: theme.border.width, borderColor: '#4A443A', alignItems: 'center' },
  valuationBtnText: { color: theme.colors.paper, fontFamily: theme.font.bodyBold, fontSize: 13 },
  scoreRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  scoreName: { fontFamily: theme.font.displaySemibold, fontSize: 18, color: theme.colors.ink },
  trendRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  trendText: { fontSize: 12.5, color: theme.colors.grassDeep, fontFamily: theme.font.bodyBold },
  scoreNote: { fontSize: 12, color: theme.colors.inkSoft, marginTop: 2, fontFamily: theme.font.bodyRegular },
  trendItemRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, paddingVertical: 10 },
  trendItemBorder: { borderTopWidth: theme.border.width, borderTopColor: theme.colors.line },
  trendItemHead: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  trendItemLabel: { fontSize: 13, fontFamily: theme.font.bodyBold, color: theme.colors.ink, flex: 1 },
  trendItemValue: { fontSize: 13, fontFamily: theme.font.bodyBold, color: theme.colors.grassDeep },
  trendItemNote: { fontSize: 11.5, color: theme.colors.inkSoft, fontFamily: theme.font.bodyRegular },
  realtorRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  realtorName: { fontSize: 15, fontFamily: theme.font.bodyBold, color: theme.colors.ink },
  realtorTag: { fontSize: 12, color: theme.colors.inkSoft, fontFamily: theme.font.bodyRegular },
  realtorDeals: { fontSize: 12, color: theme.colors.grassDeep, fontFamily: theme.font.bodyBold },
  contactBtn: { backgroundColor: theme.colors.grass, borderRadius: 999, paddingVertical: 8, paddingHorizontal: 16 },
  contactBtnText: { color: '#fff', fontFamily: theme.font.bodyBold, fontSize: 12.5 },
  nRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  nHead: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  nName: { fontFamily: theme.font.displaySemibold, fontSize: 16, color: theme.colors.ink },
  youBadge: { backgroundColor: theme.colors.grassPale, borderRadius: 999, paddingVertical: 2, paddingHorizontal: 8 },
  youBadgeText: { color: theme.colors.grassDeep, fontSize: 10, fontFamily: theme.font.bodyBold, textTransform: 'uppercase' },
  nBlurb: { fontSize: 12.5, color: theme.colors.inkSoft, fontFamily: theme.font.bodyRegular },
  nMeta: { fontSize: 11.5, color: theme.colors.grassDeep, fontFamily: theme.font.bodyBold, marginTop: 4 },
  footnote: { fontSize: 11.5, color: theme.colors.inkSoft, fontFamily: theme.font.bodySemibold, textAlign: 'center', marginTop: 8 },
});
