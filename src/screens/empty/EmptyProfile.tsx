import { LogOut, Pencil, Plus } from 'lucide-react-native';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Avatar } from '../../components/Avatar';
import { BackBar } from '../../components/BackBar';
import { Card } from '../../components/Card';
import { Chip } from '../../components/Chip';
import { SectionLabel } from '../../components/SectionLabel';
import { theme } from '../../theme';

const ABOUT_ROWS = ['Name', 'What you do', 'Time here', 'Address', 'Bio'];
const SAMPLE_INTERESTS = ['Coffee', 'Running', 'Dogs', 'Books', 'Photography', '+ more'];

export function EmptyProfile({ onBack, onLogout }: { onBack: () => void; onLogout: () => void }) {
  return (
    <View style={styles.screen}>
      <BackBar
        title="Your profile"
        onBack={onBack}
        right={
          <View style={styles.editRow}>
            <Pencil size={13} color={theme.colors.grass} />
            <Text style={styles.editText}>Edit</Text>
          </View>
        }
      />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headRow}>
          <Avatar initials="?" bg={theme.colors.line} size={64} tilt={-4} />
          <View>
            <Text style={styles.addName}>Add your name</Text>
            <Text style={styles.meta}>Cypress Bend · new here</Text>
          </View>
        </View>

        <View style={styles.strengthCard}>
          <View style={styles.strengthRow}>
            <Text style={styles.strengthLabel}>Profile strength</Text>
            <Text style={styles.strengthPct}>10%</Text>
          </View>
          <View style={styles.strengthTrack}>
            <View style={[styles.strengthFill, { width: '10%' }]} />
          </View>
          <Text style={styles.strengthNote}>Next: add your name — it's how matches and neighbors find you.</Text>
        </View>

        <SectionLabel>About you</SectionLabel>
        <Card style={{ marginBottom: 20 }}>
          {ABOUT_ROWS.map((k, i) => (
            <View key={k} style={[styles.aboutRow, i < ABOUT_ROWS.length - 1 && styles.rowBorder]}>
              <Text style={styles.aboutKey}>{k}</Text>
              <View style={styles.addChip}>
                <Plus size={13} color={theme.colors.grass} />
                <Text style={styles.addChipText}>Add</Text>
              </View>
            </View>
          ))}
        </Card>

        <SectionLabel>Your household</SectionLabel>
        <Card style={{ marginBottom: 20 }}>
          <Text style={styles.householdNote}>Add family so neighbors know who belongs to your house — spouses, kids, even the dog.</Text>
          <View style={styles.dashedBtn}>
            <Plus size={15} color={theme.colors.grassDeep} />
            <Text style={styles.dashedBtnText}>Add family member</Text>
          </View>
        </Card>

        <SectionLabel>Your interests</SectionLabel>
        <Text style={styles.householdNote}>Pick a few to power Neighbor Match.</Text>
        <View style={styles.chipWrap}>
          {SAMPLE_INTERESTS.map((i) => (
            <Chip key={i}>{i}</Chip>
          ))}
        </View>

        <Pressable style={styles.completeBtn}>
          <Pencil size={16} color="#fff" />
          <Text style={styles.completeBtnText}>Complete your profile</Text>
        </Pressable>
        <Pressable onPress={onLogout} style={styles.logoutBtn}>
          <LogOut size={15} color={theme.colors.red} />
          <Text style={styles.logoutText}>Log out</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.colors.paper },
  content: { padding: 20 },
  editRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  editText: { fontSize: 12, fontFamily: theme.font.bodyBold, color: theme.colors.grass },
  headRow: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 20 },
  addName: { fontFamily: theme.font.displaySemibold, fontSize: 22, color: theme.colors.inkSoft },
  meta: { fontSize: 13, color: theme.colors.inkSoft, fontFamily: theme.font.bodySemibold },
  strengthCard: { backgroundColor: theme.colors.card, borderWidth: theme.border.width, borderColor: theme.colors.line, borderRadius: theme.radius.xl, paddingVertical: 12, paddingHorizontal: 16, marginBottom: 20 },
  strengthRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 },
  strengthLabel: { fontSize: 12, fontFamily: theme.font.bodyBold, color: theme.colors.ink },
  strengthPct: { fontFamily: theme.font.displayBold, fontSize: 15, color: theme.colors.marigoldInk },
  strengthTrack: { backgroundColor: theme.colors.paper, borderWidth: 1, borderColor: theme.colors.line, borderRadius: theme.radius.pill, height: 8, overflow: 'hidden' },
  strengthFill: { backgroundColor: theme.colors.marigold, height: '100%', borderRadius: theme.radius.pill },
  strengthNote: { fontSize: 11.5, color: theme.colors.inkSoft, fontFamily: theme.font.bodySemibold, marginTop: 6 },
  aboutRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 },
  rowBorder: { borderBottomWidth: theme.border.width, borderBottomColor: theme.colors.line },
  aboutKey: { fontSize: 13, fontFamily: theme.font.bodyBold, color: theme.colors.inkSoft },
  addChip: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  addChipText: { fontSize: 12.5, fontFamily: theme.font.bodyBold, color: theme.colors.grass },
  householdNote: { fontSize: 13, color: theme.colors.inkSoft, marginBottom: 12, fontFamily: theme.font.bodyRegular },
  dashedBtn: {
    width: '100%',
    paddingVertical: 12,
    borderWidth: theme.border.width,
    borderStyle: 'dashed',
    borderColor: theme.colors.grass,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  dashedBtnText: { color: theme.colors.grassDeep, fontFamily: theme.font.bodyBold, fontSize: 14 },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 24 },
  completeBtn: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: theme.radius.xl,
    backgroundColor: theme.colors.grass,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  completeBtnText: { color: '#fff', fontFamily: theme.font.bodyBold, fontSize: 15 },
  logoutBtn: {
    width: '100%',
    marginTop: 12,
    paddingVertical: 13,
    borderRadius: 14,
    borderWidth: theme.border.width,
    borderColor: theme.colors.line,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  logoutText: { color: theme.colors.red, fontFamily: theme.font.bodyBold, fontSize: 14 },
});
