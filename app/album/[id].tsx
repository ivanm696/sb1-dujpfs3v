import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { ChevronLeft, MoveVertical as MoreVertical } from 'lucide-react-native';
import { ALBUMS } from '@/data/albums';
import { PHOTOS } from '@/data/photos';

export default function AlbumDetailScreen() {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  
  // Find the album based on id
  const albumId = Array.isArray(id) ? id[0] : id;
  const album = ALBUMS.find(a => a.id.toString() === albumId) || ALBUMS[0];
  
  // Filter photos for this album
  const albumPhotos = PHOTOS.filter(p => p.albumId.toString() === albumId);
  
  // Calculate number of columns based on screen width
  const numColumns = width > 768 ? 4 : 3;
  const imageSize = (width - 8 * (numColumns + 1)) / numColumns;

  const handlePhotoPress = useCallback((photoId) => {
    router.push(`/photo/${photoId}`);
  }, []);

  const renderPhoto = useCallback(({ item }) => (
    <TouchableOpacity 
      style={[styles.photoContainer, { width: imageSize, height: imageSize }]}
      onPress={() => handlePhotoPress(item.id)}
      activeOpacity={0.8}
    >
      <Image 
        source={{ uri: item.thumbnailUrl }} 
        style={styles.photo}
        resizeMode="cover"
      />
    </TouchableOpacity>
  ), [imageSize, handlePhotoPress]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color="#1D2029" />
        </TouchableOpacity>
        
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>{album.title}</Text>
          <Text style={styles.headerCount}>{album.photoCount} photos</Text>
        </View>
        
        <TouchableOpacity style={styles.menuButton}>
          <MoreVertical size={24} color="#1D2029" />
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={albumPhotos}
        renderItem={renderPhoto}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        contentContainerStyle={styles.photoGrid}
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F6FA',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F6FA',
  },
  headerTitleContainer: {
    flex: 1,
    marginLeft: 16,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1D2029',
  },
  headerCount: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8D99AE',
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoGrid: {
    padding: 8,
  },
  photoContainer: {
    margin: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
});