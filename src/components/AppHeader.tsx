import { Bell } from 'lucide-react-native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAppState } from '../state/AppStateContext';
import { theme } from '../theme';
import { Avatar } from './Avatar';

export type AppHeaderProps = {
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
};

/** Persistent app-shell header: wordmark, first-run/active demo toggle, bell, avatar. */
export function AppHeader({ onOpenNotifications, onOpenProfile }: AppHeaderProps) {
  const { isEmpty, toggleEmpty, unreadNotificationCount, profile } = useAppState();

  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <Text style={styles.wordmark}>
          neighborly<Text style={{ color: theme.colors.grass }}>.</Text>
        </Text>
        <Pressable
          onPress={toggleEmpty}
          style={[
            styles.toggle,
            {
              backgroundColor: isEmpty ? theme.colors.paper : theme.colors.grassPale,
              borderColor: isEmpty ? theme.colors.line : 'transparent',
            },
          ]}
        >
          <Text style={[styles.toggleText, { color: isEmpty ? theme.colors.inkSoft : theme.colors.grassDeep }]}>
            {isEmpty ? 'FIRST RUN' : 'ACTIVE'}
          </Text>
        </Pressable>
      </View>
      <View style={styles.right}>
        <Pressable onPress={onOpenNotifications} hitSlop={8} style={styles.bellBtn}>
          <Bell size={19} color={isEmpty ? theme.colors.inkSoft : theme.colors.ink} />
          {!isEmpty && unreadNotificationCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadNotificationCount}</Text>
            </View>
          )}
        </Pressable>
        <Pressable onPress={onOpenProfile}>
          {isEmpty ? (
            <View style={styles.placeholderAvatar}>
              <Text style={styles.placeholderText}>?</Text>
            </View>
          ) : (
            <Avatar initials={(profile.firstName[0] ?? 'E') + (profile.lastName[0] ?? 'L')} bg={theme.colors.sky} size={30} tilt={-3} />
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    borderBottomWidth: theme.border.width,
    borderBottomColor: theme.colors.line,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.paper,
  },
  left: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  wordmark: { fontFamily: theme.font.displayBold, fontSize: 18, color: theme.colors.ink },
  toggle: {
    borderWidth: theme.border.width,
    borderRadius: theme.radius.pill,
    paddingVertical: 3,
    paddingHorizontal: 9,
  },
  toggleText: { fontSize: 9.5, fontFamily: theme.font.bodyBold, letterSpacing: 0.3 },
  right: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  bellBtn: { padding: 4 },
  badge: {
    position: 'absolute',
    top: -2,
    right: -4,
    backgroundColor: theme.colors.red,
    borderRadius: theme.radius.pill,
    minWidth: 15,
    height: 15,
    borderWidth: 1.5,
    borderColor: theme.colors.paper,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: { color: '#fff', fontSize: 9, fontFamily: theme.font.bodyBold },
  placeholderAvatar: {
    width: 30,
    height: 30,
    backgroundColor: theme.colors.line,
    borderWidth: theme.border.avatar,
    borderColor: theme.colors.ink,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '-3deg' }],
  },
  placeholderText: { fontFamily: theme.font.displaySemibold, color: theme.colors.inkSoft, fontSize: 13 },
});
