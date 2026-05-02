import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing } from '@/constants/tokens';

export default function TopicsScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Topics</Text>
        <Text style={styles.sub}>Coming soon — specialised topic packs for Intermediate &amp; Advanced.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },
  content: { paddingHorizontal: Spacing.screenH2, paddingTop: 24 },
  title: { fontSize: FontSizes.h1Large, fontWeight: '600', color: Colors.ink, letterSpacing: -0.5 },
  sub: { fontSize: FontSizes.body, color: Colors.ink2, marginTop: 8, lineHeight: 24 },
});
