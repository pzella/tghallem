import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Switch, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader } from '@/components/layout/AppHeader';
import { deleteCurrentUserAccount } from '@/hooks/useAuth';
import { Colors, FontSizes, Spacing, Radii } from '@/constants/tokens';

export default function PrivacyScreen() {
  const router = useRouter();
  const [personalization, setPersonalization] = useState(true);
  const [analytics, setAnalytics] = useState(true);
  const [leaderboards, setLeaderboards] = useState(false);
  const [reminders, setReminders] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const confirmDelete = () => {
    Alert.alert(
      'Delete account',
      'This permanently deletes your account and learning progress. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            setDeleting(true);
            const { error } = await deleteCurrentUserAccount();
            setDeleting(false);
            if (error) {
              Alert.alert('Could not delete account', error);
              return;
            }
            router.replace('/(onboarding)/welcome');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader title="Privacy" showBack />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.lead}>
          Control how Tgħallem uses your data. You can change these anytime.
        </Text>

        {[
          { key: 'personalization', label: 'Personalization', sub: 'Tailor lessons to your level and pace.', value: personalization, set: setPersonalization },
          { key: 'analytics', label: 'Product analytics', sub: 'Help us improve stability and features.', value: analytics, set: setAnalytics },
          { key: 'leaderboards', label: 'Leaderboards', sub: 'Compare streaks and XP with learners.', value: leaderboards, set: setLeaderboards },
          { key: 'reminders', label: 'Study reminders', sub: 'Push notifications for your daily goal.', value: reminders, set: setReminders },
          { key: 'marketing', label: 'Tips & culture', sub: 'Occasional Maltese culture and learning tips.', value: marketing, set: setMarketing },
        ].map((row) => (
          <View key={row.key} style={styles.row}>
            <View style={styles.rowText}>
              <Text style={styles.rowLabel}>{row.label}</Text>
              <Text style={styles.rowSub}>{row.sub}</Text>
            </View>
            <Switch
              value={row.value}
              onValueChange={row.set}
              trackColor={{ false: Colors.cream2, true: Colors.redTint }}
              thumbColor={row.value ? Colors.red : '#f4f3f4'}
            />
          </View>
        ))}

        <View style={styles.dangerZone}>
          <Text style={styles.dangerTitle}>Account</Text>
          <Text style={styles.dangerSub}>
            Deleting your account removes your profile and progress from our systems.
          </Text>
          <Pressable
            style={[styles.deleteBtn, deleting && styles.deleteBtnDisabled]}
            onPress={confirmDelete}
            disabled={deleting}
          >
            {deleting ? (
              <ActivityIndicator color={Colors.white} />
            ) : (
              <Text style={styles.deleteLabel}>Delete account</Text>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },
  scroll: { paddingHorizontal: Spacing.screenH2, paddingBottom: 48, paddingTop: 8 },
  lead: { fontSize: FontSizes.bodySmall, color: Colors.ink2, lineHeight: 22, marginBottom: 20 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.06)',
  },
  rowText: { flex: 1 },
  rowLabel: { fontSize: FontSizes.body, fontWeight: '600', color: Colors.ink },
  rowSub: { fontSize: FontSizes.small, color: Colors.ink2, marginTop: 4, lineHeight: 18 },
  dangerZone: { marginTop: 32, gap: 12 },
  dangerTitle: { fontSize: FontSizes.h2Small, fontWeight: '600', color: Colors.ink },
  dangerSub: { fontSize: FontSizes.small, color: Colors.ink2, lineHeight: 20 },
  deleteBtn: {
    marginTop: 8,
    height: 52,
    borderRadius: Radii.button,
    backgroundColor: Colors.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteBtnDisabled: { opacity: 0.7 },
  deleteLabel: { fontSize: FontSizes.body, fontWeight: '700', color: Colors.white },
});
