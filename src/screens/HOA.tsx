import { Bot, Landmark, Send } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Card } from '../components/Card';
import { Chip } from '../components/Chip';
import { SectionLabel } from '../components/SectionLabel';
import { EMPTY_STATES } from '../data/emptyStates';
import { useAppState } from '../state/AppStateContext';
import { theme } from '../theme';
import { EmptyTab } from './empty';

type Message = { from: 'you' | 'them'; text: string };
type Mode = 'board' | 'ai' | 'announcements';

const AI_PLACEHOLDER =
  "The AI rules assistant will be live once Neighborly's backend is connected — for now, message the board directly.";

export function HOAScreen() {
  const { boardMessages, sendBoardMessage, announcements } = useAppState();
  const [mode, setMode] = useState<Mode>('board');
  const [ai, setAi] = useState<Message[]>([
    {
      from: 'them',
      text: 'Hi! I know your covenants inside out. Ask me anything — fences, paint colors, RV parking, pool hours, fine appeals…',
    },
  ]);
  const [text, setText] = useState('');
  const scrollRef = useRef<ScrollView>(null);

  if (boardMessages.length === 0 && announcements.length === 0) return <EmptyTab config={EMPTY_STATES.hoa} />;

  const msgs = mode === 'board' ? boardMessages : ai;

  const send = () => {
    const value = text.trim();
    if (!value) return;
    setText('');
    if (mode === 'board') {
      sendBoardMessage(value);
    } else if (mode === 'ai') {
      setAi((m) => [...m, { from: 'you', text: value }]);
      setTimeout(() => setAi((m) => [...m, { from: 'them', text: AI_PLACEHOLDER }]), 500);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={90}>
      <View style={styles.headerBlock}>
        <Text style={styles.h1}>Your HOA</Text>
        <Text style={styles.lead}>Your community association</Text>
        <View style={styles.tabRow}>
          <Chip active={mode === 'announcements'} onPress={() => setMode('announcements')}>
            📣 Announcements
          </Chip>
          <Chip active={mode === 'board'} onPress={() => setMode('board')}>
            💬 Message the board
          </Chip>
          <Chip active={mode === 'ai'} onPress={() => setMode('ai')}>
            🤖 Rules assistant
          </Chip>
        </View>
      </View>

      {mode === 'announcements' ? (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.messages}>
          <SectionLabel>Board announcements</SectionLabel>
          {announcements.length === 0 && <Text style={styles.emptyAnnouncements}>No announcements yet.</Text>}
          {announcements.map((a) => (
            <Card key={a.id} style={{ marginBottom: 12 }}>
              <Text style={styles.announcementTitle}>{a.title}</Text>
              <Text style={styles.announcementBody}>{a.body}</Text>
              <Text style={styles.announcementMeta}>
                {a.authorName} · {a.createdAt}
              </Text>
            </Card>
          ))}
        </ScrollView>
      ) : (
        <>
          <ScrollView
            ref={scrollRef}
            style={{ flex: 1 }}
            contentContainerStyle={styles.messages}
            onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
          >
            {mode === 'ai' && (
              <View style={styles.aiNote}>
                <Bot size={13} color={theme.colors.grassDeep} />
                <Text style={styles.aiNoteText}>AI answers from your covenants — not official rulings. For appeals, message the board.</Text>
              </View>
            )}
            {msgs.map((m, i) => (
          <View key={i} style={[styles.msgRow, { justifyContent: m.from === 'you' ? 'flex-end' : 'flex-start' }]}>
            {m.from === 'them' && (
              <View style={[styles.avatarChip, { backgroundColor: mode === 'ai' ? theme.colors.ink : theme.colors.lilac }]}>
                {mode === 'ai' ? <Bot size={14} color={theme.colors.paper} /> : <Landmark size={13} color={theme.colors.ink} />}
              </View>
            )}
            <View
              style={[
                styles.bubble,
                {
                  backgroundColor: m.from === 'you' ? theme.colors.grass : theme.colors.card,
                  borderWidth: m.from === 'you' ? 0 : theme.border.width,
                },
              ]}
            >
              <Text style={{ color: m.from === 'you' ? '#fff' : theme.colors.ink, fontSize: 14, lineHeight: 14 * 1.45 }}>{m.text}</Text>
            </View>
          </View>
        ))}
          </ScrollView>

          <View style={styles.inputRow}>
            <TextInput
              value={text}
              onChangeText={setText}
              onSubmitEditing={send}
              placeholder={mode === 'board' ? 'Share a concern with the board…' : 'Can I park an RV overnight?'}
              placeholderTextColor={theme.colors.inkSoft}
              style={styles.input}
            />
            <Pressable onPress={send} style={styles.sendBtn}>
              <Send size={17} color="#fff" />
            </Pressable>
          </View>
        </>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.colors.paper },
  headerBlock: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 12 },
  h1: { fontFamily: theme.font.displaySemibold, fontSize: 28, color: theme.colors.ink },
  lead: { fontSize: 13.5, color: theme.colors.inkSoft, marginTop: 4, fontFamily: theme.font.bodyRegular },
  tabRow: { flexDirection: 'row', gap: 8, marginTop: 12, flexWrap: 'wrap' },
  messages: { paddingHorizontal: 20, paddingBottom: 12 },
  emptyAnnouncements: { fontSize: 13.5, color: theme.colors.inkSoft, fontFamily: theme.font.bodySemibold, textAlign: 'center', paddingVertical: 24 },
  announcementTitle: { fontSize: 15, fontFamily: theme.font.bodyBold, color: theme.colors.ink },
  announcementBody: { fontSize: 13.5, color: theme.colors.ink, marginTop: 4, fontFamily: theme.font.bodyRegular, lineHeight: 13.5 * 1.4 },
  announcementMeta: { fontSize: 11.5, color: theme.colors.inkSoft, fontFamily: theme.font.bodySemibold, marginTop: 8 },
  aiNote: {
    backgroundColor: theme.colors.grassPale,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  aiNoteText: { fontSize: 11.5, color: theme.colors.grassDeep, fontFamily: theme.font.bodySemibold, flex: 1 },
  msgRow: { flexDirection: 'row', marginBottom: 10 },
  avatarChip: {
    width: 28,
    height: 28,
    borderRadius: 10,
    borderWidth: theme.border.strong,
    borderColor: theme.colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  bubble: { borderColor: theme.colors.line, borderRadius: 16, maxWidth: '82%', paddingVertical: 10, paddingHorizontal: 14 },
  inputRow: {
    borderTopWidth: theme.border.width,
    borderTopColor: theme.colors.line,
    backgroundColor: theme.colors.card,
    padding: 12,
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: theme.border.width,
    borderColor: theme.colors.line,
    borderRadius: theme.radius.pill,
    fontSize: 14,
    color: theme.colors.ink,
    backgroundColor: theme.colors.paper,
    fontFamily: theme.font.bodyRegular,
  },
  sendBtn: {
    backgroundColor: theme.colors.grass,
    borderRadius: theme.radius.pill,
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
