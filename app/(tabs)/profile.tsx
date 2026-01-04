import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Settings, Camera, Share2, Download, LogOut } from 'lucide-react-native';
import { PROFILE } from '@/data/profile';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const profile = PROFILE;

  const menuItems = [
    { icon: <Settings size={24} color="#1D2029" />, title: 'Settings', onPress: () => {} },
    { icon: <Camera size={24} color="#1D2029" />, title: 'My Uploads', onPress: () => {} },
    { icon: <Share2 size={24} color="#1D2029" />, title: 'Shared Photos', onPress: () => {} },
    { icon: <Download size={24} color="#1D2029" />, title: 'Downloads', onPress: () => {} },
    { icon: <LogOut size={24} color="#E84855" />, title: 'Sign Out', onPress: () => {}, isDestructive: true },
  ];

  const renderMenuItem = (item, index) => (
    <TouchableOpacity 
      key={index} 
      style={styles.menuItem}
      onPress={item.onPress}
      activeOpacity={0.7}
    >
      <View style={styles.menuIconContainer}>
        {item.icon}
      </View>
      <Text style={[styles.menuText, item.isDestructive && styles.destructiveText]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView 
      style={[styles.container, { paddingTop: insets.top }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.profileHeader}>
          <Image source={{ uri: profile.avatar }} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{profile.name}</Text>
            <Text style={styles.profileEmail}>{profile.email}</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profile.stats.photos}</Text>
            <Text style={styles.statLabel}>Photos</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profile.stats.albums}</Text>
            <Text style={styles.statLabel}>Albums</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profile.stats.favorites}</Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>
        </View>
      </View>

      <View style={styles.menuSection}>
        <Text style={styles.menuSectionTitle}>Account</Text>
        {menuItems.map(renderMenuItem)}
      </View>

      <Text style={styles.versionText}>Version 1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    marginLeft: 16,
  },
  profileName: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#0A2463',
    marginBottom: 4,
  },
  profileEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#8D99AE',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F6FA',
    borderRadius: 12,
    padding: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#0A2463',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8D99AE',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E1E4EB',
  },
  menuSection: {
    padding: 16,
  },
  menuSectionTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    color: '#0A2463',
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F6FA',
  },
  menuIconContainer: {
    width: 40,
    alignItems: 'center',
    marginRight: 16,
  },
  menuText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1D2029',
    flex: 1,
  },
  destructiveText: {
    color: '#E84855',
  },
  versionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8D99AE',
    textAlign: 'center',
    padding: 24,
  },
});