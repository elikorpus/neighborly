import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Calendar, HeartHandshake, Landmark, Map as MapIcon, Sun, Users } from 'lucide-react-native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '../components/AppHeader';
import { theme } from '../theme';
import { AskScreen } from '../screens/Ask';
import { DiscoverScreen } from '../screens/Discover';
import { EventsScreen } from '../screens/Events';
import { HOAScreen } from '../screens/HOA';
import { MeetScreen } from '../screens/Meet';
import { TodayScreen } from '../screens/Today';
import { AppStackParamList, TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

const ICONS: Record<keyof TabParamList, React.ComponentType<{ size: number; color: string }>> = {
  Today: Sun,
  Meet: Users,
  Ask: HeartHandshake,
  Events: Calendar,
  Discover: MapIcon,
  HOA: Landmark,
};

function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const Icon = ICONS[route.name as keyof TabParamList];
        const label = route.name === 'HOA' ? 'HOA' : route.name;
        return (
          <Pressable
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={styles.tabItem}
          >
            <View style={[styles.iconPill, focused && { backgroundColor: theme.colors.grass }]}>
              <Icon size={18} color={focused ? '#fff' : theme.colors.inkSoft} />
            </View>
            <Text style={[styles.tabLabel, { color: focused ? theme.colors.ink : theme.colors.inkSoft }]}>{label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function MainTabs() {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  return (
    <View style={styles.container}>
      <AppHeader
        onOpenNotifications={() => navigation.navigate('Notifications')}
        onOpenProfile={() => navigation.navigate('Profile')}
      />
      <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <CustomTabBar {...props} />}>
        <Tab.Screen name="Today" component={TodayScreen} />
        <Tab.Screen name="Meet" component={MeetScreen} />
        <Tab.Screen name="Ask" component={AskScreen} />
        <Tab.Screen name="Events" component={EventsScreen} />
        <Tab.Screen name="Discover" component={DiscoverScreen} />
        <Tab.Screen name="HOA" component={HOAScreen} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.paper },
  tabBar: {
    borderTopWidth: theme.border.width,
    borderTopColor: theme.colors.line,
    backgroundColor: theme.colors.card,
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  tabItem: { flex: 1, alignItems: 'center', gap: 4, paddingVertical: 6 },
  iconPill: { borderRadius: theme.radius.pill, paddingVertical: 6, paddingHorizontal: 14 },
  tabLabel: { fontSize: 10, fontFamily: theme.font.bodyBold },
});
