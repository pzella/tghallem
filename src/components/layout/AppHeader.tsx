import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Layout, FontSizes } from '@/constants/tokens';

interface AppHeaderProps {
  title?: string;
  showBack?: boolean;
  dark?: boolean;
  right?: React.ReactNode;
  step?: string;
  onBack?: () => void;
}

export function AppHeader({
  title,
  showBack = true,
  dark = false,
  right,
  step,
  onBack,
}: AppHeaderProps) {
  const router = useRouter();
  const textColor = dark ? Colors.white : Colors.ink;
  const backBg = dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.04)';

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <View style={styles.header}>
      {showBack ? (
        <Pressable onPress={handleBack} style={[styles.backBtn, { backgroundColor: backBg }]}>
          <ChevronLeft color={textColor} />
        </Pressable>
      ) : (
        <View style={styles.placeholder} />
      )}

      {title ? (
        <Text style={[styles.title, { color: textColor }]}>{title}</Text>
      ) : (
        <View />
      )}

      <View style={styles.right}>
        {step ? (
          <Text style={[styles.step, { color: dark ? 'rgba(255,255,255,0.7)' : Colors.ink3 }]}>
            {step}
          </Text>
        ) : (
          right ?? <View style={styles.placeholder} />
        )}
      </View>
    </View>
  );
}

function ChevronLeft({ color }: { color: string }) {
  return (
    <View style={styles.chevronWrap}>
      <View style={[styles.chevronTop, { borderColor: color }]} />
      <View style={[styles.chevronBottom, { borderColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: Layout.headerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    width: 40,
  },
  title: {
    fontWeight: '600',
    fontSize: FontSizes.body,
    letterSpacing: -0.2,
  },
  right: {
    width: 40,
    alignItems: 'flex-end',
  },
  step: {
    fontSize: FontSizes.small,
    fontWeight: '600',
  },
  chevronWrap: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevronTop: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderLeftWidth: 2.2,
    borderTopWidth: 2.2,
    borderColor: Colors.ink,
    transform: [{ rotate: '-45deg' }, { translateY: 3 }],
    borderRadius: 1,
  },
  chevronBottom: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderLeftWidth: 2.2,
    borderBottomWidth: 2.2,
    borderColor: Colors.ink,
    transform: [{ rotate: '45deg' }, { translateY: -3 }],
    borderRadius: 1,
  },
});
