import React from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Falko } from '@/components/Falko';
import { useAuthStore } from '@/stores/useAuthStore';
import { Colors, FontSizes, Spacing, Radii } from '@/constants/tokens';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, signOut } = useAuthStore();

  const handleSignOut = () => {
    Alert.alert(
      'Sign out',
      "Your streak and progress are safely saved. You won't lose anything.",
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign out',
          style: 'destructive',
          onPress: () => {
            signOut();
            router.replace('/(onboarding)/welcome');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.content}>
        <Text style={styles.title}>Profile</Text>

        {/* avatar */}
        <View style={styles.avatarRow}>
          <View style={styles.avatar}>
            <Falko size={72} mood="happy" />
          </View>
          <View>
            <Text style={styles.name}>{user?.name ?? 'Learner'}</Text>
            <Text style={styles.email}>{user?.email ?? ''}</Text>
          </View>
        </View>

        {/* settings items */}
        {[
          { label: 'Account settings', icon: '⚙️' },
          { label: 'Notifications', icon: '🔔' },
          { label: 'Privacy', icon: '🔒' },
          { label: 'Help & support', icon: '❓' },
        ].map((item) => (
          <Pressable key={item.label} style={styles.menuItem}>
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <Text style={styles.menuLabel}>{item.label}</Text>
            <Text style={styles.menuChevron}>›</Text>
          </Pressable>
        ))}

        <Pressable style={styles.signOutBtn} onPress={handleSignOut}>
          <Text style={styles.signOutLabel}>Sign out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },
  content: { paddingHorizontal: Spacing.screenH2, paddingTop: 24 },
  title: { fontSize: FontSizes.h1Large, fontWeight: '600', color: Colors.ink, letterSpacing: -0.5, marginBottom: 24 },
  avatarRow: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 32 },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.cream2,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  name: { fontSize: FontSizes.h2Small, fontWeight: '700', color: Colors.ink },
  email: { fontSize: FontSizes.small, color: Colors.ink2, marginTop: 2 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.06)',
  },
  menuIcon: { fontSize: 20, width: 28 },
  menuLabel: { flex: 1, fontSize: FontSizes.body, color: Colors.ink },
  menuChevron: { fontSize: 20, color: Colors.ink3 },
  signOutBtn: {
    marginTop: 32,
    height: 52,
    borderRadius: Radii.button,
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.1)',
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutLabel: { fontSize: FontSizes.body, fontWeight: '600', color: Colors.red },
});
