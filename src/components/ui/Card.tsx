import React from 'react';
import { Pressable, View, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Radii, Spacing, Shadows } from '@/constants/tokens';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  padding?: number;
  radius?: number;
  bg?: string;
  elevated?: boolean;
}

export function Card({
  children,
  onPress,
  style,
  padding = Spacing.cardPad,
  radius = Radii.cardMd,
  bg = Colors.white,
  elevated = true,
}: CardProps) {
  const content = (
    <View
      style={[
        styles.base,
        { padding, borderRadius: radius, backgroundColor: bg },
        elevated && Shadows.card,
        style,
      ]}
    >
      {children}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        {content}
      </Pressable>
    );
  }
  return content;
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.98 }],
  },
});
