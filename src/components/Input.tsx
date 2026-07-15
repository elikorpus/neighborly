import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { theme } from '../theme';

export type InputProps = {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
} & Pick<TextInputProps, 'keyboardType' | 'autoCapitalize'>;

/** Labeled text field — uppercase eyebrow label + card-bordered input, per Input.jsx. */
export function Input({ label, value, onChangeText, placeholder, keyboardType, autoCapitalize }: InputProps) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.inkSoft}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 12 },
  label: {
    fontFamily: theme.font.bodyBold,
    fontSize: 11,
    letterSpacing: theme.label.tracking,
    textTransform: 'uppercase',
    color: theme.colors.inkSoft,
  },
  input: {
    marginTop: 4,
    backgroundColor: theme.colors.card,
    borderWidth: theme.border.width,
    borderColor: theme.colors.line,
    borderRadius: theme.radius.md,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 15,
    color: theme.colors.ink,
    fontFamily: theme.font.bodyRegular,
  },
});
