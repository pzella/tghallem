import React from 'react';
import { Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontSizes } from '@/constants/tokens';

type IconProps = { color: string };

function HomeIcon({ color }: IconProps) {
  return (
    <View style={tabIcon.wrap}>
      <View style={[tabIcon.house, { borderColor: color }]} />
      <View style={[tabIcon.door, { backgroundColor: color }]} />
    </View>
  );
}

function GridIcon({ color }: IconProps) {
  return (
    <View style={tabIcon.grid}>
      {[0, 1, 2, 3].map((i) => (
        <View key={i} style={[tabIcon.cell, { backgroundColor: color }]} />
      ))}
    </View>
  );
}

function BarIcon({ color }: IconProps) {
  return (
    <View style={tabIcon.bars}>
      {[14, 10, 7, 4].map((h, i) => (
        <View key={i} style={[tabIcon.bar, { height: h, backgroundColor: color }]} />
      ))}
    </View>
  );
}

function UserIcon({ color }: IconProps) {
  return (
    <View style={tabIcon.wrap}>
      <View style={[tabIcon.head, { borderColor: color }]} />
      <View style={[tabIcon.shoulders, { borderColor: color }]} />
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.red,
        tabBarInactiveTintColor: Colors.ink2,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Learn',
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="topics"
        options={{
          title: 'Topics',
          tabBarIcon: ({ color }) => <GridIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progress',
          tabBarIcon: ({ color }) => <BarIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <UserIcon color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 88,
    backgroundColor: 'rgba(255,248,240,0.92)',
    borderTopColor: 'rgba(0,0,0,0.06)',
    paddingTop: 12,
  },
  tabLabel: {
    fontSize: FontSizes.label,
    fontWeight: '600',
    marginTop: 4,
  },
});

const tabIcon = StyleSheet.create({
  wrap: { width: 26, height: 26, alignItems: 'center', justifyContent: 'center' },
  house: {
    width: 18,
    height: 14,
    borderWidth: 2,
    borderColor: Colors.ink2,
    borderBottomWidth: 0,
    marginTop: 4,
  },
  door: { width: 6, height: 8, marginTop: -1 },
  grid: { width: 22, height: 22, flexWrap: 'wrap', gap: 3, flexDirection: 'row' },
  cell: { width: 9, height: 9, borderRadius: 2 },
  bars: { flexDirection: 'row', alignItems: 'flex-end', gap: 3, height: 18 },
  bar: { width: 4, borderRadius: 2 },
  head: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.ink2,
    marginBottom: 2,
  },
  shoulders: {
    width: 20,
    height: 8,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 2,
    borderColor: Colors.ink2,
    borderBottomWidth: 0,
  },
});
