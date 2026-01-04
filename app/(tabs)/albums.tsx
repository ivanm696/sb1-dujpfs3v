import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ALBUMS } from '@/data/albums';

export default function AlbumsScreen() {
  const insets = useSafeAreaInsets();
  const [albums, setAlbums] = useState(ALBUMS);
  
  const renderAlbum = ({ item }) => (
    <TouchableOpacity 
      style={styles.albumContainer}
      onPress={() => router.push({
        pathname: '/album/[id]',
        params: { id: item.id }
      })}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.coverImage }} style={styles.albumCover} />
      <View style={styles.albumInfo}>
        <Text style={styles.albumTitle}>{item.title}</Text>
        <Text style={styles.albumCount}>{item.photoCount} photos</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Albums</Text>
        <Text style={styles.headerSubtitle}>Organize your memories</Text>
      </View>
      
      <FlatList
        data={albums}
        renderItem={renderAlbum}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.albumList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#0A2463',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#8D99AE',
  },
  albumList: {
    padding: 16,
  },
  albumContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F6FA',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  albumCover: {
    width: 80,
    height: 80,
  },
  albumInfo: {
    flex: 1,
    padding: 16,
  },
  albumTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1D2029',
    marginBottom: 4,
  },
  albumCount: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8D99AE',
  },
});