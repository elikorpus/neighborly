import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Mail, MapPin, Phone } from 'lucide-react-native';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { AuthStackParamList } from '../navigation/types';
import { theme } from '../theme';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const goOnboarding = () => navigation.navigate('Onboarding');

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.hero}>
        <View style={styles.badge}>
          <Text style={styles.badgeEmoji}>🏡</Text>
        </View>
        <Text style={styles.wordmark}>
          neighborly<Text style={{ color: theme.colors.grass }}>.</Text>
        </Text>
        <Text style={styles.title}>Welcome to the{'\n'}neighborhood.</Text>
        <Text style={styles.body}>
          One private, verified place for the people who actually live on your street. No strangers, no ads
          from across town.
        </Text>
      </View>
      <View style={styles.actions}>
        <Button onPress={goOnboarding} leading={<Phone size={16} color="#fff" />}>
          Continue with phone
        </Button>
        <Button variant="outline" onPress={goOnboarding} leading={<Mail size={16} color={theme.colors.ink} />}>
          Continue with email
        </Button>
        <View style={styles.footerRow}>
          <MapPin size={13} color={theme.colors.grass} />
          <Text style={styles.footerText}>Every neighbor is verified before joining</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.colors.paper },
  hero: { flex: 1, justifyContent: 'center', paddingHorizontal: 28 },
  badge: {
    width: 84,
    height: 84,
    backgroundColor: theme.colors.grass,
    borderWidth: theme.border.avatar,
    borderColor: theme.colors.ink,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '-4deg' }],
    marginBottom: 26,
    ...theme.hardShadow('lg'),
  },
  badgeEmoji: { fontSize: 40 },
  wordmark: { fontFamily: theme.font.displayBold, fontSize: 26, color: theme.colors.ink, marginBottom: 6 },
  title: {
    fontFamily: theme.font.displaySemibold,
    fontSize: 34,
    color: theme.colors.ink,
    lineHeight: 34 * theme.lineHeightMultiplier.tight,
  },
  body: {
    color: theme.colors.inkSoft,
    fontSize: 15,
    lineHeight: 15 * theme.lineHeightMultiplier.relaxed,
    marginTop: 14,
    fontFamily: theme.font.bodyRegular,
  },
  actions: { paddingHorizontal: 28, paddingBottom: 34, gap: 10 },
  footerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 2 },
  footerText: { fontSize: 12.5, color: theme.colors.inkSoft, fontFamily: theme.font.bodySemibold },
});
