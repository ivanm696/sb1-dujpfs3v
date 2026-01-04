import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { getData } from '@/utils/storageUtils';
import { PHOTOS } from '@/data/photos';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [photos, setPhotos] = useState(PHOTOS);
  
  // Calculate number of columns based on screen width
  const numColumns = width > 768 ? 4 : 3;
  const imageSize = (width - 8 * (numColumns + 1)) / numColumns;

  const handlePhotoPress = useCallback((id) => {
    router.push(`/photo/${id}`);
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
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Gallery</Text>
        <Text style={styles.headerSubtitle}>Your recent photos</Text>
      </View>
      
      <FlatList
        data={photos}
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