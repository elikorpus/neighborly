import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAppState } from '../state/AppStateContext';
import { theme } from '../theme';

export type HoodMapProps = {
  highlightHouse: string | null;
  onHousePress: (id: string) => void;
};

/**
 * Web fallback — react-native-maps has no web support (it relies on native-only
 * codegen components), so the web build shows a plain address list instead of
 * crashing. The real interactive map only renders on iOS/Android (HoodMap.tsx).
 */
export function HoodMap({ highlightHouse, onHousePress }: HoodMapProps) {
  const { houses } = useAppState();

  if (houses.length === 0) {
    return <View style={styles.empty} />;
  }

  return (
    <View style={styles.wrap}>
      {houses.map((h) => {
        const isHi = h.id === highlightHouse;
        return (
          <Pressable
            key={h.id}
            onPress={() => onHousePress(h.id)}
            style={[styles.row, isHi && styles.rowHi, h.you && styles.rowYou]}
          >
            <Text style={[styles.address, (isHi || h.you) && styles.addressActive]}>{h.address}</Text>
            {h.you && <Text style={styles.youTag}>You</Text>}
          </Pressable>
        );
      })}
      <Text style={styles.note}>The interactive map is available in the Neighborly mobile app.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  empty: { width: '100%', aspectRatio: 100 / 130, backgroundColor: '#EFE9DB' },
  wrap: { padding: 12, backgroundColor: '#EFE9DB' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.card,
    borderWidth: theme.border.width,
    borderColor: theme.colors.line,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 8,
  },
  rowHi: { borderColor: theme.colors.marigold, borderWidth: 2 },
  rowYou: { backgroundColor: theme.colors.grassPale, borderColor: theme.colors.grass },
  address: { fontSize: 14, fontFamily: theme.font.bodySemibold, color: theme.colors.ink },
  addressActive: { fontFamily: theme.font.bodyBold },
  youTag: { fontSize: 11, fontFamily: theme.font.bodyBold, color: theme.colors.grassDeep, textTransform: 'uppercase' },
  note: { fontSize: 11.5, color: theme.colors.inkSoft, fontFamily: theme.font.bodySemibold, textAlign: 'center', marginTop: 4 },
});
